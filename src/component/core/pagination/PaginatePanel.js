import React from 'react'

const PaginatePanel = ({lastPage, paginate, currentPage}) => {
    const pageNumbers = [];
    const numberOfPagesOnPanel = 8;
    if (lastPage < numberOfPagesOnPanel + 1) {
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i)
        }
    } else {
        if (currentPage <= numberOfPagesOnPanel / 2) {
            for (let i = 1; i <= numberOfPagesOnPanel; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
        } else if (currentPage > numberOfPagesOnPanel / 2 && (lastPage - currentPage) > numberOfPagesOnPanel / 2) {
            for (let i = currentPage - numberOfPagesOnPanel / 2; i < currentPage + 4; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
        } else {
            for (let i = lastPage - numberOfPagesOnPanel; i < lastPage; i++) {
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
            {arrows({
                text: '<<',
                disabled: currentPageNumber === 1,
                onClick: () => paginate(1)
            })}
            {nav}
            {arrows({
                text: '>>',
                disabled: currentPageNumber === lastPage,
                onClick: () => paginate(lastPage)
            })}
        </ul>
    )
};

function arrows(props) {
    return <li className={'page-item ' + disabled ? 'disabled' : undefined}>
        <a onClick={props.onClick}
           className={"page-link"}>
            {props.text}
        </a>
    </li>
}

export default PaginatePanel