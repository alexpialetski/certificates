export function authHeader(user) {
    return user ? {roles: user.roles} : {roles: 'ANONYMOUS'};
}

export function createRoles(role) {
    let roles = ['ANONYMOUS'];
    if (role === 'ADMIN') {
        roles.push('ADMIN', 'USER')
    }
    if (role === 'USER') {
        roles.push('USER');
    }
    return roles;
}

export function isSatisfied(userRoles, role) {
    debugger;
    if (!userRoles) {
        return role === 'ANONYMOUS';
    }
    return userRoles.includes(role);
}