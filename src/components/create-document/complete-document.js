import React, {useState, useEffect} from 'react'; 
import {useSelector, useDispatch} from 'react-redux'; 
import {useHistory} from 'react-router-dom';  
import {auth, db, rdb, storage} from '../../firebase';

import {Animated} from "react-animated-css"; 
import {sendVoostOffer, sendVoostContract, sendEmail} from '../../store/actions/actions';  
import styled from 'styled-components';   
import Button from '../shared-components/button'; 
import sent from "../../assets/svg/sent.svg";

import Notiflix from 'notiflix'; 
import PreviewDocument from "../preview-document/preview-document";
import exit from '../../assets/svg/exit.svg'; 


const CompleteDocumentContainer = styled.div` 
    max-width: 100%;
    width: 100%;
    padding: 100px 0 ;
    margin: 0 0 0 auto; 
    text-align: left;  

    .close-modal{ 
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

    @media screen and (max-width: 992px) { 
        .grid-box {
            position: relative;
        }
        .close-modal { 
            right: -35px!important;
            top: -35px!important; 
            background-size: 30%!important;
        }
        h1{
            font-size: 28px;
        }
        .companyAddress {
            position: relative!important;
            right: 0!important;
            top: 0!important;
        }
        
        .document-actions{
            padding: 0 15px!important;
            >div{
                flex-direction: column!important;
                margin-bottom: 0!important;
            }
            button{
                max-width: 100%!important;
                min-width: 0!important;
                width: 100%!important;
            }
        }
        .send-voost-modal{
            padding: 15px;
            .modal-box{
                padding: 25px!important;
            }
        }
        .email-address-modal{
            padding: 15px;
            .email-address-inner{ 
                padding: 15px;
            }
        }
    }
    > div.complete-doc-header{
        margin: 0 auto; 
        max-width: 800px;
        width: 100%;
        text-align: center; 
        display: block;
        margin-bottom: 50px;

    } 
    .document-actions{
        max-width: 800px;
        width: 100%;
        padding: 30px 0;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;
        > div{
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        button{
            max-width: 30%;
            min-width:0!important;
            width: 100%;

        }
    }

    .grid-box{
        display: grid;
        align-items: flex-start;
        > *{
            grid-column: 1;
            grid-row: 1;
        }
    } 
    .email-address-modal{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.7);
        z-index: -1;
        opacity: 0;
        transition: ease-in-out 200ms;
        display: flex;
        align-items: center;
        justify-content: center;  
        pointer-events: none;
        z-index: -1;
        &.display-modal{
            z-index: 999;
            transition: ease-in-out 200ms;
            opacity: 1;
            pointer-events: all; 
        }
        > div > div > div{
            width: 100%;
            max-width: 600px;
            height: auto;
            background-color: white;
            border-radius: 8px;
            padding: 45px;
            text-align: center;    
            display: flex;
            flex-direction: column;
            align-items: center;
            input[type=email]{
                border-radius: 4px;
                width: 80%;
                padding: 7px;
                text-align: center;
                border: 1px solid lightgrey;
                margin-bottom: 15px;
                box-shadow: 0 0 11px 0px rgba(0,0,0,0.4);
                font-size: 20px; 
                outline: none;
            }
            img { 
                margin: 20px auto;
                height: 90px;
            }
            h4 {
                letter-spacing: 1px;
                font-size: 27px;
                margin-bottom: 15px;
            }
            > p{
                color: #4C567C;
                letter-spacing: 1px; 
            }
        }
    }
    .send-voost-modal{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.7);
        opacity: 0;
        transition: ease-in-out 200ms;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: -1;
       
        &.display-modal{
            z-index: 999;
            transition: ease-in-out 200ms;
            opacity: 1;
            pointer-events: all;
        }
        > div > div > div{
            width: 100%;
            max-width: 600px;
            height: auto;
            background-color: white;
            border-radius: 8px;
            padding: 45px;
            text-align: center;
            h4 {
                letter-spacing: 1px;
                font-size: 27px;
                margin-bottom: 15px;
            }
            > p{
                color: #4C567C;
                letter-spacing: 1px; 
            }
            img { 
                margin: 20px auto;
                height: 90px;
            }
            > div{

                display: flex;
                width: 100%;
                justify-content: space-evenly;
                p{
                    width: calc(50% - 20px);
                    padding: 5px;
                    margin: 20px 0;
                    font-size: 22px;
                    border-radius: 8px;
                    box-shadow: 0 0 11px 0px rgba(0,0,0,0.4)

                }
            }
           
        }
    }
    .cancel{ 
        border-radius: 5px;
        background-color: white;
        border: 1px solid #6fc7ba;
        color: #6fc7ba;
        padding: 9px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .modal-btns{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
    }
` 

export default function CompleteDocument(){
    const dispatch = useDispatch(); 
    const history = useHistory()
    const offerSent = useSelector(state => state.offerSent); 
    const emailSent = useSelector(state => state.emailSent); 
    const contractSent = useSelector(state => state.contractSent); 
    const myJobs = useSelector(state => state.my_jobs.my_jobs); 
    const { documentType, documentData } = history.location.state ; 

    
    const pathToDoc = `documents/${documentData.applicant_uid}/${documentData.application_id}/${documentType=== "offerLetter" ? "job_offer" : "contract" }.pdf`;

    const [emailToSend, setEmailToSend] = useState("");
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailModalContent, setEmailModalContent] = useState("not-sent");

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(false);

    useEffect(()=>{
        console.log("DOCUMENT DATA: ", documentData)
    }, [documentData])

    useEffect(()=>{
        console.log("contractSent : ", contractSent.sentContract) 
        setModalContent(contractSent.sentContract ? "sent" :"not-sent") 
    }, [  contractSent])


    useEffect(()=>{
        console.log("offerSent: ", offerSent.sentOffer)  
        setModalContent(offerSent.sentOffer ? "sent" :"not-sent")
    }, [offerSent])




    useEffect(() =>{
        if(emailSent.loading){
            console.log("LOADING......")
            Notiflix.Loading.Circle("Sending Email")
        } 
        if(emailSent.emailSent){ 
            console.log("EMAIL SENT: ", emailSent.emailSent)
            Notiflix.Loading.Remove();  
            setEmailModalContent("sent")
        }
        if(emailSent.errors){  
            console.log("errors......", emailSent.errors)   
            Notiflix.Loading.Remove();   
            Notiflix.Report.Failure( 'Email Not Sent', emailSent.errors, 'ok' ); 
        }

    },[emailSent])
    


    const confirmSendViaVoost = (e) =>{
        e.preventDefault();
        console.log("CONFIRM SEND VIA VOOST...") 
        if(documentType === "offerLetter"){
            dispatch(sendVoostOffer(documentData));
        }
        if(documentType === "contract"){
            dispatch(sendVoostContract(documentData));
        }

    }
    

    const cancelSendEmail = (e) =>{
        e.preventDefault();
        console.log("cancel send EMAIL...") 
        setShowEmailModal(false)
        setEmailToSend("")
        setEmailModalContent("not-sent")
    } 

    const toDashboard = (e) =>{
        e.preventDefault();
        setEmailModalContent("sent")
        setShowModal(false)
        setShowEmailModal(false)

        console.log("cancel send VIA VOOST...") 
        history.push("/accountRecruiter")
    } 
    

    const cancelSend = (e) =>{
        e.preventDefault();
        console.log("cancel send VIA VOOST...") 
        setShowModal(false)
    } 

    const sendViaVoost = (e) =>{
        e.preventDefault();
        console.log("SEND VIA VOOST...") 
        setShowModal(true)
    } 


    
    const email = (e) =>{
        e.preventDefault(); 
        setShowEmailModal(true)
    }
    const preview = (e) =>{
        e.preventDefault(); 
        console.log("PATH TO DOC: ", pathToDoc)
        storage.ref(pathToDoc).getDownloadURL()
        .then((url) => { 
            var win = window.open(url, '_blank');
            win.focus(); 
        })
        .catch((error) => { 
            Notiflix.Report.Failure( 'Preview Failed', 'We were unable to create a download link for this offer letter. Please try again.', 'OK' ); 
            
        });
    }
    const download = (e) =>{
        e.preventDefault(); 
        console.log("PATH TO DOC: ", pathToDoc)
        storage.ref(pathToDoc).getDownloadURL()
        .then((url) => { 
            var win = window.open(url, '_blank');
            win.focus(); 
        })
        .catch((error) => { 
            Notiflix.Report.Failure( 'Download Failed', 'We were unable to display the preview for this offer letter. Please try again.', 'OK' ); 
            
        }); 
    }

    const confirmSendViaEmail = () =>{ 
        console.log("PATH TO DOC: ", pathToDoc)
        storage.ref(pathToDoc).getDownloadURL().then((url) => { 
            dispatch(sendEmail({
                email: emailToSend, 
                docType: documentType, 
                downloadurl: url,
                name: documentData.employerFirstname + " " + documentData.employerLastname
            })) 
                
        })
    }
    const emailToSendChange = (e) =>{
        setEmailToSend(e.target.value)
    }
    return(
        <CompleteDocumentContainer>
            <div className="complete-doc-header"> 
                <h1>Your Completed Document</h1> 
            </div>
            <div className="contract-profile-main">
                <PreviewDocument documentType={documentType} documentData={documentData}/>
            </div>
            <div className="document-actions">
                <div> 
                    <Button 
                        type="greenSmall"  
                        text="preview"
                        onClick={preview}
                        />
                    <Button 
                        type="greenSmall"  
                        text="Download"
                        onClick={download}
                        />
                    <Button 
                        type="greenSmall"  
                        text="Email"
                        onClick={email}
                        />
                </div>
                <br />
                <Button 
                    type="primarySmall"  
                    text="Send via Voost"
                    onClick={sendViaVoost}
                    />
            </div>

            <div className={`send-voost-modal  ${showModal ? "display-modal" : ""} `}> 
                <div className="grid-box"> 
                <button className="close-modal" onClick={cancelSend}></button>

                    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500} isVisible={ modalContent === "sent" } animateOnMount={false}>
                        <div className="modal-box">
                            <h4>{documentType === "offerLetter" ? "Offer" : "Contract"} Sent</h4>
                            <p>Your {documentType === "offerLetter" ? "Offer" : "Contract"} has been sent to {documentData.employeeFirstname} {documentData.employeeLastname}.</p>
                            <div>
                                <img src={sent} alt="sent contract" />
                            </div> 

                            <div className="modal-btns">
                                {/* <button className="cancel" onClick={cancelSend}>Close</button> */}
                                <Button 
                                    type="primarySmall"  
                                    text="BACK TO DASHBOARD"
                                    onClick={toDashboard}
                                    />
                            </div>
                        </div>
                    </Animated>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500} isVisible={ modalContent === "not-sent"} animateOnMount={false}>
                        <div className="modal-box">

                            <h4>Send {documentType === "offerLetter" ? "Offer" : "Contract"} via Voost</h4>
                            <p>Confirm employee details and send</p>
                            <div>
                                <p>{documentData.employeeFirstname}</p>
                                <p>{documentData.employeeLastname}</p>
                            </div>

                            <div className="modal-btns">
                                {/* <button className="cancel" onClick={cancelSend}>Cancel</button> */}
                                <Button 
                                    type="primarySmall"  
                                    text="Confirm and Send"
                                    onClick={confirmSendViaVoost}
                                    />  
                            </div>
                        </div>
                    </Animated> 
                </div>
            </div>
            <div className={`email-address-modal  ${showEmailModal ? "display-modal" : ""}`}>
                <div className="grid-box"> 
                <button className="close-modal"  onClick={cancelSendEmail}></button>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500} isVisible={emailModalContent === "not-sent"} animateOnMount={false}>
                        <div className="email-address-inner">
                            <h4>Send Document</h4>
                            <p>Please enter an email address below to send this document.</p>
                            <input type="email" id="email-address" name="email-address" value={emailToSend} onChange={emailToSendChange} />

                            <div className="modal-btns">
                                <Button 
                                    type="primarySmall"  
                                    text="Confirm and Send"
                                    onClick={confirmSendViaEmail}
                                />
                            </div>
                        </div>
                    </Animated>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500}  isVisible={emailModalContent === "sent"} animateOnMount={false}>
                        <div className="email-address-inner"> 
                            <h4>{documentType === "offerLetter" ? "Offer" : "Contract"} Sent</h4>
                            <p>Your {documentType === "offerLetter" ? "Offer" : "Contract"} has been sent to {emailToSend}.</p>
                                
                            <div>
                                <img src={sent} alt="sent contract" />
                            </div> 
                            <div className="modal-btns"> 
                                <Button 
                                    type="primarySmall"  
                                    text="BACK TO DASHBOARD"
                                    onClick={toDashboard}
                                    />
                            </div>
                        </div>
                    </Animated> 
                </div>

            </div>
        </CompleteDocumentContainer>
    )
} 