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

// class HomePage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//
//         }
//
//     }
//
//     render() {
//         return (
//             <HomePageContext.Provider value={{
//                 certificates, currentPage, deleteUser
//             }}>
//                 <UserContext.Consumer>
//                     {context => (
//                         <div>
//                             <Header user={context.user}/>
//                             {errorMessage && <ErrorMessage message={errorMessage} setErrorMessage={setErrorMessage}/>}
//                             {successMessage &&
//                             <SuccessMessage message={successMessage} setSuccessMessage={setSuccessMessage}/>}
//                             <Container className=" mt-5 p-3">
//                                 <h1 className={'mb-5'}>{__("homePage.label.certificates")}</h1>
//                                 <div className={"container"}>
//                                     <div className={'row '}>
//                                         <ColumnOfButtons
//                                             items={userActions}
//                                             action={typeOfCertificatesEvent}
//                                             className={'col-md-2 shadow'}
//                                         />
//                                         <div className="active-cyan-3 active-cyan-4 mb-4 col-md-9">
//                                             <input className="form-control" type="search"
//                                                    placeholder={__("homePage.ph.search")}
//                                                    aria-label="Search" onChange={onChange} value={search}/>
//                                         </div>
//                                         <div className="active-cyan-3 active-cyan-4 pl-0 mb-4 col-md-1">
//                                             <input className="btn btn-primary" type="button"
//                                                    aria-label="Search" onClick={() => searchEvent(search)}
//                                                    value={__("homePage.ph.search")}/>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className={'m-5 certificates'}>
//                                     {loading || certificates === undefined ?
//                                         <h2>{__("homePage.certificates.loading")}</h2>
//                                         :
//                                         <Certificates
//                                             userCertificates={userCertificates}
//                                             certificates={currentCertificates}
//                                             setCertificates={setCertificates}
//                                             role={contextType.user.roles}
//                                             tagClick={tagClick}
//                                             buyClick={buyClick}
//                                             deleteClick={deleteClick}
//                                             deleteAdminClick={deleteAdminClick}
//                                         />
//                                     }
//                                 </div>
//                                 <div className={'container'}>
//                                     <div className={'row align-items-center'}>
//                                         <ColumnOfButtons
//                                             items={[2, 25, 50, 100]}
//                                             action={quantityOfCertificates}
//                                             className={'col-md-2 offset-md-1 shadow'}
//                                             check={certificatesPerPage}
//                                         />
//                                         <Pagination
//                                             certificatesPerPage={certificatesPerPage}
//                                             totalCertificates={certificates.length}
//                                             paginate={paginate}
//                                             className={'col-md-7 push-md-2'}
//                                             currentPage={currentPage}/>
//                                     </div>
//                                 </div>
//                             </Container>
//                             <Footer/>
//                         </div>
//                     )}
//                 </UserContext.Consumer>
//             </HomePageContext.Provider>)
//     }
// }

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