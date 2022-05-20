import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { ElementType, ReactElement } from "react";
import IconButton from "../Buttons/IconButton";
import { RenderByCondition } from '../utils/RenderByCondition';




interface PageHeaderProps {
    title?: string;
    leftButton?: {
        onClick: (value: any) => void | Promise<void>;
        title: string;
        type: {
            default?: {
                icon: ReactElement;
            }
            iconBtn?: {
                icon: ElementType;
            }
        }
    }
    rightButton?: {
        onClick: (value: any) => void | Promise<void>;
        title: string;
        type: {
            default?: {
                icon: ReactElement;
            }
            iconBtn?: {
                icon: ElementType;
            }
        }
    }
}




export function PageHeader({ title, leftButton, rightButton }: PageHeaderProps) {

    const isWideVersion = useBreakpointValue({
        base: false,
        md: false,
        lg: true
    }) as boolean;

    return (

        <Flex
            flexDir="row"
            w="100%"
            h={120}
            align="center"
            justify="space-between"
            mb="10"
        >
            <Flex
                w="25%"
                align="center"
                justify="center"
            >
                <RenderByCondition condition={!!leftButton}>
                    {!!leftButton?.type.iconBtn ? (
                        <IconButton
                            ariaLabel={leftButton.title}
                            icon={{
                                as: leftButton.type.iconBtn.icon,
                                size: 26,
                                color: "gray.50",
                                bgColor: "vivo.purple",
                                hoverColor: "gray.50"
                            }}
                            onClick={leftButton.onClick}
                            toolTip={{
                                bgColor: "vivo.purple",
                                color: "gray.50",
                                label: leftButton.title,
                                hasArrow: true
                            }}
                        />
                    ) : (
                        <>
                            <RenderByCondition condition={isWideVersion}>
                                <Button
                                    colorScheme="purple"
                                    leftIcon={leftButton?.type.default?.icon}
                                    onClick={leftButton?.onClick}
                                >
                                    {leftButton?.title}
                                </Button>
                            </RenderByCondition>
                            <RenderByCondition condition={!isWideVersion}>
                                <IconButton
                                    ariaLabel={leftButton?.title || ''}
                                    icon={{
                                        as: leftButton?.type.default?.icon.props.as,
                                        size: 26,
                                        color: "gray.50",
                                        bgColor: "vivo.purple",
                                        hoverColor: "gray.50"
                                    }}
                                    onClick={leftButton?.onClick}
                                    toolTip={{
                                        bgColor: "vivo.purple",
                                        color: "gray.50",
                                        label: leftButton?.title || '',
                                        hasArrow: true
                                    }}
                                />
                            </RenderByCondition>
                        </>
                    )
                    }
                </RenderByCondition>
            </Flex>
            <Flex
                w="50%"
                align="center"
                justify="center"
            >
                {!!title && (
                    <Text fontWeight="extrabold" fontSize="24" color="vivo.purple" textAlign="center">{title}</Text>
                )}
            </Flex>
            <Flex
                w="25%"
                align="center"
                justify="center"
            >

                <RenderByCondition condition={!!rightButton}>
                    {!!rightButton?.type.iconBtn ? (
                        <IconButton
                            ariaLabel={rightButton.title}
                            icon={{
                                as: rightButton.type.iconBtn.icon,
                                size: 26,
                                color: "gray.50",
                                bgColor: "vivo.pink",
                                hoverColor: "gray.50"
                            }}
                            onClick={rightButton.onClick}
                            toolTip={{
                                bgColor: "vivo.pink",
                                color: "gray.50",
                                label: rightButton.title,
                                hasArrow: true
                            }}
                        />
                    ) : (
                        <>
                            <RenderByCondition condition={isWideVersion}>
                                <Button
                                    colorScheme="pink"
                                    leftIcon={rightButton?.type.default?.icon}
                                    onClick={rightButton?.onClick}
                                >
                                    {rightButton?.title}
                                </Button>
                            </RenderByCondition>
                            <RenderByCondition condition={!isWideVersion}>
                                <IconButton
                                    ariaLabel={rightButton?.title || ''}
                                    icon={{
                                        as: rightButton?.type.default?.icon.props.as,
                                        size: 26,
                                        color: "gray.50",
                                        bgColor: "vivo.pink",
                                        hoverColor: "gray.50"
                                    }}
                                    onClick={rightButton?.onClick}
                                    toolTip={{
                                        bgColor: "vivo.pink",
                                        color: "gray.50",
                                        label: rightButton?.title || '',
                                        hasArrow: true
                                    }}
                                />
                            </RenderByCondition>
                        </>
                    )
                    }
                </RenderByCondition>
            </Flex>
        </Flex>



    );
}