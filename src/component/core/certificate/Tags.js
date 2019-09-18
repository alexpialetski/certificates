import React from 'react';
import Tag from "./Tag";

export default ({tags, tagClick}) => {
    return <div style={flex}>
        {tags.map((tag, index) => {
            return <Tag key={index} tagId={tag.id} tagName={tag.tag} action={tagClick}/>
        })}
    </div>
}

const flex = {
    display: 'flex',
    minHeight: '70px'
};