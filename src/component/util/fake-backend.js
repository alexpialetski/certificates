export function configureFakeBackend() {
    let users = [{
        id: 1,
        username: 'user',
        password: 'user',
        firstName: 'UserFirst',
        lastName: 'UserLast',
        role: 'USER'
    },
        {id: 2, username: 'admin', password: 'admin', firstName: 'AdminFirst', lastName: 'AdminLast', role: 'ADMIN'}];
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
                            role: user.role
                        };
                        resolve({ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))});
                    } else {
                        reject('Username or password is incorrect');
                    }
                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (opts.headers && getPriority(opts.headers.role) > 1) {
                        resolve({ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        resolve({status: 401, text: () => Promise.resolve()});
                    }
                    return;
                }

                if (url.endsWith('/certificates/all') && opts.method === 'GET') {
                    const headers = opts.headers;
                    if (headers && getPriority(headers.role) >= 0) {
                        resolve({
                            ok: true,
                            text: () => Promise.resolve(JSON.stringify([
                                {
                                    "id": 1,
                                    "title": "Dita",
                                    "date": "2019-07-08",
                                    "tags": ["computer", "fun"],
                                    "description": "Aliquam sit amet diam in magna bibendum imperdiet.",
                                    "cost": 705
                                },
                                {
                                    "id": 200,
                                    "title": "Abbot",
                                    "date": "2019-03-05",
                                    "tags": ["bread", "bubble", "fun"],
                                    "description": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
                                    "cost": 882
                                }]
                            ))
                        });
                    } else {
                        resolve({status: 401, text: () => Promise.resolve()});
                    }
                    return;
                }

                realFetch(url, opts).then(response => resolve(response));
            }, 500);
        });
    }
}

function getPriority(role) {
    if (role === "ADMIN") {
        return 2;
    } else if (role === "USER") {
        return 1;
    }
    return 0
}