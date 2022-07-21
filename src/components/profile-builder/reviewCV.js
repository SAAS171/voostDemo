import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 
import CvPreview from '../cv-preview/cvPreview'; 

import editfield from '../../assets/svg/edit-white.svg'; 

import placeholder from '../../assets/placeholder.png'; 

import download from '../../assets/svg/download.svg'; 
import email from '../../assets/svg/mail.svg'; 
import edit from '../../assets/svg/edit-white.svg'; 
import find from '../../assets/svg/find.svg'; 
// import placeholder from '../../assets/placeholder.png'; 


import {useHistory} from 'react-router-dom';  

import sent from "../../assets/svg/sent.svg";
import {Animated} from "react-animated-css"; 
import {useDispatch, useSelector} from 'react-redux'; 
import {
    cvReset,
    requestCreateCV,
    updateProfileBuilderEducationHistory, 
    updateProfileBuilderWorkHistory, 
    updateIsReviewingState, 
    updateCvHighlight, 
    updateCvHighlightBuilder, 
    updateProfileBuilderState
} from '../../store/actions/actions'; 
import Notiflix from 'notiflix'; 

import firebase from 'firebase'; 
import { db, auth } from '../../firebase';
import exit from '../../assets/svg/exit.svg'; 



const ReturnToJob = styled.div`
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

    &.show-modal{
        pointer-events: all;
        opacity: 1;
    }
    > div{
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        position: relative; 
    }
`

const ReviewCVContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto;  
    h1{
        margin-top: 50px;
    }
    > p{
        margin-bottom: 70px;
        font-size: 22px;
        letter-spacing: 1px;
    }  

    .cv-main{
        position: relative;    
    }
    .cv-container-buttons > *,
    .cv-container-buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-between ;
    }
    .cv-preview-container{
        display: inline-block;
        width: 900px;
        margin: 0 auto;
        transition: ease-in-out 200ms all;
        &.is-editable{
            width: 1300px;  
            transition: linear 320ms all;

            .edit-selection{  
                opacity: 1;
                transition: ease-in-out 320ms all;
                transition-delay: 300ms;
            }
        }

    }

    .edit-selection{ 
        position: absolute;
        top: 0;
        right: 0;
        z-index: 0;
        padding: 0 ;
        text-align: left;
        max-width: 350px;
        opacity: 0;
        transition: ease-in-out 200ms all;
        pointer-events: none;
        &.is-editable{
            pointer-events: all;
        }
        > div{
            box-shadow: 0 0 30px 0px rgba(0,0,0,0.5);
            border-radius: 10px;
            .edit-selection-header{
                border-bottom: 1px solid lightgrey;
                padding: 15px;
                p{
                    font-size: 22px; 
                    margin: 0;
                }

            }
            .edit-selection-content{
                padding: 15px;
                > div{
                    padding: 5px 10px;
                    border: 1px solid lightgrey;
                    display: flex;
                    margin-bottom: 13px;
                    border-radius: 4px;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    p {
                        margin: 0;
                        pointer-events: none;
                    }
                    div{
                        background-color: #DC3163;
                        background-image: url(${editfield});
                        background-size: 45%;
                        background-position: center;
                        background-repeat: no-repeat;
                        border: none;
                        width: 45px;
                        height: 45px;
                        border-radius: 4px;
                        pointer-events: none;
                        
                    }
                }
            }
        }
    }
    button.green{
        background-color:#6FC7BA;
        border: 1px solid #6FC7BA;

    }

    .hidden {
        display: none;
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
        transition: ease-in-out 200ms;
        display: flex;
        align-items: center;
        justify-content: center;  
        pointer-events: none;
        z-index: -1;
        opacity: 0;
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

    @media screen and (max-width: 992px) { 
        max-width: 100vw;
        margin: 20px auto;
        h1{
            font-size: 26px;
        }
        .cv-preview-container {
            max-width: 100%;
            width: 100%;
            .edit-selection{
                position: relative;
                width: 100%;
                max-width: 100%;
                background-color: white;
                margin: 0 auto;
            }
            .edit-selection-main{
                overflow: hidden; 
                transition: ease 200ms all;
                max-height: 0;

            }
            &.is-editable{
                .edit-selection-main{
                    max-height: 1000px;
                    margin: 10px 0 40px;
                } 
            }
            .cv-main{

                max-width: calc(100vw - 15px);
                width: auto;
                margin: 0 auto;
                display: flex;
                flex-direction: column-reverse;
            }

            .cv-container-buttons{
                >div:first-of-type{
                    button{
                        &:first-of-type{
                            background-image:url(${download})
                        }
                        &:last-of-type{
                            background-image:url(${email})
                        }
                    }
                }
                >div:last-of-type{
                    button{
                        &:first-of-type{
                            background-image:url(${find})
                        }
                        &:last-of-type{
                            background-image:url(${edit})
                        }
                    }
                }
                button{
                    background-size: 50%;
                    background-position: center;
                    background-repeat: no-repeat;
                    width: 50px;
                    height: 50px;
                    font-size: 0%;
                    color: transparent;
                    padding: 0;
                    flex-shrink: 0;
                    min-width: 0;
                    margin: 10px 5px 15px;

                }
            }
        }
    }

`
export default function ReviewCV() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage();   
    const [editing, setEditing] = useState(false);
    const history = useHistory() 

    const cvCreated = useSelector(state => state.cvCreated);   
    
    
    const [emailToSend, setEmailToSend] = useState("");
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailModalContent, setEmailModalContent] = useState("not-sent");
    const [showReturnModal, setShowReturnModal] = useState(false);

    // const profile = useSelector(state => state.profile);   
    // const [localProfile, setLocalProfile] = useState({});


    useEffect(() =>{  
        // setShowReturnModal(false) 
    },[showReturnModal])

    useEffect(() =>{ 
        if(window.sessionStorage.getItem('returnToJob')){
            setShowReturnModal(true)
        }; 
    },[])

    useEffect(() =>{
         
        if(cvCreated.loading) Notiflix.Loading.Circle(showEmailModal ? "Sending CV" : "Creating CV") 
        if(cvCreated.errors) {
            Notiflix.Loading.Remove(); 
            Notiflix.Report.Failure( 'CV Failed',  cvCreated.errors, 'OK' ); 
        }

        if(cvCreated.cvEmailed ){ 
            Notiflix.Loading.Remove();
            setEmailModalContent("sent")
        }
        
        
        if(cvCreated.cvCreated){ 
            Notiflix.Loading.Remove(); 
            const path = `documents/${auth.currentUser.uid}/profile/profile.pdf`
            storage.ref(path).getDownloadURL().then((url) => { 
                var win = window.open(url, '_blank');
                win.focus(); 
                dispatch(cvReset()) 
            })
            
            .catch((error) => { 
                Notiflix.Report.Failure( 'Preview Failed', 'We were unable to create a download link for your CV. Please try again.' + error, 'OK' ); 
            });
        }



    }, [cvCreated])

    const  cancelReturn = (e) =>{
        e.preventDefault(); 
        setShowReturnModal(false)
        console.log("CANCEL APPLICATION") 
        sessionStorage.clear(); 
    }

    const returnToApplication = (e) =>{
        e.preventDefault(); 
        setShowReturnModal(false)
        const returnId  = window.sessionStorage.getItem('returnToJob');
        sessionStorage.clear();
        console.log("RETURNING TO APPLICATION", returnId)
        history.push(`/apply/${returnId}`);  
    }


    const backStep = (e) =>{
        e.preventDefault(); 
        console.log("CLICKED....back")
        
    }
    const editCV = (e) =>{
        e.preventDefault();
        console.log("CLICKED....EDIT... ")   
        setEditing(!editing)
    } 

    const handleMouseHover = (e) =>{
        e.preventDefault();
        dispatch(updateCvHighlight(e.target.id));      

    }
    const handleMouseNotHover = (e) =>{
        e.preventDefault(); 
        dispatch(updateCvHighlight(""));
    }

    const handleCvEdit = (e) =>{
        e.preventDefault();
        setEditing(false)         
        dispatch(updateCvHighlightBuilder(e.target.id))
        dispatch(updateIsReviewingState(true))

        switch (e.target.id) {
            case "contact":
                dispatch(updateProfileBuilderState("personalDetails"))
                break;
                
            case "contact-img":
                dispatch(updateProfileBuilderState("personalDetails"))
                break;
                
            case "contact-vid":
                dispatch(updateProfileBuilderState("recordVideo"))
                break;
                
            case "work":      
                dispatch(updateProfileBuilderWorkHistory("itemReview")) 
                dispatch(updateProfileBuilderState("workHistory")) 
                break;

            case "education":   
                dispatch(updateProfileBuilderEducationHistory("itemReview")) 
                dispatch(updateProfileBuilderState("education"))      
                break;
                
            case "skills":        
                dispatch(updateProfileBuilderState("skills")) 
                break;
            case "summary":        
                dispatch(updateProfileBuilderState("summary")) 
                break;
            default:
                break;
        }

    }
    const download = (e) =>{
        dispatch(requestCreateCV({sendEmail: false }))   
    }
    const confirmSendViaEmail = () =>{ 

        if(emailToSend.length < 1){
            Notiflix.Report.Failure( 'Invalid Email', 'You must enter a valid email address, please try again.'+ cvCreated.errors, 'OK' ); 
            return;
        }
        dispatch(requestCreateCV({sendEmail: true, emailAddress: emailToSend }))
    }

    

    const findJobs = (e) =>{ 
        history.push("/jobs")
    } 
    const email = (e) =>{ 
        dispatch(cvReset())
        setShowEmailModal(true)
    } 

    const emailToSendChange = (e) =>{
        setEmailToSend(e.target.value)
    }

    const cancelSendEmail = (e) =>{
        e.preventDefault(); 
        setShowEmailModal(false)
        setEmailModalContent("not-sent") 
        setEmailToSend("")
    } 

    const toAccount = (e) =>{
        e.preventDefault();
        setShowEmailModal(false) 
        setEmailModalContent("not-sent") 
        setEmailToSend("")
        history.push("/account")
    } 
    const closeApplicationContinue = (e) =>{
        e.preventDefault(); 
        setShowReturnModal(false)
    } 
    

    

    const ReviewCV = 
        <ReviewCVContainer>
            <h1>Review your CV</h1>
            <p>Review and make changes to your CV. Then download and start applying!</p> 
            <div className="cv-preview-outter-container"> 
                <div className={`cv-preview-container ${ editing ? "is-editable" : "" }`}> 
                    <div className="cv-container-buttons">
                        <div className="left-btns">
                            <Button className="green" type="primarySmall" text="Download"  onClick={download} />
                            <Button  className="green"  type="primarySmall" text="Email"  onClick={email} />
                        </div>
                        <div>
                            <Button  type="primarySmall" text="find jobs" onClick={findJobs} />
                            <Button  type="primarySmall" text={`${editing ? "Cancel" : "Edit"}`}  onClick={editCV} /> 
                        </div>
                    </div>      
                    <div className="cv-main">
                        <CvPreview />
                        <div className={`edit-selection ${ editing ? "is-editable" : "" }`}  >
                            <div className="edit-selection-main">
                                <div className="edit-selection-header">
                                    <p>Which section do you want to edit?</p>
                                </div>
                                <div className="edit-selection-content">
                                    <div className="single-edit-item" onClick={handleCvEdit}  id="contact" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseNotHover}>
                                        <p>Contact Information</p>
                                        <div></div>
                                    </div> 
                                    <div className="single-edit-item" onClick={handleCvEdit}  id="summary" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseNotHover}>
                                        <p>Summary</p>
                                        <div></div>
                                    </div>
                                    <div className="single-edit-item" onClick={handleCvEdit}  id="work" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseNotHover}>
                                        <p>Work History</p>
                                        <div></div>
                                    </div>

                                    <div className="single-edit-item"  onClick={handleCvEdit}  id="education" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseNotHover}>
                                        <p>Education</p>
                                        <div></div>
                                    </div>

                                    <div className="single-edit-item" onClick={handleCvEdit}  id="skills" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseNotHover}>
                                        <p>Skills</p>
                                        <div></div>
                                    </div>


                                    <div className="single-edit-item" onClick={handleCvEdit}   id="contact-vid"  onMouseEnter={handleMouseHover} onMouseLeave={handleMouseNotHover}>
                                        <p>Video Introduction</p>
                                        <div></div>
                                    </div>
                                    <div className="single-edit-item" onClick={handleCvEdit}  id="contact-img" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseNotHover}>
                                        <p>Profile Image</p>
                                        <div></div>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>   
            </div>   

            <div className={`email-address-modal  ${showEmailModal ? "display-modal" : ""}`}>

                <div className="grid-box"> 
                    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500} isVisible={emailModalContent === "not-sent"} animateOnMount={false}>
                        <div className="email-address-inner">
                            <h4>Send your CV</h4>
                            <p>Please enter an email address below to send this document.</p>
                            <input type="email" id="email-address" name="email-address" value={emailToSend} onChange={emailToSendChange} />

                            <div className="modal-btns">
                                <button className="cancel" onClick={cancelSendEmail}> Cancel </button>
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
                            <h4>CV Sent</h4>
                            <p>Your CV has been sent to {emailToSend}.</p>
                                
                            <div>
                                <img src={sent} alt="sent contract" />
                            </div> 
                            <div className="modal-btns">
                                <button className="cancel" onClick={cancelSendEmail}> Close </button> 
                                <Button 
                                    type="primarySmall"  
                                    text="BACK TO ACCOUNT"
                                    onClick={toAccount}
                                    />
                            </div>
                        </div>
                    </Animated> 
                </div> 
            </div>

            <ReturnToJob className={showReturnModal ? "show-modal" : ""}>
                <div className="inner-returnToJobModal">
                    <button  className="close-modal" onClick={cancelReturn}> </button>
                    <div>
                        <h5>Resume Job Application </h5>
                        <p>Would you like to continue with your application?</p>
                        <Button 
                            type="primarySmall"  
                            text="Continue Application"
                            onClick={returnToApplication}
                            />
                        <br />
                        <Button 
                            type="greenSmall"  
                            text="Edit CV"
                            onClick={closeApplicationContinue}
                            />
                    </div>
                </div>
            </ReturnToJob>
        </ReviewCVContainer>
    return (ReviewCV)
}
           