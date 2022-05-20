import { Box, Button, Flex, HStack, Icon, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { checkIfValidIP } from "../../utils/utils";
import { ActionsButtons } from "../Buttons/ActionsButton";
import { RenderByCondition } from "../utils/RenderByCondition";
import { Input } from "./Input";

export type CustomError = {
    error: boolean;
    message?: string;
}


interface ListInputProps {
    label?: string;
    onChange: (values: string[] | number[]) => void;
    values: string[] | number[];
    itemStyle?: {
        bgColor: string;
        color: string;
    }
    isDisabled?: boolean;
}


export function HostListInput({ label, values, onChange, itemStyle = { bgColor: "vivo.pink", color: "gray.50" }, isDisabled = false }: ListInputProps) {

    const [listValues, setListValues] = useState(values);
    const [isAddNewItem, setIsAddNewItem] = useState(false);
    const [newItemInput, setNewItemInput] = useState('');

    const [error, setError] = useState({} as CustomError);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setListValues(values);
    }, [values])

    useEffect(() => {
        onChange(listValues);
    }, [listValues])


    useEffect(() => {
        if (!!newItemInput) {
            setError({} as CustomError);
            setIsError(false);
        }
    }, [newItemInput]);

    useEffect(() => {
        setError({} as CustomError);
        setIsError(false);
    }, [isAddNewItem])

    function handleListItemRemove(item: string | number) {
        const newValues = listValues.filter((l: string | number) => (String(l) !== String(item)))
        setListValues(newValues);
    }

    function handleAddNewItem() {
        const isValidInput = validateHostInput(newItemInput);

        if (isValidInput) {
            const newValues = listValues;
            newValues.push(newItemInput);
            setListValues(newValues);
            setIsAddNewItem(false);
            onChange(newValues);
        }
    }

    function validateHostInput(newHost: string) {

        if (!newHost) {
            setError({ error: true, message: "Insira um host IP." });
            setIsError(true);

            return false;
        }
        if (!checkIfValidIP(newHost)) {
            setError({ error: true, message: "Insira um IP válido." });
            setIsError(true);

            return false;
        }

        const registeredValues = listValues as [];

        if (registeredValues.includes(newHost)) {
            setError({ error: true, message: "O host já foi registrado." });
            setIsError(true);

            return false;
        }

        return true;
    }




    function handleNewItemClick() {
        setNewItemInput('');
        setIsAddNewItem(true);
    }


    return (
        <Flex
            w="100%"
            h="100%"
            flexDir="column"
            align="center"
            justify="center"
        >
            <RenderByCondition condition={!!label}>
                <Box w="100%">
                    <Text fontSize="18" color="gray.400" fontWeight="bold" mb="2" textAlign="left">{label}</Text>
                </Box>
            </RenderByCondition>
            <VStack
                spacing="10"
                align="center"
                p="8"
                borderWidth="1px"
                borderRadius="5px"
                minW={300}
                minH={150}
                maxW={700}
            >
                <Wrap spacing="2">
                    {listValues.map(value => (
                        <WrapItem key={`${value}${Math.random() * 100}`}>
                            <Button
                                colorScheme="pink"
                                size="sm"
                                rightIcon={<Icon as={FiX} fontSize="16" color="gray.50" />}
                                onClick={() => handleListItemRemove(value)}
                                isDisabled={isAddNewItem || isDisabled}
                            >
                                <Text textAlign="center" fontSize="20">{value}</Text>
                            </Button>
                        </WrapItem>
                    ))}
                </Wrap>


                <Box>
                    <RenderByCondition condition={(listValues.length == 0 || !listValues) && !isAddNewItem}>
                        <Text fontSize={18} fontWeight="bold" color="gray.400" textAlign="center" mb="10">Insira o primeiro host</Text>
                    </RenderByCondition>
                    <RenderByCondition condition={isAddNewItem && !isDisabled}>
                        <VStack spacing="2" borderColor={itemStyle.bgColor} borderRadius={5}>
                            <Text fontSize="16" color="gray.400" textAlign="center" fontWeight="bold">Novo Item</Text>
                            <HStack spacing="2" w="100%" align="center">
                                <Box>
                                    <Input
                                        name="newItem"
                                        value={newItemInput}
                                        onChange={(event) => setNewItemInput(event.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <ActionsButtons
                                        okButton={{ onClick: () => handleAddNewItem(), toolTip: { label: "Confirmar" }, isDisabled: isError }}
                                        cancelButton={{ onClick: () => setIsAddNewItem(false), toolTip: { label: "Cancelar" }, isDisabled: false }}
                                    />
                                </Box>
                            </HStack>
                        </VStack>
                    </RenderByCondition>
                    <RenderByCondition condition={!isAddNewItem && !isDisabled}>
                        <Button
                            bgColor="gray.300"
                            color="gray.50"
                            _hover={{ bgColor: "vivo.pink" }}
                            w={200}
                            h={30}
                            onClick={() => handleNewItemClick()}
                        >
                            <Icon as={FiPlus} fontSize="16" color="gray.50" />
                        </Button>
                    </RenderByCondition>
                </Box>
            </VStack>
            <RenderByCondition condition={isError}>
                <Box w="95%" mt="2" mb="2">
                    <Text fontSize="14" color="red.500" textAlign="left">{error.message}</Text>
                </Box>
            </RenderByCondition>
        </Flex>
    );
}