export function authHeader(user) {
    return user ? {roles: user.roles} : {roles: Role.ANONYMOUS};
}

export function specifyRoles(role) {
    let roles = [Role.ANONYMOUS];
    if (role === Role.ADMIN) {
        roles.push(Role.ADMIN, Role.USER)
    }
    if (role === Role.USER) {
        roles.push(Role.USER);
    }
    return roles;
}

export function isSatisfied(userRoles, role) {
    if (!userRoles) {
        return role === Role.ANONYMOUS;
    }
    return userRoles.includes(role);
}

export const Role = {
    ANONYMOUS: 'ANONYMOUS',
    USER: 'USER',
    ADMIN: 'ADMIN'
};