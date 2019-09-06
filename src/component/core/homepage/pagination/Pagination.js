import React from 'react'
import PaginatePanel from "./PaginatePanel";

const Pagination = ({certificatesPerPage, totalCertificates, paginate, className, currentPage}) => {
    const lastPage = Math.ceil(totalCertificates / certificatesPerPage);
    const currentPageNumber = parseInt(currentPage);
    const newerDisabled = currentPageNumber === 1 ? 'disabled' : '';
    const olderDisabled = currentPageNumber === lastPage ? 'disabled' : '';
    return (
        <nav className={className}>
            <PaginatePanel
                paginate={paginate}
                totalCertificates={totalCertificates}
                lastPage={lastPage}
                currentPage={currentPage}/>
            <ul className={"pagination justify-content-between"}>
                <li className={'page-item ' + newerDisabled}>
                    <a onClick={() => paginate(currentPageNumber - 1)}
                       className={"page-link"}>
                        {__("pagination.older.label")}
                    </a>
                </li>
                <li className={'page-item ' + olderDisabled}>
                    <a onClick={() => paginate(currentPageNumber + 1)}
                       className={"page-link"}>
                        {__("pagination.newer.label")}
                    </a>
                </li>
            </ul>
        </nav>
    )
};

export default Pagination