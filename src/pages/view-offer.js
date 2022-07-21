import React, { useEffect } from 'react';
import HeaderSmall from '../components/header/headerSmall';
import ViewOffer from '../components/view-offer/viewOffer'; 
import {useHistory} from 'react-router-dom';  
import bg from '../assets/account-header.jpg';

export default function ViewOfferPage() {


    return (
        <>
            <HeaderSmall bg={bg} text="Notifications"/>
            <ViewOffer /> 
        </>
    )

}