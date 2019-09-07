import React from 'react';
import Tags from './Tags'

export default ({tags, description, tagClick}) => {
    return (
        <div>
            <Tags tags={tags} tagClick={tagClick}/>
            <div className={'p-5 description'}>
                {description}
            </div>
        </div>
    );
}