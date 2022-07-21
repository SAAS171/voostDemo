import React, { useEffect } from 'react';
import HeaderSmall from '../components/header/headerSmall';
import CreateOfferLetter from '../components/create-document/create-offerletter'; 
import {useHistory} from 'react-router-dom';   

export default function CreateOfferLetterPage() {
    
    return (
        <>
            {/* <HeaderSmall bg={bg} text="Account"/> */}
            <CreateOfferLetter /> 
        </>
    )

}