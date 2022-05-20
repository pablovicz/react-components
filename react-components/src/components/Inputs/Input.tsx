import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
    Input as ChakraInput, FormLabel, FormControl,
    InputProps as ChrakraInputProps, FormErrorMessage
} from '@chakra-ui/react';
import { RenderByCondition } from '../utils/RenderByCondition';


interface InputProps extends ChrakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            <RenderByCondition condition={!!label}>
                <FormLabel htmlFor={name} color="gray.400" _focus={{ color: "vivo.pink" }}>
                    {label}
                </FormLabel>
            </RenderByCondition>
            < ChakraInput
                name={name}
                focusBorderColor="vivo.pink"
                variant="flushed"
                bgColor="none"
                borderBottomColor="gray.300"
                color="gray.400"
                _hover={{ bgColor: "none", borderBottomColor: "vivo.pink" }}
                _focus={{ color: "vivo.pink" }}
                _disabled={{ bgColor: "none", borderBottomColor: "gray.300", color: "gray.300" }}
                size="md"
                ref={ref}
                {...rest}
            />
            <RenderByCondition condition={!!error}>
                <FormErrorMessage>{error?.message}</FormErrorMessage>
            </RenderByCondition>
        </FormControl>
    )
}


export const Input = forwardRef(InputBase);