import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {initReactI18next, useTranslation} from "react-i18next";
import {userService} from '../../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../../validation/FormValidation";
import {Header} from "./part/Header";
import UserContext from './../context/UserContext';
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import ConditionalInvalidFeedback from "../core/form/ConditionalFeedback";
import img from "../../resources/images/welcome.jpg"
import smallLoader from "../../resources/images/smallLoader.gif"

export const LoginPage = (props) => {
    const contextType = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const {t, i18n} = useTranslation(initReactI18next);
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

        if (!(username && password) || !valueLessThan(username.length, 30) || !valueGreaterOrEqualThan(password.length, 4)) {
            return;
        }
        setLoading(true);
        userService.login(username, password)
            .then(
                user => {
                    contextType.createUser(user);
                    const {from} = props.location.state || {from: {pathname: "/"}};
                    props.history.push(from);
                },
                error => {
                    setError(error);
                    setLoading(false)
                }
            );
    };

    return (
        <div>
            <Header/>
            <Container className="row mt-5 p-5">
                <h2>Certificates</h2>
                <div className={"row"}>
                    <div className="col-md-4">
                        <form name="form flex-column-left-space-around" onSubmit={handleSubmit}>
                            <FormGroup>
                                <label htmlFor="username">{t("login")}</label>
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
                                    condition={submitted && !username}
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
                            <div className={'flex-row-between-center'}>
                                <button className="btn btn-lg btn-primary" disabled={loading}>Login</button>
                                <Link className="btn btn-lg btn-primary" disabled={loading} to={'/'}>Back</Link>
                            </div>
                            {loading && <img alt={'Loader'} src={smallLoader}/>}
                            {error && <div className={'alert alert-danger'}>{error}</div>}
                        </form>
                    </div>
                    <div className="col-md-8">
                        <img src={img} alt={'Login image'} className="img-thumbnail img-responsive"/>
                    </div>
                </div>
            </Container>
        </div>
    )
};