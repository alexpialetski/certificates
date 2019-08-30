import React from 'react';
import {Route, Switch} from "react-router-dom";
import {PrivateRoute} from "./util/privateRoute";
import HomePage from "./component/page/HomePage";
import {LoginPage} from "./component/page/LoginPage";
import {RegisterPage} from "./component/page/RegisterPage";
import UserContext from "./component/context/UserContext";
import {AddCertificatePage} from "./component/page/AddCertificatePage";
import {EditCertificatePage} from "./component/page/EditCertificatePage";

class CertificateApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.createUser = this.createUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    createUser = (user) => {
        this.setState({user: user});
    };

    deleteUser = () => {
        this.setState({user: {}});
    };

    render() {
        return (
            <UserContext.Provider value={{
                user: this.state.user, createUser: this.createUser, deleteUser: this.deleteUser
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
}

export default CertificateApp;
