import React, {useEffect, useState} from 'react'
import ShowErrors from './containers/ShowErrors'
import {userService} from "../service/user.service";
import UserContext from "./context/AppContext";
import {Loader} from "./core/Loading";
import ShowSuccessfulMessages from "./containers/ShowSuccess";
import Header from "./containers/Header";
import {Footer} from "./core/Footer";
import HomePage from "./page/HomePage";

export const App = ({children}) =>{
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            let user = {};

            async function func() {
                return await userService.findById(id, user).then(res => setUser(res)).then(() => setLoading(false));
            }

            const id = localStorage.getItem('id');
            if (id) {
                setLoading(true);
                func();
            }
        },
        []
    )
    ;

    const createUser = (user) => {
        setUser(user);
    };

    const deleteUser = () => {
        setUser({});
    };


    return (
        <UserContext.Provider value={{
            user, createUser, deleteUser
        }}>
            {loading ?
                <Loader/>
                :
                <div className="app">
                    <Header/>
                    <ShowErrors />
                    <ShowSuccessfulMessages/>
                    {children}
                    <Footer/>
                </div>
            }
        </UserContext.Provider>
    )
};


export const Whoops404 = ({ location }) =>
    <div className="whoops-404">
        <h1>Whoops, route not found</h1>
        <p>Cannot find content for {location.pathname}</p>
    </div>;