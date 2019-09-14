import React, {useContext, useState} from 'react'
import ColumnOfButtons from "./ColumnOfButtons";
import HomePageContext from "../context/HomePageContext";
import {filterCertificateByTag, filterCertificateByTitle} from "../../util/filters";
import {certificateService} from "../../service/certificates.service";
import {sortCertificatesByDate} from "../../util/comparators";
import AppContext from "../context/AppContext";
import {updateAllCertificates} from '../../util/homepage-util'

export default () => {
    const homeContext = useContext(HomePageContext);
    const appContext = useContext(AppContext);
    const {search, setSearch} = homeContext;

    const onChange = e => {
        setSearch(e.target.value);
        searchEvent(e.target.value);
    };

    const searchEvent = (searchWords) => {
        const filterObject = {};
        const tags = [];
        const searchValues = searchWords.split(' ');
        if (!searchValues) {
            updateAllCertificates(appContext.user, homeContext.setCertificates());
            return;
        }
        searchValues.forEach(value => {
            if (value.indexOf('#') === 0) {
                tags.push(value.slice(1));
            } else {
                filterObject.title = value;
            }
        });
        if (tags.length) {
            filterObject.tags = tags;
        }
        searchByFilters(filterObject);
    };

    const searchByFilters = async (filterObject) => {
        // homeContext.setLoading(true);
        const arrayOfFilters = [];
        filterObject.title && arrayOfFilters.push((filterCertificateByTitle(filterObject.title)));
        filterObject.tags && filterObject.tags.forEach(tag => arrayOfFilters.push(filterCertificateByTag(tag)));
        await certificateService.searchByMultipleFilters(homeContext.user, arrayOfFilters)
            .then(res => homeContext.setCertificates(res.sort(sortCertificatesByDate))).then(() => homeContext.paginate(1));
        // homeContext.setLoading(false);
    };

    const typeOfCertificatesEvent = e => {
        const {setCertificates, userCertificates, certificates, setCurrentPage} = homeContext;
        if (e.target.value === __("homePage.label.all")) {
            setSearch('');
            updateAllCertificates(appContext.user, setCertificates);
        } else if (e.target.value === __("homePage.label.onlyMy")) {
            const isUserCertificate = (certificateId) => {
                for (let i = 0; i < userCertificates.length; i++) {
                    if (userCertificates[i] === certificateId) {
                        return true;
                    }
                }
                return false;
            };

            const array = [];
            for (let i = 0; i < certificates.length; i++) {
                if (isUserCertificate(certificates[i].id)) {
                    array.push(certificates[i]);
                }
            }
            setCertificates([...array]);
            setCurrentPage(1);
        }
    };

    let userActions = [__("homePage.label.all")];
    if (appContext.user.username && homeContext.userCertificates.length) {
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