import React from 'react';
import {Link} from "react-router-dom";

export default ({role, deleteClick, cost, userButtonText, certificateId, userClick}) => {
    const options = role === undefined ? 'anonymous-options' : 'user-options';
    const footer = role === undefined || role === 'USER' ? 'user-footer-options' : 'admin-footer-options';
    return (
        <div className={'footer-options ' + footer}>
            {role && role === "ADMIN" &&
            <div className={'user-options'}>
                <Link to={'/certificates/admin/edit?id=' + certificateId} type="button"
                      className="btn btn-info">Edit</Link>
                <input type="button" className="btn btn-info" onClick={deleteClick} certificateid={certificateId}
                       value={'Delete'}/>
            </div>
            }
            <div className={options}>
                {role && (role === "USER" || role === "ADMIN") &&
                < input type="button" className="btn btn-info" onClick={userClick} certificateid={certificateId}
                        value={userButtonText}/>
                }
                <h4>{'$' + cost}</h4>
            </div>
        </div>
    );
}