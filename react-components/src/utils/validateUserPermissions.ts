import { User } from "../types/entities";

interface ValidateUserPermissionsParams {
    user: User;
    permissions?: string[];
    profiles?: string[];
}


export function validateUserPermissions({ 
    user, permissions=[], profiles=[]
 }: ValidateUserPermissionsParams) {


    if (!!permissions && permissions.length > 0) {
        const hasAllPermissions = permissions.every(permission => {
            return user.permissions.includes(permission);
        })
        if (!hasAllPermissions) {
            return false
        }
    }
    
    if (!!profiles && profiles.length > 0) {
        const hasRole = profiles.some(profile => {
            return user.profile.name.toUpperCase() === profile.toUpperCase();
        })
        if (!hasRole) {
            return false
        }
    }

    return true;
}