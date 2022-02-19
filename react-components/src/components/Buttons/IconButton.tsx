import { ReactElement, ElementType } from 'react';
import { IconButton as ChakraIconButton, Tooltip, Icon } from '@chakra-ui/react';

interface IconButtonProps {
    onClick?: (value: any) => void | Promise<void>;
    ariaLabel: string;
    toolTip?: {
        label: string;
        bgColor: string;
        color: string;
        hasArrow?: boolean;
    };
    icon: {
        as: ElementType;
        size?: number;
        color: string;
        hoverColor: string;
    };
}



export default function IconButton({ onClick, ariaLabel, toolTip, icon }: IconButtonProps) {
    return (
        <>
            {!!toolTip ? (
                <Tooltip hasArrow label={toolTip.label} bg={toolTip.bgColor} color={toolTip.color}>
                    <ChakraIconButton
                        aria-label={ariaLabel}
                        onClick={onClick}
                        icon={<Icon as={icon.as} />}
                        color={icon.color}
                        _hover={{ color: icon.hoverColor }}
                        //variant="unstyled"
                        bg="gray.50"
                        _focus={{ border: "none" }}
                    />
                </Tooltip>

            ) : (
                <ChakraIconButton
                    aria-label={ariaLabel}
                    onClick={onClick}
                    icon={<Icon as={icon.as} />}
                    color={icon.color}
                    _hover={{ color: icon.hoverColor }}
                    //variant="unstyled"
                    bg="gray.50"
                    _focus={{ border: "none" }}
                />
            )
            }
        </>
    );
}