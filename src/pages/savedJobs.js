import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import Saved from '../components/jobs-saved/saved';

import bg from '../assets/account-header.jpg';

export default function SavedJob() {
    return(
        <>
            <HeaderSmall bg={bg} text="Saved Jobs"/>
            <Saved />
        </>
    )
}