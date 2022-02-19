import { HStack, Text, Flex, Box } from '@chakra-ui/react';
import { NumberInput } from './NumberInput';
import { ActionsButtons } from '../Buttons/ActionsButton';
import { useState, ReactElement, ReactNode } from 'react';
import { SelectInput } from './SelectInput';

interface PCalcInputProps {
    leftChild: {
        fixedLabel?: string;
        selectOptions?: {
            options: string[];
            value: string;
            onChange: (event: any) => void;
        };
    };
    amountInput: {
        value: string;
        onChange?: (value: string) => void;
    }
    onConfirmClick?: (value: any) => void | Promise<void>;
    onEditClick?: (value: any) => void | Promise<void>;
    onRemoveClick?: (value: any) => void | Promise<void>;
    isDisabled?: boolean;
}

export function PCalcInput({ leftChild, amountInput, onConfirmClick, onEditClick, onRemoveClick, isDisabled = false }: PCalcInputProps) {

    const [focusColor, setFocusColor] = useState("gray.400");


    return (
        <Flex
            w="100%"
            h={70}
            flexDir="row"
            justify="center"
            align="center"
            bgColor="gray.50"
            borderBottomColor={focusColor}
            borderBottomWidth={1}
            color={focusColor}
            onFocus={() => setFocusColor("vivo.purple")}
            onMouseEnter={() => setFocusColor("vivo.purple")}
            onMouseLeave={() => setFocusColor("gray.400")}
        >
            <HStack align="center" w="95%">
                <Box w="65%" h="100%">
                    {!!leftChild.fixedLabel && (
                        <Text fontSize="16" fontWeight="bold" color={focusColor}>{leftChild.fixedLabel}</Text>
                    )}
                    {!!leftChild.selectOptions && (
                        <SelectInput 
                            name="selectInput"
                            simpleOptions={leftChild.selectOptions.options}
                            value={leftChild.selectOptions.value}
                            onChange={(event) => leftChild.selectOptions?.onChange(event.target.value)}
                            variant="unstyled"
                        />
                    )}
                </Box>
                <Box w="15%" h="100%">
                    <NumberInput name="label" variant="unstyled" value={amountInput.value} onChange={amountInput.onChange} isDisabled={isDisabled} />
                </Box>
                <Box w="20%" h="100%">
                    <ActionsButtons
                        iconsSize={25}
                        okButton={{ onClick: onConfirmClick, toolTip: { label: "Confirmar" } }}
                        editButton={{ onClick: onEditClick, toolTip: { label: "Editar" } }}
                        removeButton={{ onClick: onRemoveClick, toolTip: { label: "Remover" } }}
                    />
                </Box>
            </HStack>
        </Flex>

    );
}