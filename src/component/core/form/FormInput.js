import React from 'react';
import ConditionalInvalidFeedback from "./ConditionalFeedback";

export default ({source, submitted, sourceError, onChange, ...rest}) => {
    return (
        <div>
            <input type="text"
                   className={'form-control' + (submitted && !source || sourceError ? ' is-invalid' : '')}
                   name="username" value={source}
                   onChange={onChange}/>
            <ConditionalInvalidFeedback
                condition={submitted && !source}
                className={'invalid-feedback'}>
                {__("login.error.fieldRequired")}
            </ConditionalInvalidFeedback>
            <ConditionalInvalidFeedback
                condition={sourceError}
                className={'invalid-feedback'}>
                {sourceError}
            </ConditionalInvalidFeedback>
        </div>
    );
}