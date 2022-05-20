import { Stack, Box, Text, VStack, Divider, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { handleFirstRangeValue, handleLastPage, handleNextPages, handlePreviousPages, handleSecondRangeValue } from "../../../services/hooks/usePagination/paginationUtils";
import { SelectInput } from "../../Inputs/SelectInput";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number | undefined;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
    registerPerPageValue: number;
    onRegistersPerPageChange: (registersPerPage: number) => void;
}

const siblingsCount = 1;



export function Pagination({
    totalCountOfRegisters = 0,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange,
    registerPerPageValue,
    onRegistersPerPageChange
}: PaginationProps) {


    const lastPage = handleLastPage(totalCountOfRegisters, registersPerPage)
    const previousPages = handlePreviousPages(currentPage, siblingsCount);
    const nextPages = handleNextPages(currentPage, lastPage, siblingsCount);


    const firstRangeValue = handleFirstRangeValue(currentPage, registersPerPage);
    const secondRangeValue = handleSecondRangeValue(currentPage, registersPerPage, totalCountOfRegisters, firstRangeValue);

    return (
        <VStack spacing="2" w="100%" >
            {totalCountOfRegisters === 0 && (<Flex h="0" w="100%" borderTop="none" borderBottomColor="gray.100" borderBottomWidth="2px" borderBottomStyle="solid" />)}
            <Stack
                direction={["column", "row"]}
                mt="8"
                justifyContent="space-between"
                align="center"
                spacing="6"
                w="90%"
            >
                <Box>
                    {totalCountOfRegisters == 0 ? (
                        <strong><strong>0</strong> - <strong>0</strong> de <strong>0</strong></strong>
                    ) : (
                        <strong><strong>{firstRangeValue}</strong> - <strong>{secondRangeValue}</strong> de <strong>{totalCountOfRegisters}</strong></strong>
                    )}
                </Box>
                <Stack direction="row" spacing="2">
                    {currentPage > (1 + siblingsCount) && (
                        <>
                            <PaginationItem onPageChange={onPageChange} pageNumber={1} />
                            {currentPage > (2 + siblingsCount) && (
                                <Text
                                    color="gray.300"
                                    width="8"
                                    textAlign="center"
                                >
                                    ...
                                </Text>
                            )}
                        </>
                    )}
                    {previousPages.length > 0 && previousPages.map(page => {
                        return <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
                    })}
                    <PaginationItem onPageChange={onPageChange} pageNumber={currentPage} isCurrent />
                    {nextPages.length > 0 && nextPages.map(page => {
                        return <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
                    })}
                    {currentPage + siblingsCount < lastPage && (
                        <>
                            {currentPage + 1 + siblingsCount < lastPage && (
                                <Text
                                    color="gray.300"
                                    width="8"
                                    textAlign="center"
                                >
                                    ...
                                </Text>
                            )}
                            <PaginationItem onPageChange={onPageChange} pageNumber={lastPage} />
                        </>
                    )}
                </Stack>
                <Box>
                    <Box w={100}>
                        <SelectInput
                            name="rowsPerPage"
                            simpleOptions={[5, 10, 15, 20, 25, 30]}
                            _hover={{ bg: "gray.50" }}
                            value={registerPerPageValue}
                            onChange={(event) => onRegistersPerPageChange(Number(event.target.value))}
                            isDisabled={totalCountOfRegisters <= 5}
                        />
                    </Box>
                </Box>

            </Stack>
        </VStack>
    );
}