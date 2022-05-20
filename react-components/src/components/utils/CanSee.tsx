import { ReactNode } from "react";
import { useUserAuth } from "../../services/hooks/useUserAuth";



interface CanProps {
    children: ReactNode;
    permissions?: string[];
    profiles?: string[];
}

export function UserCanSee({ children, permissions, profiles }: CanProps) {

    const userCanSeeComponent = useUserAuth({ permissions, profiles });

    //console.log(userCanSeeComponent);

    if(!userCanSeeComponent){
        return null;
    }


    return (
        <>
            {children}
        </>
    )
}