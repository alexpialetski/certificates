import React from 'react';

export default ({children, ...rest}) => {
    return (
        <div className={'container shadow rounded-sm' + rest.className}>
            {children}
        </div>
    );
}