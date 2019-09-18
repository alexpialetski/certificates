import React from 'react';
import Tags from './DraggableTags'
import {searchTagClick} from "../../../util/tag-helper";


export default ({tags, description, certificateId}) => {
    return (
        <div>
            <Tags tags={tags} tagClick={searchTagClick} certificateId={certificateId}/>
            <div className={'p-5 description'}>
                {description}
            </div>
        </div>
    );
}