import { ReactNode } from "react";
import { Flex, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { RenderByCondition } from "./RenderByCondition";
import { BiError } from "react-icons/bi";

interface ContainerWithLoadingProps {
    isLoading: boolean;
    title?: string;
    children: ReactNode | ReactNode[];
    isLoadingError?: boolean;
    loadingErrorMessage?: ReactNode;
}

export function ContainerWithLoading({ isLoading, isLoadingError = false, loadingErrorMessage, title, children }: ContainerWithLoadingProps) {

    return (
        <>
            <RenderByCondition condition={!isLoading && isLoadingError}>
                <Flex flexDir="column" w="100%" h="100%" minH={400} justify="center" align="center" p="5">
                    <Icon as={BiError} fontSize="32" color="gray.400" />
                    {!!loadingErrorMessage ? (loadingErrorMessage) : (
                        <Text fontWeight="bold" fontSize={14} color="gray.400" textAlign="center" mt="2">Erro ao Carregar</Text>
                    )}
                </Flex>

            </RenderByCondition>
            <RenderByCondition condition={isLoading && !isLoadingError}>
                <Flex flexDir="column" w="100%" h="100%" minH={400} justify="center" align="center" p="5">
                    <Spinner color="vivo.pink" size="lg" />
                    <RenderByCondition condition={!!title}>
                        <Text color="vivo.pink" fontSize="18" mt="2">{title}</Text>
                    </RenderByCondition>
                </Flex>
            </RenderByCondition>
            <RenderByCondition condition={!isLoading && !isLoadingError}>
                {children}
            </RenderByCondition>
        </>
    );
}