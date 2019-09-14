import React, {useContext, useState} from 'react';
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
import ControlButtons from "../core/form/ControlButtons";
import FormInput from "../core/form/FormInput";
import {addTagClick, deleteTagClick} from "../../util/tag-helper";

export const AddCertificatePage = (props) => {
    const appContext = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [titleError, setTitleError] = useState([]);
    const [descriptionError, setDescriptionError] = useState([]);
    const [costError, setCostError] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!(title && description && cost && tags.length)
            || descriptionError.length || costError.length || titleError.length || error) {
            return;
        }

        const certificate = {title, description, cost, tags};
        certificateService.createAdminCertificate(appContext.user, certificate)
            .then(
                () => {
                    const {from} = props.location.state || {from: {pathname: "/"}};
                    props.history.push(from);
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
                <h2>{__("addCertificate.label")}</h2>
                <form name="form flex-column-left-space-around" onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="title">{__("addCertificate.title.label")}</label>
                        <FormInput
                            required={true}
                            source={title}
                            setSource={setTitle}
                            sourceError={titleError}
                            setSourceError={setTitleError}
                            submitted={submitted}
                            type={'text'}
                            onChange={(e) => {
                                const {value} = e.target;
                                if (valueGreaterOrEqualThan(value.length, 30)) {
                                    return __("addCertificate.error.titleError");
                                }
                            }}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="description">{__("addCertificate.description.label")}</label>
                        <FormInput
                            required={true}
                            source={description}
                            setSource={setDescription}
                            sourceError={descriptionError}
                            setSourceError={setDescriptionError}
                            submitted={submitted}
                            type={'text'}
                            onChange={(e) => {
                                const {value} = e.target;
                                if (valueGreaterOrEqualThan(value.length, 230)) {
                                    return __("addCertificate.error.descriptionError");
                                }
                            }}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="cost">{__("addCertificate.cost.label")}</label>
                        <FormInput
                            required={true}
                            source={cost}
                            setSource={setCost}
                            sourceError={costError}
                            setSourceError={setCostError}
                            submitted={submitted}
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
                                <label htmlFor="tag">{__("addCertificate.tag.label")}</label>
                                <input type="text"
                                       name="tag" value={tag}
                                       className={'form-control' + (submitted && !tags.length ? ' is-invalid' : '')}
                                       onChange={(e) => setTag(e.target.value)}/>
                                <ConditionalInvalidFeedback
                                    condition={submitted && !tags.length}
                                    className={'invalid-feedback'}>
                                    {__("addCertificate.error.tagError")}
                                </ConditionalInvalidFeedback>
                            </FormGroup>
                        </div>
                    </div>
                    <Tags tags={tags} tagClick={(e => deleteTagClick(e, tags, setTags))}/>
                    <ControlButtons
                        loading={loading}
                        submitButtonText={__("addCertificate.button")}
                        fieldsWithData={[title, description, cost, tags.length]}/>
                    {loading && <img alt="Loader" src={smallLoader}/>}
                    {error && <div className={'alert alert-danger'}>{error}</div>}
                </form>
            </Container>
            <Footer/>
        </div>
    )
};