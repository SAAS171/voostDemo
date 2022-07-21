import React from 'react';
import {useSelector} from 'react-redux'; 
import HeaderSmall from '../components/header/headerSmall';
import JobsPosted from '../components/jobs-posted/jobsPosted';
import bg from '../assets/account-header.jpg';

export default function MyPosts(){
    const jobs = useSelector(state => state.my_jobs.my_jobs);
   
    return(
        <>
            <HeaderSmall text="My Posts" bg={bg} />
            <JobsPosted vacancies={jobs ? jobs : []}/>
        </>
    )
}