import React from 'react';
import Tag from "./DraggableTag";
import {Droppable} from "react-beautiful-dnd";

export default ({tags, tagClick, certificateId}) => {
    return (
        <Droppable droppableId={certificateId} direction={'horizontal'} type={'tags'}>
            {provided => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={flex}
                    >
                        {tags.map((tag, index) => {
                            return <Tag key={tag.id} index={index} tagId={tag.id+'t'} tagName={tag.tag} action={tagClick}/>
                        })}
                        {provided.placeholder}
                    </div>);
            }
            }
        </Droppable>
    );
}

const flex = {
    display: 'flex',
    minHeight: '70px'
};