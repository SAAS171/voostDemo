import React from 'react'
import Modal from '../modal'
import {
    BsFillMicFill
} from 'react-icons/bs'

export default function TestMicModal({open, onClose}) {

    if(!open) return null;

    return (
        <React.Fragment>
            <Modal>
                <Modal.Wrapper>
                    <Modal.Inner>
                        <Modal.Inner>
                            <Modal.Title>Test your Microphone</Modal.Title>
                            <Modal.Text>
                                NOTE: You should be able to hear yourself clearly if the microphone is working.
                                This is to avoid any sound issues during your interview.
                            </Modal.Text>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                                    <BsFillMicFill size="96px" color={'#6FC7BA'} />
                                </div>
                        </Modal.Inner>
                        <Modal.ButtonWrapper>
                            <Modal.Button onClick={() => onClose()}>Close</Modal.Button>
                        </Modal.ButtonWrapper>
                    </Modal.Inner>
                </Modal.Wrapper>
            </Modal>
        </React.Fragment>
    )
}