import React, {useEffect, useState} from 'react'; 
import { NavWrap, NavUl, NavLi} from '../../styles/components/nav';

import {NavLink} from 'react-router-dom';

import styled from 'styled-components';   
import bell from "../../assets/svg/bell.svg";
import {useSelector } from 'react-redux';
import noise from "../../assets/audio/notification.mp3";

import {auth, rdb} from '../../firebase'; 


const NotificationsIcon = styled.div`
    background-image: url(${bell});
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    height: 40px;
    width: 40px;
    cursor: pointer;
    position: relative;
    &:before{
        background-color: transparent;
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        border-radius: 50px; 
        height: 15px;
        width: 15px;
    }
    &.has-notification{
        &:before{
            background-color: red;
        }
    }

`



export default function RecruiterNav(){


    const [haveNotifications, setHaveNotifications] = useState(false);

    useEffect(() => {  
        var userNotifcations = rdb.ref('notifications/' + auth.currentUser.uid + '/unread');   
        userNotifcations.on('value', (snapshot) => { 
            const data = snapshot.val();  
            setHaveNotifications(data)  
        });
    }, []);

  
    useEffect(() => {            
        if(haveNotifications){
            const audio = new Audio(noise)
            audio.play();
        }
        // console.log("haveNotifications: ", haveNotifications)
    }, [haveNotifications]);

    return(
        <>
            <NavWrap>
                <NavUl>
                    {/* <NavLink to="/jobs"><NavLi>jobs </NavLi></NavLink> */}
                    <NavLink to="/voost-rooms"><NavLi>voost room </NavLi></NavLink>
                    <NavLink to="/post-job"><NavLi>post a job </NavLi></NavLink>
                    <NavLink to='/about'><NavLi>about voost </NavLi></NavLink>
                    <NavLink to="/contactUs"><NavLi>contact us </NavLi></NavLink>
                    <NavLink to="/accountRecruiter"><NavLi className="account">Account</NavLi></NavLink>
                    <NavLink to="/notifications">
                        <NavLi>
                            <NotificationsIcon className={` ${haveNotifications ? "has-notification" : ""} `}></NotificationsIcon> 
                        </NavLi>   
                    </NavLink>
                </NavUl>
            </NavWrap>
        </>
    )
}