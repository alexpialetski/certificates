import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";

export default ({fieldsWithData, loading, submitButtonText}) => {
    const [canCancel, setCanCancel] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let emptyFields = true;
        fieldsWithData.forEach((field) => {
            if (field) {
                emptyFields = false
            }
        });
        setCanCancel(emptyFields);
    }, fieldsWithData);

    const onClick = (e) => {
        e.preventDefault();
        if (canCancel) {
            setRedirect(true);
            return;
        }
        setRedirect(confirm('You have unsaved data. Redirect?'))
    };

    return (
        <div className={'flex-row-between-center'}>
            <button className="btn btn-lg btn-primary" disabled={loading}>{submitButtonText}</button>
            <button
                className="btn btn-lg btn-primary"
                onClick={onClick}
                disabled={loading}>{__("form.button.cancel")}
            </button>
            {redirect && <Redirect to='/'/>}
        </div>)
};