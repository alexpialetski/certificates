import React, {useContext, useEffect, useState} from 'react';
import {valueGreaterOrEqualThan} from "../../validation/FormValidation";
import {Header} from "../core/Header";
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import ConditionalInvalidFeedback from "../core/form/ConditionalFeedback";
import img from "../../resources/images/welcome.jpg"
import smallLoader from "../../resources/images/smallLoader.gif"
import {Footer} from "../core/Footer";
import Tags from "../core/certificate/Tags";
import {certificateService} from "../../service/certificates.service";
import UserContext from "../context/AppContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ControlButtons from "../core/form/ControlButtons";
import FormInput from "../core/form/FormInput";
import {addTagClick, deleteTagClick} from "../../util/tag-helper";

export const EditCertificatePage = (props) => {
    const appContext = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [certificateId, setCertificateId] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);

    useEffect(() => {
        const certificateId = window.location.href.match(/id=\d+/)[0].slice(3);

        async function func() {
            return await certificateService.findById(appContext.user, parseInt(certificateId)).then(certificate => {
                setTitle(certificate.title);
                setTags(certificate.tags);
                setDescription(certificate.description);
                setCost(certificate.cost);
                setCertificateId(certificate.id);
                setDate(new Date(certificate.date));
            });
        }

        func();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!(title && description && cost && tags.length) || error || errorFlag) {
            return;
        }
        const certificate = {id: certificateId, date: createStringOfDate(date), title, description, cost, tags};
        certificateService.editAdminCertificate(appContext.user, certificate)
            .then(
                () => {
                    const {from} = props.location.state || {from: {pathname: "/"}};
                    // props.history.push(from);
                },
                error => {
                    setError(error);
                    setLoading(false)
                }
            );
    };

    return (
        <div>
            <Header/>
            <Container className="row mt-5 p-5">
                <h2>{__("editCertificate.label")}</h2>
                <form name="form flex-column-left-space-around" onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="title">{__("editCertificate.title.label")}</label>
                        <FormInput
                            required={true}
                            source={title}
                            setSource={setTitle}
                            setErrorFlag={setErrorFlag}
                            type={'text'}
                            onChange={(e) => {
                                const {value} = e.target;
                                if (valueGreaterOrEqualThan(value.length, 30)) {
                                    return __("addCertificate.error.titleError");
                                }
                            }}/>
                    </FormGroup>
                    <DatePicker
                        dateFormat="yyyy-mm-dd"
                        selected={date}
                        onChange={date => setDate(new Date(date))}
                    />
                    <FormGroup>
                        <label htmlFor="description">{__("editCertificate.description.label")}</label>
                        <FormInput
                            required={true}
                            source={description}
                            setSource={setDescription}
                            setErrorFlag={setErrorFlag}
                            type={'text'}
                            onChange={(e) => {
                                const {value} = e.target;
                                if (valueGreaterOrEqualThan(value.length, 230)) {
                                    return __("addCertificate.error.descriptionError");
                                }
                            }}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="cost">{__("editCertificate.cost.label")}</label>
                        <FormInput
                            required={true}
                            source={cost}
                            setSource={setCost}
                            setErrorFlag={setErrorFlag}
                            type={'number'}
                            onChange={(e) => {
                                const {value} = e.target;
                                if (!valueGreaterOrEqualThan(parseInt(value), 0)) {
                                    return __("addCertificate.error.costError");
                                }
                            }}/>
                    </FormGroup>
                    <div className="container">
                        <div className="row">
                            <div className={'col-md-3'}>
                                <button
                                    type="button"
                                    onClick={() => addTagClick(tags, setTags, tag, setTag)}
                                    className="btn btn-warning"
                                    style={{borderRadius: '50%'}}>
                                    +
                                </button>
                            </div>
                            <FormGroup className={'col-md-9'}>
                                <label htmlFor="tag">{__("editCertificate.tag.label")}</label>
                                <input type="text"
                                       name="tag" value={tag}
                                       className={'form-control' + (submitted && !tags.length ? ' is-invalid' : '')}
                                       onChange={(e) => setTag(e.target.value)}/>
                                <ConditionalInvalidFeedback
                                    condition={submitted && !tags.length}
                                    className={'invalid-feedback'}>
                                    {__("editCertificate.error.tagError")}
                                </ConditionalInvalidFeedback>
                            </FormGroup>
                        </div>
                    </div>
                    <Tags tags={tags} tagClick={(e) => deleteTagClick(e, tags, setTags)}/>
                    <ControlButtons
                        loading={loading}
                        submitButtonText={__("editCertificate.button")}
                        fieldsWithData={[title, date, description, cost, tags.length]}/>
                    {loading && <img alt={'Loader'} src={smallLoader}/>}
                    {error && <div className={'alert alert-danger'}>{error}</div>}
                </form>
            </Container>
            <Footer/>
        </div>
    )
};

function createStringOfDate(date) {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const array = date.toLocaleDateString("en-US", options).split('/');
    return [array[2], array[0], array[1]].join('-');
}