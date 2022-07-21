import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import JobSearch from '../components/job-search/jobSearch';
import jobsBg from '../assets/jobs-header.jpg';

export default function Jobs() {
    return (
        <>
            <HeaderSmall bg={jobsBg} text="Jobs" />
            <JobSearch />
        </>
    )
}