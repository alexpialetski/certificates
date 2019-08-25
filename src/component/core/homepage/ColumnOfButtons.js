import React from 'react';
import styles from "../../../css/homePage.css"

const flexColumn = {
    display: 'flex',
    flexDirection: 'column',
    alignItemstems: 'center'
};

export default ({items, action, ...rest}) => {
    const buttons = items.map((item, index) => {
        return <input
            key={index}
            className={'btn btn-light'}
            type={'button'}
            onClick={action}
        value={item}/>
    });
    return (
        <div className={rest.className} style={flexColumn}>
            {buttons}
        </div>
    );
}