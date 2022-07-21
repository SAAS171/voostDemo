import React, { useEffect } from 'react';
import HeaderSmall from '../components/header/headerSmall';
import CreateContract from '../components/create-document/create-contract'; 
import {useHistory} from 'react-router-dom';   

export default function CreateContractPage() {
    
    return (
        <>
            {/* <HeaderSmall bg={bg} text="Account"/> */}
            <CreateContract /> 
        </>
    )

}