import React  from 'react';
import HeaderSmall from '../components/header/headerSmall';
import ApplicationTernary from '../components/applications/applicationTernary';

import bg from '../assets/account-header.jpg';

export default function Applications(props){
    return(
        <>
            <HeaderSmall bg={bg} text="Applications"/>
            <ApplicationTernary id={props.match.params.id}/>
        </>
    )
}