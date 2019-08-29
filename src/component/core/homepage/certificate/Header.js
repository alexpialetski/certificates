import React from 'react';
import styles from "../../../../styles/certificate.css"

export default ({title, date}) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return (
        <div style={header}>
            <h3>{title}</h3>
            <h3>{new Date(date).toLocaleDateString("en-US", options)}</h3>
        </div>
    );
}

const header = {
  display: 'flex',
  justifyContent: 'space-between'
};