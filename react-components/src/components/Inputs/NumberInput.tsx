import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputProps as ChakraNumberInputProps,
    NumberInputStepper,
} from "@chakra-ui/react";
import { RenderByCondition } from '../utils/RenderByCondition';


interface NumberInputProps extends ChakraNumberInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, NumberInputProps> = ({ name, label, error = null, ...rest }, ref) => {

    return (
        <FormControl>
            <RenderByCondition condition={!!label}>
                <FormLabel
                    htmlFor={name}
                    color="gray.400"
                    _focus={{ color: "vivo.pink" }}
                    textAlign="left"
                >
                    {label}
                </FormLabel>
            </RenderByCondition>
            <ChakraNumberInput
                name={name}
                focusBorderColor="vivo.pink"
                textAlign="center"
                ref={ref}
                {...rest}
            >
                <NumberInputField _disabled={{ bgColor: "gray.50", focusBorderColor: "gray.400", color: "gray.300" }} />
                {!rest.isDisabled && (
                    <NumberInputStepper>
                        <NumberIncrementStepper border="none" _active={{ color: "vivo.pink" }} />
                        <NumberDecrementStepper border="none" _active={{ color: "vivo.pink" }} />
                    </NumberInputStepper>
                )}

            </ChakraNumberInput>
        </FormControl>
    );
}


export const NumberInput = forwardRef(InputBase);




