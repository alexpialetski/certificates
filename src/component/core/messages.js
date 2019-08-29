import React from 'react';

export const ErrorMessage = ({children, message, className, setErrorMessage, ...rest}) => {
    const onClick = (e) => {
        e.preventDefault();
        setErrorMessage('');
    };
    return (
        <div className={'alert alert-danger alert-dismissible message-absolute ' + className} onClick={onClick}>
            <a href="#" onClick={onClick} className="close" aria-label="close">&times;</a>
            <strong>Danger!</strong> {message}
        </div>
    );
};

export const SuccessMessage = ({children, message, className, setSuccessMessage, ...rest}) => {
    const onClick = (e) => {
        e.preventDefault();
        setSuccessMessage('');
    };
    return (
        <div className={'alert alert-success alert-dismissible message-absolute ' + className} onClick={onClick}>
            <a href="#" onClick={onClick} className="close" aria-label="close">&times;</a>
            <strong>Success!</strong> {message}
        </div>
    );
};