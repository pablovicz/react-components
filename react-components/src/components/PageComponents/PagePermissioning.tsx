import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthentication } from "../../services/hooks/useAuthentication";

interface PagePermissioningProps {
    allowedProfiles?: string[];
    children: ReactNode;
}

export function PagePermissioning({ allowedProfiles = ['ROLE_BUSINESS', 'ROLE_DEV', 'ROLE_ADMIN'], children }: PagePermissioningProps) {

    const { user, isAuthenticated } = useAuthentication();

    if (!!user && isAuthenticated) {

        if (allowedProfiles.includes(user?.profile?.name)) {

            return (
                <>
                    {children}
                </>
            );

        } else {

            return (
                <Navigate to='/home'/>
            )
        }
    } else {

        return (
            <Navigate to='/'/>
        )

    }

}