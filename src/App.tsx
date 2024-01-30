import {
  Box,
  Center,
  ChakraProvider,
  Container,
  HStack,
  Link,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { theme } from "./theme";
import { useState } from "react";
import HillClimbing from "./algorithms/hill-climbing";
import SimulatedAnnealing from "./algorithms/simulated-annealing";
import GeneticCrossover from "./algorithms/genetic-crossover";

type Algorithm = "hill-climbing" | "simulated-annealing" | "genetic-crossover";

function App() {
  return (
    <AnimatePresence mode="wait">
      <ChakraProvider theme={theme}>
        <IndexPage />
      </ChakraProvider>
    </AnimatePresence>
  );
}

const IndexPage: React.FC = () => {
  const [activeAlgorithm, setActiveAlgorithm] =
    useState<Algorithm>("hill-climbing");

  const renderSimulation = () => {
    switch (activeAlgorithm) {
      case "hill-climbing":
        return <HillClimbing />;

      case "simulated-annealing":
        return <SimulatedAnnealing />;

      case "genetic-crossover":
        return <GeneticCrossover />;
    }
  };

  return (
    <Stack spacing="6">
      <Box
        p="4"
        bgColor="white"
        borderBottomWidth={1}
        borderBottomColor="neutral.200"
      >
        <Container maxW="6xl">
          <HStack spacing="6" alignItems="center" justifyContent="center">
            {(
              [
                "hill-climbing",
                "simulated-annealing",
                "genetic-crossover",
              ] as Algorithm[]
            ).map((algorithm) => (
              <Text
                py="1"
                px="3"
                fontSize="0.9rem"
                borderRadius="md"
                fontWeight={
                  algorithm === activeAlgorithm ? "semibold" : "medium"
                }
                transition="all 0.2s ease"
                onClick={() => setActiveAlgorithm(algorithm)}
                bgColor={
                  algorithm === activeAlgorithm ? "primary.70" : "transparent"
                }
                color={
                  algorithm === activeAlgorithm ? "primary.500" : "neutral.400"
                }
                _hover={{
                  cursor: "pointer",
                  color:
                    algorithm === activeAlgorithm
                      ? "primary.500"
                      : "neutral.800",
                }}
              >
                {algorithm
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Text>
            ))}
          </HStack>
        </Container>
      </Box>

      <Container maxW="6xl" h="100vh" overflowY="auto">
        {renderSimulation()}
      </Container>

      <Box
        p="2"
        w="100%"
        bottom={0}
        position="absolute"
        bgColor="white"
        borderTopWidth={1}
        borderTopColor="neutral.200"
      >
        <Container maxW="6xl">
          <Center>
            <Text fontSize="xs">
              Made with <chakra.b color="red">❤️</chakra.b> by{" "}
              <Link
                isExternal
                href="https://github.com/agrawal-rohit"
                fontWeight="medium"
                color="primary.500"
                transition="all 0.2s ease"
                _hover={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Rohit Agrawal
              </Link>
            </Text>
          </Center>
        </Container>
      </Box>
    </Stack>
  );
};

export default App;
