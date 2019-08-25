import React from 'react';

import {userService} from '../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../validation/FormValidation";
import {Header} from "./part/Header";
import UserContext from './../context/UserContext';
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import ConditionalInvalidFeedback from "../core/form/ConditionalFeedback";
import img from "../resources/images/welcome.jpg"
import smallLoader from "../resources/images/smallLoader.gif"

class LoginPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            usernameError: '',
            passwordError: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userNameInput = this.userNameInput.bind(this);
        this.passwordInput = this.passwordInput.bind(this);

    }

    userNameInput(e) {
        this.handleChange(e);
        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 30)) {
            this.setState({usernameError: "Login field length must not be greater than 30 characters."});
        } else {
            this.setState({usernameError: ""});
        }
    }

    passwordInput(e) {
        this.handleChange(e);
        const {value} = e.target;
        if (valueLessThan(value.length, 4)) {
            this.setState({passwordError: "Password length must not be less than 4 characters"});
        } else {
            this.setState({passwordError: ""});
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
        console.log(this.state.password);
    }

    handleSubmit(e) {
        this.setState({submitted: true});
        const {username, password, returnUrl} = this.state;

        if (!(username && password) || !valueLessThan(username.length, 30) || !valueGreaterOrEqualThan(password.length, 4)) {
            return;
        }
        this.setState({loading: true});
        userService.login(username, password)
            .then(
                user => {
                    this.context.createUser(user);
                    const {from} = this.props.location.state || {from: {pathname: "/"}};
                    this.props.history.push(from);
                },
                error => this.setState({error, loading: false})
            );
    }

    render() {
        const {
            username,
            password,
            submitted,
            loading,
            error,
            usernameError,
            passwordError
        } = this.state;
        return (
            <UserContext.Consumer>
                {context => (
                    <div>
                        <Header/>
                        <Container className="row mt-5 p-5">
                            <h2>Certificates</h2>
                            <div className={"row"}>
                            <div className="col-md-6">
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <FormGroup className="col-md-6">
                                        <label htmlFor="username">Login</label>
                                        <input type="text"
                                               className={'form-control' + (submitted && !username || usernameError ? ' is-invalid' : '')}
                                               name="username" value={username}
                                               onChange={this.userNameInput}/>
                                        <ConditionalInvalidFeedback
                                            condition={submitted && !username}
                                            className={'invalid-feedback'}>
                                            Username is required
                                        </ConditionalInvalidFeedback>
                                        <ConditionalInvalidFeedback
                                            condition={submitted && !username}
                                            className={'invalid-feedback'}>
                                            {this.state.usernameError}
                                        </ConditionalInvalidFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                               name="password" value={password}
                                               className={'form-control' + (submitted && !password || passwordError ? ' is-invalid' : '')}
                                               onChange={this.passwordInput}/>
                                        <ConditionalInvalidFeedback
                                            condition={submitted && !password}
                                            className={'invalid-feedback'}>
                                            Password is required
                                        </ConditionalInvalidFeedback>
                                        <ConditionalInvalidFeedback
                                            condition={passwordError}
                                            className={'invalid-feedback'}>
                                            {this.state.passwordError}
                                        </ConditionalInvalidFeedback>
                                    </FormGroup>
                                    <button className="btn btn-primary" disabled={loading}>Login</button>
                                    {loading &&
                                    <img
                                        src={smallLoader}/>
                                    }
                                    {error &&
                                    <div className={'alert alert-danger'}>{error}</div>
                                    }
                                </form>
                            </div>
                            <div className="col-md-6">
                                <img src={img} className="img-thumbnail img-responsive"/>
                            </div>
                            </div>
                        </Container>
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}

export {LoginPage};