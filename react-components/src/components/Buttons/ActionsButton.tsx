import { HStack } from "@chakra-ui/react";
import { FiCheckCircle, FiEdit2, FiMinusCircle, FiX, FiZoomIn } from "react-icons/fi";
import IconButton from "./IconButton";

type ToolTipProps = {
    label: string;
}

interface ActionsButtonsProps {
    iconsSize?: number;
    okButton?: {
        onClick?: (value: any) => void | Promise<void>;
        toolTip: ToolTipProps
    }
    editButton?: {
        onClick?: (value: any) => void | Promise<void>;
        toolTip: ToolTipProps
    }
    detailButton?: {
        onClick?: (value: any) => void | Promise<void>;
        toolTip: ToolTipProps
    }
    removeButton?: {
        onClick?: (value: any) => void | Promise<void>;
        toolTip: ToolTipProps
    }
    deleteButton?: {
        onClick?: (value: any) => void | Promise<void>;
        toolTip: ToolTipProps
    }
}




export function ActionsButtons({ iconsSize = 20, okButton, editButton, detailButton, removeButton, deleteButton }: ActionsButtonsProps) {
    return (
        <HStack spacing="1" align="center" w="100%" h="100%">
            {!!okButton && !!okButton.onClick && (
                <IconButton
                    ariaLabel={okButton.toolTip.label}
                    toolTip={{ label: okButton.toolTip.label, hasArrow: true, bgColor: "vivo.green", color: "gray.50" }}
                    icon={{ as: FiCheckCircle, color: "vivo.green", hoverColor: "vivo.green", size: iconsSize }}
                    onClick={okButton.onClick}
                />
            )}
            {!!editButton && !!editButton.onClick && (
                <IconButton
                    ariaLabel={editButton.toolTip.label}
                    toolTip={{ label: editButton.toolTip.label, hasArrow: true, bgColor: "vivo.purple", color: "gray.50" }}
                    icon={{ as: FiEdit2, color: "gray.400", hoverColor: "vivo.purple", size: iconsSize }}
                    onClick={editButton.onClick}
                />
            )}
            {!!detailButton && !!detailButton.onClick && (
                <IconButton
                    ariaLabel={detailButton.toolTip.label}
                    toolTip={{ label: detailButton.toolTip.label, hasArrow: true, bgColor: "vivo.purple", color: "gray.50" }}
                    icon={{ as: FiZoomIn, color: "gray.400", hoverColor: "vivo.purple", size: iconsSize }}
                    onClick={detailButton.onClick}
                />
            )}
            {!!removeButton && !!removeButton.onClick && (
                <IconButton
                    ariaLabel={removeButton.toolTip.label}
                    toolTip={{ label: removeButton.toolTip.label, hasArrow: true, bgColor: "red.600", color: "gray.50" }}
                    icon={{ as: FiMinusCircle, color: "red.600", hoverColor: "red.600", size: iconsSize }}
                    onClick={removeButton.onClick}
                />
            )}
            {!!deleteButton && !!deleteButton.onClick && (
                <IconButton
                    ariaLabel={deleteButton.toolTip.label}
                    toolTip={{ label: deleteButton.toolTip.label, hasArrow: true, bgColor: "red.600", color: "gray.50" }}
                    icon={{ as: FiX, color: "red.600", hoverColor: "red.600", size: iconsSize }}
                    onClick={deleteButton.onClick}
                />
            )}
        </HStack>
    );
}