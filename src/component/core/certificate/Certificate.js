import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default ({buyClick, deleteClick, deleteAdminClick, editClick, isUserCertificate, ...props}) => {
    const isUserCertificateClass = isUserCertificate ? 'user-certificate' : '';
    return (
        <div className={'shadow p-3 certificate ' + isUserCertificateClass}>
            <Header date={props.certificate.date} title={props.certificate.title}/>
            <Body tags={props.certificate.tags}
                  description={props.certificate.description}
                  tagClick={props.tagClick}/>
            <Footer
                role={props.role}
                cost={props.certificate.cost}
                userClick={isUserCertificate ? deleteClick : buyClick}
                userButtonText={isUserCertificate ? __("certificate.button.delete") : __("certificate.button.buy")}
                editClick={editClick}
                certificateId={props.certificate.id}
                deleteClick={deleteAdminClick}/>
        </div>
    );
}