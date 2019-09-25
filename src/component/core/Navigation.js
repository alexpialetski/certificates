import ColumnOfButtons from "./ColumnOfButtons";
import Pagination from "./pagination/Pagination";
import React from "react";

export default ({certificatesPerPage, paginate, setCertificatesPerPage, quantity, currentPage}) => {
    const quantityOfCertificates = e => {
        setCertificatesPerPage(parseInt(e.target.value));
        paginate(1);
    };
    // debugger;
    return (
        <div className={'container'}>
            <div className={'row align-items-center'}>
                <ColumnOfButtons
                    items={[2, 25, 50, 100]}
                    action={quantityOfCertificates}
                    className={'col-md-2 offset-md-1 shadow'}
                    check={certificatesPerPage}
                />
                <Pagination
                    certificatesPerPage={certificatesPerPage}
                    totalCertificates={quantity}
                    className={'col-md-7 push-md-2'}
                    paginate={paginate}
                    currentPage={currentPage}/>
            </div>
        </div>
    )
}