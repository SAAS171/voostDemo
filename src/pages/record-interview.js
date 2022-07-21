import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/shared-components/button";
import Notiflix from "notiflix";
import firebase from "firebase";
import { auth, storage } from "../firebase";
import { applyForVacancy } from "../store/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import mailSender from "../Mail/MailSender";

import ReactPixel from "react-facebook-pixel";
import axios from "axios";
import { startTime } from "express-pino-logger";

const RecordInterviewContainer = styled.div`
    max-width: 1140px;
    margin: 0 auto 50px;

    .questions-to-answer {
        display: grid;
        align-items: flex-start;
        padding: 50px 0;
        > * {
            grid-column: 1;
            grid-row: 1;
        }
        video {
            border-radius: 8px;
        }
        .single-question {
            display: flex;
            flex-direction: column;
            opacity: 0;
            transition: ease-in-out 200ms all;
            pointer-events: none;
            &.show-question {
                transition-delay: 100ms;
                opacity: 1;
            }
            .question-box-container {
                padding-right: 120px;
                position: relative;
                text-align: left;
                span {
                    font-size: 20px;
                    display: block;
                    margin-bottom: 10px;
                    margin-left: 0 !important;
                }
                .question-box {
                    width: 100%;
                    padding: 19px;
                    border-radius: 8px;
                    border: NONE;
                    box-shadow: 0 0 10px -3px rgb(0, 0, 0, 0.4);
                    margin: 0;
                    p {
                        margin: 0;
                        font-size: 20px;
                    }
                }
                .timer {
                    border-radius: 50px;
                    height: 80px;
                    width: 80px;
                    position: absolute;
                    right: 0;
                    text-align: center;
                    bottom: 0;
                    overflow: hidden;
                    background-color: #6fc7ba;
                    color: white;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span {
                        margin: 0;
                    }
                }
            }
        }
    }
    .thankyou-inner {
        padding: 100px 0;
    }

    @media screen and (max-width: 992px) {
        .questions-to-answer {
            .single-question {
                padding: 0 15px;
                .question-box-container {
                    padding: 90px 0 0 !important;
                    .timer {
                        left: 0;
                        margin: 0 auto;
                        top: 0px;
                    }
                }
            }
        }
        .video-container {
            max-width: 100%;
            padding: 0 15px;
            video {
                border-radius: 8px;
                overflow: hidden;
                width: 100%;
            }
        }
    }
`;

export default function RecordInterview() {
    const history = useHistory();
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.profile);
    const { jobId, fullApplication } = history.location.state;

    var storage = firebase.storage().ref();
    const [questions, setQuestions] = useState(fullApplication.job.questions);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const videoElementRef = React.useRef(null);
    const [videoSrc, setVideoSrc] = useState(0);
    const [questionVideos, setQuestionVideos] = useState([]);
    const [questionsComplete, setQuestionsComplete] = useState(false);
    const [currentTimer, setCurrentTimer] = useState(questions[0].timer);
    const [showNextButton, setShowNextButton] = useState(false);
    const my_id = profile?.id;

    const [questionInterval, setQuestionInterval] = useState(null);

    const [connectionId, setConnectionId] = useState(null);
    const [connection, setConnection] = useState(null);
    const [pc, setPc] = useState(null);

    const constraints = { audio: true, video: true };
    const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    useEffect(() => {
        setPc(new RTCPeerConnection(configuration));
        console.log("TOTAL QUESTIONS: ", questions.length);
        return () => {
            stopRecordVideo();
            setPc(null);
            if (connection != null) {
                connection.send(JSON.stringify({ type: "q-cleanup" }));
                setConnection(null);
                setConnectionId(null);
            }
            console.log("STOPPED VIDEO...cleaned up");
        };
    }, []);

    useEffect(() => {
        if (pc !== null) {
            console.log("BUILD or REBUILD CONNECTION: ", connection);
            setupWebSocketConnection();
        }
    }, [pc]);

    useEffect(() => {
        if (connection !== null) {
            recordVideo();
        }
    }, [connection]);

    useEffect(() => {
        if (questionsComplete) {
            completeApplication();
        }
    }, [questionsComplete]);

    const forceStartNext = () => {
        setActiveQuestion(activeQuestion + 1);
    };

    useEffect(() => {
        console.log("activeQuestion CHANGED......");

        if (activeQuestion === 0) return;

        if (questions.length <= activeQuestion) {
            console.log("SEND APPLICATION.....");
            sendApplication();
        } else {
            console.log("NEXT QUESTION.... ", questions[activeQuestion]);

            setCurrentQuestion(questions[activeQuestion]);
            setCurrentTimer(questions[activeQuestion].timer);
            resetPeerConnection();
        }
    }, [activeQuestion]);

    const next = () => {
        console.log("NEXT.... AND ALSO STOP RUNNING VIDEO..");

        stopRecordVideo().then(() => {
            clearInterval(questionInterval);
            connection.send(
                JSON.stringify({
                    type: "q-close-rtc",
                    connection_id: connectionId,
                })
            );
            Notiflix.Loading.Standard("Loading Next Question");
        });
    };

    const resetPeerConnection = async () => {
        console.log(" STOP RUNNING..");
        pc.close();

        setConnection(null);
        setPc(new RTCPeerConnection(configuration));

        return;
    };

    const stopRecordVideo = async () => {
        if (
            videoElementRef.current &&
            videoElementRef.current.srcObject != null
        ) {
            videoElementRef.current.srcObject
                .getTracks()
                .forEach((track) => track.stop());
            videoElementRef.current.srcObject = null;
        }
        return;
    };

    const sendApplication = async () => {
        var videoUrls = {};
        const BreakException = {};
        try {
            const endpoint =
                (!process.env.NODE_ENV || process.env.NODE_ENV === "development"
                    ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                    : process.env.REACT_APP_LIVE_NODE_ENDPOINT) +
                `/save-question-videos`;

            console.log("endpoint: ", endpoint);
            axios
                .post(
                    endpoint,
                    { jobId, myId: auth.currentUser.uid },
                    { headers: { "Content-Type": "application/json" } }
                )
                .then(async function (response) {
                    console.log("RESPONSE.....", response.data);
                    if (response.data.success) {
                        videoUrls = response.data.urls;

                        if (
                            Object.keys(videoUrls).length === questions.length
                        ) {
                            fullApplication.applyData.videoUrls = videoUrls;
                            dispatch(
                                applyForVacancy(
                                    fullApplication.applyData,
                                    fullApplication.id,
                                    fullApplication.recruiter,
                                    fullApplication.job
                                )
                            );
                            mailSender(
                                {
                                    name: profile.name,
                                    email: profile.email,
                                    data: fullApplication.job,
                                },
                                "jobApplication"
                            );
                            setQuestionsComplete(true);
                            Notiflix.Loading.Remove();
                        } else {
                            Notiflix.Loading.Remove();
                            Notiflix.Report.Failure(
                                "An error occurred",
                                "We could not save your videos, please try again.",
                                "Close",
                                () => {
                                    console.log("GO BACK TO JOB");
                                    history.push("/jobs");
                                }
                            );
                        }
                    } else {
                        throw BreakException;
                        console.log("errors: ", response.data.message);
                    }
                })
                .catch(function (error) {
                    throw BreakException;
                });
        } catch (e) {
            console.log("STORING VIDEO RETURNED FALSE ");
            if (e !== BreakException) throw e;
            Notiflix.Loading.Remove();
            Notiflix.Report.Failure(
                "Duplicate Application",
                "Two applications cannot be made by the same person.",
                "Close",
                () => {
                    console.log("GO BACK TO JOB");
                    history.push("/jobs");
                }
            );
        }
    };

    const completeApplication = () => {
        console.log("finish..... show application review page....");
        ReactPixel.trackCustom("SubmitApplication", {});
        history.push("/review-application");
    };

    const setupWebSocketConnection = async () => {
        // console.log("SETTING UP CONNECTION FOR SOCKETS: ", isConnected)

        const wsEndpoint =
            !process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_TEST_NODE_WS_ENDPOINT
                : process.env.REACT_APP_LIVE_NODE_WS_ENDPOINT;
        let wsconnection = new WebSocket(wsEndpoint);
        let ws_uid = null;
        let retryCounter = 0;
        let alreadyFailedRetry = false;
        wsconnection.onopen = () => {
            console.log(
                "OPENED CONNECTION ************************You are now connected!"
            );
            // setConnection(wsconnection)
        };

        wsconnection.onerror = (error) => {
            console.log(`An error occured: `, error);
        };

        wsconnection.onmessage = async (message) => {
            // console.log("message: ", message);
            try {
                const data = JSON.parse(message.data);
                // console.log("data: ", data);
                console.log(`message from ${wsEndpoint}: `, data.type);

                if (data.type == "q-offer") {
                    console.log("data description: ", data.desc);
                    await pc.setRemoteDescription(data.desc);

                    const answer = await pc.createAnswer();
                    pc.setLocalDescription(answer);
                    wsconnection.send(
                        JSON.stringify({
                            type: "q-offer-answer",
                            answer,
                            connection_id: ws_uid,
                        })
                    );

                    console.log("ws_uid", ws_uid);
                    console.log("ANSWER TO SEND....", answer);
                    console.log(" STATE: ", pc.connectionState);
                } else if (data.type == "q-answer-accepted") {
                    // RTC PEER CONNECTION ANSWER AUTOMATICALLY STARTS RECORDING NOW.....

                    Notiflix.Loading.Remove();
                    console.log(
                        "timer after accept..::",
                        questions[activeQuestion].timer * 1000
                    );
                    startTimer(wsconnection, ws_uid);
                } else if (data.type == "q-recording-complete") {
                    console.log("WE HAVE COMPLETED SAVING THE RECORDING....");
                    forceStartNext();
                    setShowNextButton(false);
                } else if (data.type == "connected") {
                    ws_uid = data.connection_id;
                    setConnectionId(data.connection_id);
                    setConnection(wsconnection);
                    wsconnection.send(
                        JSON.stringify({
                            type: "q-connected",
                            my_id,
                            vid_type: "question",
                            connection_id: data.connection_id,
                            jobId: jobId,
                            ansId: currentQuestion.id,
                        })
                    );
                } else if (data.type == "q-retry-answer") {
                    ++retryCounter;
                    if (retryCounter > 3) {
                        if (!alreadyFailedRetry) {
                            alreadyFailedRetry = true;
                            Notiflix.Report.Failure(
                                "Connection error",
                                "There was an error connecting your camera to our server, please re-apply for this job.",
                                "retry",
                                () => {
                                    console.log("RESTART CONNECTIONS...");
                                    setPc(new RTCPeerConnection(configuration));
                                }
                            );
                        } else {
                            Notiflix.Report.Failure(
                                "Please try again later",
                                "Unable to complete your application, please try again later. ",
                                "Return to account",
                                () => {
                                    console.log("Returning to account..");
                                    history.push("/account");
                                }
                            );
                        }
                    } else {
                        wsconnection.send(
                            JSON.stringify({
                                type: "q-offer-answer",
                                answer: pc.localDescription,
                                connection_id: ws_uid,
                            })
                        );
                        console.log("RETRYING RTC ANSWER....");
                    }
                } else {
                    console.log("wsconnection message.... ", data.message);
                }
            } catch (error) {
                console.log("ERROR HANDLING MESSAGE: ", error);
            }
        };
    };

    const startTimer = (wsconnection, conid) => {
        let countdown = currentTimer;
        console.log("STARTING TIMER FOR QUESTION.......", currentTimer);
        const localQuestionInterval = setInterval(() => {
            countdown = countdown - 1;
            setCurrentTimer(countdown);
            console.log("COUNTDOWN is at ", countdown);

            if (countdown == 0) {
                console.log("COUNTDOWN AT 0 ", countdown);
                Notiflix.Loading.Circle("SAVING ANSWER");
                console.log("connectionId:", conid);

                stopRecordVideo().then(() => {
                    wsconnection.send(
                        JSON.stringify({
                            type: "q-close-rtc",
                            connection_id: conid,
                        })
                    );
                    clearInterval(localQuestionInterval);
                });
            }
        }, 1000);

        setQuestionInterval(localQuestionInterval);
    };

    const recordVideo = () => {
        videoElementRef.current.setAttribute("autoPlay", "");
        videoElementRef.current.setAttribute("muted", "");
        // videoElementRef.current.setAttribute('playsInline', '');
        // videoElementRef.current.play();

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                const is_playing = new Promise((resolve) => {
                    videoElementRef.current.srcObject = stream;
                    return (videoElementRef.current.onplaying = resolve());
                });

                console.log("PEER CONNECTION STATE: ", pc.connectionState);
                stream
                    .getTracks()
                    .forEach((track) => pc.addTrack(track, stream));

                const offerData = {
                    type: "q-request-offer",
                    vid_type: "question",
                    my_id: my_id,
                    jobId: jobId,
                    ansId: currentQuestion.id,
                    connection_id: connectionId,
                };
                setShowNextButton(true);
                connection.send(JSON.stringify(offerData));
                console.log("SENT OFFER REQUEST AND IS PLAYING: ", offerData);
            })
            .catch((err) => {
                console.log("ERROR....", err);
                Notiflix.Report.Failure(
                    "Recording Error",
                    "An error occurred trying to record your introduction, please try again.",
                    "OK"
                );
            });
    };

    return (
        <RecordInterviewContainer>
            {!questionsComplete ? (
                <>
                    <div className="questions-to-answer">
                        {questions.map((q, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`single-question ${
                                        activeQuestion === i
                                            ? "show-question"
                                            : ""
                                    }`}
                                >
                                    <div className="question-box-container">
                                        <span>Question {i + 1}</span>
                                        <div className="question-box">
                                            <p>{q.question}</p>
                                        </div>
                                        <div className="timer">
                                            <span>{currentTimer}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="video-container">
                        <video
                            type="video/mp4"
                            id="recording"
                            playsInline
                            autoPlay
                            muted
                            ref={videoElementRef}
                            src={videoSrc}
                        ></video>
                    </div>
                    <div>
                        <div className="btns-container">
                            {showNextButton ? (
                                <Button
                                    type="primarySmall"
                                    text="NEXT QUESTION"
                                    onClick={next}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="thankyou-contianer">
                    <div className="thankyou-inner">
                        <h1>
                            Thank you for completing your pre-recorded
                            interview.
                        </h1>
                        <p>This has been added to your application.</p>
                        <div>
                            <Button
                                type="primarySmall"
                                text="COMPLETE APPLICATION"
                                onClick={completeApplication}
                            />
                        </div>
                    </div>
                </div>
            )}
        </RecordInterviewContainer>
    );
}
