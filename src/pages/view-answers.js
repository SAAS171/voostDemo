import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import Button from '../components/shared-components/button';

const ViewAnswersContainer = styled.div`

    max-width: 1140px;
    margin: 0 auto 50px;  
    padding: 100px 0;
    .questions-container{
        display: flex;
        flex-direction: column;
        .single-question{
            margin-bottom: 100px;
            text-align: left;
            p{
                margin: 0;
            }
            > div{

                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                text-align: left; 

                p{
                    text-align: left;
                }
                button{
                    width: 160px;
                    min-width: 0px;
                }
            }
            .question-text{
                width: 80%;
                padding: 14px;
                border-radius: 8px;
                border: none;
                box-shadow: 0 0 10px -3px rgb(0,0,0,.4);

                p{
                    font-size: 22px;
                    text-align: left;
                }
            }
        }
    }


    @media screen and (max-width: 992px) {

        .questions-container{
            padding: 0 15px;
            .single-question{
                margin-bottom: 15px;
                > div{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    * {
                        margin-bottom: 10px;
                        width: 100%!important;
                    }
                }
            }
        }

    }

`


const VideoModal = styled.div` 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.7);
    pointer-events: none;
    opacity: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    &.show-modal{
        pointer-events: all;
        opacity: 1;
    }
    > div{
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        display: flex;
        flex-direction: column;
        video{
            width: 700px;
            border-radius: 8px;
            background-color: whitesmoke;
            overflow: hidden;
        }
    }


    @media screen and (max-width: 992px) {
        padding: 5px;
        > div{ 
            width: 100%;
            max-width: 100vw;
            padding: 10px;
        }
        video {    
            width: 100%!important;
        }
    }

    
`

export default function ViewAnswers() {
    const history = useHistory();
    const { questions, videos } = history.location.state;
    const [videoSrc, setVideoSrc] = useState(0);
    const [showModal, setShowModal] = useState(false);

    console.log("questions....", questions)

    const goBack = () => {
        history.goBack();
    }
    const play = (id) => {
        // const question = questions.find(q => q.id === id)
        console.log("play....", videos)
        setVideoSrc(videos[id]);
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
        setVideoSrc("");

    }

    // This snippet allows to check if the user using Safari 3.0+ browser
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

    return (
        <ViewAnswersContainer>
            <div className="questions-container">
                {
                    questions.map((q, i) => {
                        return (
                            <div key={i} className="single-question">
                                <p>Question {i + 1}</p>
                                <div>
                                    <div className="question-text">
                                        <p>{q.question}</p>
                                    </div>
                                    <Button
                                        data-id={q.id}
                                        type="greenSmall"
                                        text="Play"
                                        onClick={e => play(q.id)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="btn-container">
                    <Button
                        type="primarySmall"
                        text="BACK"
                        onClick={goBack}
                    />
                </div>
            </div>
            <VideoModal className={`${showModal ? "show-modal" : ""}`}>
                <div>
                    <video type='video/mp4' controls="true" playsInline id="view-answer" src={videoSrc}></video>
                    {isSafari ? 
                        (<div>Video doesn't play? <a href={videoSrc} target="_blank" type="primarySmall">Download the video</a> </div>) : null
                    }
                    <br />
                    <Button
                        type="primarySmall"
                        text="Close"
                        onClick={closeModal}
                    />
                </div>
            </VideoModal>
        </ViewAnswersContainer>
    )

}
