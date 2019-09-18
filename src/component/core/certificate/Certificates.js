import React, {useContext, useEffect} from 'react';
import Certificate from "./Certificate";
import {DragDropContext} from "react-beautiful-dnd";
import HomePageContext from "../../context/HomePageContext";
import {updateAllCertificates, updateAllUserCertificates} from '../../../util/homepage-util'
import AppContext from "../../context/AppContext";
import {Droppable} from "react-beautiful-dnd";
import {searchTagClick} from "../../../util/tag-helper";

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

        let certificates = Array.from(homeContext.certificates);
        if (type === 'tags') {
            const home = findCertificateById(homeContext.certificates, parseInt((source.droppableId+'').replace('t','')));
            const foreign = findCertificateById(homeContext.certificates, parseInt((destination.droppableId+'').replace('t','')));

            if (home.index === foreign.index) {
                const newTags = Array.from(home.certificate.tags);
                const oldTag = newTags.splice(source.index, 1);
                newTags.splice(destination.index, 0, oldTag[0]);
                const newCertificate = {
                    ...home.certificate,
                    tags: newTags
                };

                certificates = Array.from(homeContext.certificates);
                certificates.splice(home.index, 1, newCertificate);
                homeContext.setCertificates(certificates);
            } else {
                const homeTags = Array.from(home.certificate.tags);
                const foreignTags = Array.from(foreign.certificate.tags);
                const oldTag = homeTags.splice(source.index, 1);
                foreignTags.splice(destination.index, 0, oldTag[0]);

                const newHomeCertificate = {
                    ...home.certificate,
                    tags: homeTags
                };

                const newForeignCertificate = {
                    ...foreign.certificate,
                    tags: foreignTags
                };

                certificates.splice(home.index, 1, newHomeCertificate);
                certificates.splice(foreign.index, 1, newForeignCertificate);
                homeContext.setCertificates(certificates);
            }
            return;
        }
        const home = findCertificateById(homeContext.certificates, currentCertificates[source.index].id);
        const foreign = findCertificateById(homeContext.certificates, currentCertificates[destination.index].id);
        console.log(source.index);
        console.log(JSON.stringify(home));
        console.log(destination.index);
        console.log(JSON.stringify(foreign));
        certificates.splice(source.index, 1);
        certificates.splice(source.index, 0, foreign.certificate);
        certificates.splice(destination.index, 1);
        certificates.splice(destination.index, 0, home.certificate);
        homeContext.setCertificates(certificates);
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
        homeContext.certificates.length ?
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={"grid-two-columns"}>
                    <Droppable
                        droppableId={'first-column'}
                        type={'column'}>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {
                                    currentCertificates.map((certificate, index) => {
                                        if (index % 2 === 0) {
                                            const boolean = isUserCertificate(certificate.id);
                                            return <Certificate
                                                key={certificate.id}
                                                certificate={certificate}
                                                isUserCertificate={boolean}
                                                tags={certificate.tags}
                                                role={appContext.user.role}
                                                index={certificate.id}
                                                test={index}
                                            />
                                        }
                                    })
                                }
                            </div>
                        )}
                    </Droppable>
                    <Droppable
                        droppableId={'second-column'}
                        type={'column'}>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {
                                    currentCertificates.map((certificate, index) => {
                                        if (index % 2 !== 0) {
                                            const boolean = isUserCertificate(certificate.id);
                                            return <Certificate
                                                key={certificate.id}
                                                certificate={certificate}
                                                isUserCertificate={boolean}
                                                tags={certificate.tags}
                                                role={appContext.user.role}
                                                index={certificate.id}
                                                test={index}
                                            />
                                        }
                                    })
                                }
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            :
            <h1 className={'ml-5'}>Nothing here...</h1>

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