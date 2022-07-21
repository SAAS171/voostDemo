import React, {useRef,  useEffect, useState }  from 'react';
import styled from 'styled-components'; 
import placeholder from '../../assets/placeholder.png'; 
import phone from '../../assets/svg/phone.svg'; 
import email from '../../assets/svg/email.svg'; 
import plus from '../../assets/svg/add.svg'; 
import minus from '../../assets/svg/minus.svg'; 
import { useSelector, useDispatch } from 'react-redux'; 
import {
    updateProfileBuilderState, 
    updateUserCVData, 
    updateIsReviewingState
} from '../../store/actions/actions'; 

import {auth, rdb} from '../../firebase'; 

// import ProfileImageElem from '../shared-components/profileImageElem';



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
        .education-history{
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
    .range-container{
        width: 100%;
        position: relative;
        padding-top: 10px;
        &:before, &:after{
            content: "";
            position: absolute;
            top: -10px;
            height: 25px;
            width: 25px;
            background-color: #dc3163;
            font-size: 20px;
            color: #dc3163;
            border-radius: 50%;
            display: flex;
            align-items: end;
            justify-content: center;
            /* font-weight: 800; */
            line-height: 1; 
            background-position: center;
            background-size: 50%;
            background-repeat: no-repeat;

        }
        &:after{ 
            right: 0;
            background-image: url(${plus})
        }
        &:before{
            left: 0;
            background-image: url(${minus})
        }
    }
    

    .zoom-img-slider {
        -webkit-appearance: none;   
        appearance: none;
        width: 100%; 
        height: 5px; 
        background: #fff; 
        outline: none;  
        border-radius: 5px;
    }
 
    .zoom-img-slider:hover {
        opacity: 1; 
    }

    
    .zoom-img-slider::-webkit-slider-thumb {
        -webkit-appearance: none; 
        appearance: none;
        width: 15px; 
        height: 15px;  
        background: #DC3163;  
        border-radius: 50%;
        cursor: pointer;  
    }

    .zoom-img-slider::-moz-range-thumb {
        width: 15px;  
        height: 15px; 
        background: #DC3163;  
        border-radius: 50%;
        cursor: pointer;  
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
                .work-content * {
                    font-size: 14px!important;
                }
            }
            .single-education-item {
                font-size: 13px!important;
            }

        }
    }

`
export default function CvPreview( props ) { 

    const dispatch = useDispatch();   
    const {isPreviewModal, switchContent, saveZoom, saveXY} = props

    const profileBuilderState = useSelector(state => state.profileBuilder)
    const localUser = useSelector(state => state.localUserProfile)
    const [localUserState, setLocalUserState] = useState({});
    const cvHighlightBuilderState = useSelector(state => state.cvHighlightBuilder);   
    const [cvHighlightBuilderLocal, setCvHighlightBuilderLocal] = useState("");
    
    const cvHighlightState = useSelector(state => state.cvHighlight);   
    const [cvHighlightLocal, setCvHighlightLocal] = useState("");
    
    const profile = useSelector(state => state.profile);   
    const [profileData, setProfileData] = useState({ });
    
    
    const [cvImage, setCvImage] = useState("");
    const [summaryLocal, setSummaryLocal] = useState("");
    const [skillsListLocal, setSkillsListLocal] = useState([]);
    const [allWorkHistoryItemsLocal, setAllWorkHistoryItemsLocal] = useState({ });
    const [allEducationHistoryItemsLocal, setAllEducationHistoryItemsLocal] = useState({ });
    
    const [xy, setXY] = useState({ });
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    
    const [z, setZ] = useState(); 
    const [range, setRange] = useState(100);
    
    const draggable= useRef(null);  
    
 
    let coordX = 0;
    let coordY = 0;
    let drag = false;

    let offsetX = 0;
    let offsetY = 0;
    let targ = null;

    let xToSave = "";
    let yToSave = "";

    useEffect(() => { 
        if(localUser?.profile){
            if(localUserState !== localUser.profile){
                setLocalUserState(localUser.profile)
            }
        }
    },[localUser])

    useEffect(()=>{ 
        if(cvHighlightBuilderState.cvHighlightBuilder.length){
            setCvHighlightBuilderLocal(cvHighlightBuilderState.cvHighlightBuilder);
        }else{
            setCvHighlightBuilderLocal("");
        }
        if(cvHighlightState.cvHighlight.length){ 
            setCvHighlightLocal(cvHighlightState.cvHighlight);
        }else{
            setCvHighlightLocal("");

        }

    }, [ cvHighlightState, cvHighlightBuilderState]) 
 
    useEffect(()=>{  
        if(profile?.profile){
            let pData = {
                ...profile.profile, 
                firstname: profile.profile.name.split(" ")[0] , 
                lastname: profile.profile.name.split(" ")[1] ,
                email: profile.profile.email
            }
            setProfileData(pData);
        }
        // console.log("STATE PROFILE : ", profile?.profile)

        if(profile?.profile?.cvProfile  ){ 

            setProfileData(profile.profile.cvProfile);
            // console.log("STATE PROFILE : ", profileData)

            if(profile?.profile?.cvProfile?.workHistory){ 
                setAllWorkHistoryItemsLocal(profile?.profile?.cvProfile?.workHistory)
            }

            if(profile?.profile?.cvProfile?.educationHistory){ 
                setAllEducationHistoryItemsLocal(profile?.profile?.cvProfile?.educationHistory)
            }

            if(profile?.profile?.cvProfile?.summary){ 
                setSummaryLocal(profile?.profile?.cvProfile?.summary)
            }
            if(profile?.profile?.cvProfile?.skillsList){ 
                setSkillsListLocal(profile?.profile?.cvProfile?.skillsList)
            }
            if(profile?.profile?.cvProfile?.cvImage){ 
                setCvImage(profile?.profile?.cvProfile?.cvImage)
            }
            setPosX(profile?.profile?.cvProfile?.xy?.x)
            setPosY(profile?.profile?.cvProfile?.xy?.y)
            setRange(profile?.profile?.cvProfile?.z) 
            setZ(profile?.profile?.cvProfile?.z )
        } 
    }, [profile])
  
    const editVideo  = () =>{    
        if(isPreviewModal){
            console.log("hello ........")
            switchContent();

        }else{

            console.log("EDITING SHOULD SET REVIEW ........")
            dispatch(updateIsReviewingState(true))
            dispatch(updateProfileBuilderState("recordVideo")); 
        }
    }
        
    function startDrag(e) { 
        if (!e) {
            var e = window.event;
        }  
        if(e.preventDefault) e.preventDefault(); 
        targ = e.target ? e.target : e.srcElement; 
        if (targ.className != 'dragme') {return}; 
        offsetX = e.clientX;
        offsetY = e.clientY; 
        if(!targ.style.left) { targ.style.left='0px'};
        if (!targ.style.top) { targ.style.top='0px'}; 
        coordX = parseInt(targ.style.left);
        coordY = parseInt(targ.style.top);
        drag = true; 
        draggable.current.onmousemove=dragDiv;
        return false;
    } 

    function dragDiv(e) {
        if (!drag) {return};
        if (!e) { var e= window.event};  
        xToSave = coordX+e.clientX-offsetX+'px';
        yToSave = coordY+e.clientY-offsetY+'px';
        targ.style.left=xToSave;
        targ.style.top=yToSave;
        return false;
    }

    function stopDrag() {
        drag=false; 
        setXY({x: xToSave, y: yToSave})
    }
    
    useEffect(() =>{ 
        if(profileBuilderState.profileBuilder === "personalDetails"){
            if(draggable.current != null){
                draggable.current.onmousedown = startDrag;
                draggable.current.onmouseup = stopDrag;
            }
        }else{

            draggable.current.onmousedown = null;
            draggable.current.onmouseup = null;
        }
    }, [profileBuilderState]) ;

    useEffect(() =>{ 
        if(xy?.x) saveXY(xy)
    }, [xy]) ;
 
    const zoomSlider =(e) =>{ 
        e.preventDefault();
        console.log(e.target.value) 
        setRange(e.target.value)
        setZ(e.target.value)
        saveZoom(e.target.value)

    }   
 
    const CvPreview = 
        <CvPreviewContainer positionX={posX} positionY={posY} positionZ={z}> 
            <div className="CvPreview"> 
                <div className="sidebar">
                    <div className="image-container"  >
                        <div className={`cvHighlight ${cvHighlightBuilderLocal == "contact-img" ||  cvHighlightLocal == "contact-img" ? "highlight-this" : "" }`}></div>

                        <img  ref={draggable}  className="dragme" src={ cvImage ? cvImage : placeholder } alt="preview "/>
                    </div>
                    
                        {
                            profileBuilderState.profileBuilder === "personalDetails" ? 
                                <div className="range-container"> <input type="range" min="0" max="200" value={range} onChange={zoomSlider} className="zoom-img-slider" id="zoom-img" /></div>
                            : 
                            ""
                        }
                    <div className="video-intro-container">
                        <div className={`cvHighlight ${cvHighlightBuilderLocal == "contact-vid" ||  cvHighlightLocal == "contact-vid" ? "highlight-this" : "" }`}></div>
                        <button onClick={ editVideo} className="video-intro">VIDEO INTRODUCTION</button>
                    </div>
                    <div className="sidebar-content">
                        <div className="skills">
                            <div className={`cvHighlight ${cvHighlightBuilderLocal == "skills" ||  cvHighlightLocal == "skills" ? "highlight-this" : "" }`}></div>
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
                    <h4 className="cv-name">{ localUserState?.firstname ? localUserState?.firstname :  profileData?.firstname ? profileData?.firstname : "" } { localUserState?.lastname ? localUserState?.lastname :   profileData?.lastname ? profileData?.lastname : "" }</h4>
                    <div className="contact-info">
                        <div className={`cvHighlight ${cvHighlightBuilderLocal == "contact" ||  cvHighlightLocal == "contact" ? "highlight-this" : "" }`}></div>
                        <p>
                            <span id="telephone"  className={` ${ localUserState?.telephone ? localUserState?.telephone :  profileData?.telephone ? "has-value" : "greyed-out" }`}>{ localUserState?.telephone ? localUserState?.telephone :  profileData?.telephone ? profileData?.telephone : "" }</span> 
                            <span id="email"      className={` ${ localUserState?.email ? localUserState?.email :   profileData?.email ? "has-value" : "greyed-out" }`}>{ localUserState?.email ? localUserState?.email :  profileData?.email ? profileData?.email : "" }</span> 
                        </p>
                    </div> 
                    <div className="pro-summary">
                        <div className={`cvHighlight ${cvHighlightBuilderLocal == "summary" ||  cvHighlightLocal == "summary" ? "highlight-this" : "" }`}></div>
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
                        <div className={`cvHighlight ${cvHighlightBuilderLocal == "work" || cvHighlightLocal == "work" ? "highlight-this" : "" }`}></div>

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
                        <div className={`cvHighlight ${cvHighlightBuilderLocal == "education" || cvHighlightLocal == "education" ? "highlight-this" : "" }`}></div>

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
        </CvPreviewContainer>
    return (CvPreview)
}
           