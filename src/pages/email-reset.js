import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

import styled from 'styled-components'; 
import Notiflix from 'notiflix'; 
import {useDispatch } from 'react-redux'; 
import {openLogin, changeAuth} from '../store/actions/actions'; 
import {SettingsWrap, SettingsPanel } from '../components/account-settings/styles/account-settings'

import {Password, ConfirmNewPassword} from '../components/shared-components/formInput';
import bg from '../assets/account-header.jpg'; 
import { BorderContainer } from '../styles/components/shared-components';

import Button from '../components/shared-components/button';
import HeaderSmall from '../components/header/headerSmall';  



export default function ResetPass() {
    const history = useHistory();
    

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState(new URLSearchParams(window.location.search).get('x'))
    const [code, setCode] = useState(new URLSearchParams(window.location.search).get('reset'))
    const dispatch = useDispatch();
 
 
    const handleSavePass = (e) => {
        e.preventDefault();

        if( confirmPassword !== password ){
            Notiflix.Report.Failure(
                'Passwords do not match', 
                'Your password has not been confirmed, please make sure both passwords are the same.' , 
                'close' 
            )
            return false;
        }
        if(password.length < 6 ){
            Notiflix.Report.Failure(
                'Passwords too short', 
                'Your password must be atleast 6 characters.' , 
                'close' 
            )
            return false;
        }

        Notiflix.Loading.Standard()
        const endpoint =  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?  process.env.REACT_APP_TEST_NODE_ENDPOINT : process.env.REACT_APP_LIVE_NODE_ENDPOINT )  + `/reset-password`

        const payload = {
            email,
            code,
            password
        }; 

        axios
            .post(endpoint, payload)
            .then(function (response) {
                // handle success 
                console.log(response); 
                Notiflix.Loading.Remove()
                if(response.data.success){
                    Notiflix.Report.Success(
                        'Password Reset successful', 
                        'You have successfully reset your password click continue to access your account.' , 
                        'Continue',
                        () =>{ 
                            dispatch(changeAuth({
                                ral: "/account",
                                email,
                                password
                            })); 
                        }
                    )
                }else{

                    Notiflix.Report.Failure(
                        'Password Reset Error', 
                        'Please request a new reset link and try again.' , 
                        'close',
                        () =>{ 
                            history.push("/forgot-password")
                        }
                    )
                }
              
              


            })
            .catch(function (error) {
                // handle error
                console.log(error); 
                Notiflix.Loading.Remove() 
                Notiflix.Report.Failure(
                    'Password Reset failed', 
                    'please refresh the page and try again' , 
                    'OK' 
                )
            })
            .then(function () {
                // always executed
            });
      
    }
  
    return (
        <>
            <HeaderSmall bg={bg}  text="Update password"/>
            <SettingsWrap>
                <BorderContainer>
                    <SettingsPanel>
                        <Password value={password} onChange={e => setPassword(e.target.value)} />
                        <ConfirmNewPassword value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        <label>{  confirmPassword.length === password.length  &&  confirmPassword !== password  ? "Passwords do not match": ""}</label>
                        <Button  type="primarySmall" text="Confirm Change Password" onClick={e => handleSavePass(e)}/>
                    </SettingsPanel>
                </BorderContainer>
            </SettingsWrap>
        </>
    )

}
