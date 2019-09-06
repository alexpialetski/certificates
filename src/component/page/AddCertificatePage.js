import React, {useContext, useState} from 'react';
import {valueGreaterOrEqualThan} from "../../validation/FormValidation";
import {Header} from "./part/Header";
import Container from "../core/Container";
import FormGroup from "../core/form/FormGroup";
import ConditionalInvalidFeedback from "../core/form/ConditionalFeedback";
import img from "../../resources/images/welcome.jpg"
import smallLoader from "../../resources/images/smallLoader.gif"
import {Footer} from "./part/Footer";
import Tags from "../core/homepage/certificate/Tags";
import {certificateService} from "../../service/certificates.service";
import UserContext from "../context/AppContext";
import ControlButtons from "../core/form/ControlButtons";
import FormInput from "../core/form/FormInput";

export const AddCertificatePage = (props) => {
    const contextType = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [costError, setCostError] = useState('');

    const titleInput = (e) => {
        setTitle(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 30)) {
            setTitleError(__("addCertificate.error.titleError"));
        } else {
            setTitleError("");
        }
    };

    const descriptionInput = (e) => {
        setDescription(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 230)) {
            setDescriptionError(__("addCertificate.error.descriptionError"));
        } else {
            setDescriptionError("");
        }
    };

    const costInput = (e) => {
        setCost(e.target.value);

        const {value} = e.target;
        if (!valueGreaterOrEqualThan(parseInt(value), 0)) {
            setCostError(__("addCertificate.error.costError"));
        } else {
            setCostError("");
        }
    };

    const addTagClick = () => {
        tags.push(tag);
        setTags([...tags]);
        setTag('');
    };

    const deleteTagClick = (e) => {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === e.target.value) {
                tags.splice(i, 1);
                break;
            }
        }
        setTags([...tags]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!(title && description && cost && tags.length)
            || descriptionError || titleError || error) {
            return;
        }

        const certificate = {title, description, cost, tags};
        certificateService.createAdminCertificate(contextType.user, certificate)
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
                            onChange={titleInput}
                            source={title}
                            sourceError={titleError}
                            submitted={submitted}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="description">{__("addCertificate.description.label")}</label>
                        <FormInput
                            onChange={descriptionInput}
                            source={description}
                            sourceError={descriptionError}
                            submitted={submitted}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="cost">{__("addCertificate.cost.label")}</label>
                        <FormInput
                            onChange={costInput}
                            source={cost}
                            sourceError={costError}
                            submitted={submitted}/>
                    </FormGroup>
                    <div className="container">
                        <div className="row">
                            <div className={'col-md-3'}>
                                <button
                                    type="button"
                                    onClick={addTagClick}
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
                    <Tags tags={tags} tagClick={deleteTagClick}/>
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