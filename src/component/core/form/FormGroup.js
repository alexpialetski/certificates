import React from 'react';

export default ({children, ...rest}) => {
    return (
        <div style={{width : '100%'}} className={'form-group ' + rest.className}>
            {children}
        </div>
    );
}