import { ComponentStyleConfig } from "@chakra-ui/react";

const buttonStyle: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    borderRadius: 4,
    fontSize: "sm",
    lineHeight: "5",
    fontWeight: "medium",
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      borderRadius: "md",
      fontSize: "xs",
      px: 2,
      py: 2,
    },
    md: {
      borderRadius: "md",
      fontSize: "0.82rem",
      px: 3,
      h: 9,
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: (props) => {
      const { colorScheme } = props;
      return {
        borderColor: `${colorScheme}.500`,
        color: `${colorScheme}.500`,
        border: "1px solid",
        _hover: {
          bgColor: `${colorScheme}.50`,
        },
        _active: {
          bgColor: `${colorScheme}.100`,
        },
      };
    },
    solid: (props) => {
      const { colorScheme } = props;
      return {
        border: "1px solid",
        borderColor: `${colorScheme}.500`,
        bgColor: `${colorScheme}.500`,
        _hover: {
          borderColor: `${colorScheme}.600`,
          bgColor: `${colorScheme}.600`,
        },
        _active: {
          borderColor: `${colorScheme}.700`,
          bgColor: `${colorScheme}.700`,
        },
        color: "white",
      };
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export default buttonStyle;
