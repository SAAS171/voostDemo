import React from 'react';
import {useSelector} from 'react-redux'; 
import HeaderSmall from '../components/header/headerSmall';
import NotificationsList from '../components/notifications/notifications-list';
import bg from '../assets/account-header.jpg';

export default function Notifications(){
    

   
    return(
        <>
            <HeaderSmall text="Notifications" bg={bg} />
            <NotificationsList offers={[]}/>
        </>
    )
}