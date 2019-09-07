import React from 'react';
import {Link} from 'react-router-dom';
import UserContext from "../context/AppContext";
import ToggleButton from "./header/ToggleButton";
import LeftNavBar from "./header/LeftNavBar";
import NavBarCollapsed from "./header/NavBarCollapsed";
import {isSatisfied, Role} from "../../util/authorization";
import {userService} from "../../service/user.service";

class Header extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            locale: ''
        };
    }

    changeLocale = () => {
        this.setState((state) => ({
            locale: state.locale && 'en',
        }));
    };

    logout = () => {
        this.context.deleteUser();
        userService.logout();
        window.location.replace('/login');
    };

    render() {
        return (
            <UserContext.Consumer>
                {context => (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-2">
                        <Link className="navbar-brand" to="/">{__("header.logo.label")}</Link>
                        <ToggleButton toggleContentId={"navbarSupportedContent"}/>
                        <NavBarCollapsed id={"navbarSupportedContent"}>
                            <LeftNavBar>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">{__("header.home.label")}<span
                                        className="sr-only">(current)</span></Link>
                                </li>
                                {context.user && isSatisfied(context.user.roles, Role.ADMIN) &&
                                <li className="nav-item active">
                                    <Link className="nav-link"
                                          to="/addCertificate">{__("header.addCertificate.label")}<span
                                        className="sr-only">(current)</span></Link>
                                </li>}
                            </LeftNavBar>
                            <div className="navbar-nav m-2">
                                <button className="btn" onChange={this.changeLocale}>Ru / En</button>
                            </div>
                            <div className="form-inline my-2 my-lg-0">
                                {context.user.username && <span
                                    className="navbar-brand mb-0 h1">{context.user.firstName} {context.user.lastName}</span>
                                }
                            </div>

                            <div className="form-inline my-2 my-lg-0">
                                {context.user.username ?
                                    <button className="btn btn-primary  my-2 my-sm-0"
                                            onClick={this.logout}>{__("header.logout.label")}</button>
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
                )}
            </UserContext.Consumer>
        );
    }
}

export {Header};
