import React from 'react';
import styles from "../../../../css/certificate.css"
import Tag from "./Tag";

export default ({tags, description, ...rest}) => {
    const tagsComponents = tags.map(tag => {
       return <Tag key={tag} tagName={tag} action={rest.tagClick}/>
    });
    return (
        <div className={styles.body}>
            <div className={styles.tags}>
                {tagsComponents}
            </div>
            <div className={'p-5'} style={descriptionStyle}>
                {description}
            </div>
        </div>
    );
}

const descriptionStyle = {
    textAlign: 'center'
};