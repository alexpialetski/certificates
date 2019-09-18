import React, {useContext, useEffect, useState} from 'react';
import {Header} from '../core/Header'
import UserContext from '../context/AppContext';
import HomePageContext from '../context/HomePageContext';
import Container from "../core/Container";
import {ErrorMessage, SuccessMessage} from "../core/messages"
import {certificateService} from "../../service/certificates.service";
import Certificates from "../core/certificate/Certificates";
import {Footer} from "../core/Footer";
import Search from "../core/Search";
import Navigation from "../core/Navigation";

export default () => {
    const appContext = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [userCertificates, setUserCertificates] = useState([]);
    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [certificatesPerPage, setCertificatesPerPage] = useState(2);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <HomePageContext.Provider value={{
            certificates,
            setCertificates,
            currentPage,
            setCurrentPage,
            errorMessage,
            setErrorMessage,
            successMessage,
            setSuccessMessage,
            loading,
            setLoading,
            certificatesPerPage,
            setCertificatesPerPage,
            search,
            setSearch,
            userCertificates,
            setUserCertificates,
            paginate
        }}>
            <div>
                <Header/>
                {errorMessage && <ErrorMessage message={errorMessage} setErrorMessage={setErrorMessage}/>}
                {successMessage &&
                <SuccessMessage message={successMessage} setSuccessMessage={setSuccessMessage}/>}
                <Container className=" mt-5 p-3">
                    <h1 className={'mb-5'}>{__("homePage.label.certificates")}</h1>
                    <Search/>
                    <div className={'m-5 certificates'}>
                        {loading || certificates === undefined ?
                            <h2>{__("homePage.certificates.loading")}</h2>
                            :
                            <Certificates
                                role={appContext.user.roles}
                            />
                        }
                    </div>
                    <Navigation/>
                </Container>
                <Footer/>
            </div>
        </HomePageContext.Provider>
    );
}