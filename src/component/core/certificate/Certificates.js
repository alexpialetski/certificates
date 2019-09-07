import React from 'react';
import Certificate from "./Certificate";

const Certificates = ({userCertificates, certificates, role, tagClick, buyClick, deleteClick, deleteAdminClick}) => {
    const isUserCertificate = (certificateId) => {
        for (let i = 0; i < userCertificates.length; i++) {
            if (userCertificates[i] === certificateId) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className={"grid-two-columns"}>
            {certificates.length ?
                certificates.map((certificate, index) => {
                        const boolean = isUserCertificate(certificate.id);
                        return <Certificate
                            key={certificate.id}
                            certificate={certificate}
                            isUserCertificate={boolean}
                            role={role}
                            tagClick={tagClick}
                            deleteClick={deleteClick}
                            buyClick={buyClick}
                            deleteAdminClick={deleteAdminClick}
                        />
                    }
                )
                :
                <h1 className={'ml-5'}>Nothing here...</h1>
            }
        </div>
    );
};

export default Certificates