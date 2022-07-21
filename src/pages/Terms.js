import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import TermsContent from '../components/legal/terms'; 

import bg from '../assets/jobs-header.jpg';

export default function Terms() {

    return(
        <>
            <HeaderSmall bg={bg} text="Terms and condition"/>
            <TermsContent />
        </>
    )

}