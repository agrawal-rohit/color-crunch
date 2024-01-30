import {
  Box,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftAddon,
  InputProps,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { SketchPicker } from "react-color";

type ColorInputProps = InputProps & {
  rootProps?: InputGroupProps;
};

const ColorInput = forwardRef(
  (
    {
      size = "md",
      value,
      onChange = () => {},
      defaultValue = "",
      rootProps = {},
      ...props
    }: ColorInputProps,
    containerRef: any
  ) => {
    const renderPopoverContent = () => (
      <PopoverContent w="fit-content">
        <PopoverBody p="0" boxShadow="lg" w="fit-content" borderRadius="md">
          <SketchPicker
            color={value ? `#${value}` : `#${defaultValue}`}
            onChange={(color) => {
              onChange({
                target: {
                  value: color.hex.replace("#", "").toUpperCase(),
                },
              } as any);
            }}
          />
        </PopoverBody>
      </PopoverContent>
    );

    return (
      <InputGroup w="135px" size={size} {...rootProps}>
        <InputLeftAddon>#</InputLeftAddon>
        <Input
          size="sm"
          maxLength={6}
          defaultValue={defaultValue}
          placeholder={`${defaultValue}`}
          value={value}
          onChange={onChange}
          {...props}
        />
        <InputRightElement width="2.5rem">
          <Popover>
            <PopoverTrigger>
              <Box
                w="15px"
                h="15px"
                borderWidth={1}
                borderRadius="full"
                borderColor="neutral.200"
                bgColor={value ? `#${value}` : `#${defaultValue}`}
                transition="all 0.2s ease"
                _hover={{
                  cursor: "pointer",
                  transform: "scale(1.1)",
                }}
              />
            </PopoverTrigger>

            <Portal containerRef={containerRef}>
              {renderPopoverContent()}
            </Portal>
          </Popover>
        </InputRightElement>
      </InputGroup>
    );
  }
);

export default ColorInput;
