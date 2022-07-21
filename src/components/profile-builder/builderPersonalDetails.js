import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../shared-components/button'; 
import CvPreview from '../cv-preview/cvPreview'; 
import editfield from '../../assets/svg/edit-field.svg'; 
import placeholder from '../../assets/placeholder.png'; 
import {useDispatch, useSelector} from 'react-redux'; 
import {
    updateCvHighlightBuilder, 
    updateLocalProfile, 
    updateUserCVData, 
    updateProfileBuilderState
} from '../../store/actions/actions'; 
import Notiflix from 'notiflix'; 

import firebase from 'firebase'; 
import { db, auth } from '../../firebase';
import {useHistory} from 'react-router-dom';  


const BuilderPersonalDetailsContainer = styled.div` 
    max-width: 900px;
    margin: 0 auto; 

    @media screen and (max-width: 992px) { 
        max-width: 100vw;
        margin: 20px auto;
        padding: 0 15px;
        h1{ 
            text-align: center;
            margin-top: 80px;
            font-size: 25px;
        }

        fieldset{
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 0!important;
            > * {
                width: 100%!important;
                margin-bottom: 15px;
            }
        }

        .upload-with-preview{
            flex-direction: column;
            .upload-img-form-container{
                margin: 0 auto;
            }
        }
    }
    .profilebuilder-personaldetails{
        padding-bottom: 50px;
        h1{
            margin-top: 50px;
        }
        > p{
            margin-bottom: 70px;
            font-size: 22px;
            letter-spacing: 1px;
        }
        fieldset{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            > * {
                width: calc(50% - 10px);
                padding: 15px;
                border-radius: 10px;
                border: 1px solid transparent;
                box-shadow: 0 0 20px -7px rgba(0,0,0,0.5);
                background-color: white;
                outline: none; 
                font-size: 23px;
                padding-right: 50px;
                background-image: url("${editfield}");
                background-size: 25px;
                background-position: calc(100% - 18px) 50%;
                background-repeat: no-repeat;
                &:focus{
                    border: 1px solid #6FC7BA;
                }
            }
            &.single-fields *{
                width: 100%
            }
            &.three-fields *{
                width: calc(33% - 10px);
            }
        }
    } 
    .upload-with-preview{
        display: flex;
        padding-top: 50px;
        justify-content: center;
        flex-direction: column;
        .preview-container{
            padding: 0 15px;
            /* width: 100%; */
        }

        p.upload-btn{ 
            background-color: #6FC7BA;
            border-radius: 8px;
            color: white;
            width: auto;
            padding: 5px 10px;
            margin-top: 15px;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
        }
        .upload-img-form-container{
            width: 250px;
            flex-shrink: 0;
            padding: 0 15px;
            form{
                width: 100%;
                .dragContainer{
                    padding-bottom: 100%;
                    width: 100%;
                    position: relative;
                    background-color: lightgrey;
                    border-radius: 10px;
                    overflow: hidden;
                    background-image: url(${placeholder});
                    background-size: 80%;
                    background-position: center;
                    background-repeat: no-repeat;
                    img{
                        height: auto;
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        opacity:0;
                        &.hasImage{
                            opacity: 1;
                        }    
                    } 

                }
              

            }
        }
    }

    .upload-with-preview-container{ 
        padding-bottom: 100px;
        img{

            cursor: pointer;
        }
    }

    .selection-buttons{
        margin: 0 auto ;
        padding-bottom: 50px;
    }
    .hidden {
        display: none;
    }
`
export default function BuilderPersonalDetails() {
    
    const history = useHistory();
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();   
    
    const profile = useSelector(state => state.profile);   
    const clickedBtn= useRef(null); 


    const profileBuilderState = useSelector(state => state.profileBuilder)

    const isReviewing = useSelector(state => state.isReviewingState);    
    const [isReviewingLocalState, setIsReviewingLocalState] = useState(false); 

    useEffect(() =>{ 
        setIsReviewingLocalState(isReviewing.isReviewing) 
    },[isReviewing])


    const [profileData, setProfileData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        telephone: ""
    });


    useEffect(()=>{ 

        if(profileBuilderState.profileBuilder === "personalDetails"){ 

            if(profile.profile){ 
                const p = profile.profile; 

                let obj = { 
                    firstname: p.name.split(" ")[0] ,
                    lastname: p.name.split(" ")[1] ,
                    email: p.email 
                } 

                if(profile?.profile?.cvProfile ){ 
                    const cvProfile = profile?.profile?.cvProfile 

                     obj = {
                        ...obj, 
                        firstname: cvProfile?.firstname,
                        lastname: cvProfile?.lastname,
                        email: cvProfile?.email
                     }
                     if(cvProfile?.telephone){
                         obj["telephone"] = cvProfile?.telephone 
                     }
                     if(cvProfile?.address){
                         obj["address"] = cvProfile?.address 
                     }
                     if(cvProfile?.city){
                         obj["city"] = cvProfile?.city 
                     }
                     if(cvProfile?.county){
                         obj["county"] = cvProfile?.county 
                     }
                     if(cvProfile?.postcode){
                         obj["postcode"] = cvProfile?.postcode 
                     }
                     if(cvProfile?.cvImage){
                         obj["cvImage"] = cvProfile?.cvImage 
                    }  
                    console.log("OBJECT TO SAVE: ", obj)

 
                } 

                setProfileData(obj); 
            } 
           
        }


    },[profile, profileBuilderState])

 

    useEffect(() =>{ 
        dispatch(updateLocalProfile(profileData)) 
    }, [profileData])


    const handleChange = (e) =>{
        e.preventDefault();
        let obj = {
            ...profileData,
            [e.target.id]: e.target.value
        } 
        setProfileData(obj);   
    }
    

    const addCVImage = ( e) =>{
        e.preventDefault();  
        const file = e.target.files[0] 
        console.log("FILE: ", file)
       
        const dirPath = `cvs/${profile?.profile?.id}/img/`;
        const filename = "cv-img." + file.name.substring(file.name.lastIndexOf('.') + 1);
        
        var listRef = storage.child(dirPath);
 
        listRef.listAll()
            .then((res) => {
                res.items.forEach((itemRef) => {
                    itemRef.delete();
                });
 
                var cvImageRef = storage.child(dirPath+filename);   
                cvImageRef.put(file).then( async (snapshot) => { 
        
                    const imgUrl = await cvImageRef.getDownloadURL()
                    let obj = {
                        ...profileData,
                        cvImage: imgUrl
                    } 
                    dispatch(updateUserCVData({ value:obj }))
    
                });

            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
 
    }


    const backStep = (e) =>{
        e.preventDefault();  
        dispatch(updateCvHighlightBuilder(""))
        dispatch(updateProfileBuilderState("personalDetails")) 
        history.pushState("/account")
    }


    const nextStep = (e) =>{
        e.preventDefault(); 
        if(profileData.telephone && profileData.address){

            dispatch(updateLocalProfile({}))

            dispatch(updateUserCVData({value: profileData}))
            dispatch(updateCvHighlightBuilder("work")) 
            dispatch(updateProfileBuilderState("recordVideo")) 
            return;
        }
        Notiflix.Notify.Failure('Please complete all fields.');
    }
     
    const reviewStep = (e) =>{
        e.preventDefault();  
        if(profileData.telephone && profileData.address){
            dispatch(updateUserCVData({value: profileData}))
            dispatch(updateCvHighlightBuilder(""))
            dispatch(updateProfileBuilderState("reviewCV")) 
            return;
        }

        Notiflix.Notify.Failure('Please complete all fields.');
    }

    const saveZoomData = (zoom) => { 
        let obj = {
            ...profileData,
            z: zoom
        } 
        setProfileData(obj)
    }
    
    const saveXY = (xy ) => { 
        let obj = {
            ...profileData,
            xy: xy
        } 
        setProfileData(obj)
    }
    
 



    const BuilderPersonalDetails = 
        <BuilderPersonalDetailsContainer>

            <div className="profilebuilder-personaldetails">
                <h1>Fill in your personal details</h1>
                <p>Please provide us with your contact details</p>

                <fieldset>
                    <input type="text"  id="firstname" name="firstname" value={profileData.firstname || ''} onChange={handleChange}   placeholder="First Name" />
                    <input type="text"  id="lastname" name="lastname" value={profileData.lastname || ''} onChange={handleChange}      placeholder="Last Name" />
                </fieldset>
                <fieldset>
                    <input type="email" id="email" name="email" value={profileData.email || ''} onChange={handleChange}               placeholder="Email"  />
                    <input type="text"  id="telephone" name="telephone" value={profileData.telephone || ''} onChange={handleChange}   placeholder="Telephone" />
                </fieldset>
                <fieldset className="single-fields">
                    <input type="text"  id="address" name="address" value={profileData.address || ''} onChange={handleChange}         placeholder="Street Address" />
                </fieldset>
                <fieldset className="three-fields">
                    <input type="text"  id="city" name="city" value={profileData.city || ''} onChange={handleChange}                  placeholder="City"       />
                    <input type="text"  id="county" name="county" value={profileData.county || ''} onChange={handleChange}            placeholder="County"     />
                    <input type="text"  id="postcode" name="postcode" value={profileData.postcode || ''} onChange={handleChange}      placeholder="Postcode"   />
                </fieldset>

            </div>
            <hr />
            <div className="upload-with-preview-container">
                <div className="upload-with-preview">
                    <div className="upload-img-form-container">
                        <form>
                            <input ref={clickedBtn} type="file" name="cv-image" id="cv-image" className="hidden" onChange={ (e) => addCVImage(e) } />
                            <div className="dragContainer">
                                <img className={profileData?.cvImage ? "hasImage" : "" } src={profileData?.cvImage ? profileData?.cvImage : "" } alt="cv image" />
                            </div>
                            <label htmlFor="cv-image">
                                <p className="upload-btn">Upload Photo</p>
                            </label>
                        </form>
                    </div>
                    <div className="preview-container">
                        <CvPreview saveZoom={saveZoomData} saveXY={saveXY} />
                    </div>

                </div>

                {/* <div className="selection-buttons">
                    <Button type="primarySmall" text="BACK" />
                    <Button type="primarySmall" text="NEXT" />
                </div>  */}
            </div>
            {
                isReviewingLocalState ? 
                <div className="selection-buttons">  
                    <Button type="primarySmall" text="Review Details"  onClick={reviewStep}/>
                </div>
                :
                <div className="selection-buttons"> 
                    <Button type="primarySmall" text="BACK"  onClick={backStep}/>
                    <Button type="primarySmall" text="NEXT"  onClick={nextStep}/>
                </div> 
            }
        </BuilderPersonalDetailsContainer>
    return (BuilderPersonalDetails)
}
           