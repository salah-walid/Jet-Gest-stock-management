import AuthGroup from "./AuthGroup";

export default interface UserData{
    id: number | null;
    username: string;
    authGroups: AuthGroup[];
}

export const hasAdminPrivileges = (user: UserData | null): boolean => {
    return user?.authGroups.find(elt => elt.name === "admin") !== undefined
}