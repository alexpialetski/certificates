export function filterCertificateByTitle(title) {
    function f(certificate) {
        return certificate.title.toUpperCase().includes(title.toUpperCase());
    }

    return f;
}

export function filterCertificateByTag(tag) {
    function f(certificate) {
        let tags = certificate.tags;
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === tag) {
                return true;
            }
        }
        return false;
    }

    return f;
}