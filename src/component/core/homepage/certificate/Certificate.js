import React, {useContext} from 'react';
import styles from "../../../../css/certificate.css"
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import UserContext from '../../../context/UserContext';

export default ({buyClick, deleteClick, deleteAdminClick, editClick, ...props}) => {
    let contextType = useContext(UserContext);

    return (
        <div className={'col-md-6 shadow p-3 align-items-end'} style={props.isUserCertificate ? certificate : undefined}>
            <Header date={props.certificate.date} title={props.certificate.title}/>
            <Body tags={props.certificate.tags}
                  description={props.certificate.description}
                  tagClick={props.tagClick}/>
            <Footer
                role={props.role}
                cost={props.certificate.cost}
                userClick={props.isUserCertificate ? deleteClick : buyClick}
                userButtonText={props.isUserCertificate ? 'Delete' : 'Buy'}
                editClick={editClick}
                certificateId={props.certificate.id}
                deleteClick={deleteAdminClick}/>
        </div>
    );
}

const certificate = {
    backgroundColor: "aliceblue",
};