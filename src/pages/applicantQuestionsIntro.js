import React from 'react'
import { Question } from '../components'
import { useHistory} from 'react-router-dom'

export default function ApplicantQuestionsIntro() {
    
    const history = useHistory();

    const handleYes = (e) => {
        e.preventDefault();
        history.push('/applicant/questions/prestart');
    }

    const handleNo = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <React.Fragment>
            <div style={{padding: '100px', height: '70vh'}}>
                <Question>
                    <Question.Form>
                        <Question.Title>
                            Employer requires pre-recorded interview questions to be answered.
                        </Question.Title>
                        <div style={{paddingTop: '50px'}}>
                            <Question.SubTitle>
                                Would you like to proceed?
                            </Question.SubTitle>
                        </div>
                        <div style={{padding: '50px'}}>
                            {/* <Question.ButtonWrapper> */}
                            <div style={{display: 'flex', maxWidth: '1000px', gap: '50px', justifyContent: 'center'}}>
                                <Question.Button onClick={handleYes}>Yes</Question.Button>
                                <Question.InversedButton color={'#DC3163'} onClick={handleNo}>No</Question.InversedButton>
                            </div>
                            {/* </Question.ButtonWrapper> */}
                        </div>
                    </Question.Form>
                </Question>
            </div>
        </React.Fragment>
    )
}