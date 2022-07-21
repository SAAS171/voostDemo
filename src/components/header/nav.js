import React, { useState, useEffect } from 'react';
import LogIn from '../modals/logIn';
import Register from '../modals/register';
import {useSelector, useDispatch} from 'react-redux'; 
import Button from '../shared-components/button';
import {ButtonWrap} from '../../styles/components/shared-components';
import {  NavWrap, NavUl, NavLi} from '../../styles/components/nav';
import {  Link, NavLink, useHistory } from "react-router-dom";
import {openLogin, closeLogin, openRegister, closeRegister, startLoginRedirect, registerOpenType} from '../../store/actions/actions'; 

 const DefaultNav = () => {
    const dispatch = useDispatch(); 
    const user = useSelector((state) => state.user.user);
    const OpenLogin = useSelector((state) => state.login_modal);
    const modalState = useSelector(state => state.register_modal) ;
    const [isLoginOpen, setIsLoginOpen] = useState(OpenLogin);
    const [isOpenReg, setIsOpenReg] = useState(modalState);
    // const [currentUser, setCurrentUser] = useState(null);

    const history = useHistory(); 
    

    useEffect(() => {
        setIsOpenReg(modalState);
    }, [modalState])

    const handleClose = () => { 
        dispatch(closeLogin()); 
    }


    const handleOpen = () => {
        dispatch(openLogin("/account"));
    }

    const handleLoginButtonToRegister = () => {
        handleClose()
        console.log("OPEN REGISTER.....")
        setIsOpenReg(true) 
        dispatch(registerOpenType("recruiter"));
        
    }

    const handleRegisterButtonToLogin= () => {
        setIsOpenReg(false)
        dispatch(closeRegister());
        handleOpen()
    }

    const defaultNav = 
        <>
            <NavWrap>
                <NavUl>
                    <NavLink to='/about'><NavLi>about voost</NavLi></NavLink>
                    <NavLink to="/jobs"><NavLi>jobs </NavLi></NavLink>
                    <NavLink to="/voost-rooms"><NavLi>Voost room </NavLi></NavLink>
                    <NavLink to="/contactUs"><NavLi>contact us</NavLi></NavLink>
                    <a style={{cursor: "pointer"}} onClick={handleOpen}><NavLi>log in</NavLi></a>
                </NavUl>
                <ButtonWrap onClick={() => handleLoginButtonToRegister()}><Button type="primarySmall" text="REGISTER" ></Button></ButtonWrap>
            </NavWrap>
            
            {/* 
                <LogIn open={(isLoginOpen && !user)} onClose={handleClose} signUpBtn={handleLoginButtonToRegister}/> 
                <Register open={(isOpenReg && !user)} onClose={() => handleRegisterButtonToLogin(false)} loginBtn={handleRegisterButtonToLogin}/>  
            */}
            
        </>

    return (defaultNav);
};
export default DefaultNav;
