export function authHeader(user) {
    // return authorization header with basic auth credentials
    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}