import { Button, Flex, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Inputs/Input";
import { useAuthentication } from "../../../services/hooks/useAuthentication";
import * as yup from 'yup';
import { AxiosResponse } from 'axios';
import { useNavigate } from "react-router";

const ResetPasswordSchema = yup.object().shape({
    password: yup.string().required("A senha é obrigatória").min(8, 'A senha deve ter no mínimo 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "A senha deve conter no mínimo caracteres maiúsculos, minúsculos, números e caracteres especiais."),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
});

interface ResetPassword {
    password: string;
    password_confirmation: string;
}

interface ResetPasswordFormProps {
    userId: string;
    token: string;
}

export function ResetPasswordForm({ userId, token }: ResetPasswordFormProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const { register, handleSubmit, formState, reset } = useForm<ResetPassword>({
        resolver: yupResolver(ResetPasswordSchema)
    });
    const { resetPassword } = useAuthentication();


    const handleLogin: SubmitHandler<ResetPassword> = async (values, event) => {
        event?.preventDefault();

        setIsSubmitting(true);

        await resetPassword(userId, token, values.password)
        .then((response: AxiosResponse) => {
            console.log(response)
            if (response.status == 202) {
                toast({
                    status: 'success',
                    title: `Senha Alterada com Sucesso!`,
                    description: `${userId} sua senha foi alterada com sucesso, por favor, faça o seu login.`,
                    isClosable: true
                });
            }
        }).catch(err => {
            toast({
                status: 'error',
                title: `Erro ao Alterar Senha`,
                description: `Por favor, solicite um novo reset de senha ao administrador.`,
                isClosable: true
            });
        }).finally(() => {

            navigate('/');
        });;
        setIsSubmitting(false);
    }


    return (
        <Flex
            p="10"
            borderRadius="10px"
            minW={300}
            as="form"
            onSubmit={handleSubmit(handleLogin)}
        >

            <VStack spacing="10" >
                <Heading fontWeight="bold" fontSize="24" textAlign="center" w="100%" color="pink.500">Recadastro de Senha</Heading>
                <VStack spacing="6">
                    <Text textAlign="center" color="vivo.pink" fontSize="20" fontWeight="bold">Olá, {userId}!</Text>
                    <Input
                        label="Senha"
                        type="password"
                        {...register("password")}
                        error={formState.errors.password}
                        isDisabled={isSubmitting}
                    />
                    <Input
                        label="Confirmação de Senha"
                        {...register("password_confirmation")}
                        error={formState.errors.password_confirmation}
                        type="password"
                        isDisabled={isSubmitting}
                    />
                </VStack>
                <Button
                    colorScheme="pink"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Resetar
                </Button>
            </VStack>
        </Flex>
    );
}