import React from 'react';
import {Link} from "react-router-dom";
import {isSatisfied, Role} from "../../../../util/authorization";

export default ({role, deleteClick, cost, userButtonText, certificateId, userClick}) => {
    const options = role === undefined ? 'anonymous-options' : 'user-options';
    let footer = role === undefined || isSatisfied(role, Role.USER) ? 'user-footer-options' : '';
    if (role === undefined || isSatisfied(role, Role.ADMIN)) {
        footer = 'admin-footer-options';
    }
    return (
        <div className={'footer-options ' + footer}>
            {isSatisfied(role, "ADMIN") &&
            <div className={'user-options'}>
                <Link to={'/certificates/admin/edit?id=' + certificateId} type="button"
                      className="btn btn-info">{__("certificate.button.admin.edit")}</Link>
                <input type="button" className="btn btn-info" onClick={deleteClick} certificateid={certificateId}
                       value={__("certificate.button.admin.delete")}/>
            </div>
            }
            <div className={options}>
                {isSatisfied(role, "USER") &&
                < input type="button" className="btn btn-info" onClick={userClick} certificateid={certificateId}
                        value={userButtonText}/>
                }
                <h4>{'$' + cost}</h4>
            </div>
        </div>
    );
}