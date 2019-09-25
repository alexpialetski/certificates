import React from 'react';
import Container from "../core/Container";
import Certificates from "../containers/Certificates";
import Search from "../containers/Search";
import Navigation from "../containers/Navigation";

export default () => {
    return (
        <div>
            <Container className=" mt-5 p-3">
                <h1 className={'mb-5'}>{__("homePage.label.certificates")}</h1>
                <Search/>
                <div className={'m-5 certificates'}>
                    <Certificates/>
                </div>
                <Navigation/>
            </Container>
        </div>
    );
}