import { useLocation } from 'react-router-dom';
import { cloneElement, ReactElement } from 'react';
import { NavLink, NavLinkProps } from "react-router-dom";


interface ActiveLinkProps extends NavLinkProps{
    children: ReactElement  //precisa ser um elemento react, component react, necessariamente
    colors: {
        active: {
            color: string;
            hoverColor: string;
            cursor: string;
        } 
        disabled: {
            color: string;
            hoverColor: string;
            cursor: string;
        } 
    }
}


export function ActiveLink({ children, colors, ...rest }: ActiveLinkProps) {

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
                color: isActive ? colors.active.color : colors.disabled.color,
                cursor: isActive ? colors.active.cursor : colors.disabled.cursor,
                _hover: isActive ? { color: colors.active.hoverColor } : { color: colors.disabled.hoverColor },
            })}
        </NavLink>
    );
}