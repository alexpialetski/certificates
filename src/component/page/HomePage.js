import React from 'react';
import {Link} from 'react-router-dom';
import {Header} from './part/Header'
import UserContext from './../context/UserContext';
import Container from "../core/Container";

class HomePage extends React.Component {
    static contextType = UserContext;

    render() {
        return (
            <UserContext.Consumer>
                {context => (
                    <div>
                        <Header user={this.context.user}/>
                        <Container className=" p-3">
                            <h1>Hi {this.context.user.firstName}!</h1>
                            <p>
                                <Link to="/login">Logout</Link>
                            </p>
                        </Container>
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}

export {HomePage};