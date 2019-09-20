import React from 'react';

export default ({tagName, action, index}) => {
    return (<div data-id={tagName} className={'tag'}>
        <input type="button" onClick={action} className="btn btn-outline-warning" value={tagName}/>
    </div>);
}