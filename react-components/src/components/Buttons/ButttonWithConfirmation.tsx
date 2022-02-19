import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Tooltip, useDisclosure } from "@chakra-ui/react";
import { cloneElement, ReactElement, ReactNode, useRef, useState } from "react";


interface CancelButtonProps {
    onYesClick: (() => Promise<void>) | (() => void);
    alertTitle: string;
    alertDialogBody: string | ReactNode;
    button: ReactElement;
    toolTip?: {
        label: string;
        color: string;
        hasArrow: boolean
    };
}


export function ButtonWithConfirmation({ onYesClick, button, alertTitle, alertDialogBody, toolTip }: CancelButtonProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);


    async function handleDoubleConfirmation(){
        setIsSubmitting(true);
        await onYesClick();
        onClose();
    }

    return (
        <>
            {toolTip ? (
                <Tooltip hasArrow={toolTip.hasArrow} bg={toolTip.color} label={toolTip.label}>
                    {cloneElement(button, {onClick: onOpen})}
                </Tooltip>
            ) : (
                cloneElement(button, { onClick: onOpen })
            )}

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{alertTitle}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {alertDialogBody}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose} isDisabled={isSubmitting}>
                            Não
                        </Button>
                        <Button colorScheme='purple' ml={3} onClick={() => handleDoubleConfirmation()} isLoading={isSubmitting}>
                            Sim
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}