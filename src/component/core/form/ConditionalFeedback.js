import React from 'react';

export default ({children, condition, ...rest}) => {
    return (
        <div className={rest.className}>
            {condition && children}
        </div>
    );
}