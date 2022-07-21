import React, {useEffect} from 'react';
import HeaderSmall from '../components/header/headerSmall';
import ApplyPanelElem from '../components/apply/applyPanel';

//Variables
import resumeBg from '../assets/post-header.jpg';

export default function Resume(props) {
    const {match} = props; 
    
    useEffect(() => {
        if(match && match.params) {
            console.log(match.params); 
        }
       
    }, [match])
    return (
        <>
            <HeaderSmall bg={resumeBg} text="Apply" />
            <ApplyPanelElem id={match.params.id}/>
           
        </>
    )
}