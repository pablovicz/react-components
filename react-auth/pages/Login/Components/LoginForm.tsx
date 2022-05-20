import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Inputs/Input";
import { useAuthentication } from "../../../services/hooks/useAuthentication";
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    userId: yup.string().required("A matrícula do usuário é obrigatória.").min(7, "A matrícula deve possuir mais que 7 caracteres, no formato A123456."),
    password: yup.string().required("A senha é obrigatória"),
});

interface Login {
    userId: string;
    password: string;
}


export function LoginForm() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState, reset } = useForm<Login>({
        resolver: yupResolver(loginSchema)
    });
    const { signIn } = useAuthentication();


    const handleLogin: SubmitHandler<Login> = async (values, event) => {
        event?.preventDefault();

        setIsSubmitting(true);

        console.log('========== loging in =====================')
        await signIn(values.userId, values.password)
        console.log('========== loging in =====================')
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
                <Heading fontWeight="bold" fontSize="24" textAlign="center" w="100%" color="pink.500">LOGIN</Heading>
                <VStack spacing="6">
                    <Input
                        label="Matrícula"
                        {...register("userId")}
                        error={formState.errors.userId}
                        isDisabled={isSubmitting}
                    />
                    <Input
                        label="Senha"
                        {...register("password")}
                        error={formState.errors.password}
                        type="password"
                        isDisabled={isSubmitting}
                    />
                </VStack>
                <Button
                    colorScheme="pink"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Entrar
                </Button>
            </VStack>
        </Flex>
    );
}