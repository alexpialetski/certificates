import React, {useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import {PrivateRoute} from "./util/privateRoute";
import HomePage from "./component/page/HomePage";
import {LoginPage} from "./component/page/LoginPage";
import {RegisterPage} from "./component/page/RegisterPage";
import UserContext from "./component/context/AppContext";
import {AddCertificatePage} from "./component/page/AddCertificatePage";
import {EditCertificatePage} from "./component/page/EditCertificatePage";
import {userService} from "./service/user.service";
import {certificateService} from "./service/certificates.service";

export default () => {
    const [user, setUser] = useState({});

    useEffect(() => {
            let user = {};

            async function func() {
                return setUser(await userService.findById(id, user));
            }

            const id = localStorage.getItem('id');
            if (id) {
                func();
            }
        },
        []
    )
    ;

    const createUser = (user) => {
        setUser(user);
    };

    const deleteUser = () => {
        setUser({});
    };


    return (
        <UserContext.Provider value={{
            user, createUser, deleteUser
        }}>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <PrivateRoute exact path="/addCertificate" component={AddCertificatePage}/>
                <PrivateRoute exact path="/certificates/admin/edit" component={EditCertificatePage}/>
            </Switch>
        </UserContext.Provider>
    )
}
