import React from 'react'
import * as Style from './style/intro'


export default function QuestionRecruiterIntro() {
    return (
        <React.Fragment>
            <Style.Container>
                <Style.Title>THANK YOU</Style.Title>
                <Style.Body>
                    <Style.Text>
                        Your questionnaire has now been added to the job application.
                    </Style.Text>
                </Style.Body>
            </Style.Container>
        </React.Fragment>
    )
}