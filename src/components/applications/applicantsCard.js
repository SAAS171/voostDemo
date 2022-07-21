import React, { useState, useEffect } from "react";
import Button from "../shared-components/button";
import Accordion from "react-bootstrap/Accordion";
import { useSelector, useDispatch } from "react-redux";
//Bootstrap
import { Dropdown } from "react-bootstrap";

import styled from "styled-components";
//Styles
import {
    CardDiv,
    CardBody,
    Applicant,
    LabelP,
    InputP,
} from "./styles/applicantsCard";
import { H6 } from "../../styles/components/shared-components";
import Notiflix from "notiflix";
import {
    resetApplicantStatus,
    updateApplicantStatus,
    getApplicant,
} from "../../store/actions/actions";
import mailSender from "../../Mail/MailSender";
import { useHistory } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import exit from "../../assets/svg/exit.svg";

const CardInner = styled.div`
    .applicant-details {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding-right: 5px;

        @media screen and (max-width: 992px) {
            flex-direction: column;
            p {
                margin: 0 0 10px;
            }
        }
        p {
            margin: 0;
        }
        button {
            margin: 0 !important;
        }
    }
    .app-right {
        align-items: center;
        flex-direction: column;
        button:first-of-type {
            min-width: 130px;
        }
    }
    .stack-details {
        display: flex;
        flex-direction: column;
        text-align: left;
        p {
            text-align: left;
        }
    }
    .show-offer-options {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: ease-in-out 200ms all;
        pointer-events: none;
        z-index: 99;
        &.show-modal {
            opacity: 1;
            transition: ease-in-out 200ms all;
            pointer-events: all;
        }
        .close-modal {
            position: absolute;
            right: -45px;
            top: -45px;
            background-image: url(${exit});
            background-position: center;
            background-size: 60%;
            background-repeat: no-repeat;
            background-color: transparent;
            border: none;
            height: 50px;
            width: 50px;
        }
        .show-offer-options-main {
            background-color: white;
            border-radius: 8px;
            width: 500px;
            height: auto;
            padding: 30px;
            position: relative;
            text-align: center;
        }
    }
`;
const DropdownContainer = styled.div`
    .dropdown {
        border-radius: 50px;
        border: 1px solid transparent;
        &:hover {
            transition: ease-in-out 200ms;
            border: 1px solid green;
        }
    }
`;

export default function ApplicantCard(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const applicantStatus = useSelector((state) => state.applicantStatus);

    const history = useHistory();

    const { handleSchedule, setIsOpenSettings, applicant } = props;
    const [response, setResponse] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [cv, setCv] = useState([]);
    const [theJob, setTheJob] = useState(null);
    const [prevStatus, setPrevStatus] = useState("");
    const [applicationID, setapplicationID] = useState("");
    const [uid, setUid] = useState(makeid(20));
    const [applicantId, setapplicantId] = useState("");

    const [showJobOfferOptionsModal, setShowJobOfferOptionsModal] =
        useState(null);

    const currentApplicant = useSelector(
        (state) => state.currentApplicant.currentApplicant
    );
    const loading = useSelector((state) => state.currentApplicant.loading);
    const [isLoading, setIsLoading] = useState(false);
    const [collectCurrentApplicant, setCollectCurrentApplicant] =
        useState(false);

    useEffect(() => {
        if (collectCurrentApplicant) {
            console.log(
                "GETTING APPLICANT.....",
                Object.keys(currentApplicant).length
            );
            if (Object.keys(currentApplicant).length < 1) {
                console.log("NO CURRENT  APPLICANT.....");

                if (applicationID && applicantId) {
                    console.log("HAVE ALL DISPATCH.....");

                    dispatch(
                        getApplicant({ uid: applicantId, aid: applicationID })
                    );
                }
            } else {
                setCollectCurrentApplicant(false);
                console.log("CURRENT APPLICANT: ", currentApplicant);

                if (currentApplicant.a?.cvProfile) {
                    history.push({
                        pathname: "/create-offer-letter",
                        state: {
                            currentApplicant: currentApplicant,
                            job: theJob,
                        },
                    });
                } else {
                    Notiflix.Report.Failure(
                        "Something went wrong",
                        "This user hasn't provided a CV Profile needed to build an offer letter. Try sending their offer as a direct message.",
                        "close"
                    );
                }
            }
        }
    }, [applicantId, applicationID, collectCurrentApplicant]);

    useEffect(() => {
        console.log("setting loader.....");
        loading
            ? Notiflix.Loading.Dots("Starting document builder")
            : Notiflix.Loading.Remove();
        setIsLoading(loading);
    }, [loading]);

    useEffect(() => {
        console.log("setting loader.....");
        loading
            ? Notiflix.Loading.Dots("Starting document builder")
            : Notiflix.Loading.Remove();
        setIsLoading(loading);
    }, [loading]);

    useEffect(() => {
        if (currentApplicant && collectCurrentApplicant) {
            console.log("current- APPLICANT.....", currentApplicant);
            setCollectCurrentApplicant(false);
            if (currentApplicant.a?.cvProfile) {
                // history.push({
                //     pathname: "/create-offer-letter",
                //     state: { currentApplicant: currentApplicant, job: theJob },
                // });
            } else {
                Notiflix.Report.Failure(
                    "Something went wrong",
                    "This user hasn't provided a CV Profile needed to build an offer letter. Try sending their offer as a direct message.",
                    "close"
                );
            }
        }
    }, [currentApplicant]);

    useEffect(() => {
        Notiflix.Block.Dots(`#${uid}`, "Loading...");
        if (applicantStatus.loading !== applicationID) {
            Notiflix.Block.Remove(`#${uid}`);
        }
        if (applicantStatus.success === applicationID) {
            Notiflix.Notify.Success("Status Update successful");
            dispatch(resetApplicantStatus());
        } else if (applicantStatus.error !== null) {
            Notiflix.Report.Failure(
                "Something went wrong",
                applicantStatus.error.message,
                "close",
                function () {
                    dispatch(resetApplicantStatus());
                }
            );
        }
    }, [applicantStatus, applicationID]);

    useEffect(() => {
        if (response !== prevStatus && response !== "interview") {
            //dispatch status change
            const statusData = {
                id: theJob.id,
                applicationID,
                status: response,
                applicantId,
            };

            dispatch(updateApplicantStatus(statusData));
        }
        // console.log('application ID:', applicationID);
    }, [response]);

    useEffect(() => {
        if (props.applicant) {
            // console.log("PROP DATA: " , props.applicant.data() );
            const {
                applicantId,
                status,
                email,
                name,
                website,
                phone,
                cv,
                date,
                theJob,
            } = props.applicant.data();
            setEmail(email);
            setName(name);
            setWebsite(website);
            setCv(cv);
            setPhone(phone);
            setDate(date);
            setPrevStatus(status);
            setapplicantId(applicantId);
        }
    }, [props.applicant]);

    useEffect(() => {
        setTheJob(props.theJob);
        console.log("job : ", props.theJob);
    }, [props.theJob]);

    useEffect(() => {
        if (props.applicationID) {
            setapplicationID(props.applicationID);
        }
    }, [props.applicationID]);

    const sendResponse = (e) => {
        switch (e.target.getAttribute("value")) {
            // TODO email
            case "interview":
                scheduleInterviewButton();
                break;

            case "rejected":
                console.log("props.theJob:", props.theJob);
                mailSender(
                    { ...props.applicant.data(), data: props.theJob },
                    "rejected"
                );
                setResponse("rejected");
                break;
            case "accepted":
                mailSender(
                    { ...props.applicant.data(), data: props.theJob },
                    "accepted"
                );
                setResponse("accepted");
                break;
            default:
                break;
        }
    };

    function makeid(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    const seeProfile = (e) => {
        e.preventDefault();
        history.push({
            pathname: "/applicant-profile",
            state: {
                applicantId: applicantId,
                applicationId: applicationID,
                job: theJob,
            },
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("APPLICATIONID: ", applicationID);
        console.log("APPLICANTID: ", applicantId);
        history.push({
            pathname: "/recruiter-messenger",
            state: { applicantId: applicantId, applicationId: applicationID },
        });
    };
    const viewQuestions = (e) => {
        e.preventDefault();
        console.log("applicant", applicant.data());
        history.push({
            pathname: "/view-answers",
            state: {
                questions: theJob.questions,
                videos: applicant.data().videoUrls,
            },
        });
    };

    const toggleModal = (e) => {
        e.preventDefault();
        setShowJobOfferOptionsModal(true);
    };

    const instantJobOffer = (e) => {
        e.preventDefault();
        console.log("theJob: ", theJob);
        setCollectCurrentApplicant(true);
    };

    const scheduleInterviewButton = () => {
        setResponse("interview");
        handleSchedule({
            email,
            name,
            website,
            phone,
            cv,
            date,
            applicantId,
            applicationID,
            jobId: theJob.id,
        });
        if (setIsOpenSettings) {
            setIsOpenSettings(true);
        }
    };

    return (
        <>
            <CardDiv shadow={props.shadow} id={`${uid}`} status={prevStatus}>
                <CardInner>
                    <CardBody>
                        <div className="app-top" shadow={props.shadow}>
                            <div className="top-left">
                                {theJob && theJob.recruiter_image && (
                                    <img
                                        src={`${theJob.recruiter_image.url}`}
                                        alt="job"
                                    />
                                )}
                                <div>
                                    <H6>{name}</H6>
                                    {theJob ? (
                                        <p className="job-title">
                                            {theJob.jobTitle}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div>
                                <DropdownContainer>
                                    <Dropdown
                                        onToggle={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                    >
                                        <Dropdown.Toggle id="respond-toggle">
                                            {prevStatus
                                                ? prevStatus
                                                : "New Applicant"}{" "}
                                            {isDropdownOpen ? (
                                                <FiChevronUp />
                                            ) : (
                                                <FiChevronDown />
                                            )}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="respond-item">
                                                <input
                                                    type="radio"
                                                    name="respondOption"
                                                    id="1"
                                                    value="interview"
                                                    onClick={(e) =>
                                                        sendResponse(e)
                                                    }
                                                />
                                                <label
                                                    name="respondOption"
                                                    htmlFor="1"
                                                    className="checked-container"
                                                >
                                                    <span className="checked" />
                                                    Interview
                                                </label>
                                            </div>
                                            <div className="respond-item">
                                                <input
                                                    type="radio"
                                                    name="respondOption"
                                                    id="2"
                                                    value="accepted"
                                                    onClick={(e) =>
                                                        sendResponse(e)
                                                    }
                                                />
                                                <label
                                                    name="respondOption"
                                                    htmlFor="2"
                                                    className="checked-container"
                                                >
                                                    <span className="checked" />
                                                    Accept
                                                </label>
                                            </div>
                                            <div className="respond-item">
                                                <input
                                                    type="radio"
                                                    name="respondOption"
                                                    id="3"
                                                    value="rejected"
                                                    onClick={(e) =>
                                                        sendResponse(e)
                                                    }
                                                />
                                                <label
                                                    name="respondOption"
                                                    htmlFor="3"
                                                    className="checked-container"
                                                >
                                                    <span className="checked" />
                                                    Reject
                                                </label>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </DropdownContainer>
                            </div>
                        </div>
                        <Applicant>
                            <div>
                                <div className="app-left">
                                    <div className="stack-details">
                                        <div className="detail-item">
                                            <LabelP>Email Address:</LabelP>
                                            <InputP>
                                                {email ? email : ""}
                                            </InputP>
                                        </div>
                                        <div className="detail-item">
                                            <LabelP>Mobile Number:</LabelP>
                                            <InputP>
                                                {phone ? phone : ""}
                                            </InputP>
                                        </div>
                                        {/* <div className="detail-item CV">
                                            <div>
                                                <LabelP>CV Uploaded:</LabelP>
                                                <InputP>{cv && cv.name ? cv.name : ''}</InputP>
                                            </div>
                                            <a rel="noopener noreferrer" target='_blank' href={cv && cv.url ? cv.url : ''} type="primarySmall" >Download</a> 
                                        </div>  */}
                                    </div>
                                </div>
                            </div>

                            <div className="app-right">
                                <Button
                                    type="greenSmall"
                                    text="Message"
                                    onClick={sendMessage}
                                />
                                <Button
                                    type="primarySmall"
                                    text="Profile"
                                    onClick={seeProfile}
                                />
                            </div>
                        </Applicant>

                        {theJob && theJob.questions ? (
                            <div className="applicant-details">
                                <p>
                                    <b>Interview Questions submitted</b>
                                </p>
                                <Button
                                    type="primarySmall"
                                    text="View Interview"
                                    onClick={viewQuestions}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="applicant-details">
                            <p>
                                {" "}
                                <b>Schedule an interview: </b>
                            </p>
                            <Button
                                type="primarySmall"
                                text="schedule"
                                onClick={scheduleInterviewButton}
                            />
                        </div>
                        <div className="applicant-details">
                            <p>
                                {" "}
                                <b> Make a job offer: </b>
                            </p>
                            <Button
                                type="primarySmall"
                                text="Offer Job"
                                onClick={toggleModal}
                            />
                        </div>
                    </CardBody>
                    <div
                        className={`show-offer-options ${
                            showJobOfferOptionsModal ? "show-modal" : ""
                        }`}
                    >
                        <div className="show-offer-options-main">
                            <button
                                className="close-modal"
                                onClick={(e) => {
                                    setShowJobOfferOptionsModal(false);
                                }}
                            ></button>

                            <h4>Send A Job Offer</h4>
                            <br />
                            <p>How would you like to send your job offer?</p>

                            <Button
                                type="primarySmall"
                                text="Create an offer"
                                onClick={instantJobOffer}
                            />
                            <Button
                                type="primarySmall"
                                text="direct message"
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                </CardInner>
            </CardDiv>
        </>
    );
}
