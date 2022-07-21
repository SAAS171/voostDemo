import React, {useState, useEffect} from 'react';
import {  NavLink } from "react-router-dom";

//BOOTSTRAP
import Accordion from 'react-bootstrap/Accordion';
import { BsChevronDown } from "react-icons/bs";

//SVG's
import logoWhite from '../../assets/svg/logoWhite.svg';

// STYLES
import{CenterDiv, Copyright, CopyrightUl, CopyrightLi , 
    FooterWrap, FooterInfo, FooterLinks, FooterSocial, FooterContainer, 
    IntLinks, LinkCont, LinkCont1, LinkCont2, FooterBtm, FooterSmall, 
SocDiv, IntLinkDiv, IconDiv, InfoDiv , Ico} from './styles/footer';
// import LogIn from '../modals/logIn';
// import Register from '../modals/register';   
import {BorderContainer, H4,   SocI} from '../../styles/components/shared-components';
import {Logo} from '../../styles/components/header';
import * as global from '../../styles/components/globalVariables';
import {useDispatch, useSelector} from 'react-redux'; 
import {openLogin, closeLogin, openRegister, closeRegister} from '../../store/actions/actions';

import {logout} from '../../store/actions/actions';
import {auth} from "../../firebase"

export default function Footer() {
    const dispatch = useDispatch(); 
    // const history = useHistory(); 
    const user = useSelector((state) => state.user.user);
    const modalState = useSelector(state => state.register_modal) ;
    // const OpenLogin = useSelector((state) => state.login_modal);
    const [isOpenReg, setIsOpenReg] = useState(modalState);
    // const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setIsOpenReg(modalState);
    }, [modalState])

    const handleClose = () => {
       
        dispatch(closeLogin());

    }

    const  handleLogout = () => {
        dispatch(logout());
    }
    
    const handleOpen = () => {
        dispatch(openLogin("/account"));
    }

    const openRegisterModal = () => {
        handleClose();
        dispatch(openRegister());
        
    }

    const closeRegisterModal= () => {
        dispatch(closeRegister());
        handleOpen();
    }
    const footer =
        <>
            <FooterWrap >
                <FooterContainer className='row booooo'>
                    
                        <FooterInfo className='col-xs-12 col-sm-6 col-md-4'>
                            <CenterDiv>
                                <img src={logoWhite} className="img-logo" alt="logo"/>
                                <NavLink to="/">
                                    <Logo color={global.colorWhite}>VOOST</Logo>
                                </NavLink>
                                <p className="footer-header">Get exclusive news, tips and hacks from VOOST</p>
                                <p>Fancy an even further boost with Voost? Sign up for our newsletter and be the first to gain the latest news, tips and tricks on your job search and CV hacks.</p>
                                <br/>
                                <p></p>
                            </CenterDiv>    
                        </FooterInfo>

                            <FooterLinks className='col-xs-12 col-sm-6 col-md-4'>
                                <CenterDiv>
                                    <H4>Quick links</H4>
                                    <LinkCont>
                                        <LinkCont1>
                                            <NavLink to="/about">
                                                <IntLinks>About voost</IntLinks>
                                            </NavLink>
                                            <NavLink to="/contactUs">
                                                <IntLinks>Contact us</IntLinks>
                                            </NavLink>
                                            
                                            <NavLink to="/contactUs">
                                                <IntLinks>Faq's</IntLinks>
                                            </NavLink>
                                            
                                        </LinkCont1>

                                        <LinkCont2>
                                            {
                                                auth?.currentUser ?  
                                                <IntLinks onClick={handleLogout}>Log out</IntLinks>
                                                :
                                                <IntLinks onClick={handleOpen}>Log in</IntLinks> 
                                            }


                                            <NavLink to="/">
                                            <IntLinks onClick={openRegisterModal}>Register</IntLinks>
                                            </NavLink>
                                            
                                            <NavLink to="/jobs">
                                                <IntLinks>Find a job</IntLinks>
                                            </NavLink>
                                        </LinkCont2>
                                    </LinkCont>
                                </CenterDiv> 
                            </FooterLinks>
                        
                        <FooterSocial className='col-xs-12 col-sm-6 col-md-4'>
                            <CenterDiv>
                                <H4>stay in touch</H4>
                                <SocI className="fab fa-twitter"></SocI>
                                <SocI className="fab fa-facebook-f"></SocI>
                                <SocI className="fab fa-linkedin-in"></SocI>
                                {/* <SocI className="fab fa-youtube"></SocI> */}
                            </CenterDiv>
                        </FooterSocial>
                    </FooterContainer>
            </FooterWrap>

            <FooterSmall>
                <BorderContainer>
                    <InfoDiv>
                        <img src={logoWhite} alt="logo"/>
                        <Logo color={global.colorWhite}>voost</Logo>
                        <p>Fancy an even further boost with Voost? Sign up for our newsletter and be the first to gain the latest news, tips and tricks on your job search and CV hacks.</p>
                    </InfoDiv>   
                </BorderContainer> 
                <Accordion>
                    {/* Accordion for Social Media */}
                    <IntLinkDiv>
                        <H4>quick links</H4>
                        <Accordion.Toggle as={BsChevronDown} variant="link" eventKey="0" />
                        <Accordion.Collapse eventKey="0">
                            <LinkCont>
                                <LinkCont1>
                                    <NavLink to="/about">
                                        <IntLinks>About voost</IntLinks>
                                    </NavLink>
                                    <NavLink to="/contactUs">
                                        <IntLinks>Contact us</IntLinks>
                                    </NavLink>
                                    
                                    <NavLink to="/contactUs">
                                        <IntLinks>Faq's</IntLinks>
                                    </NavLink>
                                    
                                </LinkCont1>

                                <LinkCont2>
                                {!user && (
                                    <>
                                    <IntLinks onClick={handleOpen}>Log in</IntLinks>

                                    <IntLinks onClick={openRegisterModal}>Register</IntLinks>
                                    </>
                                )}
                                   
                                    <NavLink to="/jobs">
                                        <IntLinks>Find a job</IntLinks>
                                    </NavLink>
                                </LinkCont2>
                            </LinkCont>
                        </Accordion.Collapse>
                    </IntLinkDiv>

                    {/* Accordion for Internal Links */}
                    <SocDiv>
                        <H4>Stay in touch</H4>
                        <Accordion.Toggle as={BsChevronDown} variant="link" eventKey="1" />
                        <Accordion.Collapse eventKey="1">
                            <IconDiv>
                                <CenterDiv>
                                    <SocI className="fab fa-twitter"> </SocI>
                                    <SocI className="fab fa-facebook-f"></SocI>
                                    <SocI className="fab fa-linkedin-in"></SocI>
                                    <SocI className="fab fa-youtube"></SocI>
                                </CenterDiv>
                            </IconDiv>
                        </Accordion.Collapse>
                    </SocDiv>
                </Accordion>
            </FooterSmall>
        </>
        const footerBtm =  
            <FooterBtm> 
                <Copyright>&#169; Copyright Voost Limited 2021 </Copyright>
                <CopyrightUl>
                    <NavLink to="/privacy-policy">
                        <CopyrightLi>Privacy policy</CopyrightLi>
                    </NavLink>
                    <NavLink to="/terms">
                        <CopyrightLi>Terms &#38; conditions</CopyrightLi>
                    </NavLink>
                    {/* <NavLink to="/cookie-policy">
                        <CopyrightLi>Cookie policy</CopyrightLi>
                    </NavLink> */}
                    <NavLink to="/acceptable-use">
                        <CopyrightLi>Acceptable use policy</CopyrightLi>
                    </NavLink>
                    
                </CopyrightUl>   

            </FooterBtm>

    return <div> 
                {footer}
                {footerBtm} 
                <Ico> 
                    <p>
                        Voost Jobs is a trading style of My Job App Limited. Company Registered Address: C/O Connaughton & Co Boulton House, Second Floor, 17-21 Chorlton Street, Manchester, England, M1 3HY. My Job App Limited ICO No: ZB227468. My Job App is registered in England & Wales. Company number: 10866837.
                    </p>
                </Ico>
                {/* <LogIn open={(OpenLogin && !user)} onClose={handleClose} /> 
                <Register open={(isOpenReg && !user)} onClose={() => closeRegisterModal(false)} />  */}
            </div>
}