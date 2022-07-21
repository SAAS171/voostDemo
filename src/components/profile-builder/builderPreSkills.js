import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 
import CvPreview from '../cv-preview/cvPreview';  
import {useDispatch, useSelector} from 'react-redux'; 
import { 
    updateUserCVData, 
    updateProfileBuilderState, 
    updateProfileBuilderWorkHistory
} from '../../store/actions/actions'; 
 
import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderPreSkillsContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;  
    .preskills-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
    }
    .selection-buttons{
        margin-top: 35px;
    }
    .hidden {
        display: none;
    }
`

export default function BuilderPreSkills() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();   
    
    const profile = useSelector(state => state.profile);    
  

    const backStep = (e) =>{
        e.preventDefault(); 
        console.log("CLICKED....back")
        dispatch(updateProfileBuilderState("preEducation"))
        
    }
    const nextStep = (e) =>{
        e.preventDefault();
        // console.log("CLICKED....next ")   
        dispatch(updateProfileBuilderState("skills"))
    }
    
  
    return ( 
        <BuilderPreSkillsContainer>
            <div className="preskills-container">
                <div className="left-content">
                    <h1>Next, let’s take care of your skills</h1>
                    <p>Add four to eight skills that are relevant from your previous jobs. We’ll suggest ones with keywords employers look for.</p>
                </div> 
                <div className="right-content">
                    <CvPreview />
                </div> 
            </div>

            <div className="selection-buttons">
                <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                <Button type="primarySmall" text="NEXT"  onClick={nextStep}/>
            </div>
        </BuilderPreSkillsContainer>
    )
}
           