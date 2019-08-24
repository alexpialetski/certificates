import React from 'react';
import {Link} from 'react-router-dom';
import UserContext from "../../context/UserContext";

class Header extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            locale: ''
        };
    }

    changeLocale = (e) => {
        this.setState((state) => ({
            locale: state.locale && 'en',
        }));
    };

    logout = () => {
        this.context.deleteUser();
    };

    render() {
        return (
            <UserContext.Consumer>
                {context => (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-2">
                        <Link className="navbar-brand" to="#">Certificates</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span
                                        className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
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
                                            onClick={this.logout}>Logout</button>
                                    :
                                    <div className="btn-group">
                                        <Link className="btn btn-outline-success my-2 my-sm-0" to="/login">Login </Link>
                                        <Link className="btn btn-info ml-2"
                                              to="/register">{this.state.locale ? "Регистрация" : "Register"}</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </nav>
                )}
            </UserContext.Consumer>
        );
    }
}

export {Header};
