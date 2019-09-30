import React from 'react'
import {Route} from 'react-router-dom'
import App from '../src/component/containers/Index'
import HomePage from "./component/page/HomePage";
import LoginPage from "./component/containers/LoginPage";
import {RegisterPage} from "./component/page/RegisterPage";
import {PrivateRoute} from "./util/privateRoute";
import {AddCertificatePage} from "./component/page/AddCertificatePage";
import {EditCertificatePage} from "./component/page/EditCertificatePage";
import Switch from "react-router-dom/Switch";

const routes = (
    <App>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <PrivateRoute exact path="/addCertificate" component={AddCertificatePage}/>
            <PrivateRoute exact path="/certificates/admin/edit" component={EditCertificatePage}/>
        </Switch>
    </App>
);

export default routes