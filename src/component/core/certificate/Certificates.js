import React, {useEffect} from 'react';
import Certificate from "./Certificate";
import Sortable from 'react-sortablejs';

const Certificates = ({certificates, userCertificates, user , updateUserCertificates, paginate, setUpCertificates}) => {
    useEffect(() => {
        user.username && updateUserCertificates(user);
        setUpCertificates();
    }, []);

    const isUserCertificate = (certificateId) => {
        return userCertificates[certificateId] !== undefined;
    };

    return (
        certificates.length ?
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
                            }}
                            id={'left-column'}
                            className="block-list"
                        >
                            {certificates.map((certificate, index) => {
                                if (index % 2 === 0) {
                                    const boolean = isUserCertificate(certificate._id);
                                    return (
                                        <div key={certificate._id} data-id={certificate._id}>
                                            {createCertificate(certificate, boolean, user.role)}
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
                            }}
                        >
                            {certificates.map((certificate, index) => {
                                if (index % 2 === 1) {
                                    const boolean = isUserCertificate(certificate._id);
                                    return (
                                        <div key={certificate._id} data-id={certificate._id}>
                                            {createCertificate(certificate, boolean, user.roles)}
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
        index={certificate._id}
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