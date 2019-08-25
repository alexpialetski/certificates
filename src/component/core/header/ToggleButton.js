import React from 'react';

export default ({toggleContentId}) => {
    return (
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target={'#' + toggleContentId} aria-controls={toggleContentId}
                aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>

    );
}