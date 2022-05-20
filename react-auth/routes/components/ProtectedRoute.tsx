import { ReactNode, useContext } from "react";
import { Navigate } from "react-router";
import { PagePermissioning } from "../../components/PageComponents/PagePermissioning";
import { AuthContext } from "../../services/contexts/AuthContext";

interface PrivateRouteProps {
    element: ReactNode;
    allowedProfiles: string[];
}

export function ProtectedRoute({ element, allowedProfiles }: PrivateRouteProps) {

    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return (
            <PagePermissioning allowedProfiles={allowedProfiles}>
                {element}
            </PagePermissioning>
        );
    }

    return (
        <Navigate to="/login" />
    );
}