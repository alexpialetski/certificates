import React from 'react';
import styles from "../../../../styles/certificate.css"
import Tag from "./Tag";

export default ({tags, tagClick}) => {
    return (
        <div className={styles.tags}>
            {tags.map(tag => {
                return <Tag key={tag} tagName={tag} action={tagClick}/>
            })}
        </div>
    );
}