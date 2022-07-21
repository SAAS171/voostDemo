import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import mic from "../assets/svg/mic.svg";
import styled from 'styled-components';
import Button from '../components/shared-components/button';
import Notiflix from 'notiflix';




const ResponsiveContainer = styled.div`

    @media screen and (max-width: 992px) { 

        header-content {
            padding: 50px 40px!important;
        }
        .test-btns,
        .btns-container{
            padding: 0 15px;
            > button{
                width: 100%!important;
            }
        }
    }
`

const StartPreRecordedInterviewContainer = styled.div`

    max-width: 1140px;
    margin: 0 auto 50px;  
    .header-content{ 
        padding: 50px 0;
        position: relative;
        max-width: 750px;
        margin: 0 auto;
        h1{
            margin: 0 0 30px;
            text-align: center;
            font-size: 28px; 
            letter-spacing: 1px;
        }
        p{
            font-size: 20px;
            margin: 15px 0;
        }
        span{
            position: absolute;
            left: 0;
            top: 50% ;
            transform: translateY( -50% );
            cursor: pointer;

        }
        ul{
            text-align: left;
            li {
                color: #243665;

            }
        }
        .test-btns{
            margin-bottom: 50px;
        }
    }

    .modal-test {
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
            p{
                margin-bottom: 40px;
                max-width: 550px;
                text-align: center;
                margin: 30px auto 50px;
            }
            img{
                max-height: 80px;
                margin-bottom: 30px;
            }
            .video-container{
                video{
                    min-height: 300px;
                    background-color: whitesmoke;
                    border-radius: 8px;
                    overflow: hidden;
                    max-width: 600px;
                }
            }
            .mic-volume{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                width: 50px;
                margin: 0 auto;
                > div{
                    border-radius: 15px;
                    width: 6px;
                    height: 100px;
                    margin: 0 3px;
                    background-color: black;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    >div.highlighter{ 
                        overflow: hidden;
                        height: 0;
                        width: 100%;
                        background-color: #6fc7ba;
                        border-radius: 150px; 
                        transition: ease-in-out 200ms all;

                    }   
                }

                > div:last-of-type,
                > div:first-of-type{ 
                    height: 30px;
                }  

                > div:nth-of-type(2),
                > div:nth-of-type(4){  
                    height: 50px;
                }

                > div:nth-of-type(3){  
                    height: 80px;
                }
 
            }
        }
    
    }


`

export default function StartPreRecordedInterview() {
    const history = useHistory();
    const { jobId, fullApplication } = history.location.state ? history.location.state : {};
    const videoElementRef = React.useRef(null)
    const [videoSrc, setVideoSrc] = useState(0);

    const [showModalCam, setShowModalCam] = useState(false)
    const [showModalMic, setShowModalMic] = useState(false)

    const [highlighters, setHighlighters] = useState([0, 0, 0, 0, 0])
    const [stream, setStream] = useState(null)
    const goBack = () => {
        history.goBack();
    }

    useEffect(() =>{ 
            if(typeof jobId == "undefined" ){
                history.push("/account")    
            }
    }, [])


    const goToConfirmStart = () => {
        history.push({ pathname: `/confirm-interview-start`, state: { jobId: jobId, fullApplication: fullApplication } });
    }

    const testCam = () => {
        console.log("TEST CAM")
        displayVideo()
        setShowModalCam(true)

    }



    const testMic = () => {
        setShowModalMic(true)
        micListener()
    }


    const displayVideo = (Timer) => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true
            })
            .then(stream => {

                return new Promise((resolve) => {
                    videoElementRef.current.srcObject = stream;
                    videoElementRef.current.play();
                    videoElementRef.current.captureStream = videoElementRef.current.captureStream || videoElementRef.current.mozCaptureStream;
                    return videoElementRef.current.onplaying = resolve();
                })
            })
            .catch((err) => {
                console.log("ERROR....", err)
                Notiflix.Report.Failure('Video Test Error', 'Please check your camera is connected and allow your browser access to the camera.', 'OK');

            });

    }

    const stopDisplayVideo = () => {
        // fixed srcObject being null with blocked permissions to use videocamera
        if (videoElementRef.current.srcObject !== null) {
            videoElementRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    }

    const stopListeningMic = () => {
        // handling mic listening if that was blocked by the permissions
        if (stream !== null) {
            stream.getTracks().forEach(track => track.stop());
        }
    }

    const closeTest = () => {
        if (showModalCam) stopDisplayVideo();
        if (showModalMic) stopListeningMic();
        setShowModalCam(false);
        setShowModalMic(false);
        // console.log("CLOSE TEST")
    }


    const micListener = () => {

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function (stream) {
                setStream(stream)
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = 0.8;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);

                javascriptNode.onaudioprocess = function () {
                    var array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    var values = 0;

                    var length = array.length;
                    for (var i = 0; i < length; i++) {
                        values += (array[i]);
                    }

                    var average = values / length;
                    colorPids(average);
                }
            })
            .catch(function (err) {
                Notiflix.Report.Failure('Mic Test Error','Please check if your microphone is connected and allow your browser access to the microphone.', 'OK');
            });
    }

    const colorPids = (vol) => {
        const h = Math.round(vol / 10) * 15;
        setHighlighters([h, h, h, h, h]);
    }

    return (
        <StartPreRecordedInterviewContainer>
            <ResponsiveContainer>
                <div className="header-content">
                    <h1>Pre-recorded interview</h1>
                    <ul>
                        <li>Ensure you look presentable for your potential employer.</li>
                        <li>Make sure to test your microphone and camera before starting your interview.</li>
                        <li>You will be timed on each question, so be sure to answer fully within the time allocated.</li>
                        <li>Once you have finished answering all of the questions, complete your application when prompted.</li>
                    </ul>
                </div>
                <div className="test-btns">
                    <Button
                        type="greenSmall"
                        text="TEST MIC"
                        onClick={testMic}
                    />
                    <Button
                        type="greenSmall"
                        text="TEST CAMERA"
                        onClick={testCam}
                    />
                </div>
                <div className="btns-container">
                    <Button
                        type="primarySmall"
                        text="Continue to employers video"
                        onClick={goToConfirmStart}
                    />
                </div>

                <div className={`modal-test ${showModalCam ? "show-modal" : ""}`}>
                    <div className="modal-box">
                        <h4>Test your Camera</h4>
                        <p>NOTE: You should be able to see yourself clearly if the camera is working. This is to avoid any visual issues during your interview.</p>
                        <div className="video-container">
                            <video type='video/mp4' id="testing" muted ref={videoElementRef} src={videoSrc}></video>
                        </div>
                        <Button
                            type="primarySmall"
                            text="CLOSE"
                            onClick={closeTest}
                        />
                    </div>
                </div>
                <div className={`modal-test ${showModalMic ? "show-modal" : ""}`}>
                    <div className="modal-box">
                        <h4>Test your Microphone</h4>
                        <p>NOTE: You should be able to hear yourself clearly if the microphone is working. This is to avoid any sound issues during your interview.</p>
                        <div className="mic-container">
                            <img src={mic} />
                        </div>
                        <div className="mic-volume">
                            {
                                highlighters.map((h, i) =>
                                    (<div key={i}><div style={{ height: h + '%' }} className="highlighter"></div></div>)

                                )
                            }
                        </div>
                        <Button
                            type="primarySmall"
                            text="CLOSE"
                            onClick={closeTest}
                        />
                    </div>
                </div>

            </ResponsiveContainer>
        </StartPreRecordedInterviewContainer>
    )

}