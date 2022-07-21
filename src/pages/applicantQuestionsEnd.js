import React from 'react'
import { Question } from '../components'
import { useHistory } from 'react-router-dom'

export default function ApplicantQuestionsEnd() {

    const history = useHistory();

    const handleClick = () => {
        history.push('/account');
    }

    return (
        <React.Fragment>
            <Question.Section>
                <Question>
                    <div style={{paddingTop: '35px'}}>
                        <Question.Title>
                            Thank You
                        </Question.Title>
                        <Question.Title>
                            Your application is now complete
                        </Question.Title>
                        <Question.SubTitle>
                           The employer has now recieved:
                        </Question.SubTitle>
                        <Question.LighteningCard/>
                            <div style={{paddingTop: '100px', paddingBottom:'100px'}}>
                            {/* <Question.List> */}
                                <Question.Card>
                                    <Question.Form>
                                        <Question.Text>Your CV</Question.Text>
                                    </Question.Form>
                                </Question.Card>
                                <Question.Card>
                                    <Question.Form>
                                        <Question.Text>Your Pre-recorded interview questions</Question.Text>
                                    </Question.Form>
                                </Question.Card>
                            {/* </Question.List> */}
                            </div>
                    </div>
                    <div style={{ padding: '25px 25px'}}>
                        <Question.ButtonWrapper>
                            <Question.UnderlinedCircle/>
                            <Question.Button onClick={handleClick}>
                                Back to profile
                            </Question.Button>
                        </Question.ButtonWrapper>
                    </div>
                </Question>
            </Question.Section>
        </React.Fragment>
    )
}