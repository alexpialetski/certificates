import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
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
import UserContext from "../context/UserContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const EditCertificatePage = (props) => {
    const contextType = useContext(UserContext);
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
    const [titleError, setTitleError] = useState('');
    const [costError, setCostError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    useEffect(() => {
        const certificateId = window.location.href.match(/id=\d+/)[0].slice(3);

        async function func() {
            return await certificateService.findById(contextType.user, parseInt(certificateId)).then(certificate => {
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

    const titleInput = (e) => {
        setTitle(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 30)) {
            setTitleError("Title field length must not be greater than 30 characters.");
        } else {
            setTitleError("");
        }
    };

    const descriptionInput = (e) => {
        setDescription(e.target.value);

        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 230)) {
            setDescriptionError("Description field length must not be greater than 30 characters.");
        } else {
            setDescriptionError("");
        }
    };

    const costInput = (e) => {
        setCost(e.target.value);

        const {value} = e.target;
        if (!valueGreaterOrEqualThan(parseInt(value), 0)) {
            setCostError("Cost field length must be greater than 0.");
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
        const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        const certificate = {id: certificateId, date: dateString, title, description, cost, tags};
        certificateService.editAdminCertificate(contextType.user, certificate)
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
                <h2>Add certificates</h2>
                <form name="form flex-column-left-space-around" onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="title">Title</label>
                        <input type="text"
                               className={'form-control' + (submitted && !title || titleError ? ' is-invalid' : '')}
                               name="title" value={title}
                               onChange={titleInput}/>
                        <ConditionalInvalidFeedback
                            condition={submitted && !title}
                            className={'invalid-feedback'}>
                            Title is required
                        </ConditionalInvalidFeedback>
                        <ConditionalInvalidFeedback
                            condition={titleError}
                            className={'invalid-feedback'}>
                            {titleError}
                        </ConditionalInvalidFeedback>
                    </FormGroup>
                    <DatePicker
                        dateFormat="yyyy-mm-dd"
                        selected={date}
                        onChange={date => setDate(date)}
                    />
                    <FormGroup>
                        <label htmlFor="description">Description</label>
                        <input type="text"
                               name="description" value={description}
                               className={'form-control' + (submitted && !description || descriptionError ? ' is-invalid' : '')}
                               onChange={descriptionInput}/>
                        <ConditionalInvalidFeedback
                            condition={submitted && !description}
                            className={'invalid-feedback'}>
                            Description is required
                        </ConditionalInvalidFeedback>
                        <ConditionalInvalidFeedback
                            condition={descriptionError}
                            className={'invalid-feedback'}>
                            {descriptionError}
                        </ConditionalInvalidFeedback>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="cost">cost</label>
                        <input type="number"
                               name="cost" value={cost}
                               className={'form-control' + (submitted && !cost || costError ? ' is-invalid' : '')}
                               onChange={costInput}/>
                        <ConditionalInvalidFeedback
                            condition={submitted && !cost}
                            className={'invalid-feedback'}>
                            Cost is required
                        </ConditionalInvalidFeedback>
                        <ConditionalInvalidFeedback
                            condition={costError}
                            className={'invalid-feedback'}>
                            {costError}
                        </ConditionalInvalidFeedback>
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
                                <label htmlFor="tag">Tag</label>
                                <input type="text"
                                       name="tag" value={tag}
                                       className={'form-control' + (submitted && !tags.length ? ' is-invalid' : '')}
                                       onChange={(e) => setTag(e.target.value)}/>
                                <ConditionalInvalidFeedback
                                    condition={submitted && !tags.length}
                                    className={'invalid-feedback'}>
                                    At least one tag is required
                                </ConditionalInvalidFeedback>
                            </FormGroup>
                        </div>
                    </div>
                    <Tags tags={tags} tagClick={deleteTagClick}/>
                    <div className={'mt-5 flex-row-between-center'}>
                        <button className="btn btn-lg btn-primary" disabled={loading}>Save</button>
                        <Link className="btn btn-lg btn-primary" disabled={loading} to={'/'}>Back</Link>
                    </div>
                    {loading && <img alt={'Loader'} src={smallLoader}/>}
                    {error && <div className={'alert alert-danger'}>{error}</div>}
                </form>
            </Container>
            <Footer/>
        </div>
    )
};