import { Flex } from "@chakra-ui/react";
import { AppInfo } from "./Components/AppInfo";
import { LoginForm } from "./Components/LoginForm";


export function Login() {

    return (
        <Flex
            w="100vw"
            h="100vh"
            bgColor="gray.50"
            flexDir="column"
            align="center"
            justify="center"
        >
            <Flex
                flexDir="row"
                align="center"
                justify="space-between"
                w="60vw"
                maxW={1000}
                h="40h"
                maxH={800}
                bgColor="gray.100"
                borderRadius="10px"
            >
                <AppInfo />
                <LoginForm />
            </Flex >
        </Flex >
    );
}