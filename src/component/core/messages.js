import React from 'react';

const messageAbsolute = {
    position: 'absolute',
    width: '100%'
};

export const ErrorMessage = ({children, message, className, ...rest}) => {
    return (
        <div className={'alert alert-danger alert-dismissible ' + className} style={messageAbsolute}>
            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Danger!</strong> {message}
        </div>
    );
};