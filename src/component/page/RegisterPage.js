import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";

import {userService} from '../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../validation/FormValidation";
import {Header} from "./part/Header";
import UserContext from './../context/UserContext';
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import ConditionalInvalidFeedback from "../core/form/ConditionalFeedback";
import img from "../resources/images/register.jpg"
import smallLoader from "../resources/images/smallLoader.gif"

export const RegisterPage = (props) => {
    const contextType = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const userNameInput = (e) => {
        setUsername(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 30)) {
            setUsernameError("Login field length must not be greater than 30 characters.");
        } else {
            setUsernameError("");
        }
    };

    const passwordInput = (e) => {
        setPassword(e.target.value);
        const {value} = e.target;
        if (valueLessThan(value.length, 4)) {
            setPasswordError("Password length must not be less than 4 characters");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!(username && password) || usernameError || passwordError || firstNameError || lastNameError) {
            return;
        }
        setLoading(true);
        userService.register(username, password, firstName, lastName)
            .then(
                result => {
                    const {from} = props.location.state || {from: {pathname: "/login"}};
                    props.history.push(from);
                });
    };

    const firstNameInput = (e) => {
        setFirstName(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 10)) {
            setFirstNameError("First name field length must not be greater than 10 characters.");
        } else {
            setFirstNameError("");
        }
    };

    const lastNameInput = (e) => {
        setLastName(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 10)) {
            setLastNameError("Last name field length must not be greater than 30 characters.");
        } else {
            setLastNameError("");
        }
    };

    return (
        <UserContext.Consumer>
            {context => (
                <div>
                    <Header/>
                    <Container className="row mt-5 p-5">
                        <h2>Register</h2>
                        <div className={"row"}>
                            <div className="col-md-4">
                                <form name="form" onSubmit={handleSubmit} style={flexColumnLeftSpaceAround}>
                                    <FormGroup>
                                        <label htmlFor="username">First name</label>
                                        <input type="text"
                                               className={'form-control' + (submitted && !firstName || firstNameError ? ' is-invalid' : '')}
                                               name="username" value={firstName}
                                               onChange={firstNameInput}/>
                                        <ConditionalInvalidFeedback
                                            condition={submitted && !firstName}
                                            className={'invalid-feedback'}>
                                            First name is required
                                        </ConditionalInvalidFeedback>
                                        <ConditionalInvalidFeedback
                                            condition={firstNameError}
                                            className={'invalid-feedback'}>
                                            {firstNameError}
                                        </ConditionalInvalidFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="username">Last name</label>
                                        <input type="text"
                                               className={'form-control' + (submitted && !lastName || lastNameError ? ' is-invalid' : '')}
                                               name="username" value={lastName}
                                               onChange={lastNameInput}/>
                                        <ConditionalInvalidFeedback
                                            condition={submitted && !lastName}
                                            className={'invalid-feedback'}>
                                            Last name is required
                                        </ConditionalInvalidFeedback>
                                        <ConditionalInvalidFeedback
                                            condition={lastNameError}
                                            className={'invalid-feedback'}>
                                            {lastNameError}
                                        </ConditionalInvalidFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="username">Username</label>
                                        <input type="text"
                                               className={'form-control' + (submitted && !username || usernameError ? ' is-invalid' : '')}
                                               name="username" value={username}
                                               onChange={userNameInput}/>
                                        <ConditionalInvalidFeedback
                                            condition={submitted && !username}
                                            className={'invalid-feedback'}>
                                            Username is required
                                        </ConditionalInvalidFeedback>
                                        <ConditionalInvalidFeedback
                                            condition={usernameError}
                                            className={'invalid-feedback'}>
                                            {usernameError}
                                        </ConditionalInvalidFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                               name="password" value={password}
                                               className={'form-control' + (submitted && !password || passwordError ? ' is-invalid' : '')}
                                               onChange={passwordInput}/>
                                        <ConditionalInvalidFeedback
                                            condition={submitted && !password}
                                            className={'invalid-feedback'}>
                                            Password is required
                                        </ConditionalInvalidFeedback>
                                        <ConditionalInvalidFeedback
                                            condition={passwordError}
                                            className={'invalid-feedback'}>
                                            {passwordError}
                                        </ConditionalInvalidFeedback>
                                    </FormGroup>
                                    <div style={flexRowBetweenCenter}>
                                        <button className="btn btn-lg btn-primary" disabled={loading}>Register</button>
                                        <Link className="btn btn-lg btn-primary" disabled={loading} to={'/login'}>Back</Link>
                                    </div>
                                    {loading && <img src={smallLoader}/>}
                                    {error && <div className={'alert alert-danger'}>{error}</div>}
                                </form>
                            </div>
                            <div className="col-md-8">
                                <img src={img} className="img-thumbnail img-responsive" style={{height: '70%'}}/>
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </UserContext.Consumer>
    )
};

const flexColumnLeftSpaceAround = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'space-around'
};

const flexRowBetweenCenter = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
};