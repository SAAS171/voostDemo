import React, { useEffect, useState } from 'react';
import Button from '../shared-components/button';
import {
    Link, NavLink
} from "react-router-dom";  
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';  
import { deleteJob, getMyJobs, deleteJobPost } from '../../store/actions/actions'; 

//Styles
import {BorderContainer, H6} from '../../styles/components/shared-components';
import {CardBody, Application } from './styles/accountApplicationsCard';
import {CardDiv, CardTop} from './styles/accountSettingsCard';
import {} from '../applications/styles/applicantsCard';
import exit from '../../assets/svg/exit.svg'; 
// import {useHistory} from 'react-router-dom';


const CloseJobModal = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.7);
    pointer-events: none;
    opacity: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
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

    &.show-modal{
        pointer-events: all;
        opacity: 1;
    }
    > div{
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        position: relative; 
    }
`

export default function MyVacancies(props){
    const {vacancies, profile} = props; 
    const [localVacancies, setLocalVacancies] = useState([])
    const [showClosedJobModal, setShowClosedJobModal] = useState(false)
    // const history = useHistory(); 
    const dispatch = useDispatch(); 
    const my_jobs = useSelector(state => state.my_jobs.my_jobs);

    const deleteState = useSelector(state => state.isDeleted);

    useEffect(() =>{
        if(deleteState != null){
            console.log("deleteState", deleteState)
            dispatch(getMyJobs());
            setShowClosedJobModal(true)
            dispatch(deleteJobPost(null));

        }
    }, [deleteState])

    useEffect(() =>{
        if(my_jobs != []){
            console.log("UPDATED JOBS.....", my_jobs)
            setLocalVacancies(my_jobs)
        }
    }, [my_jobs])

    const closeShowJobModal = (e) => {
        e.preventDefault();

        setShowClosedJobModal(false)
    }

    // const handleEdit = (e) => {
    //     e.preventDefault(); 
    //     history.push(`/edit-job/${e.target.name}`); 
       
    // }



    useEffect(() =>{
        if(localVacancies.length < 1){
            console.log("VACANCIES", vacancies) 
            const orderedVacancies = vacancies.sort((a, b) => b.data().date - a.data().date) 
            setLocalVacancies(orderedVacancies.slice(0, 3))
        }
    }, [vacancies])

    const buttonExtend = {
        width : "160px"
    };
    // const handleView = (e) => {
    //     e.preventDefault(); 
    //     history.push(`/jobs/?jobId=${e.target.name}`);
    // }


    const obj = {
        a:{ 
            cv: {
                url: "https://firebasestorage.googleapis.com/v0/b/voost-…=media&token=18ce03fe-8a55-4ac8-a7bc-cef81e3fe4ee", 
                name: "pdf-test.pdf"
            },
            cvProfile: {
                address: "dfghjkl",
                city: "manchester",
                county: "",
                cvImage: "https://firebasestorage.googleapis.com/v0/b/voost-6ab1c.appspot.com/o/cvs%2FlOmyMlttupM2jz7PxFdUQ3M3Mv72%2Fimg%2Fcv-img.png?alt=media&token=0cb4a674-c140-40bd-8004-44b4f2b3474f",
                cvVideo: "https://firebasestorage.googleapis.com/v0/b/voost-6ab1c.appspot.com/o/cvs%2FlOmyMlttupM2jz7PxFdUQ3M3Mv72%2Fvideo%2Fcv-video.webm?alt=media&token=cf8f858c-eea6-4aba-8fba-249bf87f258f",
                educationHistory:  [
                    {
                        city: "manchester",
                        description: "great course",
                        endDate: "30/6/2021",
                        institutionName: "university of leicester",
                        qualification: "Master of Science",
                        startDate: "1/10/2019",
                        studyField: "computers",
                        uid: "6d06ae36-0271-42a6-b3d0-09b71ad60aba"
                    },
                    {
                        city: "test",
                        description: "test data",
                        endDate: "30/6/2021",
                        institutionName: "university of leicester",
                        qualification: "Bachelors of Science ",
                        startDate: "30/5/2017",
                        studyField: "computers",
                        uid: "828f4c48-06f6-4618-9bf0-0afed56473fb",
                    }
                ],
                email: "james@opopmedia.co.uk",
                firstname: "james",
                lastname: "exton",
                postcode: "m50 3at",
                skillsList: [
                    {
                        id: "e9582b66-cddc-42f6-8f58-072e043fb548",
                        tags:  ["development", "coding"],
                        text: "Great programmer."
                    },
                    {
                        id: "3e289290-8193-48a3-b6ba-331683d6dc77",
                        tags: (2) ["marketing", "advertising"],
                        text: "Javascript developer."
                    },
                    {
                        id: "0bfc927a-4ec8-4100-94b7-7ca687ed93d3",
                        text: "TEST"
                    }
                ],
                summary: "<p>Javascript developer.</p><p>Great programmer.</p><p>Coded lots of things...</p><p>hi veery one</p>",
                telephone: "07470213155",
                workHistory:  [ 
                   {
                       city: "test",
                        content: "<p>Successfully managed social media accounts and analysed data to efficiently improve content.</p><p>Resolved issues efficiently, in turn enhancing user experience.</p>",
                        county: "test",
                        currentEmployer: true,
                        employer: "opop",
                        endDate: "16/6/2021",
                        jobTitle: "Developer",
                        startDate: "14/6/2021",
                        uid: "1de9403d-2bff-44f3-a4b7-1fa7747fe133",
                    },
                    {
                        city: "test",
                        content: "<p>Coded lots of things...</p><p>Successfully managed social media accounts and analysed data to efficiently improve content.</p><p>I am the don dada</p>",
                        county: "test",
                        currentEmployer: false,
                        employer: "Digital and Code",
                        endDate: "21/6/2021",
                        jobTitle: "developer",
                        startDate: "7/6/2021",
                        uid: "03ca86a6-2a26-4789-9f7c-f5803579d362",
                    }
                ]    
            },
            email: "james@opopmedia.co.uk",
            id: "lOmyMlttupM2jz7PxFdUQ3M3Mv72",
            name: "james exton",
            recruiter: false
        }, 
        b:{
            applicationId: "kwqsFTPWvULWuwxoVlwi",
            jobId: "xLH3mAeuKLZnROj8Gyxz",
            jobTitle: "test",
            recruiter_image: false,
            recruiter_name: "recruiter james",
            status: "Applied",
            timestamp: {
                seconds: 1623112859, 
                nanoseconds: 134000000
            }
        }
    }

    let job = { 
        date: 1623112738145,
        description: "<p>test</p>",
        id: "xLH3mAeuKLZnROj8Gyxz",
        isLive: true,
        jobCategory: [
            "Gas and Utilities"
        ] ,
        jobTitle: "test",
        jobType: "Part-time",
        location: "manchester",
        locationSearch: "manchester",
        published: null,
        recruiter_id: "uItqOrIvVvee9a3WI5wPxdqlWn43",
        recruiter_image: false,
        recruiter_name: "recruiter james",
        salary: "12000",
        searchTitle: [
            "test",
            "TEST"
        ]  
    }


    const deleteThisJob = (id) =>{ 
        dispatch(deleteJob(id))

    }   


    return(
        <BorderContainer>
            <CardDiv>
                <CardTop>
                    <H6>My Posts</H6>
                </CardTop>
                <CardBody> 
                

                    {/* <Link to={{  pathname: "/create-contract", state:  { currentApplicant: obj, job: job} }}> <Button type="primarySmall" text="create contract" style={buttonExtend}/></Link> */}
                    {
                        localVacancies.map(job => {

                            console.log("JOB DATA: ", job.data().jobTitle)
                            console.log("JOB DATA: ", job.data().appCount )

                           return <Application key={job.id}>
                               
                                    <div className="app-left">
                                        {profile && profile.company_image ?  
                                        <img src={`${profile && profile.company_image ? profile.company_image.url : ''}`} alt="profile"/>
                                        : ''} 
                                        <div>
                                            <p>Status: {job.data().closed ? "Closed" : "Live"}</p>
                                            <H6>{job.data().jobTitle}</H6>
                                            <p className="job-category">Category: {job.data().jobCategory.join(",")}</p>

                                        </div>
                                    </div>
            
                                    <div className="app-right">

                                        <Link to={`/jobs/?jobId=${job.data().id}`}>
                                            <Button type="primarySmall" text="View" style={buttonExtend}/>
                                        </Link>
                                        <Link to={`/edit-job/${job.data().id}`}>
                                            <Button type="primarySmall" text="Edit" style={buttonExtend}/>
                                        </Link>
                                        {}
                                        <Link to={`/applicants/${job.data().id}`}>
                                            <Button type="primarySmall" text="Applicants" style={buttonExtend}/>
                                        </Link>
                                        {job.data().closed ? "" :
                                            <Button type="primarySmall" text="Close Job" onClick={ (e) => deleteThisJob(job.data().id) } />
                                        }
                                    </div>
                                </Application>
                        })
                    }
                    
                    {vacancies.length > 1 ? (
                        <NavLink to="/myPosts">
                            <button className="card-button">SHOW MORE</button>
                        </NavLink>
                        ) : (
                            <></>// <h6>You have no posts</h6>
                        )
                    }
        
                </CardBody>
            </CardDiv>
            <CloseJobModal className={showClosedJobModal ? "show-modal" : ""}>
                <div className="closed-job-modal">
                    <div className="closed-job-modal-inner">
                        <h5>Job Post Closed</h5> 
                        <p>Your job post has now closed. Applicants will not be apply for your job post from now on.</p>
                        <div> 
                            <Button  
                                    type="primarySmall"
                                    text="OK"
                                    onClick={closeShowJobModal}
                                />
                        </div>
                    </div>
                </div> 
            </CloseJobModal>
        </BorderContainer>
    )
}