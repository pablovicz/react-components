import { Input as ChakraInput, HStack, FormControl, FormLabel, Tooltip, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import IconButton from "../Buttons/IconButton";



interface ClipboardInputProps {
    name: string;
    label?: string;
    value: string;
}


export function ClipboardInput({ name, value, label }: ClipboardInputProps) {

    const [focusColor, setFocusColor] = useState("gray.400");



    const copyToClipBoard = async (copyValue: string) => {

        try {
            await navigator.clipboard.writeText(copyValue);
        } catch (err) {
        }
    };

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
                h={70}
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
                    <IconButton
                        ariaLabel="copiar"
                        toolTip={{ label: "Copiar", hasArrow: true, bgColor: "vivo.pink", color: "gray.50" }}
                        icon={{ as: FiCopy, color: "gray.600", hoverColor: "vivo.pink", size: 24 }}
                        onClick={() => { copyToClipBoard(value) }}
                    />
                </HStack>
            </Flex>
        </FormControl>
    );
}