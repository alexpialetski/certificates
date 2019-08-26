import React, {useContext} from 'react';
import styles from "../../../../css/certificate.css"
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import UserContext from '../../../context/UserContext';

export default (props) => {
    let contextType = useContext(UserContext);

    const buyClick = () => {
        console.log('buyClick');
    };

    const deleteClick = () => {
        console.log('deleteClick');
    };

    const editClick = () => {
        console.log('editClick');
    };

    return (
        <div className={'col-md-6 shadow p-3 align-items-end'} style={certificate}>
            <Header date={props.certificate.date} title={props.certificate.title}/>
            <Body tags={props.certificate.tags}
                  description={props.certificate.description}
                  tagClick={props.tagClick}/>
            <Footer
                role={props.role}
                cost={props.certificate.cost}
                buyClick={buyClick}
                editClick={editClick}
                deleteClick={deleteClick}/>
        </div>
    );
}

const certificate = {
    backgroundColor: "aqua",
};