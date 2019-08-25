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
            // wrap in timeout to simulate server api call
            // setTimeout(() => {
            // authenticate
            if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                // get parameters from post request
                let params = JSON.parse(opts.body);

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return user details
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
                    // else return error
                    reject('Username or password is incorrect');
                }

                return;
            }

            // get users
            if (url.endsWith('/users') && opts.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security
                // is implemented server side in a real application
                if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('user:user')}`) {
                    resolve({ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                } else {
                    // return 401 not authorised if token is null or invalid
                    resolve({status: 401, text: () => Promise.resolve()});
                }

                return;
            }

            if (url.endsWith('/certificates/all') && opts.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security
                // is implemented server side in a real application
                if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('user:user')}`) {
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
                    // return 401 not authorised if token is null or invalid
                    resolve({status: 401, text: () => Promise.resolve()});
                }

                return;
            }

            // pass through any requests not handled above
            realFetch(url, opts).then(response => resolve(response));

            // }, 500);
        });
    }
}