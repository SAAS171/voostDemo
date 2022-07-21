import React from 'react'
import { useHistory } from 'react-router-dom'
import { Question } from '../components'
import {
    BsMicFill,
    BsCameraVideoFill
} from 'react-icons/bs'
import TestMicModal from '../components/testmicmodal'
import TestCameraModal from '../components/testcameramodal'

export default function ApplicantQuestionsPreStart() {

    const [showCamera, setShowCamera] = React.useState(false);
    const [showMic, setShowMic] = React.useState(false);

    const history = useHistory();

    const startInteview = (e) => {
        e.preventDefault();
        history.push('/applicant/questions/start');
    }

    // TODO: ask for test Camera module from James
    const testCamera = (e) => {
        e.preventDefault();
        setShowCamera(true);
    }

    // TODO: ask for test mic module from James
    const testMic = (e) => {
        e.preventDefault();
        setShowMic(true);
    }
    
    return (
        <React.Fragment>
            <Question.Section>
                <Question>
                    <Question.Form onSubmit={(e)=> e.preventDefault()}>
                        <Question.Title>Pre-recorded interview</Question.Title>
                        <Question.List>
                            <Question.ListItem>Ensure you look presentable for your potential employer.</Question.ListItem>
                            <Question.ListItem>Make sure to test your microphone and camera before starting your interview.</Question.ListItem>
                            <Question.ListItem>You will be timed on each question, so be sure to answer fully within the time allocated.</Question.ListItem>
                            <Question.ListItem>Once you have finished answering all of the questions, complete your application when prompted.</Question.ListItem>
                        </Question.List>

                        <div style={{display: 'flex', maxWidth: '1000px', gap: '30px', justifyContent: 'center', paddingBottom: '70px'}}>

                            <Question.TernaryButton onClick={testMic}>
                                <div style={{ fontSize: '16px'}}><BsMicFill/>{' '}Test Mic</div>
                            </Question.TernaryButton>
                            <TestMicModal open={showMic} onClose={() => setShowMic(false)}/>

                            <Question.TernaryButton onClick={testCamera}>
                                <div style={{ fontSize: '16px'}}><BsCameraVideoFill/>{' '}Test Camera</div>
                            </Question.TernaryButton>
                            <TestCameraModal open={showCamera} onClose={() => setShowCamera(false)}/>
                        
                        </div>

                    </Question.Form>

                    <Question.Button onClick={startInteview}>
                        <div style={{ fontSize: '16px'}}>Start Interview</div>
                    </Question.Button>
                </Question>
            </Question.Section>
        </React.Fragment>
    )
}