import React from 'react';

export default ({items, action, ...rest}) => {
    const buttons = items.map((item, index) => {
        const active = rest.check === item ? 'active' : '';
        return <input
            key={index}
            className={'btn btn-light full-width ' + active}
            type={'button'}
            onClick={action}
            value={item}/>
    });
    return (
        <div className={'flex-column ' + rest.className}>
            {buttons}
        </div>
    );
}