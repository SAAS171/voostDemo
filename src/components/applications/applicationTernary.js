import React from 'react';
import {useSelector} from 'react-redux'; 
import Applicants from './applicants';
import Applications from './applications'

export default function ApplicantTernary(props) {

    const recruiter = useSelector(state => state.isRecruiter);
    
    return(
        <>
            {recruiter ? <Applicants id={props.id} /> : <Applications /> }
        </>
    )
}