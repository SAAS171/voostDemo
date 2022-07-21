import React, {  useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import HeaderSmall from '../components/header/headerSmall';
import AccountSettingsRecruiter from '../components/account-home/accountSettingsCardRecruiter';
import AccountMeetingsRecruiter from '../components/account-home/accountMeetingsCardRecruiter';
import AccountMeetingsEmpty from '../components/account-home/accountMeetingsEmptyCard';
import AccountJobsPosted from '../components/account-home/accountJobsPosted';
import AccountQuestionsCard from '../components/account-home/accountQuestionsCard'
import AccountNotifications from '../components/account-home/accountNotifications';
import AccountMessages from '../components/account-home/accountMessages';

import {getMyJobs} from '../store/actions/actions'; 
import ppBg from '../assets/account-header.jpg';
import MyVacancies from '../components/account-home/MyVacancies';
import {useHistory} from 'react-router-dom';


const AccountRecruiter =() => {
    const history = useHistory();
    const my_jobs = useSelector(state => state.my_jobs.my_jobs);
    const profile = useSelector(state => state.profile.profile)
    const dispatch = useDispatch(); 

  


    useEffect(() => {
        dispatch(getMyJobs());
    }, [])
 
    const account =  <>
    <HeaderSmall bg={ppBg} text="Account"/>
    <AccountSettingsRecruiter />
    <AccountNotifications />     
    <AccountMessages />
    <MyVacancies vacancies={my_jobs ? my_jobs : []} profile={profile} />
    <AccountMeetingsRecruiter history={history} />
    {/* <AccountQuestionsCard /> */}
    {/* <AccountMeetingsEmpty /> */}
    {/* <AccountJobsPosted vacancies={my_jobs}/> */}
</>

    return account;
}
export default AccountRecruiter