import React, {useEffect, useState} from 'react'
import ShowErrors from './containers/ShowErrors'
import {userService} from "../service/user.service";
import {Loader} from "./core/Loading";
import ShowSuccessfulMessages from "./containers/ShowSuccess";
import Header from "./containers/Header";
import {Footer} from "./core/Footer";

export const App = ({children, setUser, setToken}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
            async function func() {
                setToken(token);
                return await userService.findByToken(token).then(res => {
                    setUser(res)
                }).then(() => setLoading(false));
            }

            const token = localStorage.getItem('token');
            if (token) {
                setLoading(true);
                func();
            }
        },
        []
    );

    return (
        <div>
            {loading ?
                <Loader/>
                :
                <div className="app">
                    <Header/>
                    <ShowErrors/>
                    <ShowSuccessfulMessages/>
                    {children}
                    <Footer/>
                </div>
            }
        </div>
    )
};


export const Whoops404 = ({location}) =>
    <div className="whoops-404">
        <h1>Whoops, route not found</h1>
        <p>Cannot find content for {location.pathname}</p>
    </div>;