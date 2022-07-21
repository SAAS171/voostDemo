import React from 'react';
import {useSelector} from 'react-redux'; 
import AccountSettings from './accountSettings';
import AccountSettingsRecruiter from './accountSettingsRecruiter';

export default function AccountSettingsTernary(){
    const recruiter = useSelector(state => state.isRecruiter);
    console.log("RECRUITER......" , recruiter)
    return(
        <>
            {recruiter ? <AccountSettingsRecruiter /> : <AccountSettings /> }
        </>
    )
}