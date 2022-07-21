import React, {useState, useEffect} from 'react'; 
import Button from '../shared-components/button'; 
import {  Link, NavLink } from "react-router-dom";
    
//Styles
import styled from 'styled-components';  
import {CardDiv, CardTop} from './styles/accountSettingsCard';
import {BorderContainer, H6} from '../../styles/components/shared-components';
import CvPreviewModal from '../profile-builder/cvPreviewModal';
import {  
    handleInterviewRequest, 
    getMyNotifications,
    fetchJobOffer,
    fetchContract,
    updateProfileBuilderState,
    updateNotification
} from '../../store/actions/actions'; 
import {auth, db, rdb, storage} from '../../firebase';
import {useDispatch, useSelector} from 'react-redux'; 
import { useHistory } from "react-router-dom";
  
import exit from '../../assets/svg/exit.svg'; 
import bell from '../../assets/svg/bell.svg';
import Notiflix from "notiflix";
 
const NotificationsCardInner = styled.div` 
    > div > div > h6{
        position:relative;
        width: 100%;
        padding-right: 50px;
        &:after{
            content: "";
            right: 15px;
            top: 50%;
            position: absolute;
            height: 30px;
            width: 30px; 
            background-color: transparent;
            transform: translateY(-50%);
            background-image: url(${bell});
            background-size: 60%;
            background-position: center;
            background-repeat: no-repeat;

        }
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
            >div{ 
                display: flex;  
                align-items: center;
            }
        }
        .interview-data{
            width: 100%; 
            p{
                margin: 5px 0 0;
            }
        }
        .accept-reject-container{ 
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: 30%;
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


export default function AccountNotifications() {  
    
    const dispatch = useDispatch();   
    const history = useHistory();
  
    const notificationsReducer = useSelector(state => state.fetchNotifications); 

    const [currentNotification, setCurrentNotification] = useState(0) 
    // const recentNotifications = useSelector(state => state.fetchNotifications)
    const [localRecents, setLocalRecents] = useState([]);


    const profileState = useSelector(state => state.profile); 
    const profile = profileState.profile;
  
    const jobOffer = useSelector(state => state.fetchedJobOffer.fetchedJobOffer)
    const contract = useSelector(state => state.fetchedContract.fetchedContract)

    const InterviewRequestState = useSelector(state => state.scheduledInterviewResponse); 
    const [showInterviewHandledModal, setShowInterviewHandledModal] = useState(false) 



    const closeHandleInterviewModal = (e) => {
        e.preventDefault();
        setShowInterviewHandledModal(false)
    }

    useEffect(()=> {
        // console.log("InterviewRequestState", InterviewRequestState)
        if(InterviewRequestState != null){ 
            if(!InterviewRequestState.isLoading) { 
                Notiflix.Loading.Remove();
            } 
            if(InterviewRequestState.responded != null ){
                Notiflix.Loading.Remove();
                setShowInterviewHandledModal(true)
            }
        } 
    },[InterviewRequestState])

    useEffect(()=>{
        dispatch(getMyNotifications());
    }, [])

 
    useEffect(()=>{
        
        if(typeof jobOffer !== "undefined" && typeof jobOffer.companyName !== "undefined" ){
            let cn = currentNotification;
            setCurrentNotification(0)
            history.push( {pathname: "/view-offer", state: { notificationToClear:  cn , documentType: "offerLetter", documentData: {...jobOffer}  }});
        }
        if(typeof contract !== "undefined" &&  typeof contract.company  !== "undefined" ){
            let cn = currentNotification;
            setCurrentNotification(0)
            history.push( {pathname: "/view-contract", state: { notificationToClear:  cn , documentType: "contract", documentData: {...contract}  }});
        }


    }, [jobOffer, contract])
    

    useEffect(()=>{

        let notifications = notificationsReducer.fetchedNotifications  
        const sortedUnread = notifications.filter((e) => { return !e.viewed }).sort((a, b) => b.sortDate - a.sortDate)  
        let filteredArr = [];
 
        sortedUnread.some((o)=> { 
            if(o.type=== "Message"){ 
                if(filteredArr.findIndex(x => x.application_id === o.application_id) === -1) filteredArr.push(o) 
            }else{
                filteredArr.push(o) 
            }
            return false
        })
  
        setLocalRecents( filteredArr.slice(0, 3)) 
    }, [notificationsReducer])

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
        
        window.scrollTo(0, document.getElementById("meeting-card"));

    } 


   
    const giveFeedback = (e) =>{
        e.preventDefault();
        const notificationToClear =  e.target.getAttribute("data-id"); 
        const aid =  e.target.getAttribute("data-aid"); 
        const applicant_id =  e.target.getAttribute("data-applicant_id"); 
        const statetosend =  { applicantId: applicant_id, applicationId: aid };
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
    

    const notificationSwitch = (data, index) =>{
        const n = data;
        switch (data.type) {
            case "Job Offer": 
                return  ( 
                    <div key={index}>
                        <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                        <Button 
                            data-aid={n.application_id}
                            data-id={n.id}
                            type="primarySmall"
                            text="View"
                            onClick={viewOffer}
                        /> 
                    </div>
                ) 
                break;
        
            case "Contract": 
                return  (
                    <div key={index}>
                        <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                        <Button 
                            data-aid={n.application_id}
                            data-id={n.id}
                            type="primarySmall"
                            text="View"
                            onClick={viewContract}
                        /> 
                    </div> 
                ) 
                break; 
        
            case "Application Feedback": 
                return  (
                    <div key={index}>
                        <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                        <Button 
                            data-id={n.id}
                            data-applicant_id={n.applicant_id}
                            data-aid={n.application_id}
                            type="primarySmall"
                            text="Give Feedback"
                            onClick={giveFeedback}
                        />  
                    </div> 
                ) 
                break;
        
            case "Feedback": 
                return  ( 
                    <div key={index}>
                        <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                        <Button 
                            data-id={n.id}
                            data-aid={n.application_id}
                            type="primarySmall"
                            text="View"
                            onClick={viewFeedback}
                        />  
                    </div>     
                ) 
                break;
        
            case "Interview": 
                return (
                    
                    <div key={index}> 
                        <div className="interview-data">
                            <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                            <p> <b>{n.meetingData.meeting.recruiter.company_name}  </b> - {n.meetingData.meeting.startDate} </p>
                            <p>Position:   <b>{n.meetingData.meeting.theJob.jobTitle}</b>   </p>
                        </div>
                        <div  className=" accept-reject-container">
                            <Button 
                                data-id={n.id}
                                data-aid={n.application_id} 
                                data-rid={n.meetingData?.meeting?.recruiter.id} 
                                data-meetingid={n.meetingData.meetingId}
                                data-meetingname={n.meetingData.meeting.applicant.name}
                                type="primarySmall"
                                text="Reject"
                                onClick={rejectInterview}

                            />

                            <Button 
                                data-id={n.id}
                                data-aid={n.application_id} 
                                data-rid={n.meetingData?.meeting?.recruiter.id}  
                                data-meetingid={n.meetingData.meetingId}
                                data-meetingname={n.meetingData.meeting.applicant.name}
                                type="primarySmall"
                                text="Accept"
                                onClick={acceptInterview}
                            />
                        </div>  

                        
                    </div>  
                )
                break;

            case "Interview Response": 
                return (
                    <div key={index}> 
                        <H6>{n.type} <span>{n.time}, {n.date}  <br />
                            <b>{n.interviewee} { n.interviewResponse ? "accepted" : "rejected"} </b></span> 
                        </H6>    
                        <div className="interview-data"> 
                            { n.interviewResponse ? 
                                
                                <Button 
                                    data-id={n.id}
                                    data-applicant_id={n.applicant_id}
                                    data-aid={n.application_id}
                                    type="primarySmall"
                                    text="See Interview"
                                    onClick={seeInterview}
                                />  
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
                    )
                break;

            case "Job Application": 
                return ( 
                    <div key={index}> 
                        <H6>
                            {n.type} 
                            <span>
                                {n.time}, {n.date}<br />
                                A job application was received for the position of: <b>{n.jobTitle}  </b>
                            </span>
                         </H6>  
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
                    </div>
                )
                break;

            case "Message": 
                    return;
                    break;

        
            default:
                return (
                    <div key={index}>
                        <H6>{n.type} <span>{n.time}, {n.date} </span></H6> 
                    </div> 
                )
        }
    }
    
    return(

        <BorderContainer> 
            <NotificationsCardInner >
                
                <CardDiv>
                    <CardTop>
                        <H6>Notifications</H6> 
                    </CardTop> 
                    <div className="card-main"> 
                        <div className="recent-notifications"> 
                            {
                                localRecents.length > 0 ? 
                                    localRecents.map((n, index) => 
                                        (  
                                            notificationSwitch(n, index)
                                        )
                                    )
                                :
                                    <div>
                                        <p>No New Notifications</p>
                                    </div>

                            }
                        </div>    
                    </div>     
                    <div className="card-bottom"> 
                        <Link to="/notifications" >View All</Link> 
                    </div> 
                </CardDiv> 
            </NotificationsCardInner>
            <InterviewHandleModal className={showInterviewHandledModal ? "show-modal" : ""}>
                <div className="myinterview">
                    <div className="interview-inner">
                        <h5>Interview request </h5>
                        {InterviewRequestState?.responded ? 
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
        </BorderContainer>
    )
}