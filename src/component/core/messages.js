import React from 'react';

const messageAbsolute = {
    position: 'absolute',
    width: '100%'
};

export const ErrorMessage = ({children, message, className, setErrorMessage, ...rest}) => {
    const onChange = (e) => {
        e.preventDefault();
        setErrorMessage('');
    };
    return (
        <div className={'alert alert-danger alert-dismissible ' + className} style={messageAbsolute}>
            <a href="#" onClick={onChange} className="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Danger!</strong> {message}
        </div>
    );
};

export const SuccessMessage = ({children, message, className, setSuccessMessage, ...rest}) => {
    const onChange = (e) => {
        e.preventDefault();
        setSuccessMessage('');
    };
    return (
        <div className={'alert alert-success alert-dismissible ' + className} style={messageAbsolute}>
            <a href="#" onClick={onChange} className="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Success!</strong> {message}
        </div>
    );
};