import React from 'react'

const PaginatePanel = ({lastPage, paginate, currentPage}) => {
    const pageNumbers = [];
    if (lastPage < 10) {
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i)
        }
    } else {
        if (currentPage <= 5) {
            for (let i = 1; i <= 9; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
        } else if (currentPage > 5 && (lastPage - currentPage) > 5) {
            for (let i = currentPage - 5; i < currentPage + 4; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
        } else {
            for (let i = lastPage - 10; i < lastPage; i++) {
                pageNumbers.push(i);
            }
        }
        pageNumbers.push(lastPage);
    }

    const currentPageNumber = parseInt(currentPage);
    const nav = pageNumbers.map(number => {
        const active = number === currentPageNumber ? "active" : "";
        return (
            <li key={number} className={"page-item " + active}>
                <a onClick={() => {
                    if (number === '...') {
                        (currentPage + 10) <= lastPage ? paginate(currentPage + 10) : paginate(lastPage);
                    } else {
                        paginate(number)
                    }
                }}
                   className={'page-link '}>
                    {number}
                </a>
            </li>
        )
    });
    return (
        <ul className={"pagination justify-content-center"}>
            <li className={'page-item ' + currentPageNumber === 1 ? 'disabled' : undefined}>
                <a onClick={() => paginate(1)}
                   className={"page-link"}>
                    {"<<"}
                </a>
            </li>
            {nav}
            <li className={'page-item ' + currentPageNumber === lastPage ? 'disabled' : undefined}>
                <a onClick={() => paginate(lastPage)}
                   className={"page-link"}>
                    {">>"}
                </a>
            </li>
        </ul>
    )
};

export default PaginatePanel