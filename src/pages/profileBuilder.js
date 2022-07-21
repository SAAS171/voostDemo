import React, {  useEffect, useState }  from 'react';
import styled from 'styled-components';
import BuilderSelection from '../components/profile-builder/builderSelection'
import CreateCv from '../components/profile-builder/createCv'
import UploadCv from '../components/profile-builder/uploadCv'
import 'animate.css/animate.css'
import {Animated} from "react-animated-css"; 
import {useDispatch, useSelector} from 'react-redux';  
import {updateProfileBuilderState, updateProfileBuilderEducationHistory, updateProfileBuilderWorkHistory} from '../store/actions/actions'; 
import CvPreview from '../components/cv-preview/cvPreview';


const CustomGrid = styled.div`
  display: grid;
  align-items: flex-start;
  > *{
    grid-column: 1;
    grid-row: 1;
  }
`

export default function ProfileBuilder() {

  const dispatch = useDispatch();
  const profileBuilderSelection = useSelector(state => state.profileBuilderSelection)
  const [profileBuilderCurrent, setProfileBuilderCurrent] = useState("")

    useEffect(() =>{ 
      
      if(profileBuilderSelection.selection !==   profileBuilderCurrent  ){
        setProfileBuilderCurrent(profileBuilderSelection.selection)

        if(profileBuilderSelection.selection == "createcv"){ 
          dispatch(updateProfileBuilderState("personalDetails"))

        }else if(profileBuilderSelection.selection == "uploadcv"){
            dispatch(updateProfileBuilderState("cv-upload"))
        }else if(profileBuilderSelection.selection == "createcv-review"){
          console.log("CV REVIEW STAGE..")
          dispatch(updateProfileBuilderState("reviewCV"))
        }
      }

    }, [profileBuilderSelection])

  return (
    <>  
      <CustomGrid> 
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={profileBuilderCurrent === "selection"} animateOnMount={false} >
          <BuilderSelection/>  
        </Animated>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={profileBuilderCurrent === "createcv" || profileBuilderCurrent === "createcv-review"} animateOnMount={false}> 
          <CreateCv /> 
        </Animated> 
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={profileBuilderCurrent == "uploadcv"} animateOnMount={false}>
          <UploadCv />
        </Animated>  
      </CustomGrid>
    </>
  ) 
} 