import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

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
            <div className={'shadow p-3 certificate ' + isUserCertificateClass} certificateid={this.state.id}>
                <Header date={this.state.date} title={this.state.title}/>
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
}

export default Certificate;