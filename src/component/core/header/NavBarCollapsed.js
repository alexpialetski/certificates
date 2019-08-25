import React from 'react';

export default ({children, ...rest}) => {
    return (
        <div className="collapse navbar-collapse" id={rest.id}>
            {children}
        </div>
    );
}