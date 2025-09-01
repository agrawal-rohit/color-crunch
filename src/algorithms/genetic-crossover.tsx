import React, { useEffect, useMemo, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { TinyColor } from "@ctrl/tinycolor";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  HStack,
  Text,
  Divider,
  Box,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Center,
  InputRightAddon,
  InputGroup,
  Badge,
  Select,
} from "@chakra-ui/react";
import InfoTooltip from "../components/info-tooltip";
import ColorInput from "../components/color-input";
import ColorSwatch from "../components/color-swatch";
import DesignOne from "../designs/1/design-1";
import DesignTwo from "../designs/2/design-2";
import DesignThree from "../designs/3/design-3";
import ReactECharts from "echarts-for-react";
import { evaluateSolution, seedInitialSolution, sleep } from "../utils";
import { motion } from "framer-motion";
import { FadeInUp } from "../animations/animations";

const MotionCenter = motion(Center);
const MotionBox = motion(Box);

type CrossoverOperation =
  | "one-point"
  | "two-point"
  | "block"
  | "uniform"
  | "shuffle";

const GeneticCrossover: React.FC = () => {
  const [thresholdFitness, setThresholdFitness] = useState(65);
  const [crossoverProbability, setCrossoverProbability] = useState(30);
  const [mutationProbability, setMutationProbability] = useState(10);
  const [populationSize, setPopulationSize] = useState(10);
  const [maxIterations, setMaxIterations] = useState(2000);
  const [selectedPaletteIdx, setSelectedPaletteIdx] = useState(0);
  const [crossoverOperation, setCrossoverOperation] =
    useState<CrossoverOperation>("shuffle");
  const [currentIteration, setCurrentIteration] = useState(0);
  const [metrics, setMetrics] = useState<
    { iteration: number; fitness: number[] }[]
  >([]);
  const [primaryColor, setPrimaryColor] = useState(
    new TinyColor({
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    })
      .toHexString()
      .substring(1)
  );
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [hasSimulationRunBefore, setHasSimulationRunBefore] = useState(false);
  const [population, setPopulation] = useState(
    Array.from({ length: populationSize }).map(() => seedInitialSolution())
  );
  const primaryColorTinyColor = new TinyColor(`#${primaryColor}`);
  const primaryColorRGB = [
    primaryColorTinyColor.r,
    primaryColorTinyColor.g,
    primaryColorTinyColor.b,
  ];
  const [populationEvals, setPopulationEvals] = useState(
    population.map((solution) => evaluateSolution(primaryColorRGB, solution))
  );

  const areInputsInvalid = useMemo(() => {
    return (
      !primaryColorTinyColor.isValid ||
      !(thresholdFitness > 0) ||
      !(crossoverProbability >= 0 && crossoverProbability <= 100) ||
      !(mutationProbability >= 0 && mutationProbability <= 100) ||
      !(populationSize > 2) ||
      !(maxIterations > 0)
    );
  }, [
    crossoverProbability,
    maxIterations,
    mutationProbability,
    populationSize,
    primaryColorTinyColor.isValid,
    thresholdFitness,
  ]);

  const fitnessGraphOptions = useMemo(() => {
    return {
      title: {
        text: "Solution Fitness Over Time",
        left: "center",
        textStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "bolder",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: metrics.map((val) => `Iteration ${val.iteration}`),
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: population.map((_, idx) => {
        return {
          type: "line",
          name: `Fitness (Palette #${idx + 1})`,
          data: metrics.map((val) => val.fitness[idx]),
        };
      }),
      animation: false,
    };
  }, [metrics, population]);

  /**
   * Selects parents for the next generation using a ranking selection method.
   * This function first ranks the population based on their evaluation scores,
   * then selects parents based on their rank, giving higher probability to
   * individuals with better ranks.
   *
   * @returns {Array} selectedParents - An array of parents selected for crossover.
   */
  const selectParents = () => {
    // Sort population evaluations and keep track of original indices
    const sortedPopEvals = [...populationEvals].sort((a, b) => b - a);
    const sortedPopEvalsIdx = populationEvals
      .map((val, idx) => ({ val, idx }))
      .sort((a, b) => b.val - a.val)
      .map(({ idx }) => idx);

    // Initialize ranks and assign ranks based on sorted evaluations
    const ranks = [1];
    const ranksOriginal = Array(sortedPopEvals.length).fill(1);
    let currentRank = 1;
    for (let idx = 1; idx < sortedPopEvals.length; idx++) {
      if (sortedPopEvals[idx] !== sortedPopEvals[idx - 1]) {
        currentRank += 1;
      }
      ranks.push(currentRank);
      ranksOriginal[sortedPopEvalsIdx[idx]] = currentRank;
    }

    // Calculate selection probabilities based on ranks
    const totalRanks = ranksOriginal.reduce((a, b) => a + b, 0);
    const probs = ranksOriginal.map(
      (rank) => (totalRanks - rank) / totalRanks // Adjusted to correctly calculate probabilities
    );

    // Select parents based on calculated probabilities
    const selectedParentsIdx = [];
    for (let i = 0; i < 2; i++) {
      const rand = Math.random();
      let idx = 0;
      let acc = probs[0];
      while (acc < rand && idx < probs.length - 1) {
        idx++;
        acc += probs[idx];
      }
      selectedParentsIdx.push(sortedPopEvalsIdx[idx]); // Fixed to use sorted indices for correct parent selection
    }

    // Map selected indices to actual population members
    let selectedParents = selectedParentsIdx.map((idx) => population[idx]);
    return selectedParents;
  };

  /**
   * Performs Shuffle gene crossover between parents to create the next generation
   *
   * @param {Array<Array<number>>} parents - Chosen pair of solutions as parents
   * @returns {Array<Array<number>>} - The next generation of solutions
   */
  const performCrossoverAndMutation = (
    parents: Array<Array<number>>
  ): Array<Array<number>> => {
    if (!parents || parents.length < 2 || !parents[0] || !parents[1])
      throw new Error("Invalid parents array for crossover");

    let offspring1: Array<number> = [];
    let offspring2: Array<number> = [];

    if (Math.random() <= crossoverProbability / 100) {
      switch (crossoverOperation) {
        case "one-point":
          const crossoverPt =
            Math.floor(Math.random() * (parents[0].length / 3)) * 3;
          offspring1 = [
            ...parents[0].slice(0, crossoverPt),
            ...parents[1].slice(crossoverPt),
          ];
          offspring2 = [
            ...parents[1].slice(0, crossoverPt),
            ...parents[0].slice(crossoverPt),
          ];
          break;
        case "two-point":
          const crossoverPt1 =
            Math.floor(Math.random() * (parents[0].length / 3 - 1)) * 3;
          const crossoverPt2 =
            (Math.floor(
              Math.random() * (parents[0].length / 3 - crossoverPt1 / 3 - 1)
            ) +
              crossoverPt1 / 3 +
              1) *
            3;
          offspring1 = [
            ...parents[0].slice(0, crossoverPt1),
            ...parents[1].slice(crossoverPt1, crossoverPt2),
            ...parents[0].slice(crossoverPt2),
          ];
          offspring2 = [
            ...parents[1].slice(0, crossoverPt1),
            ...parents[0].slice(crossoverPt1, crossoverPt2),
            ...parents[1].slice(crossoverPt2),
          ];
          break;
        case "uniform":
          for (let i = 0; i < parents[0].length; i += 3) {
            if (Math.random() < 0.5) {
              offspring1.push(
                parents[0][i],
                parents[0][i + 1],
                parents[0][i + 2]
              );
              offspring2.push(
                parents[1][i],
                parents[1][i + 1],
                parents[1][i + 2]
              );
            } else {
              offspring1.push(
                parents[1][i],
                parents[1][i + 1],
                parents[1][i + 2]
              );
              offspring2.push(
                parents[0][i],
                parents[0][i + 1],
                parents[0][i + 2]
              );
            }
          }
          break;
        case "shuffle":
          let indices = Array.from(Array(parents[0].length / 3).keys());
          indices = indices.sort(() => Math.random() - 0.5);
          for (let index of indices) {
            offspring1.push(
              parents[0][index * 3],
              parents[0][index * 3 + 1],
              parents[0][index * 3 + 2]
            );
            offspring2.push(
              parents[1][index * 3],
              parents[1][index * 3 + 1],
              parents[1][index * 3 + 2]
            );
          }
          break;
        case "block":
          const blockSize = Math.floor(parents[0].length / 3 / 3) * 3;
          const blockStart =
            Math.floor(Math.random() * ((parents[0].length - blockSize) / 3)) *
            3;
          offspring1 = [
            ...parents[0].slice(0, blockStart),
            ...parents[1].slice(blockStart, blockStart + blockSize),
            ...parents[0].slice(blockStart + blockSize),
          ];
          offspring2 = [
            ...parents[1].slice(0, blockStart),
            ...parents[0].slice(blockStart, blockStart + blockSize),
            ...parents[1].slice(blockStart + blockSize),
          ];
          break;
      }
    } else {
      offspring1 = [...parents[0]];
      offspring2 = [...parents[1]];
    }

    // Gene mutation
    const randomMutation = (gene: number): number => {
      if (Math.random() <= mutationProbability / 100) {
        const mutationType = Math.floor(Math.random() * 2);
        switch (mutationType) {
          case 0: // Addition/Subtraction
            const mutationValue = Math.floor(Math.random() * 41) - 20; // Generates a value between -20 and 20
            gene += mutationValue;
            break;
          case 1: // Random Replacement
            gene = Math.floor(Math.random() * 256); // Generates a value between 0 and 255
            break;
        }
        // Bounds Checking
        gene = Math.max(0, Math.min(255, gene));
      }
      return gene;
    };

    offspring1 = offspring1.map((gene) => randomMutation(gene));
    offspring2 = offspring2.map((gene) => randomMutation(gene));

    return [offspring1, offspring2];
  };

  /**
   * Replaces the worse performing solutions from the current population with the newly generated ones
   */
  const performReproduction = (): void => {
    const selectedParents = selectParents();
    const offsprings = performCrossoverAndMutation(selectedParents);

    // Replace the worst two species with offsprings
    const sortedPopEvalsIdx = populationEvals
      .map((fitness, idx) => ({ fitness, idx }))
      .sort((a, b) => a.fitness - b.fitness)
      .map((item) => item.idx);
    const worstTwo = [sortedPopEvalsIdx[0], sortedPopEvalsIdx[1]];

    setPopulation((prevPopulation) => {
      prevPopulation[worstTwo[0]] = offsprings[0];
      prevPopulation[worstTwo[1]] = offsprings[1];
      return [...prevPopulation];
    });
  };

  const runSimulation = () => {
    const newPopulation = Array.from({ length: populationSize }).map(() =>
      seedInitialSolution()
    );
    setPopulation(newPopulation);

    const newPopulationEvals = newPopulation.map((solution) =>
      evaluateSolution(primaryColorRGB, solution)
    );

    setPopulationEvals(newPopulationEvals);
    setIsSimulationRunning(true);
    setHasSimulationRunBefore(true);
    setCurrentIteration(0);
    setSelectedPaletteIdx(0);
    setMetrics([]);
  };

  const stopSimulation = () => {
    setIsSimulationRunning(false);
  };

  useEffect(() => {
    if (currentIteration >= maxIterations) setIsSimulationRunning(false);
    if (!isSimulationRunning) return;

    const executeIteration = async () => {
      setMetrics((prevMetrics) => [
        ...prevMetrics,
        {
          iteration: currentIteration,
          fitness: populationEvals,
        },
      ]);

      performReproduction();

      const newPopulationEvals = population.map((solution) =>
        evaluateSolution(primaryColorRGB, solution)
      );
      setPopulationEvals(newPopulationEvals);

      if (newPopulationEvals.every((fitness) => fitness >= thresholdFitness)) {
        setIsSimulationRunning(false);
        return;
      }

      await sleep(50);
      setCurrentIteration((i) => i + 1); // Trigger next iteration
    };

    executeIteration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSimulationRunning, currentIteration]); // Dependencies array

  return (
    <Stack spacing="4">
      <Flex alignItems="center" justifyContent="space-between">
        <HStack spacing="3">
          <Heading fontWeight="semibold">Genetic Crossover Algorithm</Heading>
          <InfoTooltip
            boxSize="4"
            helperText="Genetic Crossover is a technique inspired by the process of natural evolution. It aims to find optimal or near-optimal solutions by merging the characteristics of two 'parent' solutions. This process often results in a new 'offspring' solution that possesses the best traits of each parent, potentially leading to better performance in solving the problem at hand."
          />
        </HStack>
        <Button
          minW="max-content"
          isDisabled={areInputsInvalid}
          colorScheme={isSimulationRunning ? "danger" : "primary"}
          leftIcon={
            <Icon as={isSimulationRunning ? FaStop : FaPlay} boxSize="2.5" />
          }
          onClick={isSimulationRunning ? stopSimulation : runSimulation}
        >
          {isSimulationRunning
            ? "Stop"
            : hasSimulationRunBefore
            ? "Run again"
            : "Run"}
        </Button>
      </Flex>

      <HStack alignItems="flex-start" spacing="10">
        <Box>
          <HStack mb="2" alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Primary color
            </Text>
            <InfoTooltip helperText="This is the primary color that will serve as the base for generating the rest of the color palette. The algorithm will create colors that complement this primary color." />
          </HStack>

          <ColorInput
            size="sm"
            value={primaryColor}
            isInvalid={!primaryColorTinyColor.isValid}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />

          {!primaryColorTinyColor.isValid && (
            <Text mt="2" fontSize="xs" lineHeight="4" color="danger.500">
              The primary color must be a valid hex value
            </Text>
          )}
        </Box>

        <Box>
          <HStack mb="2" alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Crossover %
            </Text>
            <InfoTooltip helperText="The 'Crossover Probability' parameter refers to the likelihood of two parent solutions combining to create a new solution in the next generation. A higher value increases the chance of crossover, potentially leading to more diverse solutions. However, too high a value may disrupt good solutions." />
          </HStack>

          <InputGroup size="sm">
            <Input
              w="12"
              min="0"
              max="100"
              type="number"
              value={crossoverProbability}
              isInvalid={
                !(crossoverProbability >= 0 && crossoverProbability <= 100)
              }
              onChange={(e) =>
                setCrossoverProbability(parseInt(e.target.value))
              }
            />
            <InputRightAddon>%</InputRightAddon>
          </InputGroup>

          {!(crossoverProbability >= 0 && crossoverProbability <= 100) && (
            <Text mt="2" fontSize="xs" lineHeight="4" color="danger.500">
              The crossover probability must be a percentage value
            </Text>
          )}
        </Box>

        <Box>
          <HStack mb="2" alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Mutation %
            </Text>
            <InfoTooltip helperText="The 'Mutation Probability' parameter refers to the likelihood of a solution undergoing a random change in each generation. A higher value increases the chance of mutation, potentially leading to more diverse solutions. However, too high a value may disrupt good solutions." />
          </HStack>

          <InputGroup size="sm">
            <Input
              w="12"
              min="0"
              max="100"
              type="number"
              value={mutationProbability}
              isInvalid={
                !(mutationProbability >= 0 && mutationProbability <= 100)
              }
              onChange={(e) => setMutationProbability(parseInt(e.target.value))}
            />
            <InputRightAddon>%</InputRightAddon>
          </InputGroup>

          {!(mutationProbability >= 0 && mutationProbability <= 100) && (
            <Text mt="2" fontSize="xs" lineHeight="4" color="danger.500">
              The mutation probability must be a percentage value
            </Text>
          )}
        </Box>

        <Box>
          <HStack mb="2" alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Population Size
            </Text>
            <InfoTooltip helperText="The 'Population Size' parameter refers to the number of palettes in the population for the genetic algorithm. A larger population size allows for greater diversity, potentially leading to better solutions, but also requires more computational resources." />
          </HStack>

          <Input
            w="32"
            min="3"
            size="sm"
            type="number"
            value={populationSize}
            isInvalid={!(populationSize > 2)}
            onChange={(e) => setPopulationSize(parseInt(e.target.value))}
          />

          {!(populationSize > 2) && (
            <Text mt="2" fontSize="xs" lineHeight="4" color="danger.500">
              The population size must be at least 3
            </Text>
          )}
        </Box>

        <Box>
          <HStack mb="2" alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Threshold Fitness
            </Text>
            <InfoTooltip helperText="The 'Threshold Fitness' parameter refers to the minimum fitness value that all solutions in the population must reach for the algorithm to consider it as having converged. This means that the algorithm has found a solution that meets or exceeds this fitness value and will stop further iterations." />
          </HStack>

          <Input
            w="36"
            min="1"
            size="sm"
            type="number"
            value={thresholdFitness}
            isInvalid={!(thresholdFitness > 0)}
            onChange={(e) => setThresholdFitness(parseInt(e.target.value))}
          />

          {!(thresholdFitness > 0) && (
            <Text mt="2" fontSize="xs" lineHeight="4" color="danger.500">
              The threshold fitness must be a positive number
            </Text>
          )}
        </Box>

        <Box>
          <HStack mb="2" alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Iterations
            </Text>
            <InfoTooltip helperText="The 'Iterations' parameter refers to the maximum number of iterations the algorithm will perform. If the solution does not converge before reaching this limit, the algorithm will stop and return the best solution found so far. Increasing this value will allow the algorithm more time to find a better solution, but will also increase the computation time." />
          </HStack>

          <Input
            w="20"
            min="1"
            size="sm"
            type="number"
            value={maxIterations}
            isInvalid={!(maxIterations > 0)}
            onChange={(e) => setMaxIterations(parseInt(e.target.value))}
          />

          {!(maxIterations > 0) && (
            <Text mt="2" fontSize="xs" lineHeight="4" color="danger.500">
              The iterations must be a positive number
            </Text>
          )}
        </Box>

        <Box>
          <HStack mb="2" alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Crossover Operation
            </Text>
            <InfoTooltip helperText="The 'Crossover Operation' parameter refers to the type of genetic crossover operation to be used in the algorithm. Different operations can lead to different results." />
          </HStack>

          <Select
            w="150px"
            size="sm"
            value={crossoverOperation}
            onChange={(e) =>
              setCrossoverOperation(e.target.value as CrossoverOperation)
            }
          >
            {["one-point", "two-point", "block", "uniform", "shuffle"].map(
              (operation) => (
                <option value={operation}>
                  {operation
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              )
            )}
          </Select>
        </Box>
      </HStack>

      <Divider my="3" />

      {!hasSimulationRunBefore ? null : (
        <Flex alignItems="flex-start">
          <Flex flex={1}>
            <Stack spacing="8">
              <Stack
                pr="4"
                spacing="3"
                maxH="320px"
                alignItems="flex-start"
                overflowY="auto"
              >
                {population.map((solution, idx) => (
                  <MotionCenter
                    variants={FadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <HStack alignItems="flex-start" spacing="4">
                      <Badge
                        mt="3"
                        borderRadius="full"
                        fontSize="0.6rem"
                        color="white"
                        bgColor="neutral.800"
                      >
                        #{idx + 1}
                      </Badge>
                      <ColorSwatch
                        h="10"
                        value={primaryColorRGB}
                        label="Primary"
                      />
                      <ColorSwatch
                        h="10"
                        value={solution.slice(0, 3)}
                        label="Accent"
                      />
                      <ColorSwatch
                        h="10"
                        value={solution.slice(3, 6)}
                        label="Background"
                      />
                      <ColorSwatch
                        h="10"
                        value={solution.slice(6, 9)}
                        label="Surface"
                      />
                      <ColorSwatch
                        h="10"
                        value={solution.slice(9, 12)}
                        label="Button Text"
                      />
                      <ColorSwatch
                        h="10"
                        value={solution.slice(12, 15)}
                        label="Main text"
                      />
                    </HStack>
                  </MotionCenter>
                ))}
              </Stack>

              <Stack>
                <MotionBox
                  variants={FadeInUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ReactECharts
                    option={fitnessGraphOptions}
                    style={{ height: "250px" }}
                  />
                </MotionBox>
              </Stack>
            </Stack>
          </Flex>

          <Flex justifyContent="flex-end" flex={1}>
            <Stack spacing="4" alignItems="flex-end">
              <Select
                size="sm"
                w="fit-content"
                value={selectedPaletteIdx}
                onChange={(e) =>
                  setSelectedPaletteIdx(parseInt(e.target.value))
                }
              >
                {population.map((_, idx) => (
                  <option value={idx}>Palette #{idx + 1}</option>
                ))}
              </Select>

              <Tabs size="sm" align="end" variant="soft-rounded">
                <TabList>
                  <Tab fontWeight="medium">Preview 1</Tab>
                  <Tab fontWeight="medium">Preview 2</Tab>
                  <Tab fontWeight="medium">Preview 3</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel pr="0" justifyContent="flex-end">
                    <MotionCenter
                      variants={FadeInUp}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <DesignOne
                        palette={[
                          ...primaryColorRGB,
                          ...population[selectedPaletteIdx],
                        ]}
                      />
                    </MotionCenter>
                  </TabPanel>
                  <TabPanel pr="0" justifyContent="flex-end">
                    <MotionCenter
                      variants={FadeInUp}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <DesignTwo
                        palette={[
                          ...primaryColorRGB,
                          ...population[selectedPaletteIdx],
                        ]}
                      />
                    </MotionCenter>
                  </TabPanel>
                  <TabPanel pr="0" justifyContent="flex-end">
                    <MotionCenter
                      variants={FadeInUp}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <DesignThree
                        palette={[
                          ...primaryColorRGB,
                          ...population[selectedPaletteIdx],
                        ]}
                      />
                    </MotionCenter>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Flex>
        </Flex>
      )}
    </Stack>
  );
};

export default GeneticCrossover;
