import { ReactNode, useEffect, useState } from "react";
import { User } from "../../types/entities";
import { api } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { useCookies } from '../hooks/useCookies';
import { AuthData, ResetPasswordCheck } from "../../types/app";
import { AxiosError, AxiosResponse } from 'axios';
import { parseCookies } from "nookies";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

type AuthProviderProps = {
    children: ReactNode;
}

let authChannel: BroadcastChannel;


export function AuthProvider({ children }: AuthProviderProps) {

    const { deleteCookie, saveCookie } = useCookies();

    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const localition = useLocation();

    const toast = useToast();

    function signOut() {
        deleteCookie('token');

        if (!!authChannel) {
            authChannel.postMessage('signOut');
        }

        setIsAuthenticated(false);
        navigate('/');

    }

    function handleBroadcastChannelSignOut() {
        deleteCookie('token');
        setIsAuthenticated(false);
    }

    useEffect(() => {
        if (!localition.pathname.includes('reset')) {


            authChannel = new BroadcastChannel('monitor_manager');

            authChannel.onmessage = (message) => {
                switch (message.data) {
                    case 'signOut':
                        handleBroadcastChannelSignOut();
                        break;
                    default:
                        break;
                }
            }
        }
    }, []);


    useEffect(() => {

        if (!localition.pathname.includes('reset')) {

            const { 'monitor-manager.token': token } = parseCookies();

            // console.log(`token: ${token}`)

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            if (!!token) {

                api.get(`/auth/me`)
                    .then(response => {
                        const data = response.data;

                        const userData = {
                            id: data.id,
                            userId: data.userId,
                            email: data.email,
                            permissions: data.permissions,
                            profile: data.profile
                        }

                        setUser(userData);
                        setIsAuthenticated(true);
                        setIsLoading(false);
                        navigate('/home');
                    })
                    .catch(() => {
                        signOut();
                    })
            } else {
                signOut();
                setIsAuthenticated(false);
            }
        }
    }, []);

    async function signIn(userId: string, password: string): Promise<void> {
        console.log('chamou signIn')
        await api.post<AuthData>('/auth', { userId, password }).then((response: AxiosResponse) => {
            if (response.status == 200) {

                const authData = response.data;

                saveCookie('token', authData.token, 1); //1 dia
                console.log('salvou token')

                const userData = {
                    id: authData.id,
                    userId: authData.userId,
                    email: authData.email,
                    permissions: authData.permissions,
                    profile: authData.profile
                }

                setUser(userData);
                console.log('setou user')
                console.log(userData);
                api.defaults.headers['Authorization'] = `Bearer ${authData.token}`;
                setIsLoading(false);
                setIsAuthenticated(true);
                navigate('/home');
            }

        }).catch((err: AxiosError) => {
            const codeError = getCodeErrorFromErrorMessage(err);
            if (codeError == 400) {
                toast({
                    status: 'error',
                    title: `Credenciais Inválidas!`,
                    description: `Matrícula e/ou senha inválida.`,
                    isClosable: true
                });
            } else {
                toast({
                    status: 'error',
                    title: `Erro ao logar`,
                    description: `Por favor, tente novamente mais tarde.`,
                    isClosable: true
                });
            }
        })
    }


    async function checkResetToken(userId: string | undefined, token: string | undefined): Promise<ResetPasswordCheck> {

        if (!!token && !!userId) {

            const tokenInvalid = { userId: userId, token: token, isValid: false }

            const checkResponse = await api.post('/auth/reset/token', { userId, token })
                .then((response: AxiosResponse) => {

                    if (response.status == 200) {

                        const data = response.data;
                        return { token: data.token, userId: data.userId, isValid: true };
                    } else {

                        return tokenInvalid;
                    }
                }).catch(err => {
                    return tokenInvalid;
                });
            console.log(checkResponse);
            return checkResponse;
        } else {

            return { isValid: false };
        }
    }

    async function resetPassword(userId: string, token: string, newPassword: string): Promise<AxiosResponse> {

        // api.defaults.headers['Authorization'] = `Bearer ${token}`;

       return await api.put('/user/reset/password', { userId, password: newPassword, resetToken: token })
            
    }




    function getCodeErrorFromErrorMessage(err: AxiosError): number {
        const errorMessage = err.message.split(' ');
        return Number(errorMessage[errorMessage.length - 1]);
    }


    // useEffect(() => {}, [isAuthenticated]);



    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isLoading, signIn, signOut, checkResetToken, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}