import React from 'react';

export default ({children, ...rest}) => {
    return (
        <div className={'form-group' + rest.className}>
            {children}
        </div>
    );
}