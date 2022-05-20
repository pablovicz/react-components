import {
    Table as ChakraTable,
    Thead,
    Tr,
    Th,
    VStack,
    Text
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Pagination } from './Pagination';

import { TableLoading } from "./TableLoading";
import { RenderByCondition } from '../utils/RenderByCondition';


interface TableContainerProps {
    columns: string[];
    noDataMessage?: string;
    isLoading?: boolean;
    isError?: boolean;
    isNoMoreDataError?: boolean;
    children: ReactNode;

}


export function TableContainer({ columns, noDataMessage = "Nenhum dado foi encontrado", isLoading = false, isError = false, isNoMoreDataError = false, children }: TableContainerProps) {



    function handleTableHead() {
        return (
            <ChakraTable size="md" colorScheme="blackAlpha">
                <Thead>
                    <Tr>
                        {columns.map(column => (
                            <Th key={column}>{column.toUpperCase()}</Th>
                        ))}
                    </Tr>
                </Thead>
            </ChakraTable>
        );
    }



    return (
        <>
            {
                isLoading || isError || isNoMoreDataError ? (
                    <VStack spacing="4" mb="12" w="40vw">
                        {handleTableHead()}
                        <RenderByCondition condition={isLoading}>
                            <TableLoading type={{spinner: {loadingText: "Carregando..."}}} />
                        </RenderByCondition>
                        <RenderByCondition condition={isError && !isNoMoreDataError}>
                            <Text color="gray.500" fontSize="16" pt="8" pb="8">
                                Falha ao carregar dados
                            </Text>
                        </RenderByCondition>

                        <RenderByCondition condition={isNoMoreDataError && !isError && !isLoading}>
                            <Text color="gray.500" fontSize="16" pt="8" pb="8" textAlign="center">
                                {noDataMessage}
                            </Text>
                        </RenderByCondition>
                        <Pagination
                            onPageChange={() => { }}
                            registerPerPageValue={5}
                            onRegistersPerPageChange={() => { }}
                            registersPerPage={5}
                            totalCountOfRegisters={0}
                            currentPage={1}
                        />
                    </VStack>

                ) : (
                    <>
                        {children}
                    </>
                )
            }
        </>

    );
}