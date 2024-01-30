import { mode, cssVar } from "@chakra-ui/theme-tools";

const $bg = cssVar("tooltip-bg");
const $arrowBg = cssVar("popper-arrow-bg");

const baseStyle = (props: any) => {
  const bg = mode("gray.700", "gray.300")(props);
  return {
    [$bg.variable]: `colors.${bg}`,
    px: "2",
    py: "1.5",
    bg: [$bg.reference],
    [$arrowBg.variable]: [$bg.reference],
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "md",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip",
  };
};

export const tooltipStyle = {
  baseStyle,
};
