import React from 'react';
import styles from "../../../../styles/certificate.css"
import Tag from "./Tag";
import Tags from './Tags'

export default ({tags, description, tagClick}) => {
    const tagsComponents = tags.map(tag => {
       return <Tag key={tag} tagName={tag} action={tagClick}/>
    });
    return (
        <div className={styles.body}>
            <Tags tags={tags} tagClick={tagClick}/>
            <div className={'p-5'} style={descriptionStyle}>
                {description}
            </div>
        </div>
    );
}

const descriptionStyle = {
    textAlign: 'center'
};