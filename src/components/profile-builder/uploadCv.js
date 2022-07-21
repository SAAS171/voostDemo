import React, { useRef, useEffect, useState }  from 'react';  
import { v4 as uuidv4 } from 'uuid';

import Button from '../shared-components/button'; 

import cross from "../../assets/svg/cross.svg";
import tick from "../../assets/svg/circle-tick.svg";
import upload from "../../assets/svg/upload-file.svg";
import doc from "../../assets/svg/document.svg";
 

import styled from 'styled-components';
import {Animated} from "react-animated-css"; 
import {useDispatch, useSelector} from 'react-redux';   
import {auth, db, storage} from '../../firebase';

import CvPreviewModal from '../profile-builder/cvPreviewModal';

import {
    updateProfileBuilderSelection,
    updateProfileBuilderState,
    updateLocalProfile, 
    updateAllEducationHistoryItems,
    updateAllWorkHistoryItems,
    updateSummary,
    updateSkillsList,
    updateUserCVData
} from '../../store/actions/actions'; 


import Notiflix from 'notiflix'; 
import axios from 'axios';

const UploadCvElem = styled.div`
    min-height: calc(100vh - 350px);
    display: flex;
    justify-content: flex-start; 
    align-items: center; 
    flex-direction: column;
    width: 100%;
    padding: 50px 0;
    > div{
        width: 100%;
        display: flex;
        align-items: flex-start; 
        flex-direction: column;
        .title-container{
            margin-top: 50px;
            text-align: center;
            margin-bottom: 40px;
            p{
                color: #4C567C;
                font-size: 20px;
            } 
        }

        .upload-box-container{
            width: 100%;
            max-width: 800px;
            text-align: left;
            margin-bottom: 50px;
            > p{

                color: #4C567C;
                font-size: 20px;
                letter-spacing: 1px;
            }
            .upload-box{
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                border-radius: 8px;
                box-shadow: 0 0  20px 2px rgba(0,0,0,0.3);
                min-height: 400px;
                margin-bottom: 15px;
                label{
                    position: absolute;
                    background: transparent;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 999;
                    cursor: pointer;
                }
                .upload-box-content{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: ease-in-out 200ms all;
                    &:hover{
                        transform: scale(1.05)
                    }
                    img {
                        height: 120px;
                        width: 120px;
                        margin-bottom: 15px;
                    }
                    span{
                        text-align: center;
                        color: #CBCBCB;
                        font-size: 20px;

                    }
                }
                input{
                    opacity: 0;
                    pointer-events: none;
                    height: 0;
                    width: 0;
                }
            }
        }
    }
    .file-parse-result{
        padding: 50px 0;
        border-top: 1px solid lightgray;
        width: 100%;
        max-width: 910px;
        margin-bottom: 30px;
        p{
            font-size: 22px;
        }
        img{
            max-width: 100px;
            margin: 20px 0 0;
        }
    }
    .displayable{
        display: block;
        padding-bottom: 100px;
    }
    .not-displayable{
        display: none
    }
    .uploadCv{
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 992px) { 
        h1{

            font-size: 26px;
        }
        .upload-box-container,
        .title-container{
            flex-direction: column;
            max-width: 100%;
            padding: 15px;
            margin-bottom: 15px!important;
            > div{
                width:100%;
                margin-bottom: 30px!important;
            }
            .upload-box{
                min-height: 250px!important; 
                padding: 10px!important;
                .upload-box-content{
                    img {
                        height: 60px!important;
                    }
                    span{
                        margin: 0!important;
                    }
                }
            }
        }
    }
`

export default function UploadCv() {

    const fileupload = useRef(null);
    const existingProfile = useSelector(state => state.profile.profile)

    const dispatch = useDispatch();   
    const profileBuilderState = useSelector(state => state.profileBuilder)
    const [profileBuilderCurrent, setProfileBuilderCurrent] = useState("")

    const profileBuilderSelection = useSelector(state => state.profileBuilderSelection)
    const [selectionState, setSelectionState] = useState(false)
    const [hasFile, setHasFile] = useState(false)
    const [parseSuccess, setParseSuccess] = useState("")
    const [parsedProfile, setParsedProfile] = useState({})

    
    useEffect(() =>{ 
        if(profileBuilderSelection.selection == "createcv" || profileBuilderSelection.selection === "createcv-review"){ 
            setSelectionState(true) 
        }  
    }, [profileBuilderSelection])


    useEffect(() =>{ 
        setProfileBuilderCurrent(profileBuilderState.profileBuilder)
    }, [ profileBuilderState ])
    
  
    const goback = (e) =>{
        e.preventDefault();

        dispatch(updateProfileBuilderState(""))  
        dispatch(updateProfileBuilderSelection("selection"))  
        
    }

    const handFile = (e) =>{
        e.preventDefault();
        const uploadedFile = e.target.files[0];
        console.log("uploadedFile: ", uploadedFile)
        if(uploadedFile){
            setHasFile(true)
        } 
        Notiflix.Loading.Circle('Processing CV');
        const endpoint =  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'  ?  process.env.REACT_APP_TEST_NODE_ENDPOINT : process.env.REACT_APP_LIVE_NODE_ENDPOINT )  + `/process-cv-doc`
        
        var formData = new FormData()
        formData.append("myfile", uploadedFile) 
        axios.post( endpoint,formData, {headers:{"Content-Type": "multipart/form-data"}})
            .then(function (response) {   
                fileupload.current.value = '';
                Notiflix.Loading.Remove(); 
                console.log("RESPONSE.....", response.data)
                if(response.data.success){
                    setParseSuccess("yes")
                    setParsedProfile(response.data.cv_profile)

                }else{
                    setParseSuccess("no") 
                }
                
            })
            .catch(function (error) { 
                Notiflix.Loading.Remove();
                console.log("errors: ",  error); 
            }); 
    }

    const getStarted = (e) => {
        e.preventDefault();
        console.log("LOAD PARSED CV INTO APPLICATION");
        console.log("PARSER:", parsedProfile  ) 

        const profileData = { 
            telephone: parsedProfile?.telephone != null ? parsedProfile?.telephone: ""  , 
            address:parsedProfile?.location?.address != null ? parsedProfile?.location?.address: ""  ,   
            city: parsedProfile?.location?.city != null ? parsedProfile?.location?.city: ""  ,  
            county: parsedProfile?.location?.address != null ? parsedProfile?.location?.address: ""  ,
            postcode:parsedProfile?.location?.postcode != null ? parsedProfile?.location?.postcode: ""  , 
            email: existingProfile.email,
            firstname: existingProfile.name.split(" ")[0],
            lastname: existingProfile.name.split(" ")[1]
        }



        if( typeof profileData.lastname == "undefined"){
            profileData.lastname = "";
        }



        if(  parsedProfile?.first_name != null && parsedProfile?.first_name.length > 0 ){
            profileData.firstname =parsedProfile?.first_name;
        }

        if(parsedProfile?.last_name != null &&  parsedProfile?.last_name.length > 0 ){
            profileData.lastname =parsedProfile?.last_name;
        }

        if(parsedProfile?.email != null){
            profileData.email =parsedProfile?.email;
        }



         
        const allWorkHistoryItems = [ ] 
        if(parsedProfile?.workHistory && parsedProfile?.workHistory.length ){
            parsedProfile.workHistory.forEach(element => {
                        
                const workHistoryItem = {
                    uid: uuidv4(),
                    jobTitle: element?.jobTitle != null ? element?.jobTitle : "" ,
                    employer: element?.organization != null ? element?.organization : "" ,
                    city: element?.location != null ? element?.location?.city : "",
                    county: element?.location != null  && typeof element?.location?.county !== "undefined" ? element?.location?.county  : "" ,
                    startDate: "",
                    endDate: "", 
                    currentEmployer: false,
                    content: `<p>${element?.jobDescription != null ? element?.jobDescription : "" }</p>`
                }
                allWorkHistoryItems.push(workHistoryItem)
            });
        }
        

        const allEducationHistoryItems = [ ] 
        if(parsedProfile?.education && parsedProfile?.education.length ){
            parsedProfile.education.forEach(element => {
                const educationItem = {
                    uid: uuidv4(),
                    institutionName: element?.institution != null ? element?.institution : "" ,
                    qualification: element?.qualification != null ? element?.qualification : "" ,
                    studyField: "",
                    city: element?.city != null ? element?.city : "" , 
                    startDate: "",
                    endDate: "", 
                    description: "" 
                }
                allEducationHistoryItems.push(educationItem)
            })
        } 

        const allSkillItems = [ ]   
        if(parsedProfile.skills && parsedProfile.skills.length ){
            parsedProfile.skills.forEach(element => {
                const skillItem = {
                    uid: uuidv4(),
                    text: element != null ? element  : "" ,  
                }
                allSkillItems.push(skillItem)
            })
        } 
 

        const allValues = {
            ...profileData,
            workHistory : allWorkHistoryItems,
            educationHistory : allEducationHistoryItems,
            skillsList : allSkillItems,
            summary : parsedProfile?.personal_summary != null ? parsedProfile?.personal_summary : "" 
        }

 

        dispatch(updateAllEducationHistoryItems(allEducationHistoryItems))
        dispatch(updateAllWorkHistoryItems(allWorkHistoryItems))
        dispatch(updateSummary(parsedProfile?.personal_summary != null ? parsedProfile?.personal_summary : "" ))
        dispatch(updateSkillsList(allSkillItems))


        dispatch(updateLocalProfile(profileData)) 
        dispatch(updateUserCVData({ value: allValues, test: "ALL PARSED" })) 
        dispatch(updateProfileBuilderState("reviewCV"))  
        dispatch(updateProfileBuilderSelection("createcv-review"))  
    }


  return (
    <>  
        <UploadCvElem className={``}>
            <div className="uploadCv">
                <div className="title-container">
                    <h1>Please upload your CV below</h1>
                    <p>You can click on the box below or simply drag and drop your curriculum vitae.</p>
                </div>
                <div className="upload-box-container">
                    <div className="upload-box">
                        <input type="file" onChange={handFile} name="upload-cv" id="upload-cv" ref={fileupload}  accept=".doc, .docx, .pdf, .html" />
                        {
                            hasFile ?  
                                <div className="upload-box-content">
                                    <img src={doc} alt="file" />
                                    <span>Change document</span>
                                </div>
                            :
                                <div className="upload-box-content">
                                    <img src={upload} alt="upload file" />
                                    <span>Click to upload your CV or drag and drop here.</span>
                                </div> 
                        }
                        <label for="upload-cv"></label> 
                    </div>
                    <p>Max file size: 5MB (Docx, Doc, PDF, HTML)</p>
                </div>

                <div className="file-parse-result">
                        {
                            parseSuccess.length < 1 ? "" : 
                            parseSuccess === "yes" ? 
                                <>
                                    <div className="successful-parse">
                                        <p>You’ve successfully uploaded your CV! Please continue below.</p>
                                        <img src={tick}/>
                                    </div>
                                </>
                            :
                                <>
                                    <div className="successful-parse">
                                        <p>Your CV has not been uploaded. Please try again.</p>
                                        <img src={cross}/>
                                    </div>
                                </> 
                        }
                </div>
                <div className="buttons-container">
                    <Button type="primarySmall" text="back" onClick={goback}/>
                    <Button disabled={parseSuccess !== "yes"}  type="primarySmall" text="next" onClick={getStarted}/> 
                </div>
            </div>
        </UploadCvElem> 
    </>
  )

}
 