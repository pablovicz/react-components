import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
    Input as ChakraInput, FormLabel, FormControl,
    InputProps as ChrakraInputProps, FormErrorMessage
} from '@chakra-ui/react';

interface InputProps extends ChrakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {
                !!label && (
                    <FormLabel
                        htmlFor={name}
                        color="gray.400"
                        _focus={{ color: "vivo.pink" }}
                    >
                        {label}
                    </FormLabel>
                )
            }

            < ChakraInput
                name={name}
                focusBorderColor="vivo.pink"
                variant="flushed"
                bgColor="gray.50"
                borderBottomColor="gray.300"
                color="gray.400"
                _hover={{ bgColor: "gray.50", borderBottomColor: "vivo.pink" }}
                _focus={{ color: "vivo.pink" }}
                _disabled={{ bgColor: "gray.50", borderBottomColor: "gray.300", color: "gray.300"}}
                size="md"
                ref={ref}
                {...rest}
            />

            {!!error && (
                <FormErrorMessage>{error.message}</FormErrorMessage>
            )}
        </FormControl>
    )
}


export const Input = forwardRef(InputBase);