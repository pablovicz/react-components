import { useLocation } from 'react-router-dom';
import { cloneElement, ReactElement } from 'react';
import { NavLink, NavLinkProps } from "react-router-dom";


interface ActiveLinkProps extends NavLinkProps{
    children: ReactElement  //precisa ser um elemento react, component react, necessariamente

}


export function ActiveLink({ children, ...rest }: ActiveLinkProps) {

    const { pathname } = useLocation();

    function handleIsActive() {
        if (pathname === String(rest.to)) {
            return true;
        }
        if (pathname.substring(1).includes(String(rest.to))) {
            return true;
        }

        return false;
    }

    const isActive = handleIsActive();


    return (
        <NavLink {...rest}>
            {cloneElement(children, {
                color: isActive ? 'vivo.pink' : 'gray.400',
                cursor: isActive ? 'none' : 'pointer',
                _hover: isActive ? { color: "vivo.pink" } : { color: "vivo.purple" },
            })}
        </NavLink>
    );
}