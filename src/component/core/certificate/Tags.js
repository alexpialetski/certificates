import React from 'react';
import Tag from "./Tag";
import Sortable from "react-sortablejs";

export default ({tags, tagClick, certificateId}) => {
    return (
        <Sortable
            options={{
                animation: 200,
                group: {
                    name: 'tags',
                    pull: true,
                    put: true,
                },
            }}
            onChange={(order, sortable, evt) => {
                // let {certificates, setCertificates} = homePage;
                // if (evt.type === 'update') {
                //     const certificateWithIndex = findCertificateById(certificates, parseInt(evt.from.id));
                //     const tags = [...order];
                //     const newCertificate = {
                //         ...certificateWithIndex.certificate,
                //         tags
                //     };
                //     certificates.splice(certificateWithIndex.index, 1, newCertificate);
                //     setCertificates([...certificates]);
                //     return;
                // }
                // let certificate = {};
                // if (evt.from === sortable.el) {
                //     certificate = findCertificateById(certificates, parseInt(evt.from.id));
                // } else {
                //     certificate = findCertificateById(certificates, parseInt(evt.to.id));
                // }
                //
                // const newCertificate = {
                //     ...certificate.certificate,
                //     tags: [...order]
                // };
                //
                // if (event.ctrlKey && evt.from === sortable.el) {
                //     return;
                // }
                // certificates.splice(certificate.index, 1, newCertificate);
                // setCertificates([...certificates]);

            }}
            id={certificateId}
            // className="block-list"
            style={flex}
        >
            {tags.map((tag, index) => {
                return <Tag key={index} data-id={tag} tagId={tag} tagName={tag} action={tagClick}/>
            })}
        </Sortable>
    )
}

function findCertificateById(certificates, id) {
    for (let i = 0; i < certificates.length; i++) {
        if (certificates[i].id === id) {
            return {certificate: certificates[i], index: i};
        }
    }
}

const flex = {
    display: 'flex',
    minHeight: '70px'
};