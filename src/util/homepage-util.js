import {certificateService} from "../service/certificates.service";
import {sortCertificatesByDate} from "./comparators";

export const updateAllUserCertificates = async (user, setUserCertificates) => {
    await certificateService.getUserCertificates(user)
        .then(res => setUserCertificates([...res]));
};

export const updateAllCertificates = async (user, setCertificates) => {
    await certificateService.getAll(user).then(res => setCertificates(res.sort(sortCertificatesByDate)));
};