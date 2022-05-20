import { AiOutlineAudit, AiOutlineDeploymentUnit } from "react-icons/ai";
import { FiCodepen, FiUserPlus } from "react-icons/fi";
import { MdCode, MdLeaderboard, MdScreenSearchDesktop } from "react-icons/md";
import { RiUserSearchLine } from "react-icons/ri";

export const NavOptions = [
    {
        navSectionTitle: "Monitoramentos",
        sectionPath: "/monitoring",
        NavLinkList: [
            {
                title: "Itens",
                icon: MdScreenSearchDesktop,
                href: "/itens",
            },
            {
                title: "Resultados",
                icon: MdLeaderboard,
                href: "/results",
            },

            {
                title: "API URA",
                icon: FiCodepen,
                href: "/apis",
            },
        ],
        profiles: ['ROLE_BUSINESS', 'ROLE_DEV', 'ROLE_ADMIN']

    },
    {
        navSectionTitle: "Configurações",
        sectionPath: "/config",
        NavLinkList: [
            {
                title: "Integrações",
                icon: AiOutlineDeploymentUnit,
                href: "/integrations",
            },
            {
                title: "Extra Config",
                icon: MdCode,
                href: "/keys",
            },
        ],
        profiles: ['ROLE_DEV', 'ROLE_ADMIN']

    },
    {
        navSectionTitle: "Admin",
        sectionPath: "/admin",
        NavLinkList: [
            {
                title: "Usuários",
                icon: RiUserSearchLine,
                href: "/users",
                profiles: ['ROLE_ADMIN']
            },
            {
                title: "Liberar Acesso",
                icon: FiUserPlus,
                href: "/create",
                profiles: ['ROLE_ADMIN']
            },
            {
                title: "Auditoria",
                icon: AiOutlineAudit,
                href: "/audit",
                profiles: ['ROLE_ADMIN', 'ROLE_DEV', 'ROLE_BUSINESS']
            },
        ],
        profiles: ['ROLE_ADMIN', 'ROLE_DEV', 'ROLE_BUSINESS']

    },
]