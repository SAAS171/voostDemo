import React from 'react'
import { useHistory } from 'react-router';
import {Question} from '../components'


export default function ApplicantQuestionsStart(props) {
    
    const history = useHistory();

    const handleStart = (e) => {
        e.preventDefault();
        history.push('/applicant/questions');
    }
    
    const handleBack = (e) => {
        e.preventDefault();
        history.goBack();
    }
    
    return (
        <React.Fragment>
            <Question.Section>
                <Question>
                    <Question.Title>Are you sure want to start?</Question.Title>
                    <div style={{paddingTop: '40px'}}>
                        <Question.SubTitle>Once started you cannot re-record questions or stop the recording.</Question.SubTitle>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '140px'}}>
                        <Question.Button onClick={handleStart}>Start</Question.Button>
                        <Question.InversedButton color={'#DC3163'}onClick={handleBack}>Back</Question.InversedButton>
                    </div>
                </Question>
            </Question.Section>
        </React.Fragment>
    )
}