import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import ContactSection from '../components/contact-section/contactSection';
import Faq from '../components/faq/faq';
import SubscribeCard from '../components/subscribe-card/subscribeCard';

import contactBg from '../assets/contact-header.jpg';


export default function ContactUs(){
    return (
        <>
            <HeaderSmall bg={contactBg} text="Contact Us" />
            <ContactSection />
            <Faq />
            <SubscribeCard />
        </>
    )
}