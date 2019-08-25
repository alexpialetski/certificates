import React from 'react';

export default ({children, ...rest}) => {
    return (
        <ul className="navbar-nav mr-auto">
            {children}
        </ul>
    );
}