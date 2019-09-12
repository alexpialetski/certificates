import React from 'react';
import Certificate from "./Certificate";
import {DragDropContext} from "react-beautiful-dnd";

class Certificates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            certificates: props.certificates
        }
    }

    isUserCertificate = (certificateId) => {
        for (let i = 0; i < this.props.userCertificates.length; i++) {
            if (this.props.userCertificates[i] === certificateId) {
                return true;
            }
        }
        return false;
    };

    findCertificateById = (certificates, id) => {
        for (let i = 0; i < certificates.length; i++) {
            if (certificates[i].id === id) {
                return {certificate: certificates[i], index: i};
            }
        }
    };

    onDragEnd = result => {
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const home = this.findCertificateById(this.state.certificates, source.droppableId);
        const foreign = this.findCertificateById(this.state.certificates, destination.droppableId);

        if (home.index === foreign.index) {
            const newTags = Array.from(home.certificate.tags);
            newTags.splice(source.index, 1);
            newTags.splice(destination.index, 0, draggableId);

            const newCertificate = {
                ...home.certificate,
                tags: newTags
            };
            this.state.certificates.splice(home.index, 1, newCertificate);
            debugger;
            this.setState((prevState) => ({certificates: prevState.certificates}));
        }
    };

    // setCertificates([...certificates]);

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={"grid-two-columns"}>
                    {this.state.certificates.length ?
                        this.state.certificates.map((certificate, index) => {
                                const boolean = this.isUserCertificate(certificate.id);
                                return <Certificate
                                    key={certificate.id}
                                    certificate={certificate}
                                    isUserCertificate={boolean}
                                    role={this.props.role}
                                    tagClick={this.props.tagClick}
                                    deleteClick={this.props.deleteClick}
                                    buyClick={this.props.buyClick}
                                    deleteAdminClick={this.props.deleteAdminClick}
                                />
                            }
                        )
                        :
                        <h1 className={'ml-5'}>Nothing here...</h1>
                    }
                </div>
            </DragDropContext>
        );
    }
    ;
}

// const Certificates = ({userCertificates, certificates, setCertificates, role, tagClick, buyClick, deleteClick, deleteAdminClick}) => {
//     const isUserCertificate = (certificateId) => {
//         for (let i = 0; i < userCertificates.length; i++) {
//             if (userCertificates[i] === certificateId) {
//                 return true;
//             }
//         }
//         return false;
//     };
//
//     const onDragEnd = result => {
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
//         const home = findCertificateById(certificates, source.droppableId);
//         const foreign = findCertificateById(certificates, destination.droppableId);
//
//         if(home.index === foreign.index){
//             const newTags = Array.from(home.certificate.tags);
//             newTags.splice(source.index, 1);
//             newTags.splice(destination.index, 0, draggableId);
//
//             const newCertificate = {
//                 ...home.certificate,
//                 tags: newTags
//             };
//             certificates.splice(home.index, 1, newCertificate);
//             debugger;
//             setCertificates([...certificates]);
//         }
//     };
//
//     return (
//         <DragDropContext onDragEnd={onDragEnd}>
//             <div className={"grid-two-columns"}>
//                 {certificates.length ?
//                     certificates.map((certificate, index) => {
//                             const boolean = isUserCertificate(certificate.id);
//                             return <Certificate
//                                 key={certificate.id}
//                                 certificate={certificate}
//                                 isUserCertificate={boolean}
//                                 role={role}
//                                 tagClick={tagClick}
//                                 deleteClick={deleteClick}
//                                 buyClick={buyClick}
//                                 deleteAdminClick={deleteAdminClick}
//                             />
//                         }
//                     )
//                     :
//                     <h1 className={'ml-5'}>Nothing here...</h1>
//                 }
//             </div>
//         </DragDropContext>
//     );
// };

// function findCertificateById(certificates, id) {
//     for(let i=0; i<certificates.length; i++){
//         if (certificates[i].id === id) {
//             return {certificate: certificates[i], index: i};
//         }
//     }
// }


export default Certificates