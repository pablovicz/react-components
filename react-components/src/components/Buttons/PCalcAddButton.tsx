import { Button, Icon } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";


interface PCalcAddButtonProps {
    onClick?: (value: any) => void | Promise<void>;
}


export function PCalcAddButton({ onClick }: PCalcAddButtonProps) {
    return (
        <Button
            onClick={onClick}
            bgColor="gray.300"
            color="gray.50"
            _hover={{ bgColor: "vivo.pink" }}
            w={200}
            h={30}
        >
            <Icon as={FiPlus} fontSize="16" color="gray.50" />
        </Button>
    );
}