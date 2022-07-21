import React  from 'react';
import HeaderSmall from '../components/header/headerSmall';
import PostJobPanelEdit from '../components/job-post/postJobPanelEdit'
import postJobBg from '../assets/post-header.jpg';

export default function EditJobPost(props){
    const {match} = props; 
   
    return(
        <>
            <HeaderSmall bg={postJobBg} text="Edit post"/>
            <PostJobPanelEdit match={match} />
            
        </>
    )
}