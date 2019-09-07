import React from 'react';
import Tag from "./Tag";

export default ({tags, tagClick}) => {
    return (
        <div>
            {tags.map(tag => {
                return <Tag key={tag} tagName={tag} action={tagClick}/>
            })}
        </div>
    );
}