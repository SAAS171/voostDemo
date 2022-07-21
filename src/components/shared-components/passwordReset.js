import React, {useState, useEffect} from 'react';
import {Password, ConfirmNewPassword} from '../shared-components/formInput';
import Button from '../shared-components/button';
import {useDispatch, useSelector} from 'react-redux'; 
import {resetUserPass, openLogin, closeLogin} from '../../store/actions/actions';
import Alert from 'react-bootstrap/Alert'; 

import Notiflix from 'notiflix'; 
//Styles
import {SettingsPanel} from '../account-settings/styles/account-settings';
import LogIn from '../modals/logIn';

export default function AccountSettings(){
    // const profileState = useSelector(state => state.profile);
    const resetPass = useSelector(state => state.password_reset); 
    const OpenLogin = useSelector((state) => state.login_modal);

    const dispatch = useDispatch();
   
    const [password, setPassword] = useState('');
    const [confirmPassword, setComnfirmPassword] = useState('');
    
    useEffect(() => {
        if (resetPass && resetPass.success) {
            Notiflix.Notify.Success("Your password has been successfully changed")
        }
        else if(resetPass && resetPass.error) {
            Notiflix.Notify.Failure(resetPass.error.message) 
        }
    }, [resetPass])

    const changePass = (e) => {
        e.preventDefault()
        if(e.target.name === 'password') {
            setPassword(e.target.value);
        }else if (e.target.name === 'confirmNewPass'){
            setComnfirmPassword(e.target.value);
        }
    }

   const submitPasswordReset = (e)=> {
       e.preventDefault()
       if(password === confirmPassword){
           dispatch(resetUserPass({password}));
       }else {
           //present error
           Notiflix.Notify.Failure('paswords are not a match');
       }
   }

   const handleClose = () => {
       
    dispatch(closeLogin());

    }
    const handleOpen = () => {
        
        dispatch(openLogin("/account"));
    }
    
    return (
        <>
            <SettingsPanel onSubmit={(e) => submitPasswordReset(e)} >
                <h2>Reset your password</h2>
                <div className="password-show">
                    {(resetPass && resetPass.error) ? (
                        <>
                        
                        <Alert transition variant='primary' style={{'max-width': '540px'}}>
                            {resetPass.error.message}
                        </Alert> 
                        </>
                    ) 
                        : ''}
                    
                    {(resetPass && resetPass.success) ? (
                        <>
                        <Alert transition variant='primary' style={{'max-width': '540px'}}>
                        {}
                            Your password has been reset. 
                        </Alert>
                        </>
                    ) 
                        : ''}
                    <Password value={password} onChange={changePass}/>
                    <ConfirmNewPassword value={confirmPassword} onChange={changePass} />
                </div>
                <div style={{'display': 'flex'}}>
                <Button type="primarySmall" text="Confirm"  onClick={(e) => submitPasswordReset(e)}/>
                {(resetPass && resetPass.error) ? (
                    (resetPass.error.code === 'auth/requires-recent-login') ? <Button type="primarySmall" text="Reauthenticate"  onClick={(e) => handleOpen(e)}/> : ''
                ) : ''}
                </div>
            </SettingsPanel > 
        </>
    )
}