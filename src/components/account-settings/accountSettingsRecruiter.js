import React, {useState, useEffect} from 'react';
import {  CompanyName, CompanyWebsite} from '../job-post/postJobInput';
import {Email, Phone, FullName} from '../shared-components/formInput';
import {useDispatch, useSelector} from 'react-redux'; 
import PasswordReset from '../shared-components/passwordReset';
import {UpdateRecruiteProfile, clearRecruiterUpdate} from '../../store/actions/actions';
// import {useHistory} from 'react-router-dom'; 
import {  NavLink
} from "react-router-dom";
import Notiflix from 'notiflix'; 
import ImageUploader from "react-images-upload";
import {auth} from '../../firebase';
//Styles
import {SettingsWrap, SettingsPanel,  SaveBtn} from './styles/account-settings'
import {BorderContainer } from '../../styles/components/shared-components';
import Button from '../shared-components/button';

// import { render } from '@testing-library/react';

export default function AccountSettings(){
    // const history = useHistory();
    const profileState = useSelector(state => state.profile);
    // const resetPass = useSelector(state => state.password_reset); 
    // const OpenLogin = useSelector((state) => state.login_modal);
    const profile = profileState.profile;
    const updateState = useSelector(state => state.updateRecruiter);

    const [fullName, setFullname] = useState(profile?.full_name ? profile.full_name : '');
    const [name, setName] = useState(profile?.company_name ? profile.company_name : '');
    const [email, setEmail] = useState(auth.currentUser?.email ? auth.currentUser?.email : '');
    const [phone, setPhone] = useState(profile?.phone ? profile.phone : '');
    const [companySite, setCompanySite] = useState(profile?.company_website ? profile.company_website : ''); 
    const [companyImage, setCompanyImage] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(auth?.currentUser?.email){
            setEmail(auth.currentUser.email); 
        }
    }, [auth])

    useEffect(() => {
        if(profile?.company_name){
            setName(profile.company_name); 
        }
    }, [profile])

    useEffect(() => {
        if(updateState.loading) {
            Notiflix.Loading.Standard('Please wait...');
        }else {
            Notiflix.Loading.Remove(); 
        }

        if (updateState.errors != null) {
            Notiflix.Report.Failure('Something went wrong',
            updateState.errors.message,
            'try again',
            function (){
                dispatch(clearRecruiterUpdate());
            })
        }
        else if (updateState.update != null){
            Notiflix.Report.Success('YAY!',
            `Your profile has been updated`,
            'Ok', 
            function (){
                dispatch(clearRecruiterUpdate());
            })
        }
    }, [updateState])

    useEffect(() => {
        if(Array.isArray(companyImage) && companyImage.length >= 1){
            dispatch(UpdateRecruiteProfile({'company_image': companyImage[0]})); 
        } else if(companyImage && !Array.isArray(companyImage)){
            dispatch(UpdateRecruiteProfile({'company_image': companyImage})); 
        }
    }, [companyImage])

    const updateSettings = (e) => {
        console.log(e.target.name)
        switch (e.target.name) {
            case 'companyName':
                setName(e.target.value);
                break;
            case 'firstName':
                setFullname(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'phone':
                setPhone(e.target.value);
                break;
            case 'companyWebsite': 
                console.log(e.target.value)
                setCompanySite(e.target.value); 
                break;
            default:
                break;
        }
    }

    const submitUpdate = (e, field) => {
        e.preventDefault();
        if(field ==='fullName'){
            dispatch(UpdateRecruiteProfile({'full_name': fullName}))
        }
        if(field==='companyName'){
            dispatch(UpdateRecruiteProfile({'company_name': name}))
        }

        if(field==='phone'){
            dispatch(UpdateRecruiteProfile({'phone': phone}))
        }
        if(field==='email'){
            dispatch(UpdateRecruiteProfile({'email': email}))
        }
        if(field==='companyWebsite'){
            console.log('aight', companySite);
            dispatch(UpdateRecruiteProfile({'company_website': companySite})); 
        }
        
        //dispatch(UpdateRecruiteProfile({name, email, phone}))
        //
    }

    const handleSave = (e) => {
        e.preventDefault();
        if(name){
            dispatch(UpdateRecruiteProfile({'company_name': name}))
        }
        if(email){
            dispatch(UpdateRecruiteProfile({'email': email}))
        }
        if(phone){
            dispatch(UpdateRecruiteProfile({'phone': phone})) 
        }
        if(companySite){
            dispatch(UpdateRecruiteProfile({'company_website': companySite})); 
        }
    }

    const onDrop = picture => {
        setCompanyImage(companyImage.concat(picture));

    }
    return (
        <SettingsWrap>
            <BorderContainer>
                    <NavLink to="/accountRecruiter">
                        <span >&lt; Back</span>
                    </NavLink>
                <SettingsPanel>
                    <div id='recaptcha-container'></div>
                    <div className="input-div">
                        <FullName value={fullName} onChange={(e) => updateSettings(e)}/>
                        {
                            (fullName !== profile.full_name && fullName) && (
                                <>
                                    <SaveBtn onClick={(e) => submitUpdate(e, 'fullName')}>Save </SaveBtn> 
                                </>
                            )
                        }
                    </div>
                    <div className="input-div">
                        <CompanyName value={name} onChange={(e) => updateSettings(e)}/> 
                        {
                            (name !==profile.company_name && name) && (
                                <>
                                    <SaveBtn onClick={(e) => submitUpdate(e, 'companyName')}>Save </SaveBtn> 
                                </>
                            )
                        }
                    </div>

                    <div className="input-div">
                        <Email value={email} onChange={(e) => updateSettings(e)}/>
                        {
                           (email !==auth.currentUser?.email && email) && (
                               <>
                                    <SaveBtn onClick={(e) => submitUpdate(e, 'email')}> Save</SaveBtn>
                               </>
                           )
                        }
                    </div>
                    <div className="input-div">
                        
                        <Phone  value={phone} onChange={(e) => updateSettings(e)}/>
                        {
                            (phone !==profile?.phone && phone) && (
                                <>
                                    <SaveBtn onClick={(e) => submitUpdate(e, 'phone')}> Save</SaveBtn>
                                </>
                            )
                        }
                        
                    </div>
                    <div className="input-div">
                        <CompanyWebsite value={companySite} onChange={(e) => updateSettings(e)} /> 
                        {
                          (companySite ===profile?.company_website && companySite) && (

                            <>
                                <SaveBtn onClick={(e) => submitUpdate(e, 'companyWebsite')}>Save</SaveBtn>
                            </>
                          )
                        }
                        
                    </div>

                    <Button type="primarySmall" text="Save all"  onClick={(e) =>handleSave(e)} />

                    <ImageUploader singleImage={true} label='Company Image: Max file size: 5mb, accepted: jpg, gif, png, svg' withPreview={true} withIcon={true} buttonText="Choose images" onChange={onDrop} imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".svg"]} maxFileSize={5242880} />
                    {/* <Button type="primaryLarge" text="update" onClick={(e) => submitUpdate(e)}/> */}
                </SettingsPanel>
                {/*extract this to component*/ }
                <PasswordReset />
            </BorderContainer>
        </SettingsWrap>
    )
}
