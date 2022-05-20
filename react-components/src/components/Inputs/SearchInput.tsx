import { Input as ChakraInput, HStack, FormControl, FormLabel, Icon, Flex, InputProps } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RenderByCondition } from '../utils/RenderByCondition';

export interface SearchInputProps extends InputProps {
    name: string;
    label?: string;
}

export function SearchInput({ label, name, ...rest }: SearchInputProps) {

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
            <RenderByCondition condition={!!label}>
                <FormLabel
                    htmlFor={name}
                    color="gray.400"
                    _focus={{ color: "vivo.pink" }}
                >
                    {label}
                </FormLabel>
            </RenderByCondition>
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
                        variant="unstyled"
                        border="none"
                        size="md"
                        placeholder="buscar"
                        _placeholder={{ color: focusColor }}
                        {...rest}
                    />
                    <Icon as={FiSearch} fontSize={iconSize} color={focusColor} />

                </HStack>
            </Flex>
        </FormControl>
    );
}