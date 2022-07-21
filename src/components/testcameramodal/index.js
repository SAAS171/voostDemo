import React from 'react'
import Modal from '../modal'
import Question from '../question';

export default function TestCameraModal({open, onClose}) {

    if(!open) return null;

    return (
        <React.Fragment>
            <Modal>
                <Modal.Wrapper>
                    <Modal.Inner>
                        <Modal.Inner>
                            <Modal.Title>Test your Camera</Modal.Title>
                        </Modal.Inner>
                        <Modal.Text>
                            NOTE: You should be able to see yourself clearly if the camera is working. This is to avoid any visual issues during your interview.
                        </Modal.Text>
                        <Question.Video>Test</Question.Video>
                        <Modal.ButtonWrapper>
                            <Modal.Button onClick={() => onClose()}>Close</Modal.Button>
                        </Modal.ButtonWrapper>
                    </Modal.Inner>
                </Modal.Wrapper>
            </Modal>
        </React.Fragment>
    )
}