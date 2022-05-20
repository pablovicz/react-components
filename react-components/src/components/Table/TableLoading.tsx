import { Flex, HStack, Skeleton, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import { memo, ReactNode } from "react";
import { RenderByCondition } from '../utils/RenderByCondition';
import { range } from '../../utils/utils';


interface TableLoadingProps {
    type?: {
        spinner?: {
            loadingText?: string;
        }
        skeleton?: {
            columns?: number;
            lines: number;
        }
    }
}


function TableLoadingComponent({ type = { spinner: {} } }: TableLoadingProps) {

    function handleColumnsRange(): number[] {
        const columnsSize = !!type.skeleton?.columns ? type?.skeleton?.columns : 1;
        return range(0, columnsSize);
    }

    return (
        <Flex w="70vw" h="30vh" align="center" justify="center">
            <Flex flexDir="column" w="100%" h="100%" align="center" justify="center">

                <RenderByCondition condition={!!type.spinner}>
                    <RenderByCondition condition={!!type.spinner?.loadingText}>
                        <Text fontSize="16" color="vivo.pink">{type.spinner?.loadingText}</Text>
                    </RenderByCondition>
                    <Spinner color='vivo.pink' mt="4" />
                </RenderByCondition>
                <RenderByCondition condition={!!type.skeleton}>
                    <VStack spacing="2" w="60%" h="100%">
                        {
                            range(0, type.skeleton?.lines as number).map(l => (
                                <Stack w="90%" h="35px" key={l}>
                                    {!!type.skeleton?.columns ? (
                                        <HStack spacing="4" >
                                            {
                                                handleColumnsRange().map(c => (
                                                    <Skeleton key={`C${l}${c}`} w="100%" height='35px' startColor='gray.50' endColor='gray.300' />
                                                ))
                                            }
                                        </HStack>
                                    ) : (
                                        <Skeleton w="100%" height='35px' startColor='gray.50' endColor='gray.300' />
                                    )}
                                </Stack>
                            ))
                        }
                    </VStack>
                </RenderByCondition>
            </Flex >
        </Flex>
    );

}


export const TableLoading = memo(TableLoadingComponent, (prevProps, nextProps) => {

    return Object.is(prevProps, nextProps);
});