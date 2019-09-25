import React, {useState} from 'react';

import {userService} from '../../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../../validation/FormValidation";
import {Header} from "../core/Header";
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
    const [loading, setLoading] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(username && password) || errorFlag) {
            return;
        }
        setLoading(true);
        userService.register(username, password, firstName, lastName)
            .then(
                () => {
                    const {from} = props.location.state || {from: {pathname: "/login"}};
                    // props.history.push(from);
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
                                <label htmlFor="firstName">{__("register.firstName")}</label>
                                <FormInput
                                    required={true}
                                    source={firstName}
                                    setErrorFlag={setErrorFlag}
                                    setSource={setFirstName}
                                    type={'text'}
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        if (valueGreaterOrEqualThan(value.length, 10)) {
                                            return __("register.error.firstNameError");
                                        }
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="lastName">{__("register.lastName")}</label>
                                <FormInput
                                    required={true}
                                    source={lastName}
                                    setSource={setLastName}
                                    setErrorFlag={setErrorFlag}
                                    type={'text'}
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        if (valueGreaterOrEqualThan(value.length, 10)) {
                                            return __("register.error.lastNameError");
                                        }
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="userName">{__("register.userName")}</label>
                                <FormInput
                                    required={true}
                                    source={username}
                                    setSource={setUsername}
                                    setErrorFlag={setErrorFlag}
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
                                    setErrorFlag={setErrorFlag}
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