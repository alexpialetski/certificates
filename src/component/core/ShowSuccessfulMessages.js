const ShowSuccessfulMessages = ({success = [], onClearSuccess = f => f}) =>
    <div className="show-errors">
        {(success.length) ?
            success.map((message, i) =>
                <div className={'alert alert-success alert-dismissible message-absolute '} onClick={() => {
                    onClearSuccess(i)
                }}>
                    <a onClick={() => onClearSuccess(i)} className="close" aria-label="close">&times;</a>
                    <strong>Success!</strong> {message}
                </div>
            ) : null
        }
    </div>;


export default ShowSuccessfulMessages