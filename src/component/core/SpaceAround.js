import React from 'react';

const spaceAround = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};

export default ({children, ...rest}) => {
    return (
        <div className={rest.className} style={spaceAround}>
            {children}
        </div>
    );
}