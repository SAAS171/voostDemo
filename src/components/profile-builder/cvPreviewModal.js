

import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components'; 
import CvPreview from '../cv-preview/cvPreview';  
import {useDispatch, useSelector} from 'react-redux'; 
import {updateCvModal,   updateCvHighlight, updateCvHighlightBuilder, updateProfileBuilderState} from '../../store/actions/actions'; 


import Button from '../shared-components/button'; 
import exit  from "../../assets/svg/exit.svg";
import Notiflix from 'notiflix';  
import firebase from 'firebase';   
import {Animated} from "react-animated-css"; 

const CvPreviewModal = styled.div` 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center; 
    
    transition: ease-in-out 200ms all; 
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    &.show-preview-modal{
        z-index: 999;
        pointer-events: all;
        opacity: 1;
        transition: ease-in-out 200ms all;
    } 
    .cv-preview-modal-container{
        max-width: 900px;
        margin: 0 auto; 
        background-color: transparent;
        position: relative;
        overflow: scroll;
        max-height: 100vh;
        padding: 100px 0;
        > button{
            position: absolute;
            right: 0;
            top: 0;
            border: none;
            background-color: transparent;
            color: transparent;
            height: 40px;
            width: 40px;
            background-image: url( ${exit} );
            background-position: center;
            background-size: 70%;
            background-repeat: no-repeat;
            outline: none;
        }
        .modal-title-container{
            text-align: center;
            margin: 0 auto;
            color: white;
            > * {
                margin-bottom: 15px;
            }
        }
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
    .video-container{
        width: 100%;
        height: auto;
        border-radius: 8px;
        overflow: hidden;
        background-color: white;
        padding: 15px; 
        > * {
            border-radius: 8px;
            overflow: hidden;
            width: 100%;
            height: auto;
        }
        .playbtn{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 100px;
            width: 100px;
            background-color: transparent;
            border-radius: 50px;
        }
    }
`
export default function ReviewCV() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();   
    const profile = useSelector(state => state.profile);   

    const [showingModal, setShowingModal] = useState(false);
    const showModalState = useSelector(state => state.cvModalUpdate)
    const [videoSrc, setVideoSrc] = useState(profile?.profile?.cvProfile?.cvVideo);
    const [modalContent, setModalContent] = useState(true);

    
    useEffect(() =>{
        // console.log("SHOW MODAL STATE...", showModalState.showModal)
        setShowingModal(showModalState.showModal)
    }, [profile])

    
    useEffect(() =>{
        // console.log("SHOW MODAL STATE...", showModalState.showModal)
        setShowingModal(showModalState.showModal)
    }, [showModalState])

    const closeModal = (e) =>{
        e.preventDefault();
        // setShowingModal(false)
        setModalContent(true)
        dispatch(updateCvModal(false)) 
    }
    
    const updateSetModalContent = ( ) =>{ 
        console.log("SWITCHING CONTENT...")
        setModalContent(!modalContent)
    } 

 
    return (<CvPreviewModal className={`${showingModal ? "show-preview-modal" : "" }  `}>            
        <div className="cv-preview-modal-container"> 
            <button onClick={closeModal}>Close</button>
            <div className="modal-title-container">
                <h1>Your CV</h1> 
            </div>

            <div className="grid-box"> 
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500} isVisible={showingModal && modalContent } animateOnMount={false}>
                    <CvPreview isPreviewModal={true} switchContent={() => updateSetModalContent()}/>
                </Animated>
                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500}  isVisible={showingModal && !modalContent} animateOnMount={false}>
                    <div className="video-container"> 
                        {/* <video   controls alt="video modal" src={`${(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'  ?  process.env.REACT_APP_TEST_NODE_ENDPOINT : process.env.REACT_APP_LIVE_NODE_ENDPOINT )}/files/cv/${auth.currentUser.uid}/cv-video.mp4`} type='video/mp4'>  */}
                        <video   controls alt="video modal" src={videoSrc} type='video/mp4'> 
                        </video>
                        <div>
                            <Button  type="primarySmall" text="BACK TO PREVIEW" onClick={updateSetModalContent} />
                        </div>
                    </div>
                </Animated> 
            </div>
        </div>   
    </CvPreviewModal>)
}
           

 