import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getApplicant } from "../../store/actions/actions";
import styled from "styled-components";
import Button from "../shared-components/button";
import document from "../../assets/svg/document.svg";

import Notiflix from "notiflix";
import CvPreview from "../applicant-preview/cv-preview";

import exit from "../../assets/svg/exit.svg";

import play from "../../assets/svg/play.svg";

const ApplicantProfileContainer = styled.div`
    max-width: 100%;
    width: 100%;
    padding: 100px 0;
    margin: 0 0 0 auto;
    text-align: left;

    @media screen and (max-width: 992px) {
        .applicant-profile-header button {
            position: absolute;
            left: 15px;
            border: none;
            background-color: white;
            top: -30px;
        }

        .cv-preview-container {
            .video-intro-container {
                display: none;
            }
        }

        max-width: 100vw;
        width: auto;

        .applicant-profile-mainHeader {
            > p {
                flex-direction: column;
                button {
                    margin-top: 20px;
                }
            }
        }
    }

    .applicant-profile-header {
        text-align: center;
        position: relative;
        margin-bottom: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid lightgrey;
        button {
            position: absolute;
            left: 15vw;

            border: none;
            background-color: white;
        }
    }
    .applicant-profile-main {
        max-width: 1400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        flex-direction: column;
        .cv-preview-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: flex-start;
            .video-intro-container {
                width: 450px;
                background: whitesmoke;
                padding: 10px 15px 10px;
                border-radius: 8px;
                position: relative;
                border: 1px solid #6fc7ba;
                cursor: pointer;
                box-shadow: 0 0 13px 0px rgba(0, 0, 0, 0.5);
                .play-button {
                    border: none;
                    left: 50%;
                    top: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    height: 80px;
                    width: 80px;
                    background-color: transparent;
                    background-image: url(${play});
                    position: absolute;
                    flex-shrink: 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                    pointer-events: none;
                    &.isplaying {
                        opacity: 0;
                    }
                }
                video {
                    width: 100%;
                }
                p {
                    font-size: 12px;
                    margin-bottom: 5px;
                }
            }
        }
        .applicant-profile-mainHeader {
            width: 100%;
            max-width: 1400px;
            p {
                font-size: 19px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                span {
                    margin: 0 !important;
                }
            }
        }

        .applicant-profile-noContent {
            display: flex;
            flex-direction: column;
            align-items: space-around;
            justify-content: space-around;
            padding-top: 100px;
            padding-left: 50px;
            padding-right: 50px;
            padding-bottom: 100px;

            & > p {
                font-size: 24px;
                text-align: justify;
                text-justify: inter-word;
            }
        }

        @media screen and (max-width: 992px) {
            display: flex;
            flex-direction: column;
            align-items: space-around;
            justify-content: space-around;
            padding-top: 50px;
            padding-bottom: 50px;
        }
    }
`;

const OfferModal = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    pointer-events: none;
    opacity: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 992px) {
        padding: 25px;
        .close-modal {
            right: -35px !important;
            top: -35px !important;
            background-size: 30% !important;
        }
        .offer-modal-box {
            .offer-options {
                flex-direction: column;
                margin: 10px 0;
            }
            .single-offer-option {
                padding: 10px !important;
                width: 100% !important;
                margin-bottom: 15px !important;
                img {
                    width: 30px !important;
                    height: 60px !important;
                }
                .offer-option-content {
                    margin-top: 10px !important;
                    padding-top: 10px !important;
                }
            }
        }
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

    &.show-modal {
        pointer-events: all;
        opacity: 1;
    }
    > div {
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        position: relative;
        .offer-options {
            margin: 50px 0;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            > div.single-offer-option {
                box-shadow: 0 0 14px 0px rgba(0, 0, 0, 0.4);
                padding: 30px;
                width: calc(50% - 15px);
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border: 1px solid transparent;
                transform: none;
                transition: ease-in-out 200ms all;
                &.selected {
                    border: 1px solid #6fc7ba;
                    transform: scale(1.05);
                    transition: ease-in-out 200ms all;
                }
                img {
                    width: 100px;
                    height: 85px;
                    object-fit: contain;
                    pointer-events: none;
                }
                .offer-option-content {
                    margin-top: 30px;
                    padding-top: 30px;
                    border-top: 1px solid lightgrey;
                    pointer-events: none;
                    > * {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
        .offer-option-content {
        }
    }
`;

export default function ApplicantProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const myJobs = useSelector(state => state.my_jobs.my_jobs);
    const [modalState, setModalState] = useState(false);
    const [offerTypeState, setOfferTypeState] = useState("");
    const [status, setStatus] = useState("");
    const currentApplicant = useSelector(
        (state) => state.currentApplicant.currentApplicant
    );
    const loading = useSelector((state) => state.currentApplicant.loading);

    const [selectedTile, setSelectedTile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { applicantId, applicationId, job } = history.location.state;

    useEffect(() => {
        console.log("GETTING APPLICANT.....", currentApplicant);
        dispatch(getApplicant({ uid: applicantId, aid: applicationId }));
    }, []);

    useEffect(() => {
        // console.log("current- APPLICANT.....",currentApplicant )
        if (
            currentApplicant &&
            currentApplicant.b &&
            currentApplicant.b.status
        ) {
            setStatus(currentApplicant.b.status);
        }
    }, [currentApplicant]);

    useEffect(() => {
        console.log("setting loader.....");

        loading
            ? Notiflix.Loading.Dots("Loading Profile")
            : Notiflix.Loading.Remove();
        setIsLoading(loading);
    }, [loading]);

    useEffect(() => {
        setSelectedTile(offerTypeState);
    }, [offerTypeState]);

    const offerModalChange = (e) => {
        e.preventDefault();
        setModalState(!modalState);
        setOfferTypeState("");
    };

    const typeSelect = (e) => {
        e.preventDefault();
        setOfferTypeState(e.target.id);
    };

    const createDocument = (e) => {
        e.preventDefault();
        setModalState(false);
        if (offerTypeState == "contract") {
            console.log("CONTRACT SELECTED SHOW ROUTE....", job);
            history.push({
                pathname: "/create-contract",
                state: { currentApplicant: currentApplicant, job: job },
            });
        } else if (offerTypeState == "offer") {
            console.log(
                "OFFER SELECTED currentApplicant....",
                currentApplicant
            );
            console.log("OFFER SELECTED job....", job);
            history.push({
                pathname: "/create-offer-letter",
                state: { currentApplicant: currentApplicant, job: job },
            });
        }
    };

    return (
        <ApplicantProfileContainer>
            <div className="applicant-profile-header">
                <div className="header-inner-applicant">
                    <button
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        Back
                    </button>
                    <h1>Candidate Profile</h1>
                </div>
            </div>
            <div className="applicant-profile-main">
                <div className="applicant-profile-mainHeader">
                    <p>
                        <span>
                            Candidate Status: <b>{status}</b>
                        </span>

                        {currentApplicant?.a?.cvProfile != null ? (
                            <Button
                                type="primarySmall"
                                text="SEND OFFER"
                                onClick={offerModalChange}
                            />
                        ) : (
                            ""
                        )}
                    </p>
                </div>
                {currentApplicant &&
                currentApplicant.a &&
                currentApplicant.a.cvProfile ? (
                    <div className="cv-preview-container">
                        {isLoading ? (
                            ""
                        ) : (
                            <CvPreview applicantData={currentApplicant} />
                        )}
                    </div>
                ) : (
                    <div className="applicant-profile-noContent">
                        <p textAlign="center">
                            The candidate hasn’t yet completed their profile
                        </p>
                    </div>
                )}
            </div>

            <OfferModal
                className={`${modalState ? "show-modal" : ""} offer-modal`}
            >
                <div className="offer-modal-box">
                    <button
                        className="close-modal"
                        onClick={offerModalChange}
                    ></button>
                    <h4>What type of contract do you want to send?</h4>
                    <div className="offer-options">
                        <div
                            className={`${
                                selectedTile == "offer" ? "selected" : ""
                            } single-offer-option`}
                            id="offer"
                            onClick={typeSelect}
                        >
                            <img src={document} alt="formal offer" />
                            <div className="offer-option-content">
                                <h5>Formal Job Offer</h5>
                                <p>Send a job offer to a candidate.</p>
                            </div>
                        </div>
                        <div
                            className={`${
                                selectedTile == "contract" ? "selected" : ""
                            } single-offer-option`}
                            id="contract"
                            onClick={typeSelect}
                        >
                            <img src={document} alt="formal contract" />
                            <div className="offer-option-content">
                                <h5>Employment Contract</h5>
                                <p>
                                    Create a contract for your company to send
                                    to employees.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <Button
                            type="primarySmall"
                            text="NEXT"
                            onClick={createDocument}
                        />
                    </div>
                </div>
            </OfferModal>
        </ApplicantProfileContainer>
    );
}
