import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 
import CvPreview from '../cv-preview/cvPreview';  
import {useDispatch, useSelector} from 'react-redux'; 
import { 
    updateCvHighlightBuilder, 
    updateUserCVData, 
    updateProfileBuilderState, 
    updateProfileBuilderWorkHistory
} from '../../store/actions/actions'; 
 
import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderPreWorkHistoryContainer = styled.div` 
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
        padding-right: 60px;
    }  
    .selection-buttons{
        margin-top: 35px;
    }
    .hidden {
        display: none;
    }
`
export default function BuilderPreWorkHistory() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();   
    
  
  
    const backStep = (e) =>{
        e.preventDefault(); 
        console.log("CLICKED....back")
        dispatch(updateProfileBuilderState("recordVideo"))    
    }

    const nextStep = (e) =>{
        e.preventDefault();
        console.log("UPDATE FROM PRE WORK")   
        dispatch(updateProfileBuilderState("workHistory"))
        dispatch(updateProfileBuilderWorkHistory("itemStart"))
        dispatch(updateCvHighlightBuilder(""))
    }
    
  
    return ( 
        <BuilderPreWorkHistoryContainer>
            <div className="prework-container">
                <div className="left-content">
                    <h1>Let’s fill out your work history</h1>
                    <p>We will help you fill out your CV so that you are a great match for employers.</p>
                </div> 
                <div className="right-content">
                    <CvPreview />
                </div> 
            </div>

            <div className="selection-buttons">
                <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                <Button type="primarySmall" text="NEXT"  onClick={nextStep}/>
            </div>
        </BuilderPreWorkHistoryContainer>
    )
}
           