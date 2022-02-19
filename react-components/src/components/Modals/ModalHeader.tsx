import { Button, Text, Flex, IconButton, Icon, Box } from "@chakra-ui/react";
import { FiX, FiEdit } from 'react-icons/fi';
import { ButtonWithConfirmation } from "../Buttons/ButttonWithConfirmation";


interface ModalHeaderProps {
    title: string;
    onModalClose: () => void;
}



export function ModalHeader({ title, onModalClose }: ModalHeaderProps) {

    return (
        <Flex w="100%" flexDir="row" align="center" justify="space-between" margin="auto" pt="4" pb="8">
            <Flex w="20%" align="center" justify="center"></Flex>
            <Flex w="60%" align="center" justify="center">
                <Text color="vivo.purple" fontSize="24" fontWeight="bold" textAlign="center">{title}</Text>
            </Flex>
            <Flex w="20%" align="center" justify="center">
                <ButtonWithConfirmation
                    button={
                        <Button
                            variant="unstyled"
                        >
                            <Icon as={FiX} fontSize="24" color="red.600"/>
                        </Button>
                    }
                    alertDialogBody="Você tem certeza de que quer descartar todos os dados do formulário?"
                    alertTitle="Descartar Item?"
                    onYesClick={() => onModalClose()}
                />
            </Flex>
        </Flex>

    );
}