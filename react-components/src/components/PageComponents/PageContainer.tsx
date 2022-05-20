import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useAuthentication } from "../../services/hooks/useAuthentication";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { ContainerWithLoading } from "../utils/ContainerWithLoading";



interface PageContainerProps {
    pageHeadTitle?: string;
    children: ReactNode;
}


export function PageContainer({ pageHeadTitle = "Monitor Manager", children }: PageContainerProps) {

    const { isLoading } = useAuthentication();

    document.title = pageHeadTitle;

    return (

            <Flex direction="column" h="100vh" w="100vw" minWidth={680}>
                <Header />
                <ContainerWithLoading isLoading={isLoading} title="Carregando...">
                    <Flex
                        flexDir="row"
                        h="100%"
                        w="100%"
                        overflowX="hidden"
                        overflowY="hidden"
                    >
                        <Sidebar />
                        <Flex
                            w="85vw"
                            //h="calc(100vh - 80px)"
                            h="100%"
                            align="center"
                            flexDirection="column"
                            justifyContent="flex-start"
                            bgColor="gray.50"
                            overflowY="auto"
                            css={{
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    borderRadius: '24px',
                                    background: "#B3B5C6",
                                },
                            }}
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
                </ContainerWithLoading>

            </Flex>
    );
}