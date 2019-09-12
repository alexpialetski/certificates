import React from 'react';
import {Draggable} from "react-beautiful-dnd";

export default ({tagName, action, index}) => {
    return (
        <Draggable draggableId={tagName} index={index}>
            {(provided) => {
                return (<div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div className={'tag'}>
                        <div {...provided.dragHandleProps} style={{...style}}/>
                        <input type="button" onClick={action} className="btn btn-outline-warning" value={tagName}/>
                    </div>
                </div>)
            }
            }
        </Draggable>
    );
}
const style = {
    width: '15px',
    height: '20px',
    backgroundColor: 'orange',
    borderRadius: '4px',
    marginRight: '4px',
    marginLeft: '8px'
};

const flex = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
