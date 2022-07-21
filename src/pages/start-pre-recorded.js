import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../components/shared-components/button";
import mailSender from "../Mail/MailSender";

import { applyForVacancy, clearApplication } from "../store/actions/actions";
// import { application } from "express";

const ConfirmModal = styled.div`
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
    z-index: 9;

    &.show-modal {
        opacity: 1;
        transition: ease-in-out 200ms all;
        pointer-events: all;
    }
    .modal-box {
        position: relative;
        background-color: white;
        padding: 35px;
        max-width: 600px;
        h4 {
            padding: 0px 0 20px;
            font-size: 27px;
        }
    }
    .btns-container {
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        button {
            display: inline-block;
            width: 100%;
            margin: 0 5px;
            &.cancel-button {
                background-color: white;
                border-radius: 4px;
                border: 1px solid #dc3163;
                color: #dc3163;
                padding: 10px 25px;
                margin-right: 10px;
            }
        }
    }
`;

const StartPreRecordedQuestionsContainer = styled.div`
    min-height: calc(100vh - 540px);
    max-width: 1140px;
    margin: 0 auto 50px;
    .header-content {
        padding: 50px 0;
        position: relative;
        h1 {
            margin: 0;
            text-align: center;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
            max-width: 700px;
            margin: 50px auto;
        }
        p {
            font-size: 23px;
        }
        span {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
`;

export default function StartPreRecordedQuestions() {
    const history = useHistory();
    const dispatch = useDispatch();

    // const { jobId } = history.location.state;
    const profile = useSelector((state) => state.profile.profile);

    const [show, setShow] = React.useState(false);

    const goBack = () => {
        history.goBack();
    };

    const applicationState = useSelector((state) => state.profile.apply);
    useEffect(() => {
        if (applicationState) {
            if (applicationState?.success) {
                console.log("APPLICATION SUCCESSFULLY MADE....");
                dispatch(clearApplication());
            } else {
            }
        }
    }, [applicationState]);

    const apply = () => {
        const jobid = history?.location?.state?.jobId;
        const fa = history?.location?.state?.fullApplication;
        history.push({
            pathname: "/start-pre-recorded-interview",
            state: {
                jobId: jobid,
                fullApplication: fa,
            },
        });
    };

    const toggleModal = (e) => {
        e.preventDefault();
        console.log("TOGGLE MODAL....");
        setShow(!show);
    };

    return (
        <StartPreRecordedQuestionsContainer>
            <div className="header-content">
                <h1>
                    Employer requires pre-recorded interview questions to be
                    answered.
                </h1>
                <p>Would you like to proceed?</p>
            </div>
            <div className="btns-container">
                <Button type="primarySmall" text="YES" onClick={apply} />
                <Button type="ghostRed" text="NO" onClick={toggleModal} />
            </div>
            <p>
                *If no you cannot apply for this role, please press yes to
                continue
            </p>
            <ConfirmModal className={`${show ? "show-modal" : ""}`}>
                <div className="modal-box">
                    <h4>Confirm Selection</h4>
                    <p>
                        Please confirm you do not wish to continue with this
                        application?
                    </p>
                    <div className="btns-container">
                        <Button
                            type="primarySmall"
                            text="YES"
                            onClick={goBack}
                        />
                        <Button
                            type="ghostRed"
                            text="NO"
                            onClick={toggleModal}
                        />
                    </div>
                </div>
            </ConfirmModal>
        </StartPreRecordedQuestionsContainer>
    );
}
