import React, {useContext, useEffect} from 'react';
import Certificate from "./Certificate";
import {DragDropContext} from "react-beautiful-dnd";
import HomePageContext from "../../context/HomePageContext";
import {updateAllCertificates, updateAllUserCertificates} from '../../../util/homepage-util'
import AppContext from "../../context/AppContext";

// class Certificates extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             certificates: props.certificates
//         }
//     }
//
//     componentDidMount() {
//
//     }
//
//     isUserCertificate = (certificateId) => {
//         for (let i = 0; i < this.props.userCertificates.length; i++) {
//             if (this.props.userCertificates[i] === certificateId) {
//                 return true;
//             }
//         }
//         return false;
//     };
//
//     findCertificateById = (certificates, id) => {
//         for (let i = 0; i < certificates.length; i++) {
//             if (certificates[i].id === id) {
//                 return {certificate: certificates[i], index: i};
//             }
//         }
//     };
//
//     onDragEnd = result => {
//         const {destination, source, draggableId, type} = result;
//
//         if (!destination) {
//             return;
//         }
//
//         if (destination.droppableId === source.droppableId &&
//             destination.index === source.index) {
//             return;
//         }
//
//         const home = this.findCertificateById(this.state.certificates, source.droppableId);
//         const foreign = this.findCertificateById(this.state.certificates, destination.droppableId);
//
//         if (home.index === foreign.index) {
//             const newTags = Array.from(home.certificate.tags);
//             newTags.splice(source.index, 1);
//             newTags.splice(destination.index, 0, draggableId);
//
//             const newCertificate = {
//                 ...home.certificate,
//                 tags: newTags
//             };
//             this.state.certificates.splice(home.index, 1, newCertificate);
//             debugger;
//             this.setState((prevState) => ({certificates: prevState.certificates}));
//         }
//     };
//
//     // setCertificates([...certificates]);
//
//     render() {
//         return (
//             <DragDropContext onDragEnd={this.onDragEnd}>
//                 <div className={"grid-two-columns"}>
//                     {this.state.certificates.length ?
//                         this.state.certificates.map((certificate, index) => {
//                                 const boolean = this.isUserCertificate(certificate.id);
//                                 return <Certificate
//                                     key={certificate.id}
//                                     certificate={certificate}
//                                     isUserCertificate={boolean}
//                                     role={this.props.role}
//                                     tagClick={this.props.tagClick}
//                                     deleteClick={this.props.deleteClick}
//                                     buyClick={this.props.buyClick}
//                                     deleteAdminClick={this.props.deleteAdminClick}
//                                 />
//                             }
//                         )
//                         :
//                         <h1 className={'ml-5'}>Nothing here...</h1>
//                     }
//                 </div>
//             </DragDropContext>
//         );
//     }
//     ;
// }

const Certificates = () => {
    const homeContext = useContext(HomePageContext);
    const appContext = useContext(AppContext);

    useEffect(() => {
        appContext.user.username && updateAllUserCertificates(appContext.user, homeContext.setUserCertificates);
        updateAllCertificates(appContext.user, homeContext.setCertificates);
    }, []);

    const onDragEnd = result => {
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const home = findCertificateById(homeContext.certificates, source.droppableId);
        const foreign = findCertificateById(homeContext.certificates, destination.droppableId);

        if (home.index === foreign.index) {
            const newTags = Array.from(home.certificate.tags);
            newTags.splice(source.index, 1);
            newTags.splice(destination.index, 0, draggableId);

            const newCertificate = {
                ...home.certificate,
                tags: newTags
            };

            const {certificates} = homeContext;
            certificates.splice(home.index, 1, newCertificate);
            homeContext.setCertificates([...certificates]);
        }
    };

    const isUserCertificate = (certificateId) => {
        const {userCertificates} = homeContext;
        for (let i = 0; i < userCertificates.length; i++) {
            if (userCertificates[i] === certificateId) {
                return true;
            }
        }
        return false;
    };

    const indexOfLastCertificate = homeContext.currentPage * homeContext.certificatesPerPage;
    const indexOfFirstCertificate = indexOfLastCertificate - homeContext.certificatesPerPage;
    const currentCertificates = homeContext.certificates.slice(indexOfFirstCertificate, indexOfLastCertificate);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={"grid-two-columns"}>
                {homeContext.certificates.length ?
                    currentCertificates.map((certificate) => {
                            const boolean = isUserCertificate(certificate.id);
                            return <Certificate
                                key={certificate.id}
                                certificate={certificate}
                                isUserCertificate={boolean}
                                role={appContext.user.role}
                            />
                        }
                    )
                    :
                    <h1 className={'ml-5'}>Nothing here...</h1>
                }
            </div>
        </DragDropContext>
    );
};

function findCertificateById(certificates, id) {
    for (let i = 0; i < certificates.length; i++) {
        if (certificates[i].id === id) {
            return {certificate: certificates[i], index: i};
        }
    }
}


export default Certificates