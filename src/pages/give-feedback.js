import React, { useEffect } from 'react';
import HeaderSmall from '../components/header/headerSmall';
import FeedbackMain from '../components/feedback/feedback-main'; 
import {useHistory} from 'react-router-dom';  
import bg from '../assets/account-header.jpg';

export default function GiveFeedbackPage() {


    return (
        <>
            <HeaderSmall bg={bg} text="Feedback"/>
            <FeedbackMain /> 
        </>
    )

}