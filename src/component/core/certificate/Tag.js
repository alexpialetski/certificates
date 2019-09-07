import React from 'react';

export default ({tagName, action}) => {
    return (
        <input type="button" onClick={action} className="btn btn-outline-warning" value={tagName}/>
    );
}