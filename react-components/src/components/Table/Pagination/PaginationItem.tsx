import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    pageNumber: number;
    isCurrent?: boolean;
    onPageChange: (page:number) => void;
}


export function PaginationItem({ pageNumber, onPageChange, isCurrent = false }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled={{ bgColor: "vivo.pink", cursor: "default" }}
            >
                {pageNumber}
            </Button>
        );
    }

    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bgColor="gray.400"
            color="gray.50"
            _hover={{ bgColor: 'vivo.purple' }}
            onClick={() => onPageChange(pageNumber)}
        >
            {pageNumber}
        </Button>
    );
}