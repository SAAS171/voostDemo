import React from 'react'; 
import {useSelector} from 'react-redux'; 
import Nav from './nav';
import JobSeekerNav from './jobSeekerNav';
import RecruiterNav from './recruiterNav'; 

import {
    Link
} from "react-router-dom";


//SVG's
import colorLogo from '../../assets/svg/logo.svg'

//Styles
import {Logo, HeaderContainer, HeaderWrap, HeaderLogoWrap,   Img} from '../../styles/components/header';
import * as global from '../../styles/components/globalVariables';

export default function Header(props) {
    const {user} = props;
    const recruiter = useSelector(state => state.isRecruiter);
 

    const header = 
            <>
                <HeaderWrap>
                        <HeaderContainer>
                            <Link to="/">
                                <HeaderLogoWrap>  
                                    <Img src={colorLogo} />
                                    <Logo color={global.colorRed}> 
                                        Voost
                                    </Logo>
                                </HeaderLogoWrap>
                                
                            </Link>
                            {(user.user === null ? <Nav /> : recruiter ? <RecruiterNav /> : <JobSeekerNav />)}
                        </HeaderContainer>
                </HeaderWrap>
            </>
    return header
}
