import { TinyColor } from "@ctrl/tinycolor";
import {
  Box,
  Center,
  Heading,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";
import React from "react";

type ColorSwatchProps = StackProps & {
  value: Array<number>;
  label: string;
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  w = "20",
  h = "20",
  value,
  label,
  ...props
}) => {
  const hexColor = new TinyColor({
    r: value[0],
    g: value[1],
    b: value[2],
  }).toHexString();

  return (
    <Stack spacing="3" {...props}>
      <Box
        w={w}
        h={h}
        borderWidth={1}
        bgColor={hexColor}
        borderRadius="lg"
        borderColor="neutral.200"
      />
      <Center>
        <Stack spacing="0" textAlign="center">
          <Heading
            fontSize="0.7rem"
            lineHeight="1"
            fontWeight="semibold"
            color="neutral.600"
            textTransform="uppercase"
          >
            {label}
          </Heading>
          <Text fontSize="xs" fontWeight="medium" color="neutral.400">
            {hexColor.toUpperCase()}
          </Text>
        </Stack>
      </Center>
    </Stack>
  );
};

export default ColorSwatch;
