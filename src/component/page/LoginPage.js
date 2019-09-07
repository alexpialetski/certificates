import React, {useContext, useState} from 'react';
import {userService} from '../../service/user.service';
import {valueGreaterOrEqualThan, valueLessThan} from "../../validation/FormValidation";
import {Header} from "../core/Header";
import UserContext from '../context/AppContext';
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import FormInput from "../core/form/FormInput";
import img from "../../resources/images/welcome.jpg"
import smallLoader from "../../resources/images/smallLoader.gif"
import ControlButtons from "../core/form/ControlButtons";

export const LoginPage = (props) => {
    const contextType = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [usernameError, setUsernameError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!(username && password) || usernameError.length || passwordError.length) {
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
                                    sourceError={usernameError}
                                    setSourceError={setUsernameError}
                                    submitted={submitted}
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