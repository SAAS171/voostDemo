import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import Card1 from '../components/about-voost/card1';
import Card2 from '../components/about-voost/card2';
import Card3 from '../components/about-voost/card3';
import TestimonialData from '../components/about-voost/testimonialData';

import bg from '../assets/jobs-header.jpg';

export default function About() {

    return(
        <>
            <HeaderSmall bg={bg} text="About Voost"/>
            <Card1 />
            <Card2 />
            <Card3 testimonials={TestimonialData}/>
        </>
    )

}