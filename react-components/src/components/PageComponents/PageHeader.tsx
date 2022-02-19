import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { ReactElement } from "react";



interface PageHeaderProps {
    title?: string;
    leftButton?: {
        onClick: (value: any) => void | Promise<void>;
        icon: ReactElement;
        title: string;
    }
    rightButton?: {
        onClick: (value: any) => void | Promise<void>;
        icon: ReactElement;
        title: string;
    }
}




export function PageHeader({ title, leftButton, rightButton }: PageHeaderProps) {

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
                {!!leftButton && (
                    <Button
                        colorScheme="purple"
                        leftIcon={leftButton.icon}
                        onClick={leftButton.onClick}
                    >
                        {leftButton.title}
                    </Button>
                )}
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
                {!!rightButton && (
                    <Button
                        colorScheme="pink"
                        leftIcon={rightButton.icon}
                        onClick={rightButton.onClick}
                    >
                        {rightButton.title}
                    </Button>
                )}
            </Flex>
        </Flex>



    );
}