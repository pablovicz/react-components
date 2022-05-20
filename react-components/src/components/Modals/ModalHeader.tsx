import { Button, Text, Flex, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FiX } from 'react-icons/fi';
import { ButtonWithConfirmation } from "../Buttons/ButttonWithConfirmation";
import { RenderByCondition } from "../utils/RenderByCondition";


interface ModalHeaderProps {
    title: string;
    closeWithConfirmation?: boolean;
    leftContent?: ReactNode
    onModalClose: () => void;
}



export function ModalHeader({ title, closeWithConfirmation = false, onModalClose, leftContent }: ModalHeaderProps) {

    return (
        <Flex w="100%" flexDir="row" align="center" justify="space-between" margin="auto" pt="4" pb="8">
            <Flex w="20%" align="center" justify="center">
                <RenderByCondition condition={!!leftContent}>
                    {leftContent}
                </RenderByCondition>
            </Flex>
            <Flex w="60%" align="center" justify="center">
                <Text color="vivo.purple" fontSize="24" fontWeight="bold" textAlign="center">{title}</Text>
            </Flex>
            <Flex w="20%" align="center" justify="center">
                {closeWithConfirmation ? (
                    <ButtonWithConfirmation
                        button={
                            <Button
                                variant="unstyled"
                            >
                                <Icon as={FiX} fontSize="24" color="red.600" />
                            </Button>
                        }
                        alertDialogBody="Você tem certeza de que quer descartar todos os dados do formulário?"
                        alertTitle="Descartar Item?"
                        onYesClick={() => onModalClose()}
                    />
                ) : (
                    <Button
                        variant="unstyled"
                        onClick={() => onModalClose()}
                    >
                        <Icon as={FiX} fontSize="24" color="red.600" />
                    </Button>
                )}
            </Flex>
        </Flex>

    );
}