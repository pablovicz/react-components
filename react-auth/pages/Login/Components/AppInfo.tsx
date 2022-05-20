import { Flex, Heading, Icon, IconButton, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { BsInfoLg } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { RenderByCondition } from "../../../components/utils/RenderByCondition";


export function AppInfo() {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Flex p="10" flexDir="column" align="start" justify="space-between" maxW={500} h="100%">
            <RenderByCondition condition={!isOpen}>
                <VStack spacing="4" w="100%" pt="14">
                    <Heading fontWeight="bold" fontSize="24" textAlign="left" w="100%" color="gray.500">MONITOR MANAGER</Heading>
                    <Text fontSize="20" textAlign="left" w="100%" color="gray.400">Ferramenta de Gerenciamento de Itens de Monitoramento</Text>
                </VStack>
                <IconButton
                    aria-label="Voltar"
                    colorScheme="blackAlpha"
                    size="sm"
                    onClick={() => onToggle()}
                    icon={<Icon as={BsInfoLg} fontSize="18" />}
                    borderRadius="50%"
                />
            </RenderByCondition>
            <RenderByCondition condition={isOpen}>
                <VStack spacing="2" w="100%" pt="14">
                    <Heading fontWeight="bold" fontSize="24" textAlign="left" w="100%" color="gray.500">Autenticação e autorização</Heading>
                    <Text fontSize="16" textAlign="left" w="100%" color="gray.400">Para acessar a ferramenta, basta usar sua matrícula e senha. Caso não possua acesso, é necessário solicitar a um dos administradores.</Text>
                </VStack>
                <IconButton
                    aria-label="Voltar"
                    colorScheme="blackAlpha"
                    size="sm"
                    onClick={() => onToggle()}
                    icon={<Icon as={FiArrowLeft} fontSize="20" />}
                    borderRadius="50%"
                />
            </RenderByCondition>
        </Flex>
    );
}