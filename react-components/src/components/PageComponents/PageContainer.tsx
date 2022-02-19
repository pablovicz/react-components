import { Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";



interface PageContainerProps {
    pageHeadTitle?: string;
    children: ReactNode;
}


export function PageContainer({ pageHeadTitle = "Portal Dev Fixa", children }: PageContainerProps) {
    return (
        <Flex direction="column" h="100vh" w="100vw">
            <Header />
            <Flex flexDir="row" >
                <Sidebar />
                <Flex
                    width="100vw"
                    h="calc(100vh - 80px)"
                    align="center"
                    flexDirection="column"
                    justifyContent="flex-start"
                    bgColor="gray.50"
                    overflowY="scroll"
                >
                    <Flex
                        flex="1"
                        w="90%"
                        alignItems="center"
                        flexDirection="column"
                        align="center"
                        justifyContent="flex-start"
                        // borderWidth={1}
                        // borderColor="gray.900"
                        mt={["4", "6", "8"]}
                        mb={["4", "6", "8"]}    
                        margin="auto"
                    >
                        {children}
                    </Flex>

                </Flex>
            </Flex>
        </Flex>
    );
}