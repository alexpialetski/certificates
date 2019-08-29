import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default ({buyClick, deleteClick, deleteAdminClick, editClick, isUserCertificate, ...props}) => {
    const isUserCertificateClass = isUserCertificate ? 'user-certificate' : '';
    return (
        <div className={'col-md-6 shadow p-3 align-items-end ' + isUserCertificateClass}>
            <Header date={props.certificate.date} title={props.certificate.title}/>
            <Body tags={props.certificate.tags}
                  description={props.certificate.description}
                  tagClick={props.tagClick}/>
            <Footer
                role={props.role}
                cost={props.certificate.cost}
                userClick={isUserCertificate ? deleteClick : buyClick}
                userButtonText={isUserCertificate ? 'Delete' : 'Buy'}
                editClick={editClick}
                certificateId={props.certificate.id}
                deleteClick={deleteAdminClick}/>
        </div>
    );
}