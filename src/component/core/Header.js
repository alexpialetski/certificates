import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ToggleButton from "./header/ToggleButton";
import LeftNavBar from "./header/LeftNavBar";
import NavBarCollapsed from "./header/NavBarCollapsed";
import {isSatisfied, Role} from "../../util/authorization";
import {userService} from "../../service/user.service";

export const Header = (props) => {
    const [redirect, setRedirect] = useState(false);

    const changeLocale = () => {
        this.setState((state) => ({
            locale: state.locale && 'en',
        }));
    };

    const logout = () => {
        props.clearToken();
        props.clearUser();
        userService.logout();
        setRedirect(true);
    };

    const {user} = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-2">
            {redirect && <Redirect to={'/login'}/>}
            <Link className="navbar-brand" to="/">{__("header.logo.label")}</Link>
            <ToggleButton toggleContentId={"navbarSupportedContent"}/>
            <NavBarCollapsed id={"navbarSupportedContent"}>
                <LeftNavBar>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">{__("header.home.label")}<span
                            className="sr-only">(current)</span></Link>
                    </li>
                    {user && isSatisfied(user.roles, Role.ADMIN) &&
                    <li className="nav-item active">
                        <Link className="nav-link"
                              to="/addCertificate">{__("header.addCertificate.label")}<span
                            className="sr-only">(current)</span></Link>
                    </li>}
                </LeftNavBar>
                <div className="navbar-nav m-2">
                    <button className="btn" onChange={changeLocale}>Ru / En</button>
                </div>
                <div className="form-inline my-2 my-lg-0">
                    {user.username && <span
                        className="navbar-brand mb-0 h1">{user.firstName} {user.lastName}</span>
                    }
                </div>

                <div className="form-inline my-2 my-lg-0">
                    {user.username ?
                        <button className="btn btn-primary  my-2 my-sm-0"
                                onClick={logout}>{__("header.logout.label")}</button>
                        :
                        <div className="btn-group">
                            <Link className="btn btn-outline-success my-2 my-sm-0"
                                  to="/login">{__("header.login.label")}</Link>
                            <Link className="btn btn-info ml-2"
                                  to="/register">{__("header.register.label")}</Link>
                        </div>
                    }
                </div>
            </NavBarCollapsed>
        </nav>
    );
};
