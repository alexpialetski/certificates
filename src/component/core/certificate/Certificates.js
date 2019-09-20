import React, {useContext, useEffect, useState} from 'react';
import Certificate from "./Certificate";
import HomePageContext from "../../context/HomePageContext";
import {updateAllCertificates, updateAllUserCertificates} from '../../../util/homepage-util'
import AppContext from "../../context/AppContext";
import Sortable from 'react-sortablejs';


const Certificates = () => {
    const homeContext = useContext(HomePageContext);
    const appContext = useContext(AppContext);

    const [groupLeft, setGroupLeft] = useState([]);
    const [groupRight, setGroupRight] = useState([]);

    useEffect(() => {
        appContext.user.username && updateAllUserCertificates(appContext.user, homeContext.setUserCertificates);
        updateAllCertificates(appContext.user, homeContext.setCertificates);
    }, []);

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
            <div className={"grid-two-columns"}>
                <div className="row">
                    <div className="col-sm-6">
                        <Sortable
                            options={{
                                animation: 200,
                                group: {
                                    name: 'shared',
                                    pull: true,
                                    put: true,
                                },
                            }}
                            onChange={(items, sortable, evt) => {
                                const itemId = parseInt(evt.item.attributes["data-id"].value);
                                const {oldIndex, newIndex, type, to} = evt;
                                let {certificates, setCertificates} = homeContext;
                                const certificateWithIndex = findCertificateById(certificates, itemId);
                                if (type === 'update') {
                                    let array = [];
                                    if (newIndex > oldIndex) {
                                        array = certificates.splice(certificateWithIndex.index, 2 * (newIndex - oldIndex) + 1);
                                        changeArray(array);
                                        certificates.splice(certificateWithIndex.index, 0, ...array);
                                    } else {
                                        const indent = oldIndex - newIndex;
                                        array = certificates.splice(certificateWithIndex.index - 2 * indent, 2 * indent + 1);
                                        changeArray(array.reverse());
                                        certificates.splice(certificateWithIndex.index - 2 * indent, 0, ...array.reverse());
                                    }
                                } else {
                                    if (to.id === 'right-column') {
                                        let cpp = homeContext.certificatesPerPage;
                                        let left = certificates.splice(2 * oldIndex, cpp - 2 * oldIndex);
                                        copyArrayUp(left);
                                        certificates.splice(2 * oldIndex, 0, ...left);
                                        let right = certificates.splice(2 * newIndex - 1, cpp % 2 === 0 ? cpp - 2 * newIndex - 1 : cpp - 2 * newIndex);
                                        const temp = left[left.length - 1];
                                        copyArrayUp(right.reverse());
                                        certificates.splice(2 * newIndex - 1, 0, ...right.reverse());
                                        certificates[cpp - 1] = temp;
                                        certificates[2 * newIndex - 1] = certificateWithIndex.certificate;
                                    }
                                }
                                setCertificates([...certificates]);
                            }}
                            id={'left-column'}
                            className="block-list"
                        >
                            {currentCertificates.map((certificate, index) => {
                                if (index % 2 === 0) {
                                    const boolean = isUserCertificate(certificate.id);
                                    return (
                                        <div key={certificate.id} data-id={certificate.id}>
                                            {createCertificate(certificate, boolean, appContext.user.role)}
                                        </div>)
                                }
                            })}
                        </Sortable>
                    </div>
                    <div className="col-sm-6">
                        <Sortable
                            options={{
                                animation: 200,
                                group: {
                                    name: 'shared',
                                    pull: true,
                                    put: true,
                                },
                            }}
                            id={'right-column'}
                            className="block-list"
                            onChange={(items, sortable, evt) => {
                                const itemId = parseInt(evt.item.attributes["data-id"].value);
                                const {oldIndex, newIndex, type, to} = evt;
                                let {certificates, setCertificates} = homeContext;
                                const certificateWithIndex = findCertificateById(certificates, itemId);
                                if (type === 'update') {
                                    let array = [];
                                    if (newIndex > oldIndex) {
                                        array = certificates.splice(certificateWithIndex.index, 2 * (newIndex - oldIndex) + 1);
                                        changeArray(array);
                                        certificates.splice(certificateWithIndex.index, 0, ...array);
                                    } else {
                                        const indent = oldIndex - newIndex;
                                        array = certificates.splice(certificateWithIndex.index - 2 * indent, 2 * indent + 1);
                                        changeArray(array.reverse());
                                        certificates.splice(certificateWithIndex.index - 2 * indent, 0, ...array.reverse());
                                    }
                                } else {
                                    if (to.id === 'left-column') {
                                        let cpp = homeContext.certificatesPerPage;
                                        let right = certificates.splice(2 * oldIndex + 1, cpp - 2 * oldIndex - 1);
                                        copyArrayUp(right);
                                        certificates.splice(2 * oldIndex + 1, 0, ...right);
                                        let left = certificates.splice(2 * newIndex, cpp % 2 === 0 ? cpp - 2 * newIndex - 1 : cpp - 2 * newIndex);
                                        const temp = left[left.length - 1];
                                        copyArrayUp(left.reverse());
                                        certificates.splice(2 * newIndex, 0, ...left.reverse());
                                        certificates[cpp % 2 === 0 ? cpp - 1 : cpp - 2] = temp;
                                        certificates[2 * newIndex] = certificateWithIndex.certificate;
                                    }
                                }
                                setCertificates([...certificates]);
                            }}
                        >
                            {currentCertificates.map((certificate, index) => {
                                if (index % 2 === 1) {
                                    debugger;
                                    const boolean = isUserCertificate(certificate.id);
                                    return (
                                        <div key={certificate.id} data-id={certificate.id}>
                                            {createCertificate(certificate, boolean, appContext.user.role)}
                                        </div>)
                                }
                            })}
                        </Sortable>
                    </div>
                </div>
            </div>
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

function createCertificate(certificate, isUserCertificate, userRole) {
    return (<Certificate
        certificate={certificate}
        isUserCertificate={isUserCertificate}
        tags={certificate.tags}
        role={userRole}
        index={certificate.id}
    />);
}

function changeArray(array) {
    const temp = array[0];
    copyArrayUp(array);
    array[array.length - 1] = temp;
}

function copyArrayUp(array) {
    for (let i = 0; i < array.length - 2; i += 2) {
        array[i] = array[i + 2];
    }
}

function copyArrayDown(array) {
    for (let i = 2; i < array.length; i += 2) {
        array[i] = array[i + 2];
    }
}

export default Certificates