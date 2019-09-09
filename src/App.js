import React, {useEffect, useState} from 'react';
import {LoginPage} from "./component/page/LoginPage";
import UserContext from "./component/context/AppContext";
import {AddCertificatePage} from "./component/page/AddCertificatePage";
import {userService} from "./service/user.service";
import {Loader} from './component/core/Loading';
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import HomePage from "./component/page/HomePage";
import {RegisterPage} from "./component/page/RegisterPage";
import {EditCertificatePage} from "./component/page/EditCertificatePage";
import {PrivateRoute} from "./util/privateRoute";

export default () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            let user = {};

            async function func() {
                return await userService.findById(id, user).then(res => setUser(res)).then(() => setLoading(false));
            }

            const id = localStorage.getItem('id');
            if (id) {
                setLoading(true);
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
            {loading ?
                <Loader/>
                :
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <PrivateRoute exact path="/addCertificate" component={AddCertificatePage}/>
                    <PrivateRoute exact path="/certificates/admin/edit" component={EditCertificatePage}/>
                </Switch>
            }
        </UserContext.Provider>
    )
}
