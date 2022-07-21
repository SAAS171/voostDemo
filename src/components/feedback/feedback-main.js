import React, {useState, useEffect} from 'react'; 
import Button from '../shared-components/button'; 
import {  Link, NavLink } from "react-router-dom";
    
//Styles
import styled from 'styled-components';   
import {auth, db, rdb, storage} from '../../firebase';
import {useDispatch, useSelector} from 'react-redux'; 
import { useHistory } from "react-router-dom";
import PreviewDocument from "../preview-document/preview-document";   
import {clearJobOffer, updateNotification, getFeedbackInfo, sendFeedbackResponse} from  "../../store/actions/actions"

import editfield from '../../assets/svg/edit-field.svg'; 
import Notiflix from 'notiflix';  

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const FeedMainContainer = styled.div` 
    max-width: 1140px;
    margin: 0 auto 50px;  
    .header-content{
        padding: 50px 0;
        position: relative;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 50px;
        h1{
            margin: 0;
            text-align: center;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        span{
            position: absolute;
            left: 0;
            top: 50% ;
            transform: translateY( -50% );
            cursor: pointer;

        }
    } 
    .hidden {
        display: none;
    }
    .fieldsets{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        text-align: left;

        fieldset{
            display: flex;
            flex-direction: column;
            width: 100%;
            flex-shrink: 0;
            margin-bottom: 15px;
            &.with-date{
                position: relative;
                max-width: 700px; 
                display: flex;
                justify-content: space-between;
            }
            textarea,
            input[type=text]{
                background-color: white;
                border-radius: 10px;
                border: 1px solid transparent;
                box-shadow: 0 0 20px -7px rgba(0,0,0,0.5); 
                margin-bottom: 20px;
                width: 100%; 
                padding: 18px;
                outline: none;
                padding-right: 50px;
                background-image: url("${editfield}");
                background-size: 25px;
                background-position: calc(100% - 18px) 50%;
                background-repeat: no-repeat;
            }
                        
            label{
                width: 100%;
            }
            &.half-fieldset{
                width: calc(50% - 10px);

            }
        }
        .offered-btns{ 
            display: flex;
            flex-direction: row;
            flex-wrap: wrap; 
            justify-content: flex-start; 
            > button{
                position: relative;
                border: none;
                background-color: transparent;
                margin-right: 20px;
                display: flex;
                align-items: center;
                outline: none;
                &.selected{
                    &:before{ 
                        content: ""; 
                        background-color: red;  
                    }
                }
                &:before{ 
                    content: "";
                    border: 1px solid red;
                    background-color: white; 
                    border-radius: 7px;;
                    width: 25px;
                    height: 25px;
                    display: inline-block;
                    margin-right: 10px;
                }

            }
        }
    }

    .react-datepicker-wrapper{
        width: 100%;
        flex-shrink: 0;
        .react-datepicker__input-container{
            width: 100%;
            input{ 
                width: 100%;
                padding: 15px;
                border-radius: 10px;
                border: 1px solid transparent;
                box-shadow: 0 0 20px -7px rgba(0,0,0,0.5);
                background-color: white;
                outline: none;
                font-size: 16px;
                padding-right: 50px; 
                background-size: 25px;
                background-position: calc(100% - 18px) 50%;
                background-repeat: no-repeat;
                &:focus{
                    border: 1px solid #6FC7BA;
                }
            }
        } 
    }
    
    .react-datepicker__tab-loop{ 
        position: absolute;
        width: calc(50% - 10px);
        .react-datepicker-popper{
            /* width: calc(50% - 10px) ; */
            top: 0px;
            right: 0px;
            left: 0;
            margin: 10px auto;
            width: 100%;
            .react-datepicker, .react-datepicker__month-container {  
                    width: 100%;
                    .react-datepicker__week{
                    display: flex;
                    width: 100%;
                    justify-content: space-evenly;
                    }
            }
            .react-datepicker__day--selected,
            .react-datepicker__day--keyboard-selected{
                background-color: #dc3163;

            }
        }
        .react-datepicker{ 
            border: 1px solid #6FC7BA;
        }
        .react-datepicker__header{
            background-color: white;
            border: none;

        }
        .react-datepicker__triangle{
            display: none;
            border-bottom-color: #fff;
        }
    }

    @media screen and (max-width: 992px) { 
        .header-content {
            h1{ 
                font-size: 25px!important;
            }
            span { 
                top: 30px;
            }
        }
        .fieldsets{
            padding: 15px;
            > fieldset{
                width: 100%!important;

            }
        }
    }
`

export default function FeedbackMain() {  
    
    const dispatch = useDispatch();   
    const history = useHistory();
 
    const {applicantId, applicationId, notificationId } = history.location.state ; 
    const feedbackResponse = useSelector(state => state.feedbackResponse)
    const [feedbackData , setFeedbackData] = useState({});
    const [feedbackObject, setFeedbackObject] = useState({});

    const [interviewDate, setInterviewDate] = useState(); 
    const [readableInterviewDate, setReadableInterviewDate] = useState(); 
    

    useEffect(() =>{
        dispatch(getFeedbackInfo({applicantId: applicantId, applicationId: applicationId}));

    }, []);
    
    useEffect(() =>{
        
        console.log("GOT RESPONSE: ", feedbackResponse.jobInfo)
        if(feedbackResponse.loading){
            Notiflix.Loading.Standard();
        }else{
            Notiflix.Loading.Remove();
        }
        if(feedbackResponse.jobInfo && feedbackResponse.jobInfo.name && feedbackResponse.jobInfo.timestamp){ 
            console.log("reponse: ", feedbackResponse.jobInfo.timestamp.seconds)

            setFeedbackData(feedbackResponse.jobInfo) 

            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(feedbackResponse.jobInfo.timestamp.seconds);
            const readableDate =  t.getDate() + "/" + t.getMonth() + "/" + t.getFullYear();
            setFeedbackObject(
                {
                    ...feedbackObject,
                    jobTitle: feedbackResponse.jobInfo.jobTitle,
                    interviewDate: "",
                    applicationDate: readableDate,
                    offered: false,
                    feedback: ""
                }
            )
        }

        if(feedbackResponse.sent){
            console.log("sent....test////")  
            history.push( {pathname: "/feedback-thankyou", state:{name: feedbackData.name} }); 

        }

    }, [feedbackResponse]);
 

    
    const goBack = ()=> {
        history.goBack()
    } 
    
    const updatefeedbackDataOffered = (x) =>{ 
        const o = {...feedbackObject, offered:x} 
        console.log("o: ", o)
        setFeedbackObject(o)
    }

    const updatefeedbackData = (e) =>{
        const i = e.target.id;
        const o = {...feedbackObject}
        o[`${i}`] = e.target.value;
        setFeedbackObject(o)
    }

    useEffect(() =>{
        let o = {...feedbackObject}
        o.interviewDate = readableInterviewDate
        setFeedbackObject(o)

    }, [readableInterviewDate]);

    const sendFeedback = (e) =>{ 
        const o = {
            feedbackResponse: {...feedbackObject},
            applicant_uid: applicantId,
            application_id: applicationId,
            notificationId: notificationId
        } 
        dispatch(sendFeedbackResponse(o))

    }

    const handleDateChangeSetEndDate = (d) =>{
        const date =  d.getDate() + "/" +  (d.getMonth()+1) + "/" +  d.getFullYear();
        setReadableInterviewDate(date) 
        setInterviewDate(d) 
    }

    return( 
        <FeedMainContainer> 
            <div className="header-content">
                <span onClick={  goBack } >Back</span>
                <h1>Please leave feedback for {feedbackData.name}</h1>
            </div>
            <div className="fieldsets">
                <fieldset>
                    <label>Job Role: </label>
                    <input type="text" id="jobTitle"  name="jobTitle" value={feedbackObject.jobTitle} onChange={updatefeedbackData}/>
                </fieldset>
                <fieldset className="half-fieldset">
                    <label>Application Date: </label>
                    <input type="text" id="applicationDate" readOnly name="applicationDate"  value={feedbackObject.applicationDate} onChange={updatefeedbackData}/>
                </fieldset>
                <fieldset className="half-fieldset with-date">
                    <label>Interview Date: </label>
                    <DatePicker dateFormat="dd/MM/yyyy"  selected={interviewDate} onChange={(date) => { handleDateChangeSetEndDate(date) }}  placeholderText="DD/MM/YYYY" />

                    {/* <input type="text"  id="interviewDate"  name="interviewDate"  value={feedbackObject.interviewDate} onChange={updatefeedbackData}/> */}
                </fieldset>
                <fieldset className="half-fieldset">
                    <label>Job Offered </label>
                    <div className="offered-btns"> 
                        <button className={`${feedbackObject.offered ? "selected" : ""}`} onClick={e => updatefeedbackDataOffered(true)}>YES</button> 
                        <button className={`${feedbackObject.offered ? "" : "selected"}`} onClick={e =>updatefeedbackDataOffered(false)}>NO</button> 
                    </div>
                </fieldset>
                <fieldset>
                    <label>Feedback</label>
                    <textarea type="text"  id="feedback"  name="feedback"  value={feedbackObject.feedback} onChange={updatefeedbackData}></textarea>
                </fieldset>

            </div>  
            <div className="btns-container">
                <Button type="primarySmall" text="Submit"  onClick={sendFeedback}/>

            </div>
        </FeedMainContainer>
    )
}