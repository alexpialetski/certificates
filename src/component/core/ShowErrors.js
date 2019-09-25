const ShowErrors = ({ errors=[], onClearError=f=>f, className }) =>
    <div className="show-errors">
        {(errors.length) ?
            errors.map((message, i) =>
                <div key={i} className={'alert alert-danger alert-dismissible message-absolute ' + className} onClick={() => onClearError(i)}>
                    <a onClick={() => onClearError(i)} className="close" aria-label="close">&times;</a>
                    <strong>Danger!</strong> {message}
                </div>
            ) : null
        }
    </div>;


export default ShowErrors