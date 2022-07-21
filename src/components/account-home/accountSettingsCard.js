import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from '../shared-components/button';
// import {auth} from '../../firebase';
import {logout, getUserProfile} from '../../store/actions/actions';
import Spinner from 'react-bootstrap/Spinner';
import {  NavLink
} from "react-router-dom";
    
//Styles
import {CardDiv, LabelP, InputP, CardTop} from './styles/accountSettingsCard';
import {BorderContainer, H6} from '../../styles/components/shared-components';


export default function AccountSettingsCard() {
    const user = useSelector((state) => state.user.user); 
    const profileState = useSelector(state => state.profile);
    const pCv = useSelector(state => state.cv);
    const profile = profileState.profile;
    const phone = profile ? profile.phone : '';
    const name = profile ? profile.name : ''; 
    // const jobInterest = profile ? profile.job_interest : 'none';
    const cv = ( profile !== null  && typeof profile !== "undefined"  && typeof profile?.cv !== "undefined" ) ? profile?.cv?.name : '';

    
    const newcv = pCv.url ? pCv.name : ''; 

  
    const dispatch = useDispatch();
     
    useEffect(() => {
        if (!profileState.profile) {
            dispatch(getUserProfile()); 
        }
        console.log(cv);
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
                    <LabelP>Email Address:</LabelP> <InputP>{user.email}</InputP>
                </div> 
                <div>
                <LabelP>Mobile Number:</LabelP><InputP>{profileState.loading ? <Spinner animation="border" size="sm" /> : phone}</InputP>
                </div> 
                <div>
                    <LabelP>CV:</LabelP>
                    <InputP>
                        {
                            newcv!=='' ? newcv : cv
                        }
                        {
                            newcv &&  ( typeof profile !== "undefined"  && typeof profile?.cvProfile !== "undefined" ) ? " and ": ''
                        }
                        { ( typeof profile !== "undefined"  && typeof profile?.cvProfile !== "undefined" ) ? "Voost Profile Created": ''}
                    </InputP>
                </div>                
            </CardDiv>
        </BorderContainer>
    )
}