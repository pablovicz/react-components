import { FieldError } from "react-hook-form";
import { FormControl, FormLabel, TextareaProps as ChakraTextareaProps, Textarea as ChakraTextArea, FormErrorMessage } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { RenderByCondition } from "../utils/RenderByCondition";

type CustomError = {
    error: boolean;
    message?: string;
}

interface TextAreaInputProps extends ChakraTextareaProps {
    name: string;
    label?: string;
    error?: FieldError | CustomError;
}

const InputBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaInputProps> = ({ name, label, error = null, ...rest }, ref) => {
    return (
        <FormControl>
            <RenderByCondition condition={!!label}>
                <FormLabel htmlFor={name} color="gray.400" _focus={{ color: "vivo.pink" }}>
                    {label}
                </FormLabel>
            </RenderByCondition>
            < ChakraTextArea
                name={name}
                //id={name}
                focusBorderColor="vivo.pink"
                bgColor="gray.50"
                borderColor="gray.300"
                color="gray.400"
                _hover={{ bgColor: "gray.50", borderColor: "vivo.pink" }}
                _focus={{ color: "vivo.pink" }}
                _disabled={{ bgColor: "gray.50", borderColor: "gray.300", color: "gray.300" }}
                size="md"
                resize="vertical"
                rows={rest.value || String(rest.value).length < 200 ? (Math.floor(String(rest.value).length / 100)) : (2)}
                ref={ref}
                {...rest}
            />
            <RenderByCondition condition={!!error}>
                <FormErrorMessage>{error?.message}</FormErrorMessage>
            </RenderByCondition>
        </FormControl>
    );
}


export const TextAreaInput = forwardRef(InputBase);