import React from 'react';
import {Route} from "react-router-dom";
import {PrivateRoute} from "./component/util/PrivateRoute";
import {HomePage} from "./component/page/HomePage";
import {LoginPage} from "./component/page/LoginPage";
import {RegisterPage} from "./component/page/RegisterPage";

class CertificateApp extends React.Component {
    render() {
        return (
            <div>
                <PrivateRoute exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
            </div>
        )
    }
}

export default CertificateApp;
