import React from 'react'

const Pagination = ({certificatesPerPage, totalCertificates, paginate, className}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCertificates / certificatesPerPage); i++) {
        pageNumbers.push(i)
    }
    const nav = pageNumbers.map(number => {
        return <li key={number} className={"page-item"}>
            <a onClick={() => paginate(number)} className={"page-link"}>
                {number}
            </a>
        </li>
    });
    return (
        <nav className={className}>
            <ul className={"pagination justify-content-center"}>
                {nav}
            </ul>
        </nav>
    )
};

export default Pagination