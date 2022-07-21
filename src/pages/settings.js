import React from 'react';
import AccountSettingsTernary from '../components/account-settings/accountSettingsTernary';
import HeaderSmall from '../components/header/headerSmall';

import ppBg from '../assets/account-header.jpg';

export default function AccountSettings() {
    return (
        <>
            <HeaderSmall bg={ppBg} text="Account Settings"/>
            <AccountSettingsTernary />
        </>
    )
}