import { FormControl, FormLabel, FormErrorMessage, FormLabelProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { RenderByCondition } from '../utils/RenderByCondition';


interface InputLabel  {
    content?: string;
    rest?: FormLabelProps
}


interface InputContainerProps {
    name: string;
    label?: InputLabel;
    error?: string;
    children: ReactNode;
}

export function InputContainer({ name, label = { rest: {color: "gray.400", _focus: {color: "vivo.pink"}, textAlign: "left"}}, error, children }: InputContainerProps) {

    return (
        <FormControl isInvalid={!!error}>
            <RenderByCondition condition={!!label}>
                <FormLabel htmlFor={name} color={label.rest?.color} _focus={label?.rest?._focus} textAlign={label.rest?.textAlign}>
                    {label?.content}
                </FormLabel>
            </RenderByCondition>
            {children}
            <RenderByCondition condition={!!error}>
                <FormErrorMessage>{error}</FormErrorMessage>
            </RenderByCondition>
        </FormControl>
    );
}