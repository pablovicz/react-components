import { AxiosResponse } from "axios";
import { createContext } from "react";
import { ResetPasswordCheck } from "../../types/app";
import { User } from "../../types/entities";


type AuthContextData = {
    user?: User;
    isAuthenticated: boolean;
    isLoading: boolean;
    signOut: () => void;
    signIn: (userId: string, password: string) => Promise<void>;
    checkResetToken: (userId: string | undefined, token: string | undefined) => Promise<ResetPasswordCheck>;
    resetPassword: (userId: string, token: string, newPassword: string) => Promise<AxiosResponse>;
};


export const AuthContext = createContext({} as AuthContextData);


