import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import Card1 from '../components/voost-rooms/card1';
import Card2 from '../components/voost-rooms/card2';
import bg from '../assets/account-header.jpg';

export default function VoostRooms(){
    return(
        <>
            <HeaderSmall bg={bg} text="Voost Rooms" />
            <Card1/>
            <Card2/>
        </>
    )
}