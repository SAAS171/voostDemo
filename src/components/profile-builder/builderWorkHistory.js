import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components'; 
import {useDispatch, useSelector} from 'react-redux'; 

import { updateProfileBuilderWorkHistory } from '../../store/actions/actions'; 

import WorkHistoryReview from './workHistory/workHistoryReview'  
import WorkHistoryItemContent from './workHistory/workHistoryItemContent'  
import WorkHistoryItemStart from './workHistory/workHistoryItemStart'   

import {Animated} from "react-animated-css";  
import firebase from 'firebase'; 
import { db } from '../../firebase';


const BuilderWorkHistoryContainer = styled.div` 
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
                    padding: 0 5px;
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
export default function BuilderWorkHistory() {
    
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();    
    const workHistoryCurrentState = useSelector(state => state.profileBuilderWorkHistory);   
    const [workHistoryCurrent, setWorkHistoryCurrent] = useState("")

    useEffect(() =>{
        setWorkHistoryCurrent(workHistoryCurrentState.workHistory)
        // console.log("HELLOO.....", workHistoryCurrent)
  
    }, [workHistoryCurrentState])
  
  
 
    
  
    return ( 
        <BuilderWorkHistoryContainer>

            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={workHistoryCurrent === "itemStart"} animateOnMount={false}>
                <WorkHistoryItemStart/>  
            </Animated>
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={workHistoryCurrent === "itemContent"} animateOnMount={false}>
                <WorkHistoryItemContent/>  
            </Animated> 
            <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={800} isVisible={workHistoryCurrent === "itemReview"} animateOnMount={false}>
                <WorkHistoryReview/>  
            </Animated> 
        </BuilderWorkHistoryContainer>
    )
}
           