import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {isSatisfied, Role} from "../../../util/authorization";
import {certificateService} from "../../../service/certificates.service";
import AppContext from "../../context/AppContext";

export default ({paginate, setUpCertificates, updateUserCertificates, addSuccessMessage, addError, cost, userButtonText, certificateId, isUserCertificate}) => {
    const appContext = useContext(AppContext);
    // const homeContext = useContext(HomePageContext);
    const role = appContext.user.roles;
    const buyClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.buy"))) {
            // homeContext.setLoading(true);
            await certificateService.buy(parseInt(certificateId), appContext.user)
                .then(message => addSuccessMessage(message))
                .catch(error => addError(error))
                .then(async res => {
                    updateUserCertificates();
                    // await updateAllUserCertificates(appContext.user, homeContext.setUserCertificates);
                    // homeContext.setLoading(false);
                });
        }
    };

    const deleteClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.user.delete"))) {
            // homeContext.setLoading(true);
            await certificateService.deleteUserCertificate(parseInt(certificateId), appContext.user)
                .then(message => addSuccessMessage(message))
                .catch(error => addError(error))
                .then(async () => {
                    updateUserCertificates();
                    paginate(1);
                    // await updateAllUserCertificates(appContext.user, homeContext.setUserCertificates);
                    // await updateAllCertificates(appContext.user, homeContext.setCertificates);
                    // homeContext.setLoading(false);
                });
        }
    };

    const deleteAdminClick = async (e) => {
        e.preventDefault();
        const certificateId = e.target.getAttribute('certificateid');
        if (confirm(__("homePage.alert.admin.delete"))) {
            // homeContext.setLoading(true);
            await certificateService.deleteAdminCertificate(parseInt(certificateId), appContext.user)
                .then(message => addSuccessMessage(message))
                .catch(error => addError(error))
                .then(async () => {
                    updateUserCertificates();
                    paginate(1);
                    // await updateAllUserCertificates(appContext.user, homeContext.setUserCertificates);
                    // await updateAllCertificates(appContext.user, homeContext.setCertificates);
                    // homeContext.setLoading(false);
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