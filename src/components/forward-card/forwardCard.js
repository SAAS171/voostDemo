import React from 'react';
import Button from '../shared-components/button';
import {Link} from 'react-router-dom'; 
//Styles
import {CardWrap, CardCaptionWrap, CardWrapEllipse, CardWrapPlus, CardWrapLightning, CardWrapGroup} from './styles/forwardCard.js';
import {BorderContainer, H3, P} from '../../styles/components/shared-components';
import {  registerOpenType} from '../../store/actions/actions';  
import {useSelector, useDispatch} from 'react-redux'; 

export default function ForwardCard() { 
    const dispatch = useDispatch(); 
    const openRegister = (e) =>{
        e.preventDefault(); 
        dispatch(registerOpenType("recruiter"))
    }   

    const forwardCard = 
    <CardWrap>
        <CardWrapEllipse/>
        <CardWrapPlus/>
        <CardWrapGroup/>
        <CardWrapLightning/>

        <CardWrap/>
        <BorderContainer>
            <CardCaptionWrap>
                <H3>Applying and Hiring With No Hidden Costs</H3>
                <P>
                    Finding your ideal job or candidate can be hard - we’ve all been there. But this is where Voost changes everything. 
                    <br />
                    We believe in recruitment that’s completely transparent through live video interviewing and a seamless search experience that’s unique to you, to maximise your chances of landing the role or personnel you’ve always wanted. 

                </P>
                    <Link to='/jobs'> 
                        <Button type="primaryLarge" text="Search Your Future Free"/>
                    </Link>
                    <Button onClick={openRegister} type="primaryLarge" text="Post a Job for Free"/>

            </CardCaptionWrap>
        </BorderContainer>
    </CardWrap>
    return(forwardCard);
}

