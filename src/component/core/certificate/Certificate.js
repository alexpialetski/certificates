import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

class Certificate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.certificate
        }
    }



    render() {
        const {isUserCertificate, tagClick, role, deleteClick, buyClick, editClick, deleteAdminClick} = this.props;
        const isUserCertificateClass = isUserCertificate ? 'user-certificate' : '';
        return (
            <div className={'shadow p-3 certificate ' + isUserCertificateClass}>
                <Header date={this.state.date} title={this.state.title}/>
                <Body certificateId={this.state.id} tags={this.state.tags}
                      description={this.state.description}
                      tagClick={tagClick}/>
                <Footer
                    role={role}
                    cost={this.state.cost}
                    userClick={isUserCertificate ? deleteClick : buyClick}
                    userButtonText={isUserCertificate ? __("certificate.button.delete") : __("certificate.button.buy")}
                    editClick={editClick}
                    certificateId={this.state.id}
                    deleteClick={deleteAdminClick}/>
            </div>
        );
    }
}

export default Certificate;