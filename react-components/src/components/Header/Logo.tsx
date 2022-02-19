import { Flex, Icon, Text } from "@chakra-ui/react";

const Logo = require('../../assets/logo.png');

export function Logo() {
    return (
        <Flex
            flexDirection="row"
            align="center"
            justify="center"
        >
            <img src={Logo} alt='Vivo' width={60} height={40}/>
            <Flex flexDir="row" width={50} pl="2">
                <Text color="gray.50" fontSize={36}  fontWeight="500">Seu Site</Text>
            </Flex>
        </Flex>
    );
}