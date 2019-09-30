import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {isSatisfied, Role} from "../../../util/authorization";
import {certificateService} from "../../../service/certificates.service";

export default ({user, paginate, setUpCertificates, updateUserCertificates, addSuccessMessage, addError, cost, userButtonText, userCertificates, certificateId, isUserCertificate}) => {
    const role = user.roles;
    const buyClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.buy"))) {
            await certificateService.buy(certificateId, user)
                .then(message => addSuccessMessage(message))
                .catch(error => addError(error.message))
                .then(async res => {
                    updateUserCertificates();
                });
        }
    };

    const deleteClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        const userCertificateId = userCertificates[certificateId];
        if (confirm(__("homePage.alert.user.delete"))) {
            await certificateService.deleteUserCertificate(userCertificateId)
                .then(message => addSuccessMessage(message))
                .catch(error => addError(error))
                .then(async () => {
                    updateUserCertificates();
                    setUpCertificates();
                });
        }
    };

    const deleteAdminClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.admin.delete"))) {
            await certificateService.deleteAdminCertificate(parseInt(certificateId), user)
                .then(message => addSuccessMessage(message))
                .catch(error => addError(error))
                .then(async () => {
                    updateUserCertificates();
                    setUpCertificates();
                });
        }
    };

    const options = role === undefined ? 'anonymous-options' : 'user-options';
    let footer = role === undefined || isSatisfied(role, Role.USER) ? 'user-footer-options' : '';
    if (role === undefined || isSatisfied(role, Role.ADMIN)) {
        footer = 'admin-footer-options';
    }

    return (
        <div className={'footer-options ' + footer}>
            {isSatisfied(role, Role.ADMIN) &&
            <div className={'user-options'}>
                <Link to={'/certificates/admin/edit?id=' + certificateId} type="button"
                      className="btn btn-info">{__("certificate.button.admin.edit")}</Link>
                <input type="button" className="btn btn-info" onClick={deleteAdminClick} certificateid={certificateId}
                       value={__("certificate.button.admin.delete")}/>
            </div>
            }
            <div className={options}>
                {isSatisfied(role, "USER") &&
                < input type="button" className="btn btn-info"
                        onClick={isUserCertificate ? deleteClick : buyClick}
                        certificateid={certificateId}
                        value={userButtonText}/>
                }
                <h4>{'$' + cost}</h4>
            </div>
        </div>
    );
}