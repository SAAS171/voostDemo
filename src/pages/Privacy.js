import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import PrivacyContent from '../components/legal/privacy'; 

import bg from '../assets/jobs-header.jpg';

export default function Privacy() {

    return(
        <>
            <HeaderSmall bg={bg} text="Privacy Policy"/>
            <PrivacyContent />
        </>
    )

}