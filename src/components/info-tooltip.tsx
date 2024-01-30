import { IconProps, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Tooltip, TooltipProps } from "@chakra-ui/react";
import React from "react";

type InfoTooltipProps = IconProps & {
  helperText: TooltipProps["label"];
};

const InfoTooltip: React.FC<InfoTooltipProps> = ({ helperText, ...props }) => {
  return (
    <Tooltip hasArrow label={helperText}>
      <QuestionOutlineIcon boxSize="3" {...props} />
    </Tooltip>
  );
};

export default InfoTooltip;
