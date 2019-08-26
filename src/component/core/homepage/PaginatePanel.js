import React from 'react'

const PaginatePanel = ({lastPage, paginate, currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i)
    }
    const nav = pageNumbers.map(number => {
        return (
            <li key={number} className={"page-item " + (number === currentPage) ? "active" : ""}>
                <a onClick={() => paginate(number)}
                   className={'page-link '}>
                    {number}
                </a>
            </li>
        )
    });
    return (
        <ul className={"pagination justify-content-center"}>
            <li className={'page-item ' + currentPage === 1 ? 'disabled' : undefined}>
                <a onClick={() => paginate(1)}
                   className={"page-link"}>
                    {"<<"}
                </a>
            </li>
            {nav}
            <li className={'page-item ' + currentPage === lastPage ? 'disabled': undefined}>
                <a onClick={() => paginate(lastPage)}
                   className={"page-link"}>
                    {">>"}
                </a>
            </li>
        </ul>
    )
};

export default PaginatePanel