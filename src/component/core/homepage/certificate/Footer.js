import React from 'react';
import styles from "../../../../styles/certificate.css"
import {Link} from "react-router-dom";

export default ({role, deleteClick, cost, userButtonText, certificateId, userClick}) => {
    const userOptionsProperty = role === undefined ? {justifyContent: 'end'} : {
        width: '30%',
        justifyContent: 'space-between'
    };
    const userOptions = {
        display: 'flex',
        wrap: 'wrap',
        alignItems: 'end',
        ...userOptionsProperty
    };
    let footerProperty = undefined;
    if (role === undefined || role === 'USER') {
        footerProperty = {justifyContent: 'end'};
    } else {
        footerProperty = {justifyContent: 'space-between'};
    }
    const footer = {
        display: "flex",
        wrap: "wrap",
        ...footerProperty
    };
    return (
        <div style={footer}>
            {role && role === "ADMIN" &&
            <div className={styles.adminButtons}>
                <Link to={'/certificates/admin/edit?id=' + certificateId} type="button" className="btn btn-info">Edit</Link>
                <input type="button" className="btn btn-info" onClick={deleteClick} certificateid={certificateId} value={'Delete'}/>
            </div>
            }
            <div style={userOptions}>
                {role && (role === "USER" || role === "ADMIN") &&
                < input type="button" className="btn btn-info" onClick={userClick} certificateid={certificateId} value={userButtonText}/>
                }
                <h4>{'$' + cost}</h4>
            </div>
        </div>
    );
}