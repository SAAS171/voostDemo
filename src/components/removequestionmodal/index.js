import React from 'react';
// import { useDispatch } from 'react-redux'; 
// import { useHistory } from 'react-router-dom'; 
import Modal from '../modal'

export default function RemoveQuestionModal ({open, onClose}) {


    // const history = useHistory(); 
    // const dispatch = useDispatch(); 

    const handleYes = (e) => {
        e.preventDefault();
        console.log('Yes clicked.');
    }
    
    const handleNo = (e) => {
        e.preventDefault();
        // console.log('No clicked.');
        onClose();
    }

    if (!open) return null;
    
    return (
            <React.Fragment>
                <Modal>
                    <Modal.Wrapper>
                        <Modal.Inner>
                            <Modal.Inner>
                                <Modal.SubTitle>
                                    Are you sure you want to delete this interview question?
                                </Modal.SubTitle>
                            </Modal.Inner>
                        <Modal.ButtonWrapper>
                            <Modal.InversedButton color={'#DC3163'} onClick={handleNo}>No</Modal.InversedButton>
                            <Modal.Button onClick={handleYes}>Yes</Modal.Button>
                        </Modal.ButtonWrapper>
                    </Modal.Inner>
                    </Modal.Wrapper>
                </Modal>
        </React.Fragment>
    );
};