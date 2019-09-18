import React from 'react';

export default ({title, date, dragg}) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return (
        <div {...dragg} className={'certificate-header'}>
            <h3>{title}</h3>
            <h3>{new Date(date).toLocaleDateString("en-US", options)}</h3>
        </div>
    );
}