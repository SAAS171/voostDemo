import React, {useRef, useEffect, useState } from 'react';
import styled from 'styled-components'; 
import {useDispatch, useSelector} from 'react-redux'; 
import { HashLink } from 'react-router-hash-link';

import { 
    getMyNotifications, 
    fetchJobOffer, 
    fetchContract, 
    handleInterviewRequest, 
    updateNotification, 
    interviewResponseReceived
} from '../../store/actions/actions';  

import { useHistory, Link } from "react-router-dom";
import Button from '../shared-components/button'; 
import {CardDiv, CardTop} from '../account-home/styles/accountSettingsCard';
import {BorderContainer, H6} from '../../styles/components/shared-components';
import {Animated} from "react-animated-css";  
import firebase from 'firebase'; 
import { db, rdb, auth } from '../../firebase';
import Notiflix from "notiflix";
import exit from '../../assets/svg/exit.svg'; 


const InterviewHandleModal = styled.div` 
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
    } 


` 


const NotificationsCardInner = styled.div` 
    .no-border{
        border: none!important;   
        h6{
            margin: 0;
        }
    }
    .accept-reject-container{ 
        display: flex;
        /* flex-direction: column; */
    }
    h6{
        position:relative;
        width: 100%;
        padding-right: 50px; 
        border: none;
        span{
            font-size: 18px;
            font-weight: 100;

        }
 
    }
    .card-main{
        padding: 10px;
        .recent-notifications{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    }
    .card-bottom{
        a{
            text-align: center;
            width: 100%;
            display: block;
            border-top: 1px solid lightgray;
            padding: 20px 0 0;
            color: grey;
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: 2px;
        }

    }
`
const NotificationsOuterContainer = styled.div` 
    max-width: 1140px;
    margin: 50px auto;  
    .selector-container{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .notification-type-selector{ 
            width: calc(50% - 50px );
            padding: 20px 0;
            color: grey;
            margin: 20px 0;
            background-color: whitesmoke;
            cursor: pointer;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transform: none;
            transition: ease-in-out 200ms all;
            border: 1px solid transparent;
            border-radius: 4px;
            &:hover{
                transition: ease-in-out 200ms all;
                transform: scale(1.02)
            }
            &.show-list{
                color: #dc3163;
                border: 1px solid #dc3163;
            }
        }

    }
    .header-content{
        padding: 50px 0;
        position: relative;
        border-bottom: 1px solid lightgrey;
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
            top: 0;
            cursor: pointer;

        }
    }

    @media screen and (max-width: 992px) {
        .selector-container{
            flex-direction: column;
            p{    
                width: 90%!important;
                margin: 10px 0!important;
            }
        }
        .notification-list-items{
            .single-item{
                .mobile-card-top{

                    padding: 0 15px;
                    text-align: left;
                    align-items: flex-start;
                    border-bottom: none;
                    h6{
                        padding: 0;
                        margin-bottom: 0;
                    }
                    button{ 
                        margin: 10px 0 0;
                        width: 100%; 
                    }
                }
                .card-main{
                    padding: 0 20px;
                }
            }
        }
    }


    .hidden {
        display: none;
    }
`
export default function NotificationsList() {
       
    const history = useHistory();
    const dispatch = useDispatch();   
    var storage = firebase.storage().ref();    
    const notificationsReducer = useSelector(state => state.fetchNotifications); 
    const [notificationsCount, setNotificationsCount] = useState(0) 

    const [readNotifications, setReadNotifications] = useState([]) 
    const [unreadNotifications, setUnreadNotifications] = useState([]) 
    const [currentNotification, setCurrentNotification] = useState(0) 
    const [showUnread, setShowUnread] = useState(true) 


    const jobOffer = useSelector(state => state.fetchedJobOffer.fetchedJobOffer)
    const contract = useSelector(state => state.fetchedContract.fetchedContract)


    const InterviewRequestState = useSelector(state => state.scheduledInterviewResponse); 
    const [showInterviewHandledModal, setShowInterviewHandledModal] = useState(false) 
    const [isAccepted, setIsAccepted] = useState(false) 


    

    useEffect(()=> {
        console.log("showInterviewHandledModal", showInterviewHandledModal)
        if(InterviewRequestState.responded != null ){ 
            dispatch(interviewResponseReceived(null) ) 

        }
    },[showInterviewHandledModal])

    

    useEffect(()=> {
        console.log("InterviewRequestState", InterviewRequestState)
        if(InterviewRequestState != null){ 
            if(!InterviewRequestState.isLoading) { 
                Notiflix.Loading.Remove();
            } 
            if(InterviewRequestState.responded != null ){
                setShowInterviewHandledModal(true)
                dispatch(interviewResponseReceived(null) ) 
                setIsAccepted(InterviewRequestState?.responded);

            }
        } 
    },[InterviewRequestState])



    useEffect(()=>{
        console.log("contract companyName: ",contract)
        console.log("job offer companyName: ",jobOffer)
        if(typeof jobOffer !== "undefined" && typeof jobOffer.companyName !== "undefined" ){
            let cn = currentNotification;
            setCurrentNotification(0)
            console.log("job offer with length: ",jobOffer)
            history.push( {pathname: "/view-offer", state: { notificationToClear:  cn , documentType: "offerLetter", documentData: {...jobOffer}  }});
        }
        if(typeof contract !== "undefined" &&  typeof contract.company  !== "undefined" ){
            let cn = currentNotification;
            setCurrentNotification(0)
            console.log("contract with length: ",contract)
            history.push( {pathname: "/view-contract", state: { notificationToClear:  cn , documentType: "contract", documentData: {...contract}  }});
        }


    }, [jobOffer, contract])
    
    useEffect(()=>{
        dispatch(getMyNotifications()) 
        rdb.ref('notifications/' +  auth.currentUser.uid   ).set({ unread : false }); 
    }, [] )

    useEffect(()=>{
        Notiflix.Loading.Remove()
        let notifications = filterForGroupBy(notificationsReducer.fetchedNotifications)
        // if(notifications.length)
        console.log("raw notifications", notifications)

        const sortedRead = notifications.filter((e) => { return e.viewed }).sort((a, b) => b.sortDate - a.sortDate)
        setReadNotifications(sortedRead)

        const sortedUnread = notifications.filter((e) => { return !e.viewed }).sort((a, b) => b.sortDate - a.sortDate) 
        setUnreadNotifications(sortedUnread)

        console.log("sortedRead: ", sortedRead)
        console.log("sortedUnread: ", sortedUnread)
         
        setNotificationsCount(sortedUnread.length)


    }, [notificationsReducer] )
    

    const filterForGroupBy  = (ungroupedNotifications) =>{

        // const sorted  = ungroupedNotifications.filter((e) => { return !e.viewed }).sort((a, b) => b.sortDate - a.sortDate)  
        let filteredArr = []; 
        ungroupedNotifications.some((o)=> { 
            if(o.type=== "Message"){ 
                if(filteredArr.findIndex(x => x.application_id === o.application_id) === -1) filteredArr.push(o) 
            }else{
                filteredArr.push(o) 
            }
            return false
        })
        return filteredArr; 
    }


    const viewContract = (e) =>{
        e.preventDefault();
        console.log("VIEW CONTRACT.....")
        const aid =  e.target.getAttribute("data-aid"); 
        const id =  e.target.getAttribute("data-id"); 
        dispatch(fetchContract({application_id: aid}))
        setCurrentNotification(id)
    }

    const viewOffer = (e) =>{
        e.preventDefault();
        const aid =  e.target.getAttribute("data-aid"); 
        const id =  e.target.getAttribute("data-id"); 
        dispatch(fetchJobOffer({application_id: aid}))
        setCurrentNotification(id)
        
    } 

    const replyToMessage = (e) =>{
        e.preventDefault();
        const aid =  e.target.getAttribute("data-aid"); 
        const id =  e.target.getAttribute("data-id"); 
        history.push( {pathname: "/messenger", state: { applicantId: auth.currentUser.uid, applicationId: aid }}); 
    }
    
    const acceptInterview = (e) =>{
        e.preventDefault();
        
        Notiflix.Loading.Standard();
        const notificationToClear =  e.target.getAttribute("data-id");  
        dispatch(updateNotification({uid:auth.currentUser.uid, id:notificationToClear }))
 
        const statetosend =  { 
            meetingId: e.target.getAttribute("data-meetingid"),
            applicationId: e.target.getAttribute("data-aid"), 
            recruiterId:  e.target.getAttribute("data-rid"), 
            interviewResponse: true,
            interviewee: e.target.getAttribute("data-meetingname")
        };
        console.log("statetosend", statetosend);
        dispatch(handleInterviewRequest(statetosend))

    }

    const rejectInterview = (e) =>{
        e.preventDefault();

        Notiflix.Loading.Standard();
        const notificationToClear =  e.target.getAttribute("data-id");  
        dispatch(updateNotification({uid:auth.currentUser.uid, id:notificationToClear }))
 
        const statetosend =  { 
            meetingId: e.target.getAttribute("data-meetingid"),
            applicationId: e.target.getAttribute("data-aid"), 
            recruiterId:  e.target.getAttribute("data-rid"), 
            interviewResponse: false,
            interviewee: e.target.getAttribute("data-meetingname")
        };
        console.log("statetosend", statetosend);
        dispatch(handleInterviewRequest(statetosend))

        
    } 
    
    const markInterviewResponse =(e) =>{
        e.preventDefault(); 
        const notificationToClear =  e.target.getAttribute("data-id");  
        dispatch(updateNotification({uid:auth.currentUser.uid, id:notificationToClear })) 
    } 

    const seeInterview =(e) =>{
        e.preventDefault(); 
        const notificationToClear =  e.target.getAttribute("data-id");  
        dispatch(updateNotification({uid:auth.currentUser.uid, id:notificationToClear })) 
        e.target.parentNode.click();
        

    } 

    const giveFeedback = (e) =>{
        e.preventDefault();
        const notificationToClear =  e.target.getAttribute("data-id"); 
        const aid =  e.target.getAttribute("data-aid"); 
        const applicant_id =  e.target.getAttribute("data-applicant_id"); 
        const statetosend =  { applicantId: applicant_id, applicationId: aid, notificationId: notificationToClear };
        console.log("statetosend", statetosend);
        dispatch(updateNotification({uid:auth.currentUser.uid, id:notificationToClear }))
        history.push( {pathname: "/give-feedback", state:statetosend }); 

    }

    const viewFeedback = (e) =>{
        const aid =  e.target.getAttribute("data-aid"); 
        const notificationToClear =  e.target.getAttribute("data-id"); 
        dispatch(updateNotification({uid:auth.currentUser.uid, id:notificationToClear }))
        history.push( {pathname: "/view-feedback", state:{applicationId: aid} }); 
    }

    const handleViewApplication = (e) =>{
        e.preventDefault();
        
        const notificationToClear =  e.target.getAttribute("data-id");  
        dispatch(updateNotification({uid:auth.currentUser.uid, id:notificationToClear }))
 
        const jobid = e.target.getAttribute("data-jid")
        history.push(`/applicants/${jobid}`);  
    }
    
    const notificationSwitch = (data) =>{
        const n = data;
        switch (data.type) {
            case "Job Offer": 
                return  (
                    <CardDiv  >
                        <CardTop className="no-border mobile-card-top">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                            <Button 
                                data-aid={n.application_id}
                                data-id={n.id}
                                type="primarySmall"
                                text="View"
                                onClick={viewOffer}
                            />
                        </CardTop> 
                    </CardDiv>  
                ) 
                break;
        
            case "Contract": 
                return  (
                    <CardDiv  >
                        <CardTop className="no-border mobile-card-top">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                            <Button 
                                data-aid={n.application_id}
                                data-id={n.id}
                                type="primarySmall"
                                text="View"
                                onClick={viewContract}
                            />
                        </CardTop> 
                    </CardDiv>   
                ) 
                break;
        
            case "Message": 
                return  (
                    <CardDiv  >
                        <CardTop className=" mobile-card-top">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                            <Button 
                                data-aid={n.application_id}
                                data-id={n.id}
                                type="primarySmall"
                                text="Reply"
                                onClick={replyToMessage}
                            />
                        </CardTop>  
                        <div className="card-main">  
                            <p>{n.message}</p>
                        </div> 
                    </CardDiv>    
                ) 
                break;
        
            case "Application Feedback": 
                return  (
                     
                    <CardDiv  >
                        <CardTop className=" mobile-card-top">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                            {
                                n.feedBackSent ? <p style={{flexShrink: "0", margin: "0"}}>Feedback sent</p> :
                                <Button 
                                    data-id={n.id}
                                    data-applicant_id={n.applicant_id}
                                    data-aid={n.application_id}
                                    type="primarySmall"
                                    text="Give Feedback"
                                    onClick={giveFeedback}
                                />  

                            }
                            
                        </CardTop>   
                    </CardDiv>     
                ) 
                break;
        
            case "Feedback": 
                return  ( 
                    <CardDiv  >
                        <CardTop className=" mobile-card-top">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                            <Button 
                                data-id={n.id}
                                data-aid={n.application_id}
                                type="primarySmall"
                                text="View"
                                onClick={viewFeedback}
                            />  
                        </CardTop>   
                    </CardDiv>     
                ) 
                break;
        
            case "Job Application": 
                return (
                    <CardDiv  className="card-inside-card">
                        <CardTop className=" mobile-card-top">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6>  
                            <div  className=" accept-reject-container">
                                <Button 
                                    data-id={n.id}
                                    data-aid={n.application_id}
                                    data-jid={n.jobId}
                                    type="primarySmall"
                                    text="View"
                                    onClick={handleViewApplication}
                                /> 
                            </div> 
                        </CardTop>    
                        <div className="card-main">   
                            <p>A job application was received for the position of: <b>{n.jobTitle}  </b></p> 
                        </div> 
                    </CardDiv> 
                )
                break;
        
            case "Interview": 
                return (
                    <CardDiv  className="card-inside-card">
                        <CardTop className=" mobile-card-top">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                            {
                                !n.viewed ?
                                    <div className="accept-reject-container">
                                        <Button 
                                            data-meetingid={n.meetingData.meetingId}
                                            data-id={n.id}
                                            data-aid={n.application_id} 
                                            data-rid={n.meetingData?.meeting?.recruiter.id} 
                                            data-meetingname={n.meetingData.meeting.applicant.name}
                                            type="primarySmall"
                                            text="Reject"
                                            onClick={rejectInterview}
                                        />
                                        <Button 
                                            data-id={n.id}
                                            data-aid={n.application_id} 
                                            data-rid={n.meetingData?.meeting?.recruiter.id} 
                                            data-meetingname={n.meetingData.meeting.applicant.name}
                                            type="primarySmall"
                                            text="Accept"
                                            onClick={acceptInterview}
                                        />
                                    </div>
                                :
                                    
                                    <HashLink id={`myid-${n.id}`} to="/accountRecruiter#meeting-card"> 
                                        <Button 
                                            data-id={n.id}
                                            data-applicant_id={n.applicant_id}
                                            data-aid={n.application_id}
                                            type="primarySmall"
                                            text="See Interview"
                                            onClick={seeInterview}
                                            />  
                                    </HashLink>
                            }
                        </CardTop>    
                        <div className="card-main">  
                            <div className="interview-data">
                                <p>Interview request from: <b>{n.meetingData.meeting.recruiter.company_name}  </b></p>
                                <p>For the position of:   <b>{n.meetingData.meeting.theJob.jobTitle}</b> </p>
                                <p>Topic of this meeting: <b>{n.meetingData.meeting.topic}</b> </p>
                                <p>Interview start time:   <b>{n.meetingData.meeting.startDate}</b> </p>
                            </div>
                        </div> 
                    </CardDiv> 
                )
                break;

            case "Interview Response": 
                return (<CardDiv  >
                    <CardTop className=" mobile-card-top">
                        <H6>{n.type} <span>{n.time}, {n.date}  <br />
                            <b>{n.interviewee} { n.interviewResponse ? "accepted" : "rejected"} </b></span> 
                        </H6>   
                    </CardTop>   

                    <div className="card-main">  
                        <div className="interview-data">
                            { n.interviewResponse ? 
                                
                                    <HashLink to="/accountRecruiter#meeting-card"> 
                                        <Button 
                                            data-id={n.id}
                                            data-applicant_id={n.applicant_id}
                                            data-aid={n.application_id}
                                            type="primarySmall"
                                            text="See Interview"
                                            onClick={seeInterview}
                                            />  
                                    </HashLink>
                                : 
                                    <Button 
                                        data-id={n.id}
                                        data-applicant_id={n.applicant_id}
                                        data-aid={n.application_id}
                                        type="primarySmall"
                                        text="ok"
                                        onClick={markInterviewResponse}
                                    />   
                            }   
                        </div>
                    </div> 
                </CardDiv> )
                break;

            default:
                return (<CardDiv  >
                    <CardTop className=" mobile-card-top">
                        <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                    </CardTop>   
                </CardDiv> ) 
        }
    }

    const closeHandleInterviewModal = (e) => {
        e.preventDefault();
        setShowInterviewHandledModal(false)
    }


    return ( 
        <NotificationsOuterContainer>    
            <div className="header-content">
                <span onClick={() => history.goBack()}>Back</span>
                <h1>{ notificationsCount == 0 ? "NO" : notificationsCount } NEW NOTIFICATION{notificationsCount > 1 ? "S" : ""}</h1>
            </div>
            <div className="selector-container">
                <p className={`notification-type-selector ${showUnread ?  "show-list"  :  "" }`} onClick={e => setShowUnread(true) }>New Notifications</p>
                <p className={`notification-type-selector ${!showUnread ? "show-list"  :  "" }`} onClick={e => setShowUnread(false) }>Old Notifications</p> 
            </div>
            <div className="notification-list-items">  
                {showUnread ? 
                    <>
                        {
                            unreadNotifications.map( (n, i)  =>  
                                ( 
                                    <div key={i} className="single-item">
                                        <BorderContainer> 
                                            <NotificationsCardInner >
                                                {notificationSwitch(n)}   
                                            </NotificationsCardInner>
                                        </BorderContainer>
                                    </div>   
                                )  
                            )
                        }
                    </>
                    : 
                    <>
                        {
                            readNotifications.map( (n, i)  =>  
                                ( 
                                    <div key={i} className="single-item">
                                        <BorderContainer> 
                                            <NotificationsCardInner >
                                                {notificationSwitch(n)}  
                                            </NotificationsCardInner>
                                        </BorderContainer>
                                    </div>   
                                )  
                            )
                        }
                    </>
                } 
            </div>
            <InterviewHandleModal className={showInterviewHandledModal ? "show-modal" : ""}>
                <div className="myinterview">
                    <div className="interview-inner">
                        <h5>Interview request </h5>
                        { isAccepted ? 
                            <p>We have sent confirmation of your interview to the employer. Visit the scheduled meeting section in <Link to="/account">Account</Link> page to review this meeting.</p>
                        :
                            <p>We have notified the employer you declined this meeting.</p>
                        }
                        
                        <div>
                            
                        <Button  
                                type="primarySmall"
                                text="Close"
                                onClick={closeHandleInterviewModal}
                            />
                        </div>
                    </div>
                </div>
            </InterviewHandleModal>
        </NotificationsOuterContainer>
    )
}
           