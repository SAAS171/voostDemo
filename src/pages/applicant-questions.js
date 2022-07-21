import React from 'react'
import { Question } from '../components'

function ApplicantQuestions() {
    return (
        <React.Fragment>
            <Question.Section>
                    <Question>
                        {/* <div style={{ backgroundColor: 'aquamarine', display: 'flex', flexDirection: 'flex-start'}}> */}
                            <Question.Form>
                                <Question.Field>
                                    <Question.Label>Question</Question.Label>
                                    <Question.Placeholder>
                                        <Question.Text>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </Question.Text>
                                    </Question.Placeholder>
                                </Question.Field>
                            </Question.Form>
                        {/* </div> */}
                        <div style={{ paddingTop: '95px'}}>
                            <Question.ButtonWrapper>
                                <div style={{ width: '1000px', height: '540px', borderRadius: '12px', background: '#000000', border: '1px solid #0000000' }}>
                                </div>
                            </Question.ButtonWrapper>
                        </div>
                        <div style={{paddingTop: '100px', paddingBottom: '100px'}}>
                        <Question.ButtonWrapper>
                            <Question.Button onClick={() => alert('next question')}>
                                Next Question
                            </Question.Button>
                        </Question.ButtonWrapper>
                        </div>
                    </Question>
            </Question.Section>
        </React.Fragment>
    )
}

export default ApplicantQuestions;