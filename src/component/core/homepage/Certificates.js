import React from 'react';
import Certificate from "./certificate/Certificate";

const Certificates = ({userCertificates, certificates, role, loading, tagClick, buyClick, deleteClick, deleteAdminClick}) => {
    if (loading || certificates === undefined) {
        return <h2>Loading...</h2>
    }

    const isUserCertificate = (certificateId) => {
        for (let i=0 ;i<userCertificates.length; i++){
            if (userCertificates[i] === certificateId) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className={"row"}>
            {certificates.map((certificate, index) => {
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
            }
        </div>
    );
};

export default Certificates