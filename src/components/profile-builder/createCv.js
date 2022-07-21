import React, {  useEffect, useState }  from 'react'; 
import BuilderPersonalDetails from './builderPersonalDetails' 
import BuilderRecordVideo from './builderRecordVideo'  
import BuilderPreWorkHistory from './builderPreWorkHistory'  
import BuilderWorkHistory from './builderWorkHistory'  
import BuilderPreEducation from './builderPreEducation';
import BuilderEducation from './builderEducation';
import BuilderPreSkills from './builderPreSkills';
import BuilderSkills from './builderSkills';
 

import BuilderPreSummary from './builderPreSummary';
import BuilderSummary from './builderSummary';
import ReviewCV from './reviewCV';

import styled from 'styled-components';
import {Animated} from "react-animated-css"; 
import {useDispatch, useSelector} from 'react-redux';   
import {auth, db, storage} from '../../firebase';

import CvPreviewModal from '../profile-builder/cvPreviewModal';
import {
    updateAllEducationHistoryItems,
    updateAllWorkHistoryItems,
    updateSummary,
    updateSkillsList

} from '../../store/actions/actions'; 

const CreateCvElem = styled.div`
    display: grid;
    align-items: flex-start;
    display: none;
    &.display-all{
        display : grid;
    }
    > *{
        grid-column: 1;
        grid-row: 1;
    }
    .displayable{
        display: block;
        padding-bottom: 100px;
    }
    .not-displayable{
        display: none
    }
`

export default function CreateCv() {


    const dispatch = useDispatch();   
    const profileBuilderState = useSelector(state => state.profileBuilder)
    const [profileBuilderCurrent, setProfileBuilderCurrent] = useState("")

    const profileBuilderSelection = useSelector(state => state.profileBuilderSelection)
    const [selectionState, setSelectionState] = useState(false)


    useEffect(() =>{ 
        if(profileBuilderSelection.selection == "createcv" || profileBuilderSelection.selection === "createcv-review"){ 
            setSelectionState(true) 
        }  
    }, [profileBuilderSelection])


    useEffect(() =>{ 
        setProfileBuilderCurrent(profileBuilderState.profileBuilder)
        console.log("PROFILE BULDER.....", profileBuilderState)
    }, [ profileBuilderState ])
    



    //     useEffect(() =>{ 
    //         console.log("HELLOO.....", profileBuilderState)
    //         if(auth.currentUser){
    
    //             const user = db.collection('users').doc(auth.currentUser.uid );
    //             user.get().then((doc) => {
    //                 if (doc.exists) {
    //                     let cvProfile = doc.data().cvProfile;
    //                     // console.log("CV PROFILE", cvProfile)
    //                     if(cvProfile){ 
    //                         // if(cvProfile.workHistory){
    //                         //     dispatch(updateAllWorkHistoryItems(cvProfile.workHistory));
    //                         // }
    //                         // if(cvProfile.educationHistory){
    //                         //     dispatch(updateAllEducationHistoryItems(cvProfile.educationHistory));
    //                         // }
    //                         // if(cvProfile.summary){
    //                         //     dispatch(updateSummary(cvProfile.summary));
    //                         // }
    //                         // if(cvProfile.skillsList){
    //                         //     dispatch(updateSkillsList(cvProfile.skillsList));
    //                         // }
    //                     }
                          
    //                 } else { 
    //                     console.log("No such document!");
    //                 }
    //             }).catch((error) => {
    //                 console.log("Error getting document:", error);
    //             }); 
    //         }   
    // }, [ auth ])



  return (
    <>   
        <CreateCvElem className={`${selectionState ? "display-all" : "" }`}>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "personalDetails"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "personalDetails" ? "displayable" : "not-displayable" } blhahhh`} >
                    <BuilderPersonalDetails   />  
                </div>
            </Animated> 

            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "recordVideo"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "recordVideo" ? "displayable" :  "not-displayable"}`} >
                    <BuilderRecordVideo   />  
                </div>
            </Animated> 
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "preWorkHistory"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "preWorkHistory" ? "displayable" :  "not-displayable"}`} >
                    <BuilderPreWorkHistory/>  
                </div>
            </Animated>  
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "workHistory"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "workHistory" ? "displayable" :  "not-displayable"}`} >
                    <BuilderWorkHistory/>  
                </div>
            </Animated>  
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "preEducation"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "preEducation" ? "displayable" :  "not-displayable"}`} >
                    <BuilderPreEducation/>  
                </div>
            </Animated>  
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "education"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "education" ? "displayable" :  "not-displayable"}`} >
                    <BuilderEducation/>  
                </div>
            </Animated>  
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "preSkills"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "preSkills" ? "displayable" :  "not-displayable"}`} >
                    <BuilderPreSkills/>  
                </div>
            </Animated>  
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "skills"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "skills" ? "displayable" :  "not-displayable"}`} >
                    <BuilderSkills/>  
                </div>
            </Animated>  
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "preSummary"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "preSummary" ? "displayable" :  "not-displayable"}`} >
                    <BuilderPreSummary/>  
                </div>
            </Animated>  
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={profileBuilderCurrent === "summary"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "summary" ? "displayable" :  "not-displayable"}`} >
                    <BuilderSummary/>  
                </div>
            </Animated>  

            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={400} isVisible={profileBuilderCurrent === "reviewCV"} animateOnMount={false}>
                <div className={`${profileBuilderCurrent === "reviewCV" ? "displayable" :  "not-displayable"}`} >
                   <ReviewCV/>  
                </div>
            </Animated>  
        </CreateCvElem>
        
        {
            profileBuilderCurrent === "summary" ||  profileBuilderCurrent === "skills" || profileBuilderCurrent === "education" || profileBuilderCurrent === "workHistory" ? 
            <CvPreviewModal/> : ""
        }

    </>
  )

}
 