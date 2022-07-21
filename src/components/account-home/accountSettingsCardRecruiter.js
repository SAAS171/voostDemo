import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from '../shared-components/button'; 
import {logout, getUserProfile} from '../../store/actions/actions';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink } from "react-router-dom";

//Styles
import {CardDiv, LabelP, InputP, CardTop} from './styles/accountSettingsCard';
import {BorderContainer, H6} from '../../styles/components/shared-components';

export default function AccountSettingsCardRecruiter() {
    const user = useSelector((state) => state.user.user); 
    const profileState = useSelector(state => state.profile);
    const profile = profileState.profile;
    const phone = profile ? profile.phone : '';
    const companyName = profile ? profile.company_name : '';
    const companyWebsite = profile ? profile.company_website : '';

  
    const dispatch = useDispatch();
     
    useEffect(() => {
        if (!profileState.profile) {
            dispatch(getUserProfile()); 
        }
    }, [])
    const handleLogout = () => {
        dispatch(logout());
        
    }

    return(
        <BorderContainer>
            <CardDiv>
                <CardTop>
                    <H6>Account Settings</H6>
                    <div>
                        <Button type="primarySmall" text="LOGOUT" onClick={handleLogout} />
                        <br/>
                        <NavLink to="/settings">
                            <Button type="primarySmall" text="EDIT" />
                        </NavLink>
                        
                    </div>
                    
                </CardTop>
                <div>
                    <LabelP>Company Name:</LabelP><InputP>{profileState.loading ? <Spinner animation="border" size="sm" /> : companyName}</InputP>
                </div>
                <div>
                    <LabelP>Company Email:</LabelP> <InputP>{user.email}</InputP>
                </div> 
                <div>
                    <LabelP>Telephone :</LabelP><InputP>{profileState.loading ? <Spinner animation="border" size="sm" /> : phone}</InputP>
                </div> 
                <div>
                    <LabelP>Company Website:</LabelP><InputP>{profileState.loading ? <Spinner animation="border" size="sm" /> : companyWebsite}</InputP>
                </div>
            </CardDiv>
        </BorderContainer>
    )
}