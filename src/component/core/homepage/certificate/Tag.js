import React from 'react';
import styles from "../../../../css/certificate.css"

export default ({tagName, action}) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return (
        <input type="button" onClick={action} className="btn btn-outline-warning" value={tagName}/>
    );
}