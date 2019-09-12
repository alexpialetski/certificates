import React from 'react';

export default ({source, setSource, sourceError, setSourceError, onChange, type, required, submitted}) => {
    let showError = false;

    function onUpdate(e) {
        const {value} = e.target;
        setSource(value);

        const arrayOfErrors = [];
        if (required && !value) {
            showError = true;
            arrayOfErrors.push(__("login.error.fieldRequired"));
        }
        if (onChange) {
            const error = onChange(e);
            if (error) {
                showError = true;
                arrayOfErrors.push(error);
            }
        }
        if (arrayOfErrors.length) {
            setSourceError([...arrayOfErrors]);
        } else {
            showError = false;
            setSourceError([]);
        }
    }

    const errors = sourceError.map(error => {
        return <div className={'invalid-feedback'}>
            {error}
        </div>
    });

    return (
        <div>
            <input type={type}
                   className={'form-control' + (sourceError.length ? ' is-invalid' : '')}
                   name="username" value={source}
                   onChange={onUpdate}/>
            {errors}
        </div>
    );
}