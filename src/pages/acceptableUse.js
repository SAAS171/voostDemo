import React from 'react'
import HeaderSmall from '../components/header/headerSmall';
import AcceptableUsePolicy from '../components/legal/acceptableUsePolicy';
import bg from '../assets/jobs-header.jpg';

function AcceptableUse(){
    return(
        <>
            <HeaderSmall bg={bg} text="Acceptable use policy"/>
            <AcceptableUsePolicy />
        </>
    )
};

export default AcceptableUse;