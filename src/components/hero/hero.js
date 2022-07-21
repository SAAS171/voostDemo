import React, {useState} from 'react';
import Button from '../shared-components/button';
import {useSelector, useDispatch} from 'react-redux'; 
import{NavLink} from 'react-router-dom';
import LogIn from '../modals/logIn'; 

//Styles
import * as global from '../../styles/components/globalVariables';
import {ButtonWrap} from '../../styles/components/shared-components';
import {Herosub, HeroWrap, HeroCaptionWrap, HeroTitle, GreenLightning} from '../../styles/components/hero';
import {Logo} from '../../styles/components/header';

import { openRegister } from '../../store/actions/actions'; 
export default function Hero(props) {
    const dispatch = useDispatch(); 

    const {background, title, sub} = props.payload;
    // const user = useSelector((state) => state.user);
    const recruiter = useSelector((state) => state.isRecruiter);

    //MODAL FUNCTIONS
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);

    const openModal = (e) =>{
        e.preventDefault();  
        dispatch(openRegister()); 
    }

    const hero = 
    <HeroWrap bg={background}>
        <GreenLightning />
        <HeroCaptionWrap> 
                <Logo color={global.colorRed} className="logo-phone">Voost </Logo>
                <HeroTitle>{title ? title : ''}</HeroTitle>
                <Herosub>{sub ? sub : ''}</Herosub>
                
                <ButtonWrap>
                    <NavLink to="/jobs">
                        <Button type="primaryLarge" text="Search your future" /> 
                    </NavLink>

                    <NavLink to={(recruiter === true ? "/post-job" : '/')}>
                        {(recruiter === false ? <Button type="secondary" text="Post a New Job" onClick={openModal}/> : <Button type="secondary" text="post a job"/>)}
                    </NavLink>
                </ButtonWrap>
        </HeroCaptionWrap>
        <ButtonWrap></ButtonWrap>
        {/* <LogIn open={isOpenLogIn} onClose={() => setIsOpenLogIn(false)}/>  */}
    </HeroWrap> 
    return (hero)
}
