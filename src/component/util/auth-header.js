export function authHeader(user) {
    return user ? {role: user.role} : {role: 'ALL'};
}