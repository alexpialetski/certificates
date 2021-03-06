import React, {useState} from 'react';
import {userService} from '../../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../../validation/FormValidation";
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import FormInput from "../core/form/FormInput";
import img from "../../resources/images/welcome.jpg"
import smallLoader from "../../resources/images/smallLoader.gif"
import ControlButtons from "../core/form/ControlButtons";
import {Redirect} from "react-router-dom";

export const LoginPage = ({setUser, setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(username && password) || errorFlag) {
            return;
        }
        setLoading(true);
        userService.login(username, password)
            .then(
                userWithToken => {
                    localStorage.setItem('token', userWithToken.token);
                    setToken(userWithToken.token);
                    setUser(userWithToken.user);
                    setRedirect(true);
                }
            ).catch(error => {
            setError(error.response.data);
            setLoading(false)
        });
    };

    return (
        <div>
            {redirect && <Redirect to={'/'}/>}
            <Container className="row mt-5 p-5">
                <h2>{__("login.login.label")}</h2>
                <div className={"row"}>
                    <div className="col-md-4">
                        <form name="form flex-column-left-space-around" onSubmit={handleSubmit}>
                            <FormGroup>
                                <label htmlFor="username">{__("login.userName")}</label>
                                <FormInput
                                    required={true}
                                    source={username}
                                    setSource={setUsername}
                                    setErrorFlag={setErrorFlag}
                                    type={'text'}
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        if (valueGreaterOrEqualThan(value.length, 30)) {
                                            return __("login.error.userNameError")
                                        }
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="password">{__("login.password")}</label>
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
                                submitButtonText={__("login.login.button")}
                                fieldsWithData={[username, password]}/>
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