import React from 'react';
import HeaderSmall from '../components/header/headerSmall'; 
import PostJobPanel from '../components/job-post/postJobPanel';

//Styles
import postJobBg from '../assets/post-header.jpg';

export default function CreateJob() {
    return (
        <>
            <HeaderSmall bg={postJobBg} text="Post a job"/>   
            <PostJobPanel /> 
        </> 
    ) 
}