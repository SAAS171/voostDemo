import React from 'react'
import { useHistory } from 'react-router-dom'
import { Question } from '../components'

export default function ApplicantQuestionsPreEnd(props) {
    
    const history = useHistory();

    return (
        <React.Fragment>
            <Question.Section>
                <Question>
                    <Question.Form>
                        <div style={{paddingTop: '35px'}}>
                            <Question.Title>Thank you for completing your pre-recorded interview.</Question.Title>
                            <div style={{paddingTop: '70px'}}>
                                <Question.SubTitle>This has been added to your application.</Question.SubTitle>
                            </div>
                        </div>
                    </Question.Form>
                    <div style={{paddingTop: '150px'}}>
                        <Question.ButtonWrapper>
                            <Question.Button onClick={() => history.push('/applicant/questions/thankyou')}>
                                Complete Application
                            </Question.Button>
                        </Question.ButtonWrapper>
                    </div>
                </Question>
            </Question.Section>
        </React.Fragment>
    )
}