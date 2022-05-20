import { Input as ChakraInput, HStack, FormControl, FormLabel, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { copyToClipBoard } from "../../utils/utils";
import IconButton from "../Buttons/IconButton";
import { RenderByCondition } from "../utils/RenderByCondition";

import { TextAreaInput } from "./TextAreaInput";



interface ClipboardInputProps {
    name: string;
    as?: {
        input?: boolean;
        textArea?: {
            rows: number
        }
    }
    label?: string;
    value: string;
}


export function ClipboardInput({ name, as = { input: true }, value, label }: ClipboardInputProps) {

    const [focusColor, setFocusColor] = useState("gray.400");

    return (
        <FormControl
            onFocus={() => setFocusColor("vivo.pink")}
            onMouseEnter={() => setFocusColor("vivo.pink")}
            onMouseLeave={() => setFocusColor("gray.400")}
        >
            {
                !!label && (
                    <FormLabel
                        htmlFor={name}
                        color={focusColor}
                    >
                        {label}
                    </FormLabel>
                )
            }
            <Flex
                w="100%"
                //h={70}
                flexDir="row"
                justify="center"
                align="center"
                bgColor="gray.50"
                borderBottomColor={focusColor}
                borderBottomWidth={1}
                color={focusColor}
                _hover={{ bgColor: "gray.50", borderBottomColor: { focusColor } }}

            >
                <HStack
                    w="90%"
                    spacing="2"
                    h="100%"
                    align="center"
                >
                    <RenderByCondition condition={!!as.input}>
                        < ChakraInput
                            w="100%"
                            h="90%"
                            name={name}
                            variant="unstyled"
                            border="none"
                            size="md"
                            isDisabled={true}
                            fontFamily="Roboto"
                            _disabled={{ color: focusColor }}
                            value={value}
                        />
                    </RenderByCondition>
                    <RenderByCondition condition={!!as?.textArea}>
                        <TextAreaInput
                            w="100%"
                            h="90%"
                            name={name}
                            border="none"
                            isDisabled={true}
                            rows={!!as?.textArea?.rows ? as?.textArea?.rows : 4}
                            variant="unstyled"
                            fontFamily="Roboto"
                            _disabled={{ color: focusColor }}
                            value={value}
                            resize="none"
                        />
                    </RenderByCondition>
                    <IconButton
                        ariaLabel="copiar"
                        toolTip={{ label: "Copiar", hasArrow: true, bgColor: "vivo.pink", color: "gray.50" }}
                        icon={{ as: FiCopy, color: "gray.600", hoverColor: "vivo.pink", size: 20, hoverAnimation: true }}
                        onClick={() => { copyToClipBoard(value) }}
                    />
                </HStack>
            </Flex>
        </FormControl>
    );
}