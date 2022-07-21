import React, {useRef, useState, useEffect} from 'react';
import Button from '../shared-components/button'; 
 import {useSelector, useDispatch} from 'react-redux';  
import styled from 'styled-components';   

import {auth, db, rdb, storage} from '../../firebase';

import upload from "../../assets/svg/upload.svg";
import  send from "../../assets/svg/send-note.svg";
 
import { v4 as uuidv4 } from 'uuid';
import Notiflix from 'notiflix'; 
import { getUserProfile, getMessages, updateNotification, sendMessageEmail } from '../../store/actions/actions';  
import {useHistory} from 'react-router-dom'; 
// import firebase from 'firebase'; 


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

    .messages-container{

        max-width: 750px;
        margin: 0 auto 50px;  
        .inner-message-container{
            overflow: scroll;
            max-height: 400px;
            display: flex;
            flex-direction: column-reverse;
        }

        .single-message{
            display: flex;
            flex-direction: column;
            position: relative;
            max-width: 100%;
            padding: 0 90px;

            margin-bottom: 50px;
            &.recruiter-message{
            
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
    .send-message{ 
        max-width: 750px;
        margin: 0 auto;
        display: block;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.2);
        position: relative;
        padding: 10px; 
        border-radius: 8px;
        textarea{
            border: none;
            min-height: 140px;
            width: 100%;
            outline: none;
        }

        .message-buttons{
            display: flex;
            justify-content: flex-end; 
            position: relative;
            button, label{
                cursor: pointer;
                height: 40px;
                width: 55px; 
                border: none;
                background-color: transparent;
                background-size: 55% 70%;
                background-position: center;
                background-repeat: no-repeat;
                border-left: 1px solid lightgrey;
                outline: none;
            }
            button{
                background-image: url(${send})
                
            }
            label{
                border: none;
                background-image: url(${upload})
                
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
`

export default function Messenger(props){

    // var storage = firebase.storage().ref();   
    const history = useHistory(); 
    const dispatch = useDispatch();
    const { applicationId, applicantId } = history.location.state ; 
    const [allMessages, setAllMessages] = useState([]);
    const [sendableMessage, setSendableMessage] = useState("");
    const [iframeLocation, setIframeLocation] = useState("");
    const [showIframeModal, setShowIframeModal] = useState(false);
    const [convoClosed, setConvoClosed] = useState(false);
    
    const profileState = useSelector(state => state.profile); 
    const profile = profileState.profile;
  
    const uploadedFileRef= useRef(null); 
    const iframeRef= useRef(null); 


    // dispatch(getMessages({applicationId: applicationId}))


    useEffect(()=>{
        dispatch(getUserProfile()); 
        var messages = rdb.ref('messages/' + applicationId );  
        let x = messages.on('value', async (snapshot) => { 
            const data = snapshot.val();   
            if(data != null  ){ 
                let tempClosed = false
                let arr = Object.keys(data)
                    .filter((k) => {  if(k == "closed") setConvoClosed(true); return k != "closed" })
                    .map( k => data[k] )
                    console.log("arr:" , arr)

                setAllMessages(arr.sort((x, y) => x.timestamp - y.timestamp ).reverse())  
                checkNotifications()
            }
        }); 

        checkNotifications()  
    }, []) 



    const checkNotifications = async ()=>{  
        setTimeout(() => { 
            db.collection('users').doc(auth.currentUser.uid ).collection("notifications").get().then((doc) => {   
                let c = 0; 
                doc.forEach((pre_x) => { 
                    let x = pre_x.data()  
                    if(!x.viewed && ( x.type !== "Message" ||   x.application_id !== applicationId )) ++c   
                    if(x.application_id === applicationId && x.type === "Message" && !x.viewed) dispatch(updateNotification({uid: auth.currentUser.uid, id: x.id }));  
                } )  
                rdb.ref('notifications/' + auth.currentUser.uid  ).set( { unread : c > 0 ? true: false } );
            });  
        }, 1200); 
    }

    
  
    useEffect(() => {
        console.log("PROFILE: ", profile) 
    }, [profile])

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

        if(convoClosed){ 
            Notiflix.Notify.Failure('This conversation has been closed.');
            return;
        }

        if(sendableMessage.length < 1){
            Notiflix.Notify.Failure('Please enter a message to send.');
            return;
        } 
        sendMessageRequest(sendableMessage)
        sendNotificationRequest() 
        setSendableMessage("") 
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
            uid: auth.currentUser.uid, 
            name: profile.recruiter ? profile.company_name : profile.name,
            recruiterAccount: profile.recruiter
        } 
        var updates = {};
        updates['/messages/' + applicationId + "/" + Date.now()] = messageData;
        rdb.ref().update(updates); 
    }

    const sendNotificationRequest  = () =>{

        var date = new Date(); 
        const mins = date.getMinutes()
        var readableTime  = date.getHours() + ":" +  (mins.length === 1 ? "0" + mins : mins );
        var readableDate  = date.getDate() + "/" +  date.getMonth() + "/" +  date.getFullYear()

        // console.log("APPLICANT ID: ", applicantId)
        const notifyId = applicantId !== auth.currentUser.uid  ? applicantId : allMessages.find(x => x.uid !== applicantId).uid;

        dispatch(sendMessageEmail({userId: notifyId }));
        
        rdb.ref('notifications/' + notifyId ).set({ unread : true }); 
        const notifications = db.collection('users').doc(notifyId ).collection("notifications"); 

        notifications.add({
            id: uuidv4(),
            sortDate: date,
            date: readableDate,
            time: readableTime,
            type: "Message",
            viewed: false,
            application_id: applicationId,
            message: sendableMessage ? sendableMessage : "You have received a new file."
        })
        .then( (docRef) => {  
            docRef.get().then((doc)=> {  docRef.update(  {... doc.data(), id: docRef.id })  }) 
        });  

        
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
        const dirPath = `message-uploads/${applicationId}/`;
        const hashed_filename = file_id + file.name.substring(file.name.lastIndexOf('.') + 1); 
        var pathToUploadedFileRef = storage.ref().child(dirPath+hashed_filename);

        const uploadedFileUrl = await pathToUploadedFileRef
            .put(file)
            .then( async (snapshot) => { 
                return await pathToUploadedFileRef.getDownloadURL()
            });

        
        const mymessage = `<a target="__blank" href='${uploadedFileUrl}'>File upload: ${filename}</a>`;

        await sendMessageRequest(mymessage)
        await sendNotificationRequest()
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

        if(convoClosed){ 
            Notiflix.Notify.Failure('This conversation has been closed.');
            return;
        }
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
                <div className="messages-container">
                    <div className="inner-message-container">
                        {
                            allMessages.map((message, i) =>{
                                const name_arr = message.name.split(" ");
                                const initials  = name_arr[0].charAt(0) + (name_arr.length > 1 ?  name_arr[1].charAt(0) : "");  
                                return (
                                    <div key={i} className={`single-message  ${ message.recruiterAccount ? "recruiter-message" : "" } `}>    
                                        <div className="avatar">
                                            <p>{initials}</p>
                                        </div>
                                        <p className="message-datetime">
                                            <span>{message.readableTime}</span>
                                            <span>{message.readableDate}</span>
                                        </p>
                                        <p className="message-sender"> {message.name}</p>
                                        <div className="message-content" >
                                            <p dangerouslySetInnerHTML={{__html: message.message}}></p>
                                        </div> 
                                    </div>
                                )  
                            })
                        } 
                    </div>
                </div>
                <div className="send-message">
                    <div className="send-message-inner">
                        <form>
                            <textarea placeholder="Send message" onChange={e => setSendableMessage(e.target.value)} value={sendableMessage}></textarea>
                            <div className="message-buttons">
                                <label htmlFor="uploadFile"> </label> 
                                <button onClick={sendMessage} > </button>
                            </div>           
                            <input ref={uploadedFileRef} type="file" name="uploadFile" id="uploadFile" className="hidden" onChange={ (e) => prepareUpload(e) } /> 
                        </form>
                    </div>
                </div>

                <div className={`preview-file-modal ${showIframeModal ? "show-preview-modal" : ""}`}>
                    <div className="preview-file-upload-container">
                        <div className="iframe-container">
                            <iframe id="myiframe" ref={iframeRef}   onLoad={onLoad}
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