import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        let {user} = props;
        this.state = {
            user,
            users: [],
            locale: ''
        };
        this.changeLocale = this.changeLocale.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
        });
    }

    changeLocale(e){
        console.log(this.state.locale);
        this.setState((state, props) => ({
            locale: state.locale && 'en',
        }));
    };

    render() {
        const {user, users} = this.state;
        return (
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
                            <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <div className="navbar-nav m-2">
                        <button className="btn" onChange={this.changeLocale}>Ru / En</button>
                    </div>
                    <div className="form-inline my-2 my-lg-0">
                        {user && <span className="navbar-brand mb-0 h1">{user.firstName} {user.lastName}</span>
                        }
                    </div>

                    <div className="form-inline my-2 my-lg-0">
                        {user ?
                            <Link className="btn btn-primary  my-2 my-sm-0" to="/login">Logout</Link>
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
        );
    }
}

export {Header};
