import React, {useState, useEffect} from 'react'
import { Question } from '../components'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components';   
import Button from '../components/shared-components/button';
import {  H6} from '../styles/components/shared-components';
import timer from "../assets/svg/timer.svg";
import {useSelector, useDispatch} from 'react-redux';  
import Notiflix from 'notiflix'; 
import { saveQuestions } from "../store/actions/actions";



const ResponsiveContainer = styled.div`

    @media screen and (max-width: 992px) { 
        h1{
            font-size: 30px!important;
            line-height: 1.4!important;
        }
        
    }
`


const ReviewQuestionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    .blue{
        border: 1px solid #243665;
        background-color: #243665;
    }
    h1{
        margin: 40px 0;
        text-align: center;
    }

    .single-question{
        margin-bottom: 50px; 
        width: 100%;
        border-radius: 8px;
        border: none;
        box-shadow: 0 0 10px -3px rgb(0,0,0,.4);
        >div.inner-q{
            overflow: hidden;
            position: relative;
            padding: 10px 10px 10px 70px;
            border-radius: 8px;
            text-align: left;
            .q-title{
                display: flex;
                align-items: flex-end;
                font-size: 19px;
                > span{
                    display: flex;
                    align-items: center;
                    &:before{
                        content: "";
                        height: 30px;
                        width: 30px;
                        background-image: url(${timer});
                        background-size: 60%;
                        background-position: center;
                        background-repeat: no-repeat;
                        display: inline-block;
                    }
                }
            }
            >span{
                color: white;
                margin: 0;
                background-color: #e03e6b;
                position: absolute;
                left: 0;
                top: 0;
                font-size: 30px;
                height: 50px;
                width: 50px;
                border-bottom-right-radius: 8px;
                display: flex;
                align-items:center;
                justify-content: center;
            }
        }
    }
`
function ReviewQuestions() {

    const dispatch = useDispatch();
    const history = useHistory();
    const {selectedJobs, questions} = history.location.state ; 
    const [localQuestions, setLocalQuestions] = useState(questions);
    const questionsAdded = useSelector(state => state.questionsAdded); 



    useEffect(()=>{
        console.log("questionsAdded", questionsAdded)

        if(questionsAdded.loading){
            Notiflix.Loading.Standard('Saving...');
        }
        else if (!questionsAdded.loading){
            Notiflix.Loading.Remove(); 
        }

        if (questionsAdded.completed){
            history.push('/recruiter/questions/thankyou');
        }
        if (questionsAdded.errors){
            console.log("ERROR WITH QUESTIONS....")
        }
    }, [questionsAdded])

    const handleNext = () => {
        selectedJobs.forEach(jobId => {
            dispatch(saveQuestions({id: jobId, questions: localQuestions}))
            
        });
    }

    const editQuestions = (e) =>{
        history.push( {pathname: '/recruiter/questions', state: {   selectedJobs: selectedJobs, originalQuestions: questions }});
    }

    const handleBack = () => {
        history.goBack();
    }

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <Question.Section>
                    <ReviewQuestionsContainer>
                        <h1>Review Your Questions</h1>
                        {
                            localQuestions.map((q, i) => {
                                return(
                                    <div className="single-question" key={i}>
                                        <div className="inner-q">
                                            <span>{i+1}</span>
                                            <div className="q-title">
                                                <H6>Question {i+1}</H6>
                                                <span>{q.timer} seconds</span>
                                            </div>
                                            <div>
                                                <p>{q.question}</p>
                                            </div>
                                        </div>
                                    </div> 
                                ) 
                            })
                        } 
                        <div className="btns">
                            <Button type="primarySmall" className="blue" text="Edit Questions"  onClick={editQuestions}/>
                            <Button type="primarySmall" text="SUBMIT AND CREATE INTERVIEW"  onClick={handleNext}/>
                        </div>
                    </ReviewQuestionsContainer>
                </Question.Section>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export default ReviewQuestions;