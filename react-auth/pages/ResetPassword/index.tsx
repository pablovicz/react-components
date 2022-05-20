import { Flex, Text, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthentication } from '../../services/hooks/useAuthentication';
import { ContainerWithLoading } from "../../components/utils/ContainerWithLoading";
import { ResetPasswordForm } from './Components/ResetPasswordForm';
import { RenderByCondition } from "../../components/utils/RenderByCondition";
import { ResetPasswordCheck } from "../../types/app";



export function ResetPassword() {

    const { userId: userIdParam, token: tokenParam } = useParams();
    const [isFetching, setIsFetching] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();


    const { checkResetToken } = useAuthentication();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [timeoutCount, setTimeoutCount] = useState(10);
    const [userId, setUserId] = useState('');

    useEffect(() => {

        if (!!tokenParam && !!userIdParam) {

            fetchTokenPermissioning(userIdParam, tokenParam);
        }
    }, []);

    const fetchTokenPermissioning = useCallback(async (user: string, token: string) => {

        await checkResetToken(user, token).then((response: ResetPasswordCheck) => {
            setIsTokenValid(response.isValid);
            if (response.isValid) {
                setUserId(response.userId as string);
                setToken(response.token as string);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setIsLoadingError(true);
            }

        }).catch(err => {
            setIsLoading(false);
            setIsLoadingError(true);
        }).finally(() => {
            setIsFetching(false);
        });

    }, []);



    useEffect(() => {
        if (isLoadingError) {
            const interval = setInterval(() => {
                setTimeoutCount((prevCounter) => prevCounter - 1);
            }, 1000); // 1 second
            return () => clearInterval(interval);
        }
    }, [isLoadingError]);

    useEffect(() => {
        if (timeoutCount === 1) {
            navigate('/');
        }
    }, [timeoutCount]);





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
                flexDir="column"
                align="center"
                justify="center"
                w="60vw"
                maxW={1000}
                h="40h"
                maxH={800}
                bgColor="gray.100"
                borderRadius="10px"
            >
                <ContainerWithLoading
                    isLoading={isLoading || isFetching}
                    isLoadingError={isLoadingError}
                    loadingErrorMessage={
                    <VStack spacing="4"  mt="2">
                        <Text fontWeight="bold" fontSize={16} color="gray.400" textAlign="center">Seu token é inválido ou expirou!</Text>
                        <Text fontWeight="semibold" fontSize={14} color="gray.400" textAlign="center">Por favor solicite o reset de senha novamente ao administrador.</Text>
                    </VStack>
                }
                >
                    <RenderByCondition condition={isTokenValid && !isFetching}>
                        <ResetPasswordForm userId={userId} token={token} />
                    </RenderByCondition>

                </ContainerWithLoading>
                <RenderByCondition condition={isLoadingError}>
                    <VStack spacing="4">
                        <Text fontWeight="semibold" fontSize={14} color="gray.400" textAlign="center">Você será redirecionado em:</Text>
                        <Text fontWeight="semibold" fontSize={14} color="gray.400" textAlign="center">{timeoutCount}</Text>
                    </VStack>
                </RenderByCondition>

            </Flex>
        </Flex>
    );
}