import { Flex } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";



export function Header() {

    return (
        <Flex
            as="header"
            width="100vw"
            //maxWidth={1480}
            h="20"  //20*4 = 80px
            marginX="auto"
            paddingX="6"
            align="center"
            bgColor="vivo.purple"
        >
            <Flex
                margin="auto"
                padding="4"
                w="100%"
                justify="space-between"
                align="center"
            >
                <Logo />
                <Profile />
            </Flex>
        </Flex>


    )
}