import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 
import CvPreview from '../cv-preview/cvPreview';  
import {useDispatch, useSelector} from 'react-redux'; 
import {updateCvHighlightBuilder, updateProfileBuilderState} from '../../store/actions/actions'; 
 
import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderPreSummaryContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;
    .left-content{ 
        padding-right: 60px;
    }  
    .presummary-container{
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

export default function BuilderPreSummary() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();   
    
    const profile = useSelector(state => state.profile);    
  

    const backStep = (e) =>{
        e.preventDefault(); 
        console.log("CLICKED....back")
        dispatch(updateProfileBuilderState("preSkills"))
        
    }
    const nextStep = (e) =>{
        e.preventDefault();
        // console.log("CLICKED....next ")   
        dispatch(updateProfileBuilderState("summary"))
        dispatch(updateCvHighlightBuilder(""))
    }
    
  
    return ( 
        <BuilderPreSummaryContainer>
            <div className="presummary-container">
                <div className="left-content">
                    <h1>Finally, let’s work on your summary</h1>
                    <p>Write a career summary to show companies how your background matches the job you want.</p>
                </div> 
                <div className="right-content">
                    <CvPreview />
                </div> 
            </div>

            <div className="selection-buttons">
                <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                <Button type="primarySmall" text="NEXT"  onClick={nextStep}/>
            </div>
        </BuilderPreSummaryContainer>
    )
}
           