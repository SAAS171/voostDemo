import React, { useEffect } from 'react';
import HeaderSmall from '../components/header/headerSmall';
import Messenger from '../components/messenger/messenger'; 
import {useHistory} from 'react-router-dom';  
import bg from '../assets/account-header.jpg';

export default function MessengerPage() {


    return (
        <>
            <HeaderSmall bg={bg} text="Notifications"/>
            <Messenger /> 
        </>
    )

}