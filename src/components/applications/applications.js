import React, { useEffect, useState } from 'react';
import JobCard from '../job-card/card';
import { useSelector, useDispatch } from 'react-redux';
import { getEndpoint } from '../../endpoints';
import Notiflix from 'notiflix';
import { NavLink } from "react-router-dom";
//Styles
import Button from '../shared-components/button';
import styled from 'styled-components';

import { ApplicationsWrap, Job, JobPanel } from './styles/applications';
import { BorderContainer } from '../../styles/components/shared-components';
import { getMyApplications } from '../../store/actions/actions';
import { feebackModalClose, feebackModalChange, feebackModalContent, requestFeedback } from "../../store/actions/actions";
import exit from '../../assets/svg/exit.svg';



const FeedbackModal = styled.div` 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.7);
    pointer-events: none;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center; 
    z-index: -1;
    &.show-modal{
        z-index: 999;
        pointer-events: all;
        opacity: 1;
    }
    > div{
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        position: relative;
        >div{
            margin: 50px 0;
            display: flex; 
            justify-content: space-between;
            flex-direction: column;
        } 
        .modal-content{
            display: grid;
            align-items: flex-start;
            border: none!important;
            margin: 20px 0;

            .modal-content-panel  { 
                grid-column: 1;
                grid-row: 1;
                /* display: none; */
                pointer-events: none;
                opacity: 0;
                
                &.show-content{
                    pointer-events: all;
                    opacity: 1;

                }
            }  
        }
    }

    .close-modal{ 
        position: absolute;
        right: -45px;
        top: -45px;
        background-image: url(${exit});
        background-position: center;
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: transparent;
        border: none; 
        height: 50px;
        width: 50px;
    }
    
`



export default function Applications() {
    const dispatch = useDispatch();
    // const jobs = useSelector(state => state.jobs.vacancies); 
    const myApplications = useSelector(state => state.my_applications.my_applications);
    const [openApplications, setOpenApplications] = useState([])
    const [filteredApplication, setFilterApplication] = useState(myApplications);
    const [allApplications, setAllApplications] = useState([]);

    const feedbackModal = useSelector(state => state.feedbackModal);
    const [feedbackModalState, setFeedbackModalState] = useState(false);
    const [feedbackData, setFeedbackData] = useState({});

    const [feedbackModalContentState, setFeedbackModalContentState] = useState("");

    useEffect(() => {

        // console.log("feedbackModal.modalContent: ", feedbackModal.modalContent)
        setFeedbackData({ ...feedbackModal.modalContent })
        setFeedbackModalState(feedbackModal.isOpen)

        if (!feedbackModal.isOpen && feedbackModal.modalContent.length < 1) {
            setFeedbackModalContentState("")
        }

    }, [feedbackModal])

    useEffect(() => {
        dispatch(getMyApplications());
    }, [])

    useEffect(() => {
        //fetch jobs i've applied to. 
        console.log("my applications should be loading now.......", myApplications)
        if (myApplications.length && myApplications.length > 0 && myApplications.length !== null) {
            
            setFilterApplication(myApplications)
            setAllApplications(myApplications)
            Notiflix.Loading.Standard();
            const jobIDs = [];
            myApplications.forEach(application => {
                jobIDs.push(application.data().jobId);
            });
            fetch(`${getEndpoint()}/api/jobs/applied`, {
                method: 'POST',
                body: JSON.stringify({ jobs: jobIDs }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => {
                    console.log("RES:", res)
                    if (res.ok) {
                        const jobList = res.json()
                        jobList.then((result) => {
                            setOpenApplications(result.jobs);
                            Notiflix.Loading.Remove();
                        })
                    }

                }).catch(err => {
                    Notiflix.Loading.Remove();
                    Notiflix.Report.Failure(
                        'Something went wrong',
                        'try again later',
                        'Close'
                    )
                    console.log(err);
                })
        } else {
            console.log('apply for something maybe');
        }

    }, [myApplications]);

    // const filteredApplications = (filterval) => {
    //     const filteredList = allApplications.filter(app => {
    //         return app.data().status === filterval
    //     });
    //     if (filterval === 'All') {
    //         setFilterApplication(allApplications)
    //     } else {
    //         setFilterApplication(filteredList)
    //     }

    // }



    const setEligible = (e, x) => {
        e.preventDefault();
        setFeedbackModalContentState(x ? "eligible" : "not-eligible")
        // console.log("FEEDBACK DATA: ", feedbackData);
        const obj = {
            recruiter_id: feedbackData.recruiter_id,
            applicationId: feedbackData.applicationId,
            jobPostId: feedbackData.id,
        }
        if (x) dispatch(requestFeedback(obj))

    }



    const closeFeedbackModal = (e) => {
        e.preventDefault();
        dispatch(feebackModalClose({}))
        setFeedbackModalContentState("")

    }

    return (
        <ApplicationsWrap>
            <BorderContainer>
                <NavLink to="/account">
                    {/* <a href="#">&lt; Back</a> */}
                    <div>&lt; Back</div>
                </NavLink>
                <JobPanel>
                    <Job>
                        {
                            filteredApplication.length > 0 && (filteredApplication.map(application => {
                                // console.log(application.data());
                                const theId = application.data().jobId;
                                const job = openApplications.filter(app => { return app.id === theId })
                                if (job.length > 0) {
                                    job[0]["applicationId"] = application.data()?.applicationId
                                    job[0]["appFeedbackRequested"] = application.data()?.feedbackRequested
                                    job[0]['applicationFeedback'] = application.data()?.applicationFeedback
                                    console.log(job)
                                    return <JobCard key={application.id} job={job[0]} />
                                } else {
                                    return ''
                                }

                            }))
                        }
                    </Job>
                </JobPanel>
            </BorderContainer>
            <FeedbackModal className={`feedback-modal ${feedbackModalState ? "show-modal" : ""}`}>
                <div className="inner-feedback-modal">
                    <button className="close-modal" onClick={closeFeedbackModal}></button>
                    <h4>Request Feedback</h4>
                    <div className='modal-content'>
                        <div className={`modal-content-panel ${feedbackModalContentState.length ? "" : "show-content"}`} >
                            <p>Have you been interveiwed by {feedbackData.recruiter_name}?</p>
                            <p>Please ensure you’ve been interviewed before requesting feedback</p>
                            <div>
                                <Button type="primarySmall" text="No" onClick={(e) => setEligible(e, false)} />
                                <Button type="primarySmall" text="Yes" onClick={(e) => setEligible(e, true)} />
                            </div>
                        </div>
                        <div className={`modal-content-panel ${feedbackModalContentState === "eligible" ? "show-content" : ""} `} >
                            <p>Thank you, your request for feedback has been sent to {feedbackData.recruiter_name}.</p>
                            <div>
                                <Button type="primarySmall" text="CLOSE" onClick={(e) => closeFeedbackModal(e)} />
                            </div>
                        </div>
                        <div className={`modal-content-panel ${feedbackModalContentState === "not-eligible" ? "show-content" : ""}  `} >
                            <p>Sorry you can’t request feedback at this time.</p>
                            <div>
                                <Button type="primarySmall" text="Close" onClick={(e) => closeFeedbackModal(e)} />
                            </div>
                        </div>
                    </div>
                </div>

            </FeedbackModal>
        </ApplicationsWrap>
    )
}