import React, {useState, useEffect } from 'react'
import { Question } from '../components'
import { useHistory } from 'react-router-dom'
import Button from '../components/shared-components/button'; 
import styled from 'styled-components';

import previewImg from '../assets/preview-img.png';
import modalImg from '../assets/modal-img.png';


const ResponsiveContainer = styled.div`

    @media screen and (max-width: 992px) { 
        h1{
            font-size: 30px!important;
            line-height: 1.4!important;
        }

        .split-container{
            flex-direction: column!important;
            padding: 10px!important;
            ul{
                padding: 0 10px;
                font-size: 16px;
                width: 100%;
                li {
                    text-align: left!important;
                    font-size: 18px!important;
                }
            }
            > div{
                width: 100%;
                margin-top: 0 ;
            }
        }
    }

`

const VideoExample = styled.div`
    width: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0;
    /* background-color: whitesmoke; */
    margin: 40px 0; 
    height: 300px;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    img{
        width: 100%; 
    }
`
const VideoExampleModal = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.7);
    z-index: -1;
    transition: ease-in-out 200ms;
    display: flex;
    align-items: center;
    justify-content: center;  
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    img{
        max-width: 630px;
    }

    @media screen and (max-width: 992px) { 
        &.display-modal{ 
            padding: 10px;
        }
        > div{ 
            padding: 15px;
        }
    }
    &.display-modal{
        z-index: 999;
        transition: ease-in-out 200ms;
        opacity: 1;
        pointer-events: all;  
    }
    > div {
        width: 100%;
        max-width: 800px;
        height: auto;
        background-color: white;
        border-radius: 8px;
        padding: 45px;
        text-align: center;    
        display: flex;
        flex-direction: column;
        align-items: center; 
    } 
    video{
        width: 100%;
        margin: 20px 0;
        border-radius: 8px;
        background-color: whitesmoke;

    }

`


export default function QuestionIntro(){
    const history = useHistory();
    const {selectedJobs} = history.location.state ? history.location.state  : {}; 
    const [modalState, setModalState] = useState(false)

    useEffect(()=>{
        console.log("SELECTED JOBS: " ,selectedJobs);
        // if(typeof selectedJobs == "undefined"){ 
        //     history.push("/account")
        // }
    }, [])

    const handleNext = () => { 
        history.push( {pathname: '/recruiter/questions', state: {   selectedJobs: selectedJobs }});
    }
    
    const toggleModal = (e) => {
        e.preventDefault();
        console.log("TOGGLE MODAL")
        setModalState(!modalState); 
    } 

    return (
        <React.Fragment>
            <ResponsiveContainer> 
                <Question.Section>
                <Question>
                    <Question.Title>Create your pre-recorded questions</Question.Title>
                    <Question.Text>This is where you’ll ask your interviewee the all-important questions</Question.Text>
                    <Question.Break />
                    <div  className="split-container"  style={{display: 'flex',justifyContent: 'space-between', flexDirection: 'row', position:'relative', padding: '50px 25px 50px'}}>
                        <Question.OrderedList>
                            <Question.ListItem>
                                Come up with five questions to ask the interviewee
                            </Question.ListItem>
                            <Question.ListItem>
                                Enter your questions in the boxes provided
                            </Question.ListItem>
                            <Question.ListItem>
                                Review and edit them before submitting
                            </Question.ListItem>
                            <Question.ListItem>
                                Wait for the interviewee to respond with their video!
                            </Question.ListItem>
                        </Question.OrderedList>
                    
                        <VideoExample onClick={toggleModal}   >
                            <img src={previewImg} alt="preview questions image"/>
                        </VideoExample>
                    </div>
                    <Question.ButtonWrapper>
                        <Question.Button onClick={handleNext}>Create</Question.Button>
                    </Question.ButtonWrapper>
                    <Question.Break/>
                </Question>
                </Question.Section>
                <VideoExampleModal className={`videoModalExample ${modalState ? "display-modal" : ""}`}>
                    <div className="modal-box"> 
                        <h3>Example of Pre-recorded interview questions</h3>
                        <p>See below an example of how the interviewee will <br />answer your questions.</p>
                        <img src={modalImg} />
                        <Button
                            type="primarySmall" 
                            text="CLOSE" 
                            onClick={toggleModal} /> 
                    </div> 
                </VideoExampleModal>
            </ResponsiveContainer>
        </React.Fragment>
    )
}