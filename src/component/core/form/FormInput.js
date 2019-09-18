import React, {useState} from 'react';

export default ({source, setSource, onChange, submitted, setErrorFlag, type, required}) => {
    const [sourceError, setSourceError] = useState([]);

    if(submitted && required && !source){
        setSourceError([...__("login.error.fieldRequired")]);
    }

    function onUpdate(e) {
        const {value} = e.target;
        setSource(value);

        const arrayOfErrors = [];
        if (required && !value) {
            arrayOfErrors.push(__("login.error.fieldRequired"));
        }
        if (onChange) {
            const errors = onChange(e);
            if (errors) {
                arrayOfErrors.push([...errors]);
            }
        }
        if (arrayOfErrors.length) {
            setSourceError([...arrayOfErrors]);
        } else {
            setSourceError([]);
        }
        if (arrayOfErrors.length) {
            setErrorFlag(true)
        }else{
            setErrorFlag(false);
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
                   onChange={onUpdate}
                   required/>
            {errors}
        </div>
    );
}