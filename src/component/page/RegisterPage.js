import React, {useState} from 'react';

import {userService} from '../../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../../validation/FormValidation";
import {Header} from "./part/Header";
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import ConditionalInvalidFeedback from "../core/form/ConditionalFeedback";
import img from "../../resources/images/register.jpg"
import smallLoader from "../../resources/images/smallLoader.gif"
import ControlButtons from "../core/form/ControlButtons";
import FormInput from "../core/form/FormInput";

export const RegisterPage = (props) => {
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
            setUsernameError(__("register.error.userNameError"));
        } else {
            setUsernameError("");
        }
    };

    const passwordInput = (e) => {
        setPassword(e.target.value);
        const {value} = e.target;
        if (valueLessThan(value.length, 4)) {
            setPasswordError(__("register.error.passwordError"));
        } else {
            setPasswordError("");
        }
    };

    const firstNameInput = (e) => {
        setFirstName(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 10)) {
            setFirstNameError(__("register.error.firstNameError"));
        } else {
            setFirstNameError("");
        }
    };

    const lastNameInput = (e) => {
        setLastName(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 10)) {
            setLastNameError(__("register.error.lastNameError"));
        } else {
            setLastNameError("");
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
                () => {
                    const {from} = props.location.state || {from: {pathname: "/login"}};
                    props.history.push(from);
                });
    };

    return (
        <div>
            <Header/>
            <Container className="row mt-5 p-5">
                <h2>{__("register.register.label")}</h2>
                <div className={"row"}>
                    <div className="col-md-4">
                        <form name="form flex-column-left-space-around" onSubmit={handleSubmit}>
                            <FormGroup>
                                <label htmlFor="username">{__("register.firstName")}</label>
                                <FormInput
                                    onChange={firstNameInput}
                                    source={firstName}
                                    sourceError={firstNameError}
                                    submitted={submitted}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="username">{__("register.lastName")}</label>
                                <FormInput
                                    onChange={lastNameInput}
                                    source={lastName}
                                    sourceError={lastNameError}
                                    submitted={submitted}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="username">{__("register.userName")}</label>
                                <FormInput
                                    onChange={userNameInput}
                                    source={username}
                                    sourceError={usernameError}
                                    submitted={submitted}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="password">{__("register.password")}</label>
                                <FormInput
                                    onChange={passwordInput}
                                    source={password}
                                    sourceError={passwordError}
                                    submitted={submitted}/>
                            </FormGroup>
                            <ControlButtons
                                loading={loading}
                                submitButtonText={__("register.register.button")}
                                fieldsWithData={[username, firstName, lastName, password]}/>
                            {loading && <img alt={'Loader'} src={smallLoader}/>}
                            {error && <div className={'alert alert-danger'}>{error}</div>}
                        </form>
                    </div>
                    <div className="col-md-8">
                        <img src={img} alt={'Register page'} className="img-thumbnail img-responsive"
                             style={{height: '70%'}}/>
                    </div>
                </div>
            </Container>
        </div>
    )
};