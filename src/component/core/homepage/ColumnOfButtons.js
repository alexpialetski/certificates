import React from 'react';

export default ({items, action, ...rest}) => {
    const buttons = items.map((item, index) => {
        return <input
            key={index}
            className={'btn btn-light full-width'}
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