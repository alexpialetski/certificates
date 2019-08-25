import React, {useState, useEffect, useContext} from 'react';
import {Header} from './part/Header'
import UserContext from './../context/UserContext';
import Container from "../core/Container";
import {ErrorMessage} from "../core/messages"
import {sortCertificatesByDate} from "../util/comparators"
import {filterCertificateByTitle} from "../util/filters"
import {certificateService} from "../service/certificates.service";
// import styles from "../../css/homePage.css"
import Certificate from "../core/homepage/certificate/Certificate";
import ColumnOfButtons from "../core/homepage/ColumnOfButtons";
import Pagination from "../core/homepage/Pagination";
import Certificates from "../core/homepage/Certificates";

export default (props) => {
    const contextType = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    // const [search, setSearch] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [certificatesPerPage, setCertificatesPerPage] = useState(2);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await certificateService.getAll(contextType.user);
            setCertificates(res.sort(sortCertificatesByDate));
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const typeOfCertificates = e => {
        console.log('typeOfCertificates' + e.target.value);
    };

    const quantityOfCertificates = e => {
        setCurrentPage(1);
        setCertificatesPerPage(parseInt(e.target.value));
    };

    const searchEvent = (e) => {
        const fetchPosts = async () => {
            setLoading(true);
            let res = [];
            if (e.target.value !== '') {
                res = await certificateService.searchByMultipleFilters(contextType.user, [
                    filterCertificateByTitle(e.target.value)
                ]);
            } else {
                res = await certificateService.getAll(contextType.user);
            }
            setCertificates(res.sort(sortCertificatesByDate));
            setLoading(false);
        };

        fetchPosts();
    };

    const tagClick = (e) => {
        searchBytTag(e.target.value);
    };

    const searchBytTag = (tag) => {
        searchByFilters({tags:[tag]});
    };

    const searchByFilters = (filterObject) => {
        const fetchPosts = async () => {
            setLoading(true);
            let res = [];
            const arrayOfFilters = [];
            arrayOfFilters.push(filterObject.title && filterCertificateByTitle(filterObject.title));
            for (let i = 0; i < filterObject.tags.length; i++) {
                arrayOfFilters.push(filterCertificateByTag(filterObject.tags[i]));
            }
            res = await certificateService.searchByMultipleFilters(contextType.user, arrayOfFilters);
            setCertificates(res.sort(sortCertificatesByDate));
            setLoading(false);
        };
        fetchPosts();
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
                    <Container className=" p-3">
                        <h1>Certificates</h1>
                        <div className={"container"}>
                            <div className={'row '} style={sticky}>
                                <ColumnOfButtons
                                    items={['All', 'Only my certificates']}
                                    action={typeOfCertificates}
                                    className={'col-md-2 shadow'}
                                />
                                <div className="active-cyan-3 active-cyan-4 mb-4 col-md-10">
                                    <input className="form-control" type="text" placeholder="Search"
                                           aria-label="Search" onChange={searchEvent}/>
                                </div>
                            </div>
                        </div>
                        <div className={'m-5'}>
                            <Certificates
                                certificates={currentCertificates}
                                loading={loading}
                                role={contextType.user.role}
                                tagClick={tagClick}
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
                                    className={'col-md-7 push-md-2'}/>
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </UserContext.Consumer>
    );
}

// class HomePage extends React.Component {
//     static contextType = UserContext;
//     constructor(props) {
//         super(props);
//         this.state = {
//             errorMessages: 'Hi',
//             search: '',
//             certificates: {loading: true}
//         };
//
//         const [posts, setPosts] = useState([]);
//
//     }
//
//     componentDidMount() {
//         certificateService.getAll(this.context.user).then(certificates => this.setState({certificates}));
//     }
//
//     handleChange = (e) => {
//         const {name, value} = e.target;
//         this.setState({[name]: value});
//         console.log(this.state.password);
//     };
//
//     typeOfCertificates = e =>{
//
//     };
//
//     quantityOfCertificates = e =>{
//
//     };
//
//     render() {
//         const {errorMessages, certificates} = this.state;
//         return (
//             <UserContext.Consumer>
//                 {context => (
//                     <div>
//                         <Header user={this.context.user}/>
//                         <ErrorMessage message={errorMessages} className={errorMessages ? 'fade in' : ''}/>
//                         <Container className=" p-3">
//                             <div className={'row ' + styles.sticky}>
//                                 <h1>Certificates</h1>
//                                 <ColumnOfButtons
//                                     items={['All', 'Only my certificates']}
//                                     action={this.typeOfCertificates}
//                                     className={'col-md-2 shadow'}
//                                 />
//                                 {/*<div className={'col-md-2 shadow' + styles.flexColumn}>*/}
//                                 {/*    <button type="button" className="btn btn-light">All</button>*/}
//                                 {/*    <button type="button" className="btn btn-light">Only my certificates</button>*/}
//                                 {/*</div>*/}
//                                 <div className="active-cyan-3 active-cyan-4 mb-4 col-md-10">
//                                     <input className="form-control" type="text" placeholder="Search"
//                                            aria-label="Search" onChange={this.handleChange}/>
//                                 </div>
//                             </div>
//                             <div>
//                                 {certificates.loading && <em>Loading certificates...</em>}
//                                 {certificates.length &&
//                                 certificates.map((certificate, index) =>
//                                     <Certificate
//                                         key={certificate.id}
//                                         certificate={certificate}
//                                         role={context.user.role}
//                                     />
//                                 )
//                                 }
//                             </div>
//                             <div className={'row ' + styles.sticky}>
//                                 <ColumnOfButtons
//                                     items={[5, 25, 50, 100]}
//                                     action={this.quantityOfCertificates}
//                                     className={'col-md-2 shadow'}
//                                 />
//                             </div>
//                         </Container>
//                     </div>
//                 )}
//             </UserContext.Consumer>
//         );
//     }
// }
//
// export {HomePage};

const sticky = {
    position: '-webkit-sticky',
    position: 'sticky'
};