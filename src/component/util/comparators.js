export const sortCertificatesByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (+dateA === +dateB) {
        return 0;
    }
    if (+dateA < +dateB) {
        return -1
    }
    return 1;
};