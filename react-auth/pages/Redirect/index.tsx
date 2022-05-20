import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../services/contexts/AuthContext";



export function Redirect(){

    const {isAuthenticated} = useContext(AuthContext);

    if (isAuthenticated) {
        return (
            <Navigate to="/home" />
        );
    }
    
    return (
        <Navigate to="/" />
    );
}