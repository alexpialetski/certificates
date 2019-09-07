import React from 'react'
import allCertificate from '../resources/json/certificates'
import user from '../resources/json/users'
import userCertificate from '../resources/json/userCertificates'
import {isSatisfied, Role, specifyRoles} from "./authorization";

export function configureFakeBackend() {
    let users = user;
    let userCertificates = userCertificate;
    let allCertificates = allCertificate;
    let realFetch = window.fetch;

    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                        let params = JSON.parse(opts.body);
                        let filteredUsers = users.filter(user => {
                            return user.username === params.username && user.password === params.password;
                        });

                        if (filteredUsers.length) {
                            let user = filteredUsers[0];
                            let responseJson = {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                roles: specifyRoles(user.role)
                            };
                            localStorage.setItem('id', user.id);
                            resolve({ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))});
                        } else {
                            reject('Username or password is incorrect');
                        }
                        return;
                    }

                    if (url.endsWith('/users/register') && opts.method === 'POST') {
                        let params = JSON.parse(opts.body);
                        const user = {};
                        user.id = users[users.length - 1].id + 1;
                        user.firstName = params.firstName;
                        user.lastName = params.lastName;
                        user.username = params.username;
                        user.password = params.password;
                        user.role = Role.USER;
                        users.push(user);
                        resolve({ok: true, text: () => Promise.resolve()});
                        return;
                    }

                    if (url.endsWith('/users') && opts.method === 'GET') {
                        if (opts.headers && isSatisfied(opts.headers.roles, Role.ADMIN)) {
                            resolve({ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/all') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.ANONYMOUS)) {
                            resolve({
                                ok: true,
                                text: () => Promise.resolve(JSON.stringify(allCertificates))
                            });
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/findById') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.ANONYMOUS)) {
                            resolve({
                                ok: true,
                                text: () => Promise.resolve(JSON.stringify(allCertificates
                                    .filter(certificate => certificate.id === opts.certificateId)[0]))
                            });
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/admin/findById') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.ANONYMOUS)) {
                            let user = users
                                .filter(user => user.id === opts.userId)[0];
                            debugger;
                            let responseJson = {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                roles: specifyRoles(user.role)
                            };
                            resolve({ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))});
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/buy') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.USER)) {
                            userCertificates.push({
                                userId: opts.userId,
                                certificateId: opts.certificateId
                            });
                            resolve({ok: true, text: () => Promise.resolve()});
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/delete') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.USER)) {
                            for (let i = 0; i < userCertificates.length; i++) {
                                if (userCertificates[i].certificateId === opts.certificateId
                                    && userCertificates[i].userId === opts.userId) {
                                    userCertificates.splice(i, 1);
                                }
                            }
                            resolve({ok: true, text: () => Promise.resolve()});
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/admin/delete') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.ADMIN)) {
                            for (let i = 0; i < userCertificates.length; i++) {
                                if (userCertificates[i].certificateId === opts.certificateId) {
                                    userCertificates.splice(i, 1);
                                }
                            }
                            for (let i = 0; i < allCertificates.length; i++) {
                                if (allCertificates[i].id === opts.certificateId) {
                                    allCertificates.splice(i, 1);
                                }
                            }
                            resolve({ok: true, text: () => Promise.resolve()});
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/admin/create') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.ADMIN)) {
                            const certificate = opts.certificate;
                            certificate.id = allCertificates[allCertificates.length - 1].id + 1;
                            certificate.date = new Date().toDateString();
                            allCertificates.push(certificate);
                            resolve({ok: true, text: () => Promise.resolve()});
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/admin/edit') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.ADMIN)) {
                            const certificate = opts.certificate;
                            const oldCertificate = allCertificates
                                .filter(certificate => certificate.id === opts.certificate.id)[0];
                            for (let key in oldCertificate) {
                                oldCertificate[key] = certificate[key];
                            }
                            resolve({ok: true, text: () => Promise.resolve()});
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }

                    if (url.endsWith('/certificates/userCertificates') && opts.method === 'GET') {
                        const headers = opts.headers;
                        if (headers && isSatisfied(headers.roles, Role.USER)) {
                            const result = [];
                            userCertificates.forEach(userCertificate => {
                                if (userCertificate.userId === opts.userId) {
                                    result.push(userCertificate.certificateId);
                                }
                            });
                            resolve({
                                ok: true,
                                text: () => Promise.resolve(JSON.stringify(result))
                            });
                        } else {
                            resolve({status: 401, text: () => Promise.resolve()});
                        }
                        return;
                    }


                    realFetch(url, opts).then(response => resolve(response));
                }, 500);
            }
        );
    }
}