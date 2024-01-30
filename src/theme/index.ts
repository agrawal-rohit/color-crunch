import {
  extendTheme,
  type ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import colors from "./colors";
import { components } from "./components";
import typography from "./typography";

const themeConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    ...themeConfig,
    ...typography,
    colors,
    components,
    styles: {
      global: {
        ".js-focus-visible :focus:not([data-focus-visible-added])": {
          outline: "0px solid transparent",
          boxShadow: "none",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);
