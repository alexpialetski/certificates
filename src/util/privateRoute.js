import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import UserContext from '../component/context/AppContext';
import {isSatisfied, Role} from "./authorization";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={props => (
                user && isSatisfied(user.roles, Role.ADMIN)
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            )}/>);
};