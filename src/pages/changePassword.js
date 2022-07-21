import React, {useState} from 'react';
import HeaderSmall from '../components/header/headerSmall';
import {ResetPass } from '../components/shared-components/formInput';
import {Submit} from '../styles/components/shared-components';
import {auth} from '../firebase';
import bg from '../assets/account-header.jpg';
import Notiflix from 'notiflix'; 
//Styles
import { BorderContainer } from '../styles/components/shared-components';
import {SettingsWrap, SettingsPanel } from '../components/account-settings/styles/account-settings'
import axios from 'axios';

const ChangePassword = (props) => {
    const [email, setEmail] = useState(''); 
    
    const handlePassReset = (e) => {
        e.preventDefault();
            Notiflix.Loading.Standard();
        if(email){

            const endpoint =  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'  ?  process.env.REACT_APP_TEST_NODE_ENDPOINT : process.env.REACT_APP_LIVE_NODE_ENDPOINT )  + `/send-password-reset`
          
            axios.post( endpoint,{email})
                .then(function (response){    
                    console.log("RESSET PASSWORD RESPONSE:", response.data)
                    Notiflix.Loading.Remove();
                    if(response.data.success){ 
                        Notiflix.Report.Success(
                            'Reset email sent', 
                            'Check your email inbox. We have sent a reset link to your email' , 
                            'Close',
                            () =>{
                                setEmail("")
                            }
                        )
                    }else{
                        Notiflix.Report.Failure('Something went wrong',  response.message ,  'Close') 
                    }
                  }).catch(function(error) {                       
                      Notiflix.Loading.Remove();
                      Notiflix.Report.Failure('Something went wrong', error ,  'Close') 
                  }) 
                .catch(function (error) { 
                    Notiflix.Loading.Remove();
                    console.log("errors: ",  error); 
                }); 






 
        } else {
            Notiflix.Notify.Failure(
                'Enter our email address to continue'
            )
        }
        
        console.log(email); 
    }
    return(
        <>
        <HeaderSmall bg={bg}  text="Forgot password"/>
        <SettingsWrap>
            <BorderContainer>
                <SettingsPanel>
                    <ResetPass value={email} onChange={e => setEmail(e.target.value)} />
                    <Submit payload={{text: "Reset password"}} onClick={e => handlePassReset(e)}/>
                </SettingsPanel>
            </BorderContainer>
        </SettingsWrap>
        </>
    )
}
export default ChangePassword;