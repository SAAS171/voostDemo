import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import AccountProfileBuilder from '../components/account-home/AccountProfileBuilder';
import AccountSettings from '../components/account-home/accountSettingsCard';
import AccountApplications from '../components/account-home/accountApplicationsCard';
import AccountNotifications from '../components/account-home/accountNotifications';
// import AccountMeetings from '../components/account-home/accountMeetingsCard';
import AccountMessages from '../components/account-home/accountMessages';

import AccountMeetingsEmpty from '../components/account-home/accountMeetingsEmptyCard';
// import AccountSavedJobs from '../components/account-home/accountSavedJobsCard';
import {useHistory} from 'react-router-dom'; 

import ppBg from '../assets/account-header.jpg';


export default function Account() {
    const history = useHistory()
    return (
        <>
            <HeaderSmall bg={ppBg} text="Account"/>
            <AccountSettings />
            <AccountNotifications />
            <AccountMessages />     
            <AccountProfileBuilder />
            <AccountApplications />
            {/* <AccountMeetings history={history}/> */}
            <AccountMeetingsEmpty history={history}/>
            {/* <AccountSavedJobs/> */}
        </>
    )

}