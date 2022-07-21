import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 
import CvPreview from '../cv-preview/cvPreview';  
import {useDispatch, useSelector} from 'react-redux'; 
import { 
    updateCvHighlightBuilder, 
    updateProfileBuilderWorkHistory, 
    updateProfileBuilderState, 
    updateProfileBuilderEducationHistory
} from '../../store/actions/actions'; 
 
import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderPreEducationContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;  
    .prework-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;

        @media screen and (max-width: 992px) { 
            max-width: 100vw;
            margin: 20px auto;
            padding: 0;
            flex-wrap: wrap;
            flex-direction: column;
            text-align: center;
            h1{
                text-align: center;
                margin-top: 20px;
                font-size: 25px;
            } 
            > div{
                width: 100%!important;
                margin-bottom: 30px;
                padding: 0 5px;
            } 
        }
    }
    .left-content{
        width: 50%; 
        padding-right: 60px; 
    }
    .right-content{
        /* width: 50%; */
        flex-shrink: 0;
    }
    .selection-buttons{
        margin-top: 35px;
    }
    .hidden {
        display: none;
    }
`
export default function BuilderPreEducation() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();   
    
    const profile = useSelector(state => state.profile);   

   


  

    const backStep = (e) =>{
        e.preventDefault(); 
        console.log("CLICKED....back")
        // dispatch(updateProfileBuilderWorkHistory("itemReview")) 
        dispatch(updateProfileBuilderState("workHistory"))   
    }
    
    const nextStep = (e) =>{
        e.preventDefault();
        console.log("CLICKED....next ")   
        dispatch(updateProfileBuilderState("education"))
        dispatch(updateProfileBuilderEducationHistory("itemStart")) 

        dispatch(updateCvHighlightBuilder(""))
    }
    
  
    return ( 
        <BuilderPreEducationContainer>
            <div className="prework-container">
                <div className="left-content">
                    <h1>Next, let’s find your education</h1>
                    <p>Let us know what qualifications you have so we can complete this part of your profile.</p>
                </div> 
                <div className="right-content">
                    <CvPreview />
                </div> 
            </div>

            <div className="selection-buttons">
                <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                <Button type="primarySmall" text="NEXT"  onClick={nextStep}/>
            </div>
        </BuilderPreEducationContainer>
    )
}
           