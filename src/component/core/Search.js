import React from 'react'
import ColumnOfButtons from "./ColumnOfButtons";
import {filterCertificateByTag, filterCertificateByTitle} from "../../util/filters";

export default ({
                    setSearch, user, setFilterBody, setUpCertificates, clearFilterBody,
                    userCertificates, certificates, search, setCurrentCertificates, showUserCertificates
                }) => {
    const onChange = e => {
        setSearch(e.target.value);
        searchEvent(e.target.value);
    };

    const searchEvent = (searchWords) => {
        const filterObject = {};
        const tags = [];
        const searchValues = searchWords.trim().split(' ');
        if (!searchValues) {
            setFilterBody({});
            setUpCertificates();
            return;
        }
        searchValues.forEach(value => {
            if (value.indexOf('#') === 0) {
                tags.push(value.slice(1));
            } else {
                filterObject.title = value.trim();
            }
        });
        if (tags.length) {
            filterObject.tags = tags;
        }
        setFilterBody(filterObject);
        setUpCertificates();
    };

    const typeOfCertificatesEvent = e => {
        let bool = false;
        if (e.target.value === __("homePage.label.all")) {
            bool = false;
        } else if (e.target.value === __("homePage.label.onlyMy")) {
            bool = true;
        }
        showUserCertificates(bool);
        setSearch('');
        clearFilterBody();
        setUpCertificates();
    };

    let userActions = [__("homePage.label.all")];
    if (user.username && Object.keys(userCertificates).length) {
        userActions.push(__("homePage.label.onlyMy"));
    } else {
        userActions = [__("homePage.label.all")];
    }

    return (
        <div className={"container"}>
            <div className={'row '}>
                <ColumnOfButtons
                    items={userActions}
                    action={typeOfCertificatesEvent}
                    className={'col-md-2 shadow'}
                />
                <div className="active-cyan-3 active-cyan-4 mb-4 col-md-9">
                    <input className="form-control" type="search"
                           placeholder={__("homePage.ph.search")}
                           aria-label="Search" onChange={onChange} value={search}/>
                </div>
                <div className="active-cyan-3 active-cyan-4 pl-0 mb-4 col-md-1">
                    <input className="btn btn-primary" type="button"
                           aria-label="Search" onClick={() => searchEvent(search)}
                           value={__("homePage.ph.search")}/>
                </div>
            </div>
        </div>
    )
}