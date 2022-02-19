import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps, Flex } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType; // quando passa o nome do componente (RiDashboardLine) e nao sua declaracao (<RiDashboardLine />)
    children: string;
    href: string;
}


export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {

    return (
        <ActiveLink to={href} >
            <ChakraLink
                display="flex"
                align="center"
                justifyContent="center"
                _hover={{ color: "vivo.purple" }}
                {...rest}
            >
                <Flex direction="row" justify="start" align="center" w="100%" pl={["4", "6", "8"]} pr="2">
                    <Icon as={icon} fontSize="20" />
                    <Text ml="4" fontWeight="medium" textAlign="left">{children}</Text>
                </Flex>
            </ChakraLink>
        </ActiveLink>
    );
}