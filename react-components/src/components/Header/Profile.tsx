import { Flex, Box, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthProvider";
import { useUserAuth } from "../../services/hooks/useUserAuth";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {

    const { user } = useContext(AuthContext);

    return (
        <Flex align="center">

            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text color="gray.50">{user.userId}</Text>
                </Box>
            )}
            <IconButton
                aria-label='Logout'
                icon={<FiLogOut />}
                variant="unstyled"
                color="gray.50"
                fontSize="20"

            />

        </Flex>
    );
}