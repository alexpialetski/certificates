import React from 'react';
import Certificate from "./certificate/Certificate";

const Certificates = ({certificates, role, loading, tagClick}) => {
    if (loading || certificates === undefined) {
        return <h2>Loading...</h2>
    }

    return (
        <div className={"row"}>
            {certificates.map((certificate, index) =>
                <Certificate
                    key={certificate.id}
                    certificate={certificate}
                    role={role}
                    tagClick={tagClick}
                />
            )
            }
        </div>
    )
};

function isBought(certificateId) {

}

export default Certificates