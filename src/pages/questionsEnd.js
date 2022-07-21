import React from 'react'
import { Question } from '../components'
import { useHistory } from 'react-router-dom'

export default function QuestionsEnd() {

    const history = useHistory();

    const handleClick = () => {
        history.push('/accountRecruiter');
    }

    return (
        <React.Fragment>
            <Question.Section>
                <Question>
                    <Question.UnderlinedCircle/>
                    <div style={{paddingTop: '35px'}}>
                    <Question.Title>
                        Thank You
                    </Question.Title>
                        <Question.LighteningCard/>
                            <Question.SubTitle>
                                Your questionnaire has now been added to the job application.
                            </Question.SubTitle>
                    </div>
                    <div style={{ padding: '25px 25px'}}>
                        <Question.ButtonWrapper>
                            <Question.Button onClick={handleClick}>
                                Account
                            </Question.Button>
                        </Question.ButtonWrapper>
                    </div>
                </Question>
            </Question.Section>
        </React.Fragment>
    )
}