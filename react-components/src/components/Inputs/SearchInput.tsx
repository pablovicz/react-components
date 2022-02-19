import { Input as ChakraInput, HStack, FormControl, FormLabel, Icon, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";


interface SearchInputProps {
    name: string;
    label?: string;
    value?: string;
    onChange: (value: string) => void;
}



export function SearchInput({ label, name, value, onChange }: SearchInputProps) {

    const [focusColor, setFocusColor] = useState("gray.400");
    const [iconSize, setIconSize] = useState("16");

    function handleFocus(focus: boolean = false) {
        if (focus) {
            setFocusColor("vivo.pink");
            setIconSize("18");
        }
        else {
            setFocusColor("gray.400");
            setIconSize("16");
        }
    }

    return (
        <FormControl
            pt="4"
            pb="4"
            w="100%"
            h="100%"
        >
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
                onFocus={() => setFocusColor("vivo.pink")}
                onMouseEnter={() => handleFocus(true)}
                onMouseLeave={() => handleFocus(false)}
            >
                <HStack
                    w="90%"
                    spacing="2"
                    h="90%"
                    align="end"
                >
                    < ChakraInput
                        w="100%"
                        h="100%"
                        name={name}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        variant="unstyled"
                        border="none"
                        size="md"
                        placeholder="buscar"
                        _placeholder={{ color: focusColor }}
                    />
                    <Icon as={FiSearch} fontSize={iconSize} color={focusColor} />

                </HStack>
            </Flex>
        </FormControl>
    );
}