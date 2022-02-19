import { FieldError } from "react-hook-form";

import {
    FormControl,
    FormLabel,
    Select as ChakraSelectInput,
    SelectProps as ChakraSelectInputProps
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

type optionCustom = {
    value: string | number;
    label: string | number;
}



interface SelectInputProps extends ChakraSelectInputProps {
    name: string;
    simpleOptions?: number[] | string[]
    richOptions?: optionCustom[];
    label?: string;
    error?: FieldError;
}



const InputBase: ForwardRefRenderFunction<HTMLSelectElement, SelectInputProps> = ({ name, label, simpleOptions, richOptions, error = null, ...rest }, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            {
                !!label && (
                    <FormLabel htmlFor={name} color="gray.400" _focus={{ color: "vivo.pink" }} textAlign="left">{label}</FormLabel>
                )
            }
            <ChakraSelectInput
                name={name}
                _hover={{ bgColor: "gray.50", borderColor: "vivo.pink" }}
                _focus={{ color: "vivo.pink", borderColor: "vivo.pink" }}
                _disabled={{ bgColor: "gray.50", borderColor: "gray.400", color: "gray.300" , cursor: "not-allowed"}}
                ref={ref}
                {...rest}
            >
                {richOptions && (
                    richOptions.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                    ))
                )}
                {simpleOptions && (
                    simpleOptions.map(op => (
                        <option key={op} value={op}>{op}</option>
                    ))
                )}
            </ChakraSelectInput>
        </FormControl>
    );

}


export const SelectInput = forwardRef(InputBase);