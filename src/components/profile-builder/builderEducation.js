import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components'; 
import {useDispatch, useSelector} from 'react-redux'; 

import { updateProfileBuilderEducationHistory } from '../../store/actions/actions'; 

import EducationItemStart from './education/educationItemStart'   
import EducationReview from './education/educationItemReview'  

import {Animated} from "react-animated-css";  
import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderEducationContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;  
    display: grid;
    align-items: flex-start;



    > *{
        grid-column: 1;
        grid-row: 1;
    }
    .prework-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;

        @media screen and (max-width: 992px) { 
            max-width: 100vw;
            margin: 20px auto;
            padding: 0 15px;
            h1{
                text-align: center;
                margin-top: 80px;
                font-size: 25px;
            }
            .summaryContent-container{
                flex-wrap: wrap;
                flex-direction: column;
                > div{
                    width: 100%!important;
                    margin-bottom: 30px;
                }
            }
        }
    }

    .selection-buttons{
        margin-top: 35px;
    } 
    
    .hidden {
        display: none;
    }
`
export default function BuilderEducation() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();    
    const EducationHistoryCurrentState = useSelector(state => state.profileBuilderEducationHistory);   
    const [educationHistoryCurrent, setEducationHistoryCurrent] = useState("")

    useEffect(() =>{
        setEducationHistoryCurrent(EducationHistoryCurrentState.educationHistory)
        // console.log("HELLOO.....", workHistoryCurrent)
  
    }, [EducationHistoryCurrentState])
  
  
 
    
  
    return ( 
        <BuilderEducationContainer>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={educationHistoryCurrent === "itemStart"} animateOnMount={false}>
                <EducationItemStart/>  
            </Animated> 
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={educationHistoryCurrent === "itemReview"} animateOnMount={false}>
                <EducationReview/>  
            </Animated> 
        </BuilderEducationContainer>
    )
}
           