import React, {useState, useEffect} from 'react';
// import JobCard from '../job-card/card';
import Button from '../shared-components/button';
import {useHistory} from 'react-router-dom'

import {  Link } from "react-router-dom";

//Styles
import {JobsPostedWrap, JobsPostedContainer} from './styles/jobsPosted';
import {Application} from '../account-home/styles/accountApplicationsCard'
import {H6, BorderContainer} from '../../styles/components/shared-components';

import { deleteJob } from '../../store/actions/actions'; 
import {useDispatch} from 'react-redux'; 

export default function JobsPosted(props) {

    const [jobId, setjobID] = useState('');
    const {vacancies} = props; 
    const dispatch = useDispatch(); 
    // const history = useHistory();

    console.log(props.vacancies);
    if(props.vacancies){
        props.vacancies.map(job => {
            console.log(job.data());
        });
    }
    useEffect(() => {
        setjobID(getQueryVariable(jobId));
    }, [])

    useEffect(() => {
        console.log(jobId);
    }, [jobId])
    /*
        const handleEdit = (e) => {
            e.preventDefault(); 
            history.push(`/edit-job/${e.target.name}`);
        }
        const handleApplicants =(e) => {
            e.preventDefault(); 
            history.push(`/applicants/${e.target.name}`);
        }
        const handleView = (e) => {
            e.preventDefault(); 
            history.push(`/jobs/?jobId=${e.target.name}`);
        }

    */


    const deleteThisJob = (id) =>{ 
        dispatch(deleteJob(id)) 
    }   

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        console.log(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
        if(pair[0]===variable){return pair[1];}
        }
        return(false);
    }
    return(
        <>
            <JobsPostedWrap>
                <BorderContainer>
                    {
                        vacancies.map(job => {
                           return (
                                <JobsPostedContainer key={job.id}>
                                    <Application >
                                        <div className="app-left">
                                            {job.data().recruiter_image  ? 
                                            <img src={`${job.data().recruiter_image ? job.data().recruiter_image.url : ''}`} alt="job data" />
                                            : ""}
                                            <div>
                                                <H6>{job.data().recruiter_name ? job.data().recruiter_name : 'Company Name'}</H6>
                                               
                                            <p className="job-title">{job.data().jobTitle}</p>
                                            </div>
                                        </div>
                
                                        <div className="app-right">
                                                <Link to={`/jobs/?jobId=${job.id}`}>
                                                    <Button type="primarySmall" name={job.id} text="View" />
                                                </Link>
                                                <Link to={`/edit-job/${job.id}`}>
                                                    <Button type="primarySmall" name={job.id} text="Edit" />
                                                </Link>
                                                <Link to={`/applicants/${job.id}`}>
                                                    <Button type="primarySmall" name={job.id} text="Applicants" />
                                                </Link>
                                                {job.data().closed ? "" :
                                                    <Button type="primarySmall" text="delete" onClick={ (e) => deleteThisJob(job.data().id) } />
                                                }
                                        </div>
                                    </Application>
                                </JobsPostedContainer>
                           )
                        })
                    }
                </BorderContainer>
                
            </JobsPostedWrap>
        </>
    )
}