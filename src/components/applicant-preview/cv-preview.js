import React, { useEffect, useState, useRef }  from 'react';
import styled from 'styled-components'; 
import placeholder from '../../assets/placeholder.png'; 
import phone from '../../assets/svg/phone.svg'; 
import email from '../../assets/svg/email.svg'; 
import { useSelector, useDispatch } from 'react-redux';  
import exit from '../../assets/svg/exit.svg'; 

import Button from '../shared-components/button'; 



const CvPreviewContainer = styled.div` 
    
    max-width: 900px;
    width: 900px;
    margin: 0 0 0 0; 
    text-align: left;  
    max-height: 900px;
    overflow: scroll;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 30px 0px rgba(0,0,0,0.5);
    
    .CvPreview{ 
        overflow: hidden;
        width: 100%;
        display: flex; 
        /* width: 100%; */

        .main-cv-content{
            padding: 30px;
            width: 100%;
            .cv-name{
                font-size: 32px;
                text-transform: capitalize;
                padding-bottom: 13px;
                margin: 0;
                font-weight: 400;
                letter-spacing: 1px;
            }
            .contact-info{ 
                position: relative;
                border-bottom: 1px solid lightgrey;
                padding-bottom: 0;
                margin-bottom: 15px;
                > p{
                    margin-bottom: 15px;
                    font-size: 18px;
                }
                span{  
                    font-weight: 600;
                    margin: 0;
                    padding-left: 24px;
                    background-size: 16px;
                    background-repeat: no-repeat;
                    background-position: 2% center;
                    &:first-of-type{
                        background-image: url(${phone});
                        margin-right: 29px;
                        background-position: 5% center;
                    }
                    &:last-of-type{
                        background-image: url(${email});
                        margin-right: 15px;
                    }
                }
            }
            .pro-summary{ 
                > div p {
                    font-size: 16px;
                    font-style:italic;
                    margin-bottom: 0;
                }
            }
        }
        .sidebar {
            padding: 40px 20px;
            width: 230px;
            flex-shrink: 0;
            background-color: #4C567C;
            color: white;
            .video-intro-container{
                position: relative;
                .cvHighlight { 
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                }
            }

            .image-container{
                border-radius: 50%;
                width: 100%;
                overflow: hidden;
                font-size: 0;
                position: relative;
                padding-bottom: 100%;
                background-color: #DEDEDE;
                margin-bottom: 25px; 
                position: relative;  
                .cvHighlight { 
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px; 
                    z-index: 999;
                }
                img{  
                    position: absolute;
                    top: 0;
                    left: 0; 
                    height: auto;
                    width: 100%;  
                    left: ${(props) =>  props.positionX  };
                    top: ${props => props.positionY  };
                    transform: ${ (props) =>  `scale(${props.positionZ /100})` } 
                }
            } 
            .skillsLocal{
                ul {
                    list-style: disc;
                    li {
                        font-size: 14px;
                        margin-bottom: 4px;
                        color: whitesmoke;

                    }
                }
            }
            ul, p{
                color: white;
            }
            li.has-value{
                font-size: 11px;
                transition: ease-in-out 200ms all;
                margin-bottom: 5px
            }
            .skills {
                position: relative;
                padding-bottom: 15px;
                > p{
                    border-top: 1px solid white; 
                    margin: 15px 0 10px; 
                    padding-top: 11px; 
                    font-size: 18px;
                    font-weight: 500;
                }
            }
            
        }
        .video-intro{ 
            text-align: center;
            margin: 10px auto 0;
            display: block;
            border: none; 
            border-radius: 3px;
            color: white;
            background-color: #6FC7BA; 
            width: 100%;
            font-size: 14px;
            padding: 8px;
        }
        .pro-summary,
        .work-history,
        .education-history {
            position: relative;
            border-bottom: 1px solid lightgrey;
            padding-bottom: 15px;
            margin-bottom: 15px;
            margin-top: 15px; 
            > p{
                font-size: 23px;
                margin-bottom: 5px;
            }
        }
        .cvHighlight{
            position: absolute;  
            top: 0px;
            left: -5px;
            right: -5px;
            bottom: 10px;
            border: 1px solid #DC3163;
            background-color: rgba(220, 49, 99, 0.4 );
            border-radius: 3px;
            opacity: 0;
            transition: ease-in-out 200ms all;
            pointer-events: none;
            &.highlight-this{
                opacity:1;
                transition: ease-in-out 200ms all;
                 
            }
        }
        .education-history{
            border-bottom: none;

        }
        .work-history{ 
            .single-work-item{
                .title-line {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    > *{ 
                        margin-bottom: 5px;
                        width: 35%;
                    }
                }
                &.has-content{
                    margin-bottom: 10px;
                    &:last-of-type{
                        margin-bottom: 0;
                    }
                    .title-line { 
                        margin-bottom: 5px;
                        display: flex;
                        justify-content: space-between;
                        > *{  
                            text-transform: capitalize;
                            font-size: 17px;
                            width: 50%!important;
                            flex-shrink: 0;
                            margin-bottom: 0;
                            span{
                                font-size: 17px;
                            }
                        }
                        .work-dates{
                            text-align: right;
                        }
                        span{
                            margin: 0;
                        }
                        .work-company{
                            font-weight: 600;
                        }
                    } 
                    .work-content{
                        *{
                            font-size: 16px;
                            line-height: 1.4;
                            margin-bottom: 0;
                            color: #6b6b6b;
                        }
                    }
                        
                }
            }
        }
        ul{
            margin: 0;
            padding: 0;
            &.no-bullets{
                list-style: none;
                li{
                    min-height: 21px
                }
            }
            .single-education-item{
                font-size: 17px;
                span{
                    font-weight: 600;
                    margin: 0;

                }
            }
            li{
                width: 100%;
                margin-bottom: 5px;  
                max-width: 100%;
                overflow: hidden;
                &:last-of-type{
                    margin: 0;
                }
            }
        }
        .greyed-out{
            background-color: lightgrey;
        } 
  
        
    } 
    .video-intro-preview{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.7);
        pointer-events: none;
        opacity: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        .close-modal{ 
            position: absolute;
            right: -45px;
            top: -45px;
            background-image: url(${exit});
            background-position: center;
            background-size: 60%;
            background-repeat: no-repeat;
            background-color: transparent;
            border: none; 
            height: 50px;
            width: 50px;
        }

        &.show-modal{
            pointer-events: all;
            opacity: 1;
        }
        > div{
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            position: relative;
            video{
                border-radius: 8px;
                width: 100%;
                overflow: hidden;
            }
        }
    }
    


    @media screen and (max-width: 992px) { 

        max-width: 100vw;
        width: auto;
 
        .cv-main{
            max-width: 100vw;
        }
        .CvPreview{
            max-width: 100vw;
            width: auto;
            .sidebar {
                padding: 20px 10px;
                width: 25%;
                .video-intro{
                    font-size: 8px;
                }
                .skillsLocal ul li {
                    font-size: 11px;
                }
            }
            .main-cv-content{
                padding: 10px;
                width: 75%;
            }
            .cv-name{
                font-size: 25px!important;
            }
            .contact-info{ 
                p{
                    flex-wrap: wrap;
                    display: flex;
                }
                span{

                    margin-bottom: 5px!important;
                }
            }
            .pro-summary {
                font-size: 13px!important;
            }
            .single-work-item{
                .work-title{
                    font-size: 13px!important;
                    .work-copmany{
                        font-size: 13px!important;
                    }
                }
                .work-dates {
                    font-size: 12px!important;
                }
                .work-content , .work-content * {
                    font-size: 13px!important;
                }
            }
            .single-education-item {
                font-size: 13px!important;
            }

        }
    }

`
export default function CvPreview(props) { 

    const vidRef = useRef(null);

    const dispatch = useDispatch();   
    const cvHighlightBuilderState = useSelector(state => state.cvHighlightBuilder);   
    const [cvHighlightBuilderLocal, setCvHighlightBuilderLocal] = useState("");
    
    const cvHighlightState = useSelector(state => state.cvHighlight);   
    const [cvHighlightLocal, setCvHighlightLocal] = useState("");
    
    const [profileData, setProfileData] = useState({ });
    
    const skillsList = useSelector(state => state.skillsList);   
    const [skillsListLocal, setSkillsListLocal] = useState("");
    
    const summary = useSelector(state => state.summary);   
    const [summaryLocal, setSummaryLocal] = useState("");
    
    const allWorkHistoryItems = useSelector(state => state.allWorkHistoryItems);   
    const [allWorkHistoryItemsLocal, setAllWorkHistoryItemsLocal] = useState({ });
    
    const allEducationHistoryItems = useSelector(state => state.allEducationHistoryItems);   
    const [allEducationHistoryItemsLocal, setAllEducationHistoryItemsLocal] = useState({ });
    const [togglePlay, setTogglePlay] = useState(false); 


    const [showPreviewVideo, setShowPreviewVideo] = useState(false);
    useEffect(()=>{
 
        // if(props.applicantData.a.cvProfile){
        //     const cvProfile = props.applicantData.a.cvProfile;
        //     setProfileData(
        //         {
        //             firstname: cvProfile?.firstname
        //         }
        //     ) 
        // }
        // console.log("FIRSTNAME: " , firstname)
        // console.log("LASTNAME: " , lastname)
        // if(allWorkHistoryItems.allWorkHistoryItems.length){
        //     // console.log("allWorkHistoryItems.LENGTH: " , allWorkHistoryItems.allWorkHistoryItems)
        //     setAllWorkHistoryItemsLocal(allWorkHistoryItems.allWorkHistoryItems);

        // } 
        if(props.applicantData && props.applicantData.a && props.applicantData.a.cvProfile){

            console.log("props.applicantData.a.cvProfile: ", props.applicantData.a.cvProfile)
            const cvProfile = props.applicantData.a.cvProfile;
            setProfileData(
                {
                    firstname: cvProfile?.firstname,
                    lastname: cvProfile?.lastname,
                    email: cvProfile?.email,
                    telephone: cvProfile?.telephone,
                    cvImage: cvProfile?.cvImage,
                    cvVideo: cvProfile?.cvVideo
                }
            ) 
            if(cvProfile.summary){ 
                setSummaryLocal(cvProfile.summary); 
            }  
            if(cvProfile.educationHistory){ 
                setAllEducationHistoryItemsLocal(cvProfile.educationHistory); 
            }  
            if(cvProfile.skillsList){ 
                setSkillsListLocal(cvProfile.skillsList); 
            }  
            if(cvProfile.workHistory){ 
                setAllWorkHistoryItemsLocal(cvProfile.workHistory); 
            }  
        }
    }, [props])
  
    const showVideo = () =>{
        console.log("show video modal....")
        setShowPreviewVideo(true)
    }
    const closeVideoIntro = () =>{
        console.log("show video modal....")
        setShowPreviewVideo(false)
    }


    useEffect(()=>{
        const video  = vidRef.current;
        if(togglePlay){
            if(video) video.play()
        }else{
            if(video) video.pause() 
        } 
    }, [togglePlay])

    const playVideo = () =>{
        setTogglePlay(!togglePlay);
        
    }
    
    const CvPreview = <>
        {
            profileData.cvVideo ?
            <div className="video-intro-container">
                <p>Video Introduction</p>
                <video onClick={playVideo} ref={vidRef} playsInline src={profileData.cvVideo}></video>
                <button className={`play-button ${togglePlay ? "isplaying" : ""}`} ></button>
            </div>
            : ""
        }
        <CvPreviewContainer>

            <div className="CvPreview"> 
                <div className="sidebar">
                    <div className="image-container">
                        <img src={ profileData?.cvImage ? profileData?.cvImage : profileData?.cvImage ? profileData.cvImage : placeholder } alt="preview "/>
                    </div>
                    <div>
                        {profileData.cvVideo ?  <button onClick={showVideo} className="video-intro">VIDEO INTRODUCTION</button> : ""}
                    </div>
                    <div className="sidebar-content">
                        <div className="skills">
                            <p>Skills</p>  
                                {
                                    skillsListLocal.length ? 
                                        <div className="skillsLocal" >
                                            <ul>
                                                { 
                                                    skillsListLocal.map((item, i) => { 
                                                        return (<li key={i} data-id={item.uid} className="has-bullet">{item.text}</li>)
                                                    })
                                                }
                                            </ul> 
                                        </div>
                                    : 
                                        <div>
                                            <ul className="no-bullets">
                                                <li  className="greyed-out"></li>
                                                <li  className="greyed-out"></li>
                                                <li  className="greyed-out"></li>
                                            </ul> 
                                        </div>
                                } 
                        </div> 
                    </div>
                </div>
                <div className="main-cv-content">
                    <h4 className="cv-name">{ profileData?.firstname ? profileData?.firstname : "" } { profileData?.lastname ? profileData?.lastname : "" }</h4>
                    <div className="contact-info">
                        <p>
                            <span id="telephone"  className={` ${ profileData?.telephone ? "has-value" : "greyed-out" }`}>{ profileData?.telephone ? profileData?.telephone : "" }</span> 
                            <span id="email"      className={` ${ profileData?.email ? "has-value" : "greyed-out" }`}>{ profileData?.email ? profileData?.email : "" }</span> 
                        </p>
                    </div> 
                    <div className="pro-summary">
                        <p>Professional Summary</p> 
                            {
                                summaryLocal.length ? 

                                    <div   dangerouslySetInnerHTML={{__html: summaryLocal }}></div> 
                                : 
                                    <div> 
                                        <ul className="no-bullets">
                                            <li  className="greyed-out"></li>
                                            <li  className="greyed-out"></li>
                                            <li  className="greyed-out"></li>
                                        </ul> 
                                    </div> 
                                }
                        
                    </div>

                    <div className="work-history">
                        <p>Work History</p>
                        {
                            allWorkHistoryItemsLocal.length ? 
                            allWorkHistoryItemsLocal.map((item)=>{
                                    return (
                                        <div key={item.uid} className="single-work-item full-width has-content">
                                            <div className="title-line">
                                                <p className="work-title" >{item.jobTitle}, <span className="work-copmany">{item.employer}</span></p>
                                                <p className="work-dates ">{item.startDate} - {item.endDate}</p> 
                                            </div>
                                            <div className="work-content"  dangerouslySetInnerHTML={{__html: item.content }}></div>
                                        </div> 
                                    )
                                })
                            :
                            <div className="single-work-item">
                                <div className="title-line  ">
                                    <p className="work-title greyed-out" > <span className="work-copmany"></span></p>
                                    <p className="work-dates greyed-out"></p> 
                                </div>
                                <div className="work-content"> 
                                    <ul className="no-bullets">
                                        <li  className="greyed-out"></li>
                                        <li  className="greyed-out"></li>
                                        <li  className="greyed-out"></li>
                                    </ul>
                                </div>
                            </div> 
                        }
                       
                    </div>
                    <div className="education-history">
                        <p>Education</p>

                            {
                                allEducationHistoryItemsLocal.length ? 

                                    <ul className="no-bullets education-list" >
                                        { 
                                            allEducationHistoryItemsLocal.map((item)=>{
                                                return ( 
                                                    <li key={item.uid} className="single-education-item full-width has-content"  >
                                                        <span>{item.qualification}</span>, {item.institutionName}
                                                    </li> 
                                                )
                                            })
                                        }
                                    </ul>
                                :
                                    <ul className="no-bullets" >
                                        <li  className="greyed-out"></li>
                                        <li  className="greyed-out"></li>
                                        <li  className="greyed-out"></li>
                                    </ul>
                            }
                    </div> 
                </div>
            </div>
           
            <div className={`video-intro-preview ${showPreviewVideo ? "show-modal" : ""}`}>
                <div className="video-inner">
                    {
                        profileData.cvVideo ? 
                        <video controls playsInline src={profileData.cvVideo}></video> 
                        : ""
                    } 
                    <Button  
                        type="primarySmall"
                        text="Close"
                        onClick={closeVideoIntro}
                    />
                </div>
            </div>
        </CvPreviewContainer></>
    return (CvPreview)
}
           