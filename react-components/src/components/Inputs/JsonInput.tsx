import { FormControl, FormLabel, Textarea as ChakraTextArea, FormErrorMessage, HStack, Link, Flex } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { RenderByCondition } from '../utils/RenderByCondition';
import IconButton from "../Buttons/IconButton";
import { FiArrowUpRight, FiCopy } from "react-icons/fi";
import { copyToClipBoard } from "../../utils/utils";


type CustomError = {
    error: boolean;
    message?: string;
}

interface JsonInputProps {
    name: string;
    label?: string;
    style?: {
        rows?: number;
    }
    value: string;
    onChangeCallback: (value: string) => void;
    isDisabled?: boolean;
}


export function JsonInput({ name, label, value, onChangeCallback, style, isDisabled = false }: JsonInputProps) {

    const [inputValue, setInputValue] = useState(value);
    const [error, setError] = useState({} as CustomError);

    const [isError, setIsError] = useState(false);


    useEffect(() => {
        setError({} as CustomError)
        setIsError(false);
        try {
            const JsonObj = JSON.parse(inputValue);
            setInputValue(JSON.stringify(JsonObj, null, 2));
        } catch {
            setError({ error: true, message: "Insira um JSON válido." });
            setIsError(true);
        }
    }, [value])


    function formatJsonToEditorLink(){
        try {
            return JSON.stringify(JSON.parse(inputValue))
        } catch {
            return '{}'
        }
    }


    function handleCallback(value: string) {
        setInputValue(value);
        onChangeCallback(value);
    }



    return (
        <FormControl isInvalid={isError}>
            <RenderByCondition condition={!!label}>
                <FormLabel htmlFor={name} color={isError ? "red.500" : "gray.400"} _focus={{ color: isError ? "red.500" : "vivo.pink" }}>
                    {label}
                </FormLabel>
            </RenderByCondition>
            <HStack spacing="2">
                < ChakraTextArea
                    name={name}
                    focusBorderColor={isError ? "red.500" : "gray.400"}
                    bgColor="gray.50"
                    borderColor={isError ? "red.500" : "gray.300"}
                    color={isError ? "red.500" : "gray.400"}
                    _hover={{ bgColor: "gray.50", borderColor: isError ? "red.500" : "vivo.pink" }}
                    _focus={{ color: isError ? "red.500" : "vivo.pink" }}
                    _disabled={{ bgColor: "gray.50", borderColor: "gray.300", color: "gray.300" }}
                    size="md"
                    resize="vertical"
                    rows={!!style?.rows ? style.rows : 5}
                    value={inputValue}
                    onChange={(event) => handleCallback(event.target.value)}
                    isDisabled={isDisabled}
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '24px',
                            background: "#9699B0",
                        },
                    }}
                />
                <RenderByCondition condition={!isError}>
                    <Flex flexDir="column" justify="center" align="center" w={30}>
                        <Link
                            href={`https://jsoneditoronline.org/#left=json.${formatJsonToEditorLink()}`}
                            target="_blank"
                            rel="noopennorefer"
                            mb="4"
                        >
                            <IconButton
                                ariaLabel="Ver no Editor"
                                toolTip={{ label: "Ver no Editor", hasArrow: true, bgColor: "vivo.purple", color: "gray.50" }}
                                icon={{ as: FiArrowUpRight, color: "gray.400", hoverColor: "vivo.purple", size: 20 }}
                            />
                        </Link>
                        <IconButton
                            ariaLabel="Copiar para o Clipboard"
                            toolTip={{ label: "Copiar", hasArrow: true, bgColor: "vivo.pink", color: "gray.50" }}
                            icon={{ as: FiCopy, color: "gray.400", hoverColor: "vivo.pink", size: 20 }}
                            onClick={() => copyToClipBoard(inputValue)}
                        />
                    </Flex>

                </RenderByCondition>
            </HStack>
            <RenderByCondition condition={isError}>
                <FormErrorMessage>{error.message}</FormErrorMessage>
            </RenderByCondition>
        </FormControl>
    );
}