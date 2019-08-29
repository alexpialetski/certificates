import React from 'react'
import PaginatePanel from "./PaginatePanel";

const Pagination = ({certificatesPerPage, totalCertificates, paginate, className, currentPage}) => {
    const lastPage = Math.ceil(totalCertificates / certificatesPerPage);
    const currentPageNumber = parseInt(currentPage);
    return (
        <nav className={className}>
            <PaginatePanel
                paginate={paginate}
                totalCertificates={totalCertificates}
                lastPage={lastPage}
                currentPage={currentPage}/>
            <ul className={"pagination justify-content-between"}>
                <li className={'page-item ' + currentPageNumber === 1 ? 'disabled' : undefined}>
                    <a onClick={() => paginate(currentPageNumber - 1)}
                       className={"page-link"}>
                        {"<--- Older"}
                    </a>
                </li>
                <li className={'page-item ' + currentPageNumber === lastPage ? 'disabled' : undefined}>
                    <a onClick={() => paginate(currentPageNumber + 1)}
                       className={"page-link"}>
                        {"Newer --->"}
                    </a>
                </li>
            </ul>
        </nav>
    )
};

export default Pagination