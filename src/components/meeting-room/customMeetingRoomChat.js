import React, {useRef, useState, useCallback, useEffect} from 'react';
import Button from '../shared-components/button'; 
 import {useSelector } from 'react-redux';  
import styled from 'styled-components';   

import {auth, db, rdb, storage} from '../../firebase';

import upload from "../../assets/svg/upload.svg";
import  send from "../../assets/svg/send-note.svg";
 
import { v4 as uuidv4 } from 'uuid';
import Notiflix from 'notiflix';  
import {useHistory} from 'react-router-dom'; 


const MessengerContainer = styled.div` 
    max-width: 1140px;
    margin: 0 auto 50px;  
    padding: 15px;
    .header-content{
        padding: 50px 0;
        position: relative;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 50px;
        h1{
            margin: 0;
            text-align: center;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        span{
            position: absolute;
            left: 0;
            top: 50% ;
            transform: translateY( -50% );
            cursor: pointer;

        }
    } 

    .room-messenger-container{
          
        display: flex; 

        .room-users{
            max-width: 300px;
            padding: 25px 10px  25px 0px;
            border-right: 2px solid lightgrey;
            margin-right: 10px;

            .title-container p {
                font-size: 26px;
                font-weight: 400; 
                color: #555E82;
                letter-spacing: 2px; 
            }

            ul {
                padding: 0;
                list-style: none;
                display: flex;
                align-items: center;
                justify-content:flex-start;
                flex-direction: column;
                max-width: 90%;
                li{
                    width: 100%;
                    font-size: 18px;
                    margin-bottom: 10px;
                    box-shadow: 2px 3px 13px -3px rgba(0,0,0,.4);
                    padding: 10px 5px;
                    border-radius: 6px;
                    font-weight: 700;
                    color: #555E82;
                    text-transform: capitalize;
                }
            }
        }
        .room-chat{
            display: flex;
            flex-direction: column;  
            width: 100%;
            padding: 0 30px;
            align-items: center;
            justify-content: flex-end;
            .messages-list{ 
                max-height: 400px;
                overflow: scroll;
                width: 100%;
                flex-direction: column-reverse; 
                display: flex;
                .single-message{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    max-width: 100%;
                    padding: 0 90px;

                    margin-bottom: 50px;
                    &.not-my-message{
                    
                        .avatar{
                            right: 0;
                            left: auto!important;
                        }
                        .message-datetime{ 
                            left: 0!important;
                            text-align: left; 
                            right: auto!important;
                        }

                        .message-sender{
                            text-align: right;   
                        }
                    }

                    .message-sender{
                        margin-bottom: 0;
                        text-align: left;
                        color: grey;
                        font-weight: 600;
                        text-transform: capitalize;
                    }
                    .message-content{
                        padding: 10px;
                        text-align: left;
                        box-shadow: 0 0 10px 1px rgba(0,0,0,.2);
                        border-radius: 4px;
                        margin-top: 6px;
                        p{
                            margin: 0;
                        }

                    }
                    .message-datetime{ 
                        position: absolute;
                        right: 0px;
                        top: 35px;
                        width: 80px;
                        font-size: 12px;
                        text-align: right;
                        display: flex;
                        flex-direction: column;
                    }
                    .avatar{
                        position: absolute;
                        left: 0;
                        top: 15px;
                        border-radius: 50px;
                        height: 70px;
                        width: 70px;
                        background-color: #6FC7BA;
                        color: white ;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-transform: uppercase;
                        p{
                            font-size: 30px;
                            margin: 0;
                        }
                    }
                }   
            }
            .messenger-form{
                width: 100%; 
                position: relative; 
                display: flex;
                justify-content: flex-start;
                
                form{
 
                    width: 100%;
                    input{
                        width: 100%;
                        line-height: 1.7;
                        font-size: 18px;
                        padding: 10px;
                        border-radius: 6px;
                        border: none;
                        box-shadow: 2px 2px 11px -3px rgba(0,0,0,.5);
                        outline: none;
                        padding-right: 100px;
                    }
                    button{
                        position: absolute;
                        right: 0px;
                        width: 50px;
                        height: 100%;
                        background-color: transparent;
                        color: transparent;
                        font-size: 0;
                        border: none;
                        background-image: url(${send});
                        background-size: 40%;
                        background-position: center;
                        background-repeat: no-repeat;
                        outline: none;
                        &:before{
                            content: "";
                            position: absolute;
                            left: 0;
                            height: 50%;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 1px;
                            background-color: lightgrey;
                        } 
                    }
                    label{
                        position: absolute;
                        right: 50px;
                        width: 50px;
                        height: 100%;
                        background-color: transparent;
                        color: transparent;
                        font-size: 0; 
                        background-image: url(${upload});
                        background-size: 25%;
                        background-position: center;
                        background-repeat: no-repeat;
                        cursor: pointer;
                    }

                }
            }
        }
    }
    .preview-file-modal{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: ease-in-out 200ms all;
        pointer-events: none;
        z-index: 9999;
        &.show-preview-modal{ 
            opacity: 1;
            transition: ease-in-out 200ms all;
            pointer-events: all;
        }

        .preview-file-upload-container{
            background-color: white;
            border-radius: 8px;
            width: 500px;
            height: auto;
            padding: 30px;
            iframe{
                width: 100%;
                height: 450px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                border-radius: 8px;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .btn-container{
            margin-top: 15px;
            button{
                margin: 0;
                &.cancel-button{
                    background-color: white;
                    border-radius: 4px;
                    border: 1px solid #DC3163;
                    color: #DC3163;
                    padding: 10px 25px;
                    margin-right: 10px;
                }

            } 
        }
    }
    .hidden {
        display: none;
    }

    @media screen and (max-width: 992px) {
        .preview-file-modal .preview-file-upload-container {
            padding: 30px;
        }
        .avatar{ 
            height: 50px!important;
            width: 50px!important;
            p{
                font-size: 25px!important;
            }
        }
        .messages-container .single-message {
                padding: 0 10px 0 60px!important;
            &.recruiter-message {
                padding: 0 60px 0 10px!important;
            }

        }
        .message-datetime {
            right: auto;
            text-align: right;
            left: 0;
            flex-direction: row;
            width: 100%;
            bottom: -25px;
            top: auto!important;
            margin: 0;
            justify-content: flex-start;
            flex-direction: row!important;

 
        }
    }



    @media screen and (max-width: 768px) {

        .header-content{
            display: none;
        } 
        .room-messenger-container{
            flex-direction: column;
            .room-users{
                width: 100%;
                margin: 0;
                max-width: 100%;
                border: none;
                padding: 10px 0!important;
                border-bottom: 1px solid lightgrey;
                margin-bottom: 30px;
                ul{
                    width: 100%;
                    max-width: 100%;
                }
            }
            .room-chat{
                padding: 0;
            }
        }

        .single-message{
            padding: 0 5px 0 60px!important;
            &.not-my-message{
                padding: 0 65px 0 5px!important;
                .message-datetime{
                    span:first-of-type{
                        margin-left: 5px;
                    }
                }
            }

            .message-datetime{
                span:first-of-type{
                    margin: 0;
                }
            }
            .message-content{
                margin-top: 0!important;
            }
        }
    }
    
`

export default function CustomMeetingRoomChat(props){
 
    const history = useHistory();  

    const [allMessages, setAllMessages] = useState([]); 
    const [iframeLocation, setIframeLocation] = useState("");
    const [showIframeModal, setShowIframeModal] = useState(false); 
    
    const uploadedFileRef= useRef(null); 
    const iframeRef= useRef(null); 

    const participantList = useSelector(state => state.participantList.participantArray); 
    const voostRoomUser = useSelector(state => state.myVoostRoomUser); 
    const meetingChatRoomId = useSelector(state => state.meetingChatRoomId); 

    
    
    const [messageToSend, setMessageToSend] = useState("");
    const [otherUsers, setOtherUsers] = useState([]);
    const [myUser, setMyUser] = useState({});

    
    useEffect(() => {
        console.log("PARTICIPANT LIST : ", participantList)  
        if(participantList != null){
            setOtherUsers(participantList) 
        }

    }, [participantList])
 
    useEffect(() => {
        console.log("voostRoomUser: ", voostRoomUser) 
        if(voostRoomUser != null){
            setMyUser(voostRoomUser) 
            
        } 
    }, [voostRoomUser])

    
    useEffect(() => {
        console.log("meetingChatRoomId: ", meetingChatRoomId) 

        if(meetingChatRoomId.id != null){
            var messages = rdb.ref('voostRoomChat/' + meetingChatRoomId.id );  
            let x = messages.on('value', async (snapshot) => { 
                const data = snapshot.val();   
                if(data != null  && data.messages != null  ){  
                    let arr = Object.keys(data.messages).map( k => data.messages[k] )
                        // .filter((k) => {  if(k == "closed") setConvoClosed(true); return k != "closed" })
                       
                    console.log("arr:" , arr) 
                    setAllMessages(arr.sort((x, y) => x.timestamp - y.timestamp ).reverse())   
                }else{
                    console.log("NO MESSAGES YET..............")
                }
            });  

        }
    }, [meetingChatRoomId])
 
 
    
   

    const onLoad = (e) =>{ 
        var style = document.createElement('style');
        style.textContent = 'img { max-width:100%; } ';  
        style.textContent = 'body {text-align: center; } ';  
        let i = iframeRef.current; 
        if(!i) return;  
        i.contentDocument.head.appendChild(style);  
    }
 
    const sendMessage = (e) =>{
        e.preventDefault();  
        if(messageToSend.length < 1){
            Notiflix.Notify.Failure('Please enter a message to send.');
            return;
        } 
        sendMessageRequest(messageToSend) 
        setMessageToSend("") 
    }

    const sendMessageRequest = (msg) =>{
        const timestamp = Date.now(); 
        var date = new Date(); 
        const mins = date.getMinutes()
        var readableTime  = date.getHours() + ":" +  (mins.length === 1 ? "0" + mins : mins );
        var readableDate  = date.getDate() + "/" +  date.getMonth() + "/" +  date.getFullYear()
        // console.log("RECRUITER: ", profile.recruiter)
        const messageData = {
            message: msg,
            timestamp:  timestamp,
            readableDate: readableDate,
            readableTime: readableTime,
            uid: meetingChatRoomId.id,
            name: myUser.name, 
            userId: myUser.id 
        } 

        var updates = {};
        updates['/voostRoomChat/' + meetingChatRoomId.id + "/messages/" + Date.now()] = messageData;
        console.log("UPDATE TO SAVE: ", updates)
        rdb.ref().update(updates); 
    }
    

    const sendAttachmentMessage = async () =>{ 

        if(iframeLocation.length < 1){
            setIframeLocation("")   
            setShowIframeModal(false)
            Notiflix.Notify.Failure('Please choose a file to upload.');
            return;
        }


        setIframeLocation("")   
        setShowIframeModal(false)
        Notiflix.Loading.Circle('UPLOADING FILE');
        

        const file = uploadedFileRef.current.files[0]  // new File([videoBlob], “video.webm”  , {type:“video/webm”, lastModified: new Date().getTime()}); //URL.createObjectURL(new Blob( [videoSrc], {“type” : “video\/webm”}))
        let file_id= uuidv4();
        const filename= file.name;  
        const dirPath = `message-uploads/${meetingChatRoomId.id}/`;
        const hashed_filename = file_id + file.name.substring(file.name.lastIndexOf('.') + 1); 
        var pathToUploadedFileRef = storage.ref().child(dirPath+hashed_filename);

        const uploadedFileUrl = await pathToUploadedFileRef
            .put(file)
            .then( async (snapshot) => { 
                return await pathToUploadedFileRef.getDownloadURL()
            }).catch((r) => {
                console.log("ERROR:, ",r)
            });

        
        const mymessage = `<a target="__blank" href='${uploadedFileUrl}'>File upload: ${filename}</a>`;

        await sendMessageRequest(mymessage) 
        uploadedFileRef.current.value = '';
        Notiflix.Loading.Remove(); 
 
    }

    const prepareUpload = (e) =>{
        e.preventDefault();  
        console.log("PREPARE UPLOADER ")  
        const file = e.target.files[0] 
        var tmppath = URL.createObjectURL(file);
        setIframeLocation(tmppath)   
        setShowIframeModal(true) 
    }

    const sendFile =(e) =>{
        e.preventDefault(); 
        console.log("SEND FILE ") 
        sendAttachmentMessage();

    }

    const cancelSend =(e) =>{
        e.preventDefault(); 
        console.log("CANCEL SEND")

        setIframeLocation("")   
        setShowIframeModal(false)
    }
    
    const goBack = ()=> {
        history.goBack()
    }
    return(
        <>
            <MessengerContainer> 
                <div className="header-content">
                    <span onClick={  goBack } >Back</span>
                    <h1>Messages</h1>
                </div> 
                <div className="room-messenger-container">
                    <div className="room-users">
                        <div className="title-container">
                            <p>PARTICIPANTS</p>
                        </div>
                        <div className="user-list">
                            <ul>
                                { myUser.name != null ? <li>{myUser.name}</li> : "" }
                                { otherUsers.length ?  otherUsers.map((elem, k) =>{ return ( <li key={k}>{elem.name}</li>) }) : "" } 
                            </ul>
                        </div>

                    </div>
                    <div className="room-chat">
                        <div className="messages-list">
                            {
                                allMessages.map((message, i) =>{ 
                                    const name_arr = message.name.split(" ");
                                    const initials  = name_arr[0].charAt(0) + (name_arr.length > 1 ?  name_arr[1].charAt(0) : "");   
                                    return (
                                        <div key={i} className={`single-message  ${ message.userId !== myUser.id ? "not-my-message" : "" } `}>    
                                            <div className="avatar">
                                                <p>{initials}</p>
                                            </div>
                                            <p className="message-datetime">
                                                {/* <span>{message.readableTime}</span>
                                                <span>{message.readableDate}</span> */}
                                            </p>
                                            <p className="message-sender"> {message.userId === myUser.id ? "You" : message.name}</p>
                                            <div className="message-content" >
                                                <p dangerouslySetInnerHTML={{__html: message.message}}></p>
                                            </div> 
                                        </div>
                                    )  
                                })
                            } 



                        </div>
                        <div className="messenger-form"> 
                            <form onSubmit={sendMessage}>
                                <input type="text" name="message-input" value={messageToSend} onChange={(e) => {setMessageToSend(e.target.value)}}  autocomplete="off"/>
                                <button id="sendmessage" onClick={sendMessage}>send</button>
                                <label id="attachment"  htmlFor="uploadFile">attach</label>
                                <input ref={uploadedFileRef} type="file" name="uploadFile" id="uploadFile" className="hidden" onChange={ (e) => prepareUpload(e) } /> 
                            </form>
                        </div>
                    </div>

                   
                </div>
                <div className={`preview-file-modal ${showIframeModal ? "show-preview-modal" : ""}`}>
                        <div className="preview-file-upload-container">
                            <div className="iframe-container">
                                <iframe id="myiframe" 
                                    ref={iframeRef}   
                                    onLoad={onLoad}
                                    title="File Preview"
                                    // width="300"
                                    // height="500"
                                    src={iframeLocation}
                                    />
                            </div>
                            <div className="btn-container">
                                <button className="cancel-button" onClick={cancelSend}>Cancel</button> 
                                <Button   
                                    type="primarySmall"
                                    text="Send File"
                                    onClick={sendFile}
                                />
                            </div>
                        </div>
                    </div> 
            </MessengerContainer>
        </>
    )
}