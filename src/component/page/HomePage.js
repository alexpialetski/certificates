import React, {useContext, useEffect, useState} from 'react';
import {Header} from './part/Header'
import UserContext from '../context/AppContext';
import Container from "../core/Container";
import {ErrorMessage, SuccessMessage} from "../core/messages"
import {sortCertificatesByDate} from "../../util/comparators"
import {filterCertificateByTag, filterCertificateByTitle} from "../../util/filters"
import {certificateService} from "../../service/certificates.service";
import ColumnOfButtons from "../core/homepage/ColumnOfButtons";
import Pagination from "../core/homepage/pagination/Pagination";
import Certificates from "../core/homepage/Certificates";
import {Footer} from "./part/Footer";

export default () => {
    const contextType = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [search, setSearch] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [userCertificates, setUserCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [certificatesPerPage, setCertificatesPerPage] = useState(2);

    useEffect(() => {
        contextType.user.username && getAllUserCertificates();
        getAllCertificates();
    }, []);

    const typeOfCertificatesEvent = e => {
        if (e.target.value === __("homePage.label.all")) {
            setSearch('');
            getAllCertificates();
        } else if (e.target.value === __("homePage.label.onlyMy")) {
            const isUserCertificate = (certificateId) => {
                for (let i = 0; i < userCertificates.length; i++) {
                    if (userCertificates[i] === certificateId) {
                        return true;
                    }
                }
                return false;
            };

            const array = [];
            for (let i = 0; i < certificates.length; i++) {
                if (isUserCertificate(certificates[i].id)) {
                    array.push(certificates[i]);
                }
            }
            setCertificates(array);
            setCurrentPage(1);
        }
    };

    const quantityOfCertificates = e => {
        setCurrentPage(1);
        setCertificatesPerPage(parseInt(e.target.value));
    };

    const searchEvent = (searchWords) => {
        const filterObject = {};
        const tags = [];
        const searchValues = searchWords.match(/((#\(\S+( \S+)?\)\S)|(\S+))/gi);
        if (!searchValues) {
            getAllCertificates();
            return;
        }
        searchValues.forEach(value => {
            if (value.indexOf('#') === 0 && value.match(/#\(.*\)/).length) {
                tags.push(value.slice(2, -1));
            } else {
                filterObject.title = value;
            }
        });
        if (tags.length) {
            filterObject.tags = tags;
        }
        searchByFilters(filterObject);
    };

    const tagClick = (e) => {
        setSearch(search + ' #(' + e.target.value + ')');
    };

    const searchByFilters = async (filterObject) => {
        setLoading(true);
        const arrayOfFilters = [];
        filterObject.title && arrayOfFilters.push((filterCertificateByTitle(filterObject.title)));
        filterObject.tags && filterObject.tags.forEach(tag => arrayOfFilters.push(filterCertificateByTag(tag)));
        await certificateService.searchByMultipleFilters(contextType.user, arrayOfFilters)
            .then(res => setCertificates(res.sort(sortCertificatesByDate))).then(() => paginate(1));
        setLoading(false);
    };

    const getAllUserCertificates = async () => {
        await certificateService.getUserCertificates(contextType.user)
            .then(res => setUserCertificates([...res]));
    };

    const getAllCertificates = async () => {
        setLoading(true);
        await certificateService.getAll(contextType.user).then(res => setCertificates(res.sort(sortCertificatesByDate)));
        setLoading(false);
    };

    const onChange = e => {
        setSearch(e.target.value);
        searchEvent(e.target.value);
    };

    const buyClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.buy"))) {
            setLoading(true);
            await certificateService.buy(parseInt(certificateId), contextType.user)
                .then(message => setSuccessMessage(message))
                .catch(error => setErrorMessage(error))
                .then(async res => {
                    await getAllUserCertificates();
                    setLoading(false);
                });
        }
    };

    const deleteClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.user.delete"))) {
            setLoading(true);
            await certificateService.deleteUserCertificate(parseInt(certificateId), contextType.user)
                .then(message => setSuccessMessage(message))
                .catch(error => setErrorMessage(error))
                .then(async () => {
                    await getAllUserCertificates();
                    await getAllCertificates();
                    setLoading(false);
                });
        }
    };

    const deleteAdminClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.admin.delete"))) {
            setLoading(true);
            await certificateService.deleteAdminCertificate(parseInt(certificateId), contextType.user)
                .then(message => setSuccessMessage(message))
                .catch(error => setErrorMessage(error))
                .then(async () => {
                    await getAllCertificates();
                    await getAllUserCertificates();
                    setLoading(false);
                });
        }
    };

    const indexOfLastCertificate = currentPage * certificatesPerPage;
    const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
    const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    let userActions = [__("homePage.label.all")];
    if (contextType.user.username && userCertificates.length) {
        userActions.push(__("homePage.label.onlyMy"));
    } else {
        userActions = [__("homePage.label.all")];
    }
    return (
        <UserContext.Consumer>
            {context => (
                <div>
                    <Header user={context.user}/>
                    {errorMessage && <ErrorMessage message={errorMessage} setErrorMessage={setErrorMessage}/>}
                    {successMessage && <SuccessMessage message={successMessage} setSuccessMessage={setSuccessMessage}/>}
                    <Container className=" mt-5 p-3">
                        <h1 className={'mb-5'}>{__("homePage.label.certificates")}</h1>
                        <div className={"container"}>
                            <div className={'row '}>
                                <ColumnOfButtons
                                    items={userActions}
                                    action={typeOfCertificatesEvent}
                                    className={'col-md-2 shadow'}
                                />
                                <div className="active-cyan-3 active-cyan-4 mb-4 col-md-9">
                                    <input className="form-control" type="search" placeholder={__("homePage.ph.search")}
                                           aria-label="Search" onChange={onChange} value={search}/>
                                </div>
                                <div className="active-cyan-3 active-cyan-4 pl-0 mb-4 col-md-1">
                                    <input className="btn btn-primary" type="button"
                                           aria-label="Search" onClick={() => searchEvent(search)}
                                           value={__("homePage.ph.search")}/>
                                </div>
                            </div>
                        </div>
                        <div className={'m-5 certificates'}>
                            {loading || certificates === undefined ?
                                <h2>{__("homePage.certificates.loading")}</h2>
                                :
                                <Certificates
                                    userCertificates={userCertificates}
                                    certificates={currentCertificates}
                                    role={contextType.user.roles}
                                    tagClick={tagClick}
                                    buyClick={buyClick}
                                    deleteClick={deleteClick}
                                    deleteAdminClick={deleteAdminClick}
                                />
                            }
                        </div>
                        <div className={'container'}>
                            <div className={'row align-items-center'}>
                                <ColumnOfButtons
                                    items={[2, 25, 50, 100]}
                                    action={quantityOfCertificates}
                                    className={'col-md-2 offset-md-1 shadow'}
                                    check={certificatesPerPage}
                                />
                                <Pagination
                                    certificatesPerPage={certificatesPerPage}
                                    totalCertificates={certificates.length}
                                    paginate={paginate}
                                    className={'col-md-7 push-md-2'}
                                    currentPage={currentPage}/>
                            </div>
                        </div>
                    </Container>
                    <Footer/>
                </div>
            )}
        </UserContext.Consumer>
    );
}