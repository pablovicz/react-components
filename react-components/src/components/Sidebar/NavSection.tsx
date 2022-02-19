import { Box, Text, Stack } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface NavSectionProps {
    title: string;
    children: ReactNode;
}


export function NavSection({ title, children }: NavSectionProps) {

    return (
        <Box>
                <Text
                    fontWeight="bold"
                    color="gray.400"
                    fontSize="md"
                >
                    {title.toUpperCase()}
                </Text>

            <Stack spacing="4" mt="4" align="stretch">
                {children}
            </Stack>
        </Box>
    );
}