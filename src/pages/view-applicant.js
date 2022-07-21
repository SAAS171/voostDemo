import React, { useEffect } from 'react';
import HeaderSmall from '../components/header/headerSmall';
import ApplicantProfile from '../components/applicant-profile/applicant-profile'; 
import {useHistory} from 'react-router-dom';  
import bg from '../assets/account-header.jpg';

export default function ApplicantProfilePage() {
    
    return (
        <>
            {/* <HeaderSmall bg={bg} text="Account"/> */}
            <ApplicantProfile /> 
        </>
    )

}