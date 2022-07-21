import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import RecordModal from "./recordModal";
import Button from '../shared-components/button';  
import play from "../../assets/svg/play.svg"; 
import {useDispatch, useSelector} from 'react-redux';  
import {  
    updateProfileBuilderState, 
    updateProfileBuilderEducationHistory, 
    updateCvHighlightBuilder,
    updateProfileBuilderModalVideo
} from '../../store/actions/actions'; 
 
import firebase from 'firebase'; 
import {auth, db, storage} from '../../firebase';


const BuilderRecordVideoContainer = styled.div` 
    max-width: 900px;
    margin: 0 auto;  

    @media screen and (max-width: 992px) { 
        max-width: 100vw;
        margin: 20px auto;
        padding: 0 15px;
        h1{
            text-align: center;
            margin-top: 80px;
            font-size: 25px;
        }
        
        video#recorded-video-introduction {
            background-color: lightgrey;
            height: 260px;
            width: 100%;
        }



    }
    video#recorded-video-introduction{
        background-color: lightgrey;
        height: 260px;
        margin: 20px auto;
        border-radius: 8px;
    }
    .recorded-video-container{
        position: relative;
        button{
            background-color: transparent;
            border: none;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%)

        }
    }
    .hidden {
        display: none;
    }
`
export default function BuilderRecordVideo() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();    
    const videoSrc = useSelector(state => state.profileBuilderVideoSrc);    
    const profile = useSelector(state => state.profile);    
    const [videoPlaying, setVideoPlaying]   = useState(false);
    const [videoPreviewSrc, setVideoPreviewSrc]   = useState(0); 
    const videoPreviewElementRef   = React.useRef(null)


    const isReviewing = useSelector(state => state.isReviewingState);    
    const [isReviewingLocalState, setIsReviewingLocalState] = useState(false); 

    useEffect(() =>{
       //  console.log("is reviewing......", isReviewing.isReviewing)
        setIsReviewingLocalState(isReviewing.isReviewing)
        //  console.log("IS REVIEWING STATE...." + isReviewingLocalState)
    },[isReviewing])



    useEffect(() =>{
        // console.log("SETTING VIDEO SOURCE ON PREVIEW...", videoSrc.videoSrc)
        setVideoPreviewSrc(videoSrc.videoSrc)
    }, [videoSrc])
     

    
    useEffect(() =>{
        // console.log("cvProfile: ", cvProfile)

        if(auth.currentUser){

            const user = db.collection('users').doc(auth.currentUser.uid );
            user.get().then((doc) => {
                if (doc.exists) {
                    let cvProfile = doc.data().cvProfile;
                    // console.log("cvProfile: ", cvProfile)
                    if(cvProfile){
                        if(cvProfile.cvVideo){
                            setVideoPreviewSrc(cvProfile.cvVideo)
                        } 
                    }

                } else { 
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            }); 
        }



    })
     

    


    const backStep = (e) =>{
        e.preventDefault(); 
        console.log("CLICKED....back : ", isReviewingLocalState)

        if(isReviewingLocalState){  
            dispatch(updateCvHighlightBuilder(""))
            dispatch(updateProfileBuilderState("reviewCV"))
            dispatch(updateProfileBuilderEducationHistory(""))
        }else{
            dispatch(updateProfileBuilderState("personalDetails"))
        }
        
    }
    const nextStep = (e) =>{
        e.preventDefault();
        // console.log("CLICKED....next ")    
        if(isReviewingLocalState){  
            dispatch(updateCvHighlightBuilder(""))
            dispatch(updateProfileBuilderState("reviewCV"))
            dispatch(updateProfileBuilderEducationHistory(""))
        }else{
            dispatch(updateProfileBuilderState("preWorkHistory"))
        }

    }
    
    const startRecord = (e) =>{
        e.preventDefault();
        console.log("CLICKED....startRecord ")    
    
        dispatch(updateProfileBuilderModalVideo({open: true}))

    }
 
    const playPreview = () =>{
        console.log("PLAY.....") 
        if(videoPreviewSrc != 0){
            videoPreviewElementRef.current.play();
            setVideoPlaying(true)  
            videoPreviewElementRef.current.onended = (e) => {   
                console.log("VIDEO ENDED.....")
                setVideoPlaying(false)
            };

        }else{ 
            dispatch(updateProfileBuilderModalVideo({open: true}))
        }
    }
    const showPlay = () =>{
        if( !videoPlaying){
            return ( <button id="play-preview" onClick={playPreview}><img src={play}/></button>  )
        } 
    }
       
    return ( 
        <BuilderRecordVideoContainer>
            <h1>Record your video introduction </h1>
            <p>This will introduce you to employers.</p>
            
            <div className="recorded-video-container"> 
                <video id="recorded-video-introduction"  ref={videoPreviewElementRef} src={videoPreviewSrc}></video> 
                { showPlay() }
            </div>
            <Button type="primarySmall" text="Record Video"  onClick={startRecord}/>

            <div className="selection-buttons">
                {
                    !isReviewingLocalState ? 
                        <>
                            <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                            <Button type="primarySmall" text={videoPreviewSrc != 0 ? "NEXT" : "UPLOAD LATER"}  onClick={nextStep}/>
                        </>
                        :
                        <>
                            <Button type="primarySmall" text="Cancel"  onClick={backStep}/>
                            <Button type="primarySmall" text="Save and review"  onClick={nextStep}/>
                        </> 
                }
            </div>
            <RecordModal />
        </BuilderRecordVideoContainer>
    )
}
           