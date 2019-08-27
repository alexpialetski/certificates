import React, {useState, useEffect, useContext} from 'react';
import {Header} from './part/Header'
import UserContext from './../context/UserContext';
import Container from "../core/Container";
import {ErrorMessage} from "../core/messages"
import {sortCertificatesByDate} from "../util/comparators"
import {filterCertificateByTitle} from "../util/filters"
import {filterCertificateByTag} from "../util/filters"
import {certificateService} from "../service/certificates.service";
import ColumnOfButtons from "../core/homepage/ColumnOfButtons";
import Pagination from "../core/homepage/Pagination";
import Certificates from "../core/homepage/Certificates";

export default (props) => {
    const contextType = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
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

    const typeOfCertificates = e => {
        if (e.target.value === 'All') {
            setSearch('');
            getAllCertificates();
        } else {
            console.log('Not done yet');
        }
    };

    const quantityOfCertificates = e => {
        setCurrentPage(1);
        setCertificatesPerPage(parseInt(e.target.value));
    };

    const searchEvent = (e) => {
        debugger;
        const filterObject = {};
        const tags = [];
        const searchValues = search.split(' ');
        searchValues.forEach(value => {
            if (value.indexOf('#') === 0) {
                tags.push(value.slice(1));
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
        setSearch(search + ' #' + e.target.value);
    };

    const searchByFilters = async (filterObject) => {
        setLoading(true);
        let res = [];
        const arrayOfFilters = [];
        filterObject.title && arrayOfFilters.push((filterCertificateByTitle(filterObject.title)));
        filterObject.tags && filterObject.tags.forEach(tag => arrayOfFilters.push(filterCertificateByTag(tag)));
        res = await certificateService.searchByMultipleFilters(contextType.user, arrayOfFilters);
        setCertificates(res.sort(sortCertificatesByDate));
        setLoading(false);
    };

    const getAllUserCertificates = async () => {
        setLoading(true);
        const res = await certificateService.getUserCertificates(contextType.user);
        setUserCertificates(res);
    };

    const getAllCertificates = async () => {
        setLoading(true);
        const res = await certificateService.getAll(contextType.user);
        res && setCertificates(res.sort(sortCertificatesByDate));
        setLoading(false);
    };

    const onChange = e => {
        setSearch(e.target.value);
    };

    const buyClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm('Are you sure you want to buy?')) {
            setLoading(true);
            let res = [];
            res = await certificateService.buy(parseInt(certificateId), contextType.user);
            setUserCertificates(res);
            setLoading(false);
        }
    };

    const deleteClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm('Are you sure you want to delete?')) {
            setLoading(true);
            let res = [];
            res = await certificateService.deleteUserCertificate(parseInt(certificateId), contextType.user);
            setUserCertificates(res);
            setLoading(false);
        }
    };

    const deleteAdminClick = () => {
        console.log('deleteAdminClick');
    };

    const editClick = () => {
        console.log('editClick');
    };

    const indexOfLasCertificate = currentPage * certificatesPerPage;
    const indexOfFirstCertificate = indexOfLasCertificate - certificatesPerPage;
    const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLasCertificate);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <UserContext.Consumer>
            {context => (
                <div>
                    <Header user={context.user}/>
                    <ErrorMessage message={errorMessage} className={errorMessage ? '' : 'fade in'}/>
                    <Container className=" mt-5 p-3">
                        <h1 className={'mb-5'}>Certificates</h1>
                        <div className={"container"}>
                            <div className={'row '} style={sticky}>
                                <ColumnOfButtons
                                    items={['All', 'Only my certificates']}
                                    action={typeOfCertificates}
                                    className={'col-md-2 shadow'}
                                />
                                <div className="active-cyan-3 active-cyan-4 mb-4 col-md-9">
                                    <input className="form-control" type="search" placeholder="Search"
                                           aria-label="Search" onChange={onChange} value={search}/>
                                </div>
                                <div className="active-cyan-3 active-cyan-4 pl-0 mb-4 col-md-1">
                                    <input className="btn btn-primary" type="button"
                                           aria-label="Search" onClick={searchEvent} value="Search"/>
                                </div>
                            </div>
                        </div>
                        <div className={'m-5'}>
                            <Certificates
                                userCertificates={userCertificates}
                                certificates={currentCertificates}
                                loading={loading}
                                role={contextType.user.role}
                                tagClick={tagClick}
                                buyClick={buyClick}
                                deleteClick={deleteClick}
                                deleteAdminClick={deleteAdminClick}
                                editClick={editClick}
                            />
                        </div>
                        <div className={'container'}>
                            <div className={'row align-items-center'} style={sticky}>
                                <ColumnOfButtons
                                    items={[1, 2, 50, 100]}
                                    action={quantityOfCertificates}
                                    className={'col-md-2 offset-md-1 shadow'}
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
                </div>
            )}
        </UserContext.Consumer>
    );
}
const sticky = {
    position: 'sticky'
};