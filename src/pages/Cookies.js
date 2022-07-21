import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import CookieContent from '../components/legal/cookie'; 

import bg from '../assets/jobs-header.jpg';

export default function Cookie() {

    return(
        <>
            <HeaderSmall bg={bg} text="Cookie Policy"/>
            <CookieContent />
        </>
    )

}