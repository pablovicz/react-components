import { Box } from "@chakra-ui/react";
import { SidebarNav } from "./SidebarNav";
//import { NavOptions } from "../../routes";


export function Sidebar() {
    return (
        <Box
            as="aside"
            w="15vw"
            minWidth={200}
            //h="calc(100vh - 80px)"
            bgColor="gray.100"
        >
            <SidebarNav sectionsOptions={NavOptions} />
        </Box>
    );
}