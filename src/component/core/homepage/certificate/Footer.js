import React from 'react';
import styles from "../../../../css/certificate.css"

export default ({role, editClick, deleteClick, cost, buyClick}) => {
    const userOptions = {
        display: "flex",
        wrap: "wrap",
        alignItems: 'end'
    };
    const property = role && role === "ADMIN" ? {justifyContent: 'space-between'} : {justifyContent: 'end'} ;
    const footer = {
        display: "flex",
        wrap: "wrap",
        ...property
    };
    return (
        <div style={footer}>
            {role && role === "ADMIN" &&
            <div className={styles.adminButtons}>
                <input type="button" className="btn btn-info" onClick={editClick} value={'Edit'}/>
                <input type="button" className="btn btn-info" onClick={deleteClick} value={'Delete'}/>
            </div>
            }
            <div style={userOptions}>
                {role && (role === "USER" || role === "ADMIN") &&
                < input type="button" className="btn btn-info" onClick={buyClick} value={'Buy'}/>
                }
                <h4>{cost}</h4>
            </div>
        </div>
    );
}