import { Stack, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { UserCanSee } from "../CanSee";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useLocation } from 'react-router';


import { NavLink } from './NavLink';
import { NavSection } from "./NavSection";

type navLink = {
    title: string;
    icon: ElementType;
    href: string;
    roles?: string[];
};


interface SidebarNavProps {
    sectionsOptions?: {
        navSectionTitle: string;
        sectionPath: string;
        NavLinkList: navLink[];
        roles?: string[];
    }[];
    simpleOptions?: navLink[];
}

const allRoles = ['ROLE_ADMIN', 'ROLE_BUSINESS', 'ROLE_DEV']


export function SidebarNav({ sectionsOptions, simpleOptions }: SidebarNavProps) {

    const { pathname } = useLocation();

    return (
        <Stack spacing="8" align="start" pt="10" pl="8">

            {sectionsOptions && (
                <>
                    <RouterNavLink to="/home">
                        <Text
                            fontWeight="bold"
                            color={pathname === '/home' ? "vivo.pink" : "gray.400"}
                            fontSize="md"
                            cursor="pointer"
                        >
                            HOME
                        </Text>
                    </RouterNavLink>
                    <>
                        {
                            sectionsOptions.map(op => (


                                <UserCanSee key={op.navSectionTitle} roles={!!op.roles ? op.roles : allRoles}>
                                    <NavSection  title={op.navSectionTitle}>
                                        {
                                            op.NavLinkList.map(link => (
                                                !!link.roles ? (

                                                    <NavLink key={link.title} icon={link.icon} href={`${op.sectionPath}${link.href}`}>{link.title}</NavLink>

                                                ) : (
                                                    <NavLink key={link.title} icon={link.icon} href={`${op.sectionPath}${link.href}`}>{link.title}</NavLink>
                                                )
                                            ))
                                        }
                                    </NavSection>
                                </UserCanSee>

                            ))}
                        </>
                </>
            )}

            {simpleOptions && (
                simpleOptions.map(op => (
                    !!op.roles ? (
                        <UserCanSee key={op.title} roles={op.roles}>
                            <NavLink icon={op.icon} href={op.href}>{op.title}</NavLink>
                        </UserCanSee>
                    ) : (
                        <NavLink key={op.title} icon={op.icon} href={op.href}>{op.title}</NavLink>
                    )
                ))
            )}
        </Stack>

    );
}