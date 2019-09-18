import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import {Draggable} from "react-beautiful-dnd";

class Certificate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.certificate
        };
    }

    render() {
        const {isUserCertificate, tagClick, role} = this.props;
        const isUserCertificateClass = isUserCertificate ? 'user-certificate' : '';
        return (
            <Draggable draggableId={this.state.id} index={this.props.test}>
                {provided => (
                    <div
                        className={'shadow p-3 certificate ' + isUserCertificateClass}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <Header dragg={provided.dragHandleProps} date={this.state.date} title={this.state.title}/>
                        <Body certificateId={this.state.id} tags={this.props.tags}
                              description={this.state.description}
                              tagClick={tagClick}/>
                        <Footer
                            role={role}
                            cost={this.state.cost}
                            isUserCertificate={isUserCertificate}
                            userButtonText={isUserCertificate ? __("certificate.button.delete") : __("certificate.button.buy")}
                            certificateId={this.state.id}/>
                    </div>
                )
                }
            </Draggable>
        );
    }
}

export default Certificate;