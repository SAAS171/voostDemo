import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button';  
import {useDispatch, useSelector} from 'react-redux';  
import audio from "../../assets/svg/audio.svg";
import video from "../../assets/svg/video.svg";
import Notiflix from 'notiflix'; 
import { GrClose } from 'react-icons/gr'

import play from "../../assets/svg/play.svg";
import {
    updateProfileBuilderVideoSrc,  
    updateUserCVData, 
    updateProfileBuilderModalVideo
} from '../../store/actions/actions'; 
import VideoRecorder from 'react-video-recorder'

import firebase from 'firebase';  
import { set } from 'date-fns';
import axios from 'axios'; 


import {auth, db, rdb, storage} from '../../firebase';

const RecordVideoModal = styled.div` 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    pointer-events: none;
    z-index: 999;
    opacity: 0;
    transition: ease-in-out 200ms all;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 992px) { 
        .video-modal-content { 
            background-color: white!important;
            border-radius: 8px!important;
            padding: 13px!important;
            text-align: center!important;
            max-width: 1200px!important;
            width: 95%!important;
            video{
                height: 350px;
            }
        }
        .testing-content p:last-of-type { 
            font-size: 15px!important; 
            padding: 0 40px!important;
        }
        .testing-content p:first-of-type { 
            font-size: 70px!important;
        }
    } 

    &.open-modal{
        transition: ease-in-out 200ms all;
        pointer-events: all;
        opacity: 1;
    } 

    .video-modal-content{
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        max-width: 1200px;
        width: 80%;
        .recordable-video{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            .timer-content,
            .testing-content{
                z-index: 99;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,0.4);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column-reverse;
                p{ 
                    &:last-of-type{
                        letter-spacing: 4px;
                        font-size: 22px;
                        font-weight: 100;
                    }
                    &:first-of-type{
                        line-height: 1;
                        font-size: 120px;
                        font-weight: 800;
                    } 
                }
            }
            #play-preview{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: transparent; 
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                height: 70px;
                width: 70px;
                border: none;
                z-index: 999;
                outline: none;

            }
            /* > *{
                height: 400px;
                width: 100%;
            } */
        }

    }

    video{ 
        background-color: black;
        height: 100%;
        width: 100%;
        margin: 0px auto;
        border-radius: 8px;
        max-height: calc(100vh - 300px);
    }
 
    .video-testing-container{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #1f1f1f;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        .video-testing{
            display: flex;
            padding: 10px;
            button {
                margin-right: 10px;
                background: transparent;
                font-size: 12px;
                color: white;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                border: none;
                img{
                    margin-bottom: 5px;
                    max-height: 20px;
                }
            }
        } 
        .video-recording{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            align-items: center;
            p{
                color: white;
                position: relative;
                padding-left: 25px;
                margin: 0;
                margin-left: 5px;
                font-size: 20px;
                &:before{
                    content: "";
                    left: 5px; 
                    background-color: green;
                    border-radius: 25px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 10px;
                    width: 10px;




                }
            }

        }
    }
    .hidden {
        display: none;
    }
`
export default function RecordModal() {
    
    const dispatch = useDispatch();   
    // var storage = firebase.storage().ref();   
    const profile       = useSelector(state => state.profile);   
    const modalState    = useSelector(state => state.profileBuilderVideoModal)
    
    const [opened, setOpened]           = useState(null);
    const [videoState, setVideoState]   = useState("initial");
    const [videoSrc, setVideoSrc]   = useState(null); 
    const [videoPlaying, setVideoPlaying]   = useState(false);
    const [videoBlob, setVideoBlob]   = useState(0);


    const [testNum, setTestNum ]   = useState(5);
    const [testState, setTestState ]   = useState(false);

    const [timerNum, setTimerNum ]   = useState(3);
    const [endingState, setEndingState ]   = useState(false);
    const [startingState, setStartingState ]   = useState(true);
    const vidType = true ? "video/webm" : "video/mp4"  
    const vidExt = true ? "webm" : "mp4"

    const [myStartInterval, setMyStartInterval ]   = useState(null); 
    // const [myEndInterval, setMyEndInterval ]   = useState(null); 
    const my_id = profile?.profile?.id;
    const videoElementRef   = React.useRef(null) 
    
    let recordingTimeMS     = 90000 // 3mins; 

    const [connectionId, setConnectionId] = useState(null)
    const [connection, setConnection] = useState(null)
    const [isConnected, setIsConnected] = useState(null) 
    const configuration = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
    const [pc, setPc] = useState(null)
    
    let wsConnection = null

    const recordVideo = () =>{  
        if(connection?.readyState ){
            video_webcam()
            setVideoState("recording")
        }else{
            console.log("NOT CONNECTED....")
        }
    }

    const stopRecordVideo = () =>{  
        // e.preventDefault();  
        if(window.video_record_timeout != null){  
            clearTimeout(window.video_record_timeout); 
            window.video_record_timeout = null
        }
        videoElementRef.current.srcObject.getTracks().forEach(track => track.stop() );  
        videoElementRef.current.srcObject = null; 
        connection.send( JSON.stringify({type: "close-rtc", connection_id:connectionId })); 
        return false;
    }
    

    useEffect(()=>{ 
        if(!modalState.open){ 
            setVideoSrc(0)
            setVideoState("initial")
            setVideoPlaying(false);
            setVideoBlob(0) 
        } 

        setOpened(modalState.open)
    }, [modalState])

    useEffect(()=>{
        if(opened){
            setPc(new RTCPeerConnection(configuration)) 
        }else if(!opened){
            if(connection != null){
                connection.send( JSON.stringify({type: "cleanup", data: my_id, connection_id:connectionId })); 
                connection.close() 
                setConnection(null);
            }
            if(pc != null){
                pc.close(); 
                setPc(null);   
            }

            if(videoElementRef.current.srcObject != null){ 
                let tracks =videoElementRef.current.srcObject.getTracks();
                if(tracks){
                    tracks.forEach(track => track.stop() );  
                }
            }
        }
    
    }, [opened])

    
    useEffect(()=>{  
        if(pc != null){
            setIsConnected(false)    
        }
    }, [pc])
     
    
    useEffect(()=>{ 
        if(!isConnected){
            setupWebSocketConnection()
        }
    }, [isConnected])
     
    



    const setupWebSocketConnection = async () => {  
        try{
            if(isConnected ===  false){

                const wsEndpoint =  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'  ?  process.env.REACT_APP_TEST_NODE_WS_ENDPOINT : process.env.REACT_APP_LIVE_NODE_WS_ENDPOINT ) 
                wsConnection = new WebSocket(wsEndpoint);

                let ws_uid  = null;
                wsConnection.onopen = () => {
                    console.log('************************ opened connection'); 
                };
            
                wsConnection.onerror = error => {
                    console.log(`An error occured: `, error)
                };
                
                wsConnection.onmessage = async message => {
                    try {
                        
                        const data = JSON.parse(message?.data);
                        console.log(`message from ${wsEndpoint}: `, data.type);
                        // console.log("data: ", data);
                
                        if(data.type == "offer"){
    
                            await pc.setRemoteDescription(data.desc);
                            const answer = await pc.createAnswer(); 
                            pc.setLocalDescription(answer) 
                            wsConnection.send(JSON.stringify({type: "offer-answer", answer,connection_id:ws_uid }))  
                            
                        }else if(data.type == "connected"){
                            
                            setTimeout(() => {
                                Notiflix.Loading.Remove();  
                            }, 5000);
                            ws_uid = data.connection_id
                            setConnectionId(data.connection_id);
                            setConnection(wsConnection);
                            setIsConnected(true) 
                            wsConnection.send( JSON.stringify({type: "connected", my_id,  vid_type: "video_intro", connection_id: data.connection_id }));  
    
    
                        }else if(data.type == "answer-accepted"){ 
                            Notiflix.Loading.Remove();
                
                        }else if(data.type == "recording-complete"){  
                            setVideoSrc( "https://" + data.url)  
                            setVideoState("complete");
                            pc.close(); 
                            wsConnection.close() 
                            setConnection(null);
                            setPc(new RTCPeerConnection(configuration))
    
                        }else{
                            console.log("other message type.... ", data.message);
                        }
                    }catch (error) {
                        console.log("ERROR HANDLING MESSAGE: " , error)
                    } 
                }
                wsConnection.onclose = function (event) {
                    var reason; 
                    if (event.code == 1000)
                        reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
                    else if(event.code == 1001)
                        reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
                    else if(event.code == 1002)
                        reason = "An endpoint is terminating the connection due to a protocol error";
                    else if(event.code == 1003)
                        reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
                    else if(event.code == 1004)
                        reason = "Reserved. The specific meaning might be defined in the future.";
                    else if(event.code == 1005)
                        reason = "No status code was actually present.";
                    else if(event.code == 1006)
                        reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
                    else if(event.code == 1007)
                        reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
                    else if(event.code == 1008)
                        reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
                    else if(event.code == 1009)
                    reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
                    else if(event.code == 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
                        reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;
                    else if(event.code == 1011)
                        reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
                    else if(event.code == 1015)
                        reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
                    else
                        reason = "Unknown reason"; 
                    console.log("The connection was closed for reason: " + reason);
                }; 
            }
        }catch(e)  {
            console.log("ERRORS ARE HERE: ", e)
        }
       
    }



    const video_webcam = () =>{ 
        // Notiflix.Loading( 'Recording Error', 'An error occurred trying to record your introduction, please try again.', 'OK' ); 

        Notiflix.Loading.Standard("Starting Video");  
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        .then(stream => { 
            Notiflix.Loading.Remove();  

            const is_playing =  new Promise( (resolve) => {

                setStartingState(true)
                let counter = 3
                let counterInerval =  setInterval(() => { 
                    setTimerNum(--counter) 
                    // console.log("INTERVAL RUNNING FOR COUNTDOWN")
                    if(counter == 0){
                        setStartingState(false);
                        setTimerNum(3)
                        counter = 3
                        clearInterval(counterInerval);
                        videoElementRef.current.srcObject = stream;
                        videoElementRef.current.muted = true;  
                        videoElementRef.current.play();  
                        return videoElementRef.current.onplaying = resolve(); 
                    }
                }, 1000);
             
            })
  
            window.video_record_timeout = setTimeout(() => { 
                if(videoElementRef.current.srcObject !== null){ 
                    let counter = 3;
                    setEndingState(true);
                    let stopInterval = setInterval(() => {
                        setTimerNum(--counter)  
                        if(videoElementRef.current.srcObject != null){ 
                            if(counter == 0){ 
                                setEndingState(false);
                                setTimerNum(3)
                                counter = 3
                                clearInterval(stopInterval);
                                stopRecordVideo();
                            }
                        }else{ 
                            setTimerNum(3)
                            counter = 3
                            clearInterval(stopInterval);
                        }
                    }, 1000);
                }

            }, 87000); // 87 SECONDS - LAST 3 SECONDS ARE COUNTED DOWN
 
            stream.getTracks().forEach(track => pc.addTrack(track, stream)); 
            connection.send(JSON.stringify( {type: "request-offer", connection_id: connectionId}));
            // console.log("SENT OFFER REQUEST AND IS PLAYING: ", is_playing) 
        }) 
        .catch((err)=>{
            console.log("ERROR....", err)
            Notiflix.Report.Failure( 'Recording Error', 'An error occurred trying to record your introduction, please try again.', 'OK' ); 
        });
    }



    const clickedStop = (e) =>{
        e.preventDefault()  
        Notiflix.Loading.Standard("Preparing Preview");   
        setEndingState(false); 
        stopRecordVideo();
    }


    const saveContinue = (e) =>{ 
        e.preventDefault(); 
        Notiflix.Loading.Dots('Saving...');
        addCVideo().then((res)=>{ 
            if(res){
                dispatch(updateProfileBuilderVideoSrc({"videoSrc": videoSrc})) 
                Notiflix.Loading.Remove();
                Notiflix.Report.Success( 'Video Introduction Saved', '', 'OK' , ()=>{
                    dispatch(updateProfileBuilderModalVideo({open: false}))
                });     
            }else{ 
                Notiflix.Notify.Failure('An error occurred saving your video please try again.');
            } 
        })
    }
    
    async function addCVideo(){ 

        if(videoSrc != null ){   
            
            Notiflix.Loading.Circle('saving video'); 
            var formData = new FormData() 
            formData.append("id", auth.currentUser.uid) 
            const endpoint =  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'  ?  process.env.REACT_APP_TEST_NODE_ENDPOINT : process.env.REACT_APP_LIVE_NODE_ENDPOINT )  + `/save-video`
            const payload = {"id" : auth.currentUser.uid} ; 
            console.log(`sending to ${endpoint} -> payload: ${payload}`)

            return axios.post(endpoint, payload , {headers:{"Content-Type": "application/json"}})
                .then(function (response) {    
                    Notiflix.Loading.Remove(); 
                    // console.log("RESPONSE.....", response.data) 
                    if(response.data.success){ 
         
                        let obj = { ...profile.profile.cvProfile, cvVideo: response.data.url }   
                        dispatch(updateUserCVData({value: obj}))
                        setVideoBlob(0) 
    
                    }else{
                        setVideoBlob(0)
                        Notiflix.Loading.Remove();
                        console.log("errors: ",  response.data.message); 
                    }

                    return response.data.success
                    
                })
                .catch(function (error) { 
                    Notiflix.Loading.Remove();
                    console.log("errors: ",  error); 
                    return false;
                });  
        }else{
            console.log('FILE TO STORE IS NULL....' );
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure('Please record a video to save.'); 
        }
 
    } 
    
    const renderControls = () =>{
        switch (videoState) {
            case "initial":
                return (
                    <div>
                        <Button type="primarySmall" text="Start Recording"   onClick={recordVideo}/>
                    </div>
                )
            case "complete":
                return (
                    <div>
                        <Button type="primarySmall" text="RE-RECORD VIDEO"   onClick={recordVideo}/>
                        <Button type="primarySmall" text="SAVE AND CONTINUE"   onClick={saveContinue}/>
                    </div>
                )
        
            default:
                break;
        }
    }
 
    const playPreview = () =>{  
        setVideoPlaying(true)   
        videoElementRef.current.muted = false; 
        videoElementRef.current.play(); 
        videoElementRef.current.onended = (e) => {    
            setVideoPlaying(false)
        };
    }

    const showPlay = () =>{
        if(videoState === "complete" && !videoPlaying){
            return ( <button id="play-preview" onClick={playPreview}><img src={play}/></button>  )
        } 
    }

    const showTest = () =>{
        if(testState){
            return (
                <div className="testing-content">
                    <p>{testNum}</p>
                    <p>If you can see your video, the test is successful</p>
                </div>
            );    
        }
        return ("");
    }

    const showTimer = () =>{
        if(endingState || startingState){
            // setVideoState("recording")
            return (
                <div className="timer-content">
                    <p>{timerNum}</p>
                    <p>{ startingState ? "Recording starting in... " : "Recording ending in... "}</p>
                </div>
            );    
        }
        return ("");
    }

    const testVideo = (e) =>{
        e.preventDefault();

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true
            })
            .then(stream => {
                setTestState(true);
                videoElementRef.current.srcObject = stream;
                videoElementRef.current.muted = true;  
                videoElementRef.current.play();  
                return new Promise(resolve => videoElementRef.current.onplaying = resolve);
            }) 
            .then( async () => {  
                let counter = 5
                let counterInerval =  setInterval(() => { 
                    setTestNum(--counter) 
                    if(counter == 0){
                        videoElementRef.current.srcObject.getTracks().forEach(track => track.stop());
                        setTestState(false);
                        setTestNum(5)
                        counter = 5
                        clearInterval(counterInerval);
                    }
                }, 1000);
                
            })
            .catch((err)=>{
                console.log("ERROR....", err)
                Notiflix.Report.Failure( 'Error', 'An error occurred trying to use webcam, please try again.', 'OK' ); 
                
            });
     
    }
    const closeModal = (e) =>{
        e.preventDefault();
        // console.log("CLOSE MODAL...", e.target.getAttribute("data-modalbg"));
        if( e.target.getAttribute("data-modalbg")){
            dispatch(updateProfileBuilderModalVideo({open: false}))
        }
    }  

    return ( 
        <RecordVideoModal onClick={closeModal} data-modalbg="yes" className={`video-record-modal ${ opened ? "open-modal" : "" } `}>
            <div className="video-modal-content">
                <div>
                    <GrClose onClick={closeModal} data-modalbg="yes" style={{ float: 'right', cursor: 'pointer', fontSize: '22px' }} />
                    <h4>Record your video introduction</h4>
                    <p>You can re record later if you aren’t happy with it</p>
                </div>
            
                <div className="recordable-video-container">
                    <div className="recordable-video">
                        {showPlay()}
                        {showTest()}
                        {showTimer()}
                        <video  type='video/mp4' controls id="recording"  muted ref={videoElementRef} src={videoSrc}></video>  
                        <div className="video-testing-container">
                            {
                                videoState == "recording" ? 
                                
                                    <div className="video-recording">   
                                        <p>Recording</p>
                                        <Button type="primarySmall" text="Stop Recording"   onClick={clickedStop}/>
                                    </div> 
                                :
                                    <div className="video-testing">
                                        {
                                            /* 
                                                <button>
                                                    <img src={audio} alt="text audio"/>
                                                    Test Audio
                                                </button>
                                            */
                                        }
                                        <button onClick={testVideo}>
                                            <img src={video} alt="text video" />
                                            Test Video
                                        </button>
                                    </div>

                            }
                        </div> 
                    </div> 
                    {renderControls()}
                </div>
            </div>
        </RecordVideoModal>
    )
}
           