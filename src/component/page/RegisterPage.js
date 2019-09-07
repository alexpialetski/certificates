import React, {useState} from 'react';

import {userService} from '../../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../../validation/FormValidation";
import {Header} from "./part/Header";
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
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
    const [usernameError, setUsernameError] = useState([]);
    const [firstNameError, setFirstNameError] = useState([]);
    const [lastNameError, setLastNameError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);

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
                                    required={true}
                                    source={firstName}
                                    setSource={setFirstName}
                                    sourceError={firstNameError}
                                    setSourceError={setFirstNameError}
                                    submitted={submitted}
                                    type={'text'}
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        if (valueGreaterOrEqualThan(value.length, 10)) {
                                            return __("register.error.firstNameError");
                                        }
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="username">{__("register.lastName")}</label>
                                <FormInput
                                    required={true}
                                    source={lastName}
                                    setSource={setLastName}
                                    sourceError={lastNameError}
                                    setSourceError={setLastNameError}
                                    submitted={submitted}
                                    type={'text'}
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        if (valueGreaterOrEqualThan(value.length, 10)) {
                                            return __("register.error.lastNameError");
                                        }
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="username">{__("register.userName")}</label>
                                <FormInput
                                    required={true}
                                    source={username}
                                    setSource={setUsername}
                                    sourceError={usernameError}
                                    setSourceError={setUsernameError}
                                    submitted={submitted}
                                    type={'text'}
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        if (valueGreaterOrEqualThan(value.length, 30)) {
                                            return __("register.error.userNameError");
                                        }
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="password">{__("register.password")}</label>
                                <FormInput
                                    required={true}
                                    source={password}
                                    setSource={setPassword}
                                    sourceError={passwordError}
                                    setSourceError={setPasswordError}
                                    submitted={submitted}
                                    type={'password'}
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        if (valueLessThan(value.length, 4)) {
                                            return __("login.error.passwordError")
                                        }
                                    }}/>
                            </FormGroup>
                            <ControlButtons
                                loading={loading}
                                submitButtonText={__("register.register.button")}
                                fieldsWithData={[username, firstName, lastName, password]}/>
                            {loading && <img alt={'Loader'} src={smallLoader}/>}
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