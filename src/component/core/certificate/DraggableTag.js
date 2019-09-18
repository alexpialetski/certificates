import React, {useContext} from 'react';
import {Draggable} from "react-beautiful-dnd";
import HomePageContext from "../../context/HomePageContext";

export default ({tagName, index, tagId}) => {
    let contextType = useContext(HomePageContext);
    const tagClick = (e) => {
        contextType.setSearch(contextType.search + ' #' + e.target.value);
    };

    return (
        <Draggable draggableId={tagId} index={index}>
            {(provided) => {
                return (<div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div className={'tag'}>
                        <div {...provided.dragHandleProps} style={{...style}}/>
                        <input type="button" onClick={tagClick} className="btn btn-outline-warning" value={tagName}/>
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
