import React from 'react';
import {useSelector} from 'react-redux'; 
import HeaderSmall from '../components/header/headerSmall';
import ConversationsList from '../components/conversations/conversations-list';
import bg from '../assets/account-header.jpg';

export default function Conversations(){
    

   
    return(
        <>
            <HeaderSmall text="Conversations" bg={bg} />
            <ConversationsList  />
        </>
    )
}