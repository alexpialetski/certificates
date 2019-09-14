import ColumnOfButtons from "./ColumnOfButtons";
import Pagination from "./pagination/Pagination";
import React, {useContext} from "react";
import HomePageContext from "../context/HomePageContext";

export default () => {
    const contextType = useContext(HomePageContext);

    const quantityOfCertificates = e => {
        contextType.setCurrentPage(1);
        contextType.setCertificatesPerPage(parseInt(e.target.value));
    };

    return (
        <div className={'container'}>
            <div className={'row align-items-center'}>
                <ColumnOfButtons
                    items={[2, 25, 50, 100]}
                    action={quantityOfCertificates}
                    className={'col-md-2 offset-md-1 shadow'}
                    check={contextType.certificatesPerPage}
                />
                <Pagination
                    certificatesPerPage={contextType.certificatesPerPage}
                    totalCertificates={contextType.certificates.length}
                    paginate={(pageNumber) => contextType.setCurrentPage(pageNumber)}
                    className={'col-md-7 push-md-2'}
                    currentPage={contextType.currentPage}/>
            </div>
        </div>
    )
}