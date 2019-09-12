import React from 'react';
import Tag from "./Tag";
import {Droppable} from "react-beautiful-dnd";

export default ({tags, tagClick, certificateId}) => {
    return (
        <Droppable droppableId={certificateId} direction={'horizontal'} type={'tag'}>
            {provided => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={flex}
                    >
                        {tags.map((tag, index) => {
                            return <Tag key={tag} index={index} tagName={tag} action={tagClick}/>
                        })}
                        {provided.placeholder}
                    </div>);
            }
            }
        </Droppable>
    );
}

const flex = {
    display : 'flex'
};