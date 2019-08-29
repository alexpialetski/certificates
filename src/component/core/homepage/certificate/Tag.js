import React from 'react';
import styles from "../../../../styles/certificate.css"

export default ({tagName, action}) => {
    return (
        <input type="button" onClick={action} className="btn btn-outline-warning" value={tagName}/>
    );
}