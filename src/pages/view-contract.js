import React, { useEffect } from 'react';
import HeaderSmall from '../components/header/headerSmall';
import ViewContract from '../components/view-contract/viewContract'; 
import {useHistory} from 'react-router-dom';  
import bg from '../assets/account-header.jpg';

export default function ViewContractPage() {


    return (
        <>
            <HeaderSmall bg={bg} text="Notifications"/>
            <ViewContract /> 
        </>
    )

}