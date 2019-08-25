import React from 'react';

const spaceBetween = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

export default ({children, ...rest}) => {
    return (
        <div className={rest.className} style={spaceBetween}>
            {children}
        </div>
    );
}