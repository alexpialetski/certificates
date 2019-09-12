import React from 'react';
import Tags from './Tags'


export default ({tags, description, tagClick, certificateId}) => {
    return (
        <div>
            <Tags tags={tags} tagClick={tagClick} certificateId={certificateId}/>
            <div className={'p-5 description'}>
                {description}
            </div>
        </div>
    );
}