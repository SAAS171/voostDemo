import React, { useEffect, useState } from 'react';
import { getFeedbackResponse  } from "../store/actions/actions";
import {useHistory} from 'react-router-dom';  
import bg from '../assets/account-header.jpg';
import styled from 'styled-components';   
import Button from '../components/shared-components/button'; 
import {BorderContainer, H6} from '../styles/components/shared-components';

import {useDispatch, useSelector} from 'react-redux'; 
import Notiflix from 'notiflix'; 

import {CardDiv, CardTop} from '../components/account-home/styles/accountSettingsCard';

const ViewFeedbackContentContainer = styled.div`

    max-width: 1140px;
    margin: 0 auto 50px;  
    .header-content{
        padding: 50px 0;
        position: relative; 
        margin-bottom: 50px;
        h1{
            margin: 0;
            text-align: center;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        span{
            position: absolute;
            left: 0;
            top: 50% ;
            transform: translateY( -50% );
            cursor: pointer;

        }
    }
    .top-inner{
        display: flex;
        justify-content: space-between;
        width: 100%;
        h6{
            margin-bottom: 0;
        }
        .right-top{
            p{
                margin-bottom: 0;
                color: black;
            }
            span{
                margin: 0;
                color: #dd3162;
                font-weight: 700;
                font-size: 22px;
                width: 100%;
                display: block;
            }
        }
    }
    .card-main{
        p{     
            color: #555E82;
            font-size: 20px;
            margin-bottom: 0;
            span{
                margin: 0;
                font-weight: 700;
            }
        }
    }

    @media screen and (max-width: 992px) {
        .feedback-content{ 
            .top-inner{
                justify-content: flex-start;
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
                padding: 0 15px;
            }
            .top-inner-content{ 
                text-align: left;
                h6{
                    text-align: left;
                    width: 100%;
                    padding: 0 15px;
                } 
            }
            .card-main{
                padding: 0 15px;
            }
            .card-main-outer{
                padding: 15px;
                text-align: left;
            }
        }
    }
`

export default function FeedbackContentPage() {

    const history = useHistory();
    const {applicationId} = history.location.state ; 
    const dispatch = useDispatch();
    const feedbackContent = useSelector(state => state.fetchFeedbackResponse); 
    const [feedbackData, setFeedbackData] = useState({});


    useEffect(() =>{

        if(feedbackContent.loading){
            Notiflix.Loading.Circle("GETTING FEEDBACK")
        }
 
        if(feedbackContent.feedbackData){ 
            console.log("EMAIL SENT: ", feedbackContent.feedbackData)
            Notiflix.Loading.Remove();  
            setFeedbackData(feedbackContent.feedbackData)
        }

        if(feedbackContent.error){   
            Notiflix.Report.Failure( 'Error fetching feedback', 'An error occurred fetching feedback for this application.', 'Try Again' ); 
        } 

    }, [feedbackContent])



    useEffect(() =>{
        dispatch(getFeedbackResponse({applicationId: applicationId}));
    }, [])

    const goback = () =>{ 
        history.goBack()
    }

    return (
        <ViewFeedbackContentContainer>
            <div className="header-content">
                <h1>FEEDBACK</h1>
            </div>
            <div className="feedback-content">
                <BorderContainer>
                    <CardDiv  >
                        
                        <CardTop >
                            <div className="top-inner">
                                <div className="left-top">
                                    <H6>
                                        {feedbackData?.recruiter_name}
                                    </H6>
                                    <p>{feedbackData?.jobTitle}</p>
                                </div>
                                <div className="right-top"> 
                                    <p>Job Offered:</p>
                                    <span>{feedbackData?.applicationFeedback?.offered ? "YES" : "NO"}</span>
                                </div>
                            </div>
                        </CardTop>
                        <div className="card-main">
                            <p><span>Application date:</span> {feedbackData?.applicationFeedback?.applicationDate}</p>
                            <p><span>Interview date: </span>{feedbackData?.applicationFeedback?.interviewDate}</p>
                        </div>
                    </CardDiv>
                </BorderContainer>
                
                <BorderContainer>
                    <CardDiv >
                        <CardTop className="top-inner-content"> 
                            <H6>Feedback</H6> 
                        </CardTop>
                        <div className="card-main">
                        <p>
                                {feedbackData?.applicationFeedback?.feedback}
                        </p>
                        </div>
                    </CardDiv>
                </BorderContainer>
            </div>
            <div className="btns-container">
                <Button 
                    type="primarySmall"
                    text="Back"
                    onClick={goback}
                />
            </div>
        </ViewFeedbackContentContainer>
    )

}