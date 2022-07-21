import React, {useState, useEffect} from 'react';

import Button from '../shared-components/button';
import {Border, SettingsWrap, SettingsContainer, ButtonClose, DateWrap} from './styles/MeetingRoomSettings';
import {Topic,  MeetingID, Email } from '../shared-components/formInput';
import { H4} from '../../styles/components/shared-components';
import DatePicker from 'react-date-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { v4 as uuidv4 } from 'uuid'; 
import Notiflix from "notiflix";
import {SaveSchedule, resetSchedule} from '../../store/actions/actions';
import { useSelector, useDispatch } from 'react-redux'; 
import MailSender from '../../Mail/MailSender'

import {getDomainUrl} from "../../endpoints";



import styled from "styled-components";

// import { format} from 'date-fns';



const ShareOptions = styled.div`
    .sharing-options{ 
        display: flex;
        flex-direction: column;
        align-items: center;
        .share-option {
            margin: 15px 0;
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        label {
            text-align: center;
            color: lightgrey;
            margin-bottom: 5px;

        }
    }

`


const ScheduleButtonContainer = styled.div`
    padding: 15px 0;
    text-align: center;
    button{
        min-width: 60%;
    }
`


export default function MeetingRoomSettings({open, onClose, applicant, theJob, editMeeting}){
    const dispatch = useDispatch(); 
    const saveStatus = useSelector(state => state.savedMeeting); 
    const profile = useSelector(state => state.profile.profile); 
    const [topic, setTopic] = useState(""); 
    const [startDate, setStartDate] = useState(); 
    const [startTime, setStartTime] = useState(['12:00', '13:00']); 
    const [endDate, setEndDate] = useState(null); 
    const [endTime, setEndTime] = useState(null); 
    const [meetingId, setMeetingId] = useState(uuidv4());
    const [toEditID, setToEditID] = useState(null); 
    const [scheduleData, setScheduleData] = useState({}); 

    
    const [recipientEmail, setRecipientEmail] = useState(""); 


    useEffect(() => {
        if(scheduleData.meetingRoomId && scheduleData.startDate){
            const data = scheduleData; 
            if(editMeeting?.applicant){
                data.applicant = editMeeting.applicant
                dispatch(SaveSchedule(scheduleData))
            }
            else {
                dispatch(SaveSchedule(scheduleData))
            }
            
        }
    }, [scheduleData])
    useEffect(() => {
        if(editMeeting && editMeeting.data().topic){
            setTopic(editMeeting.data().topic)
        }
        if(editMeeting && editMeeting.data().startDate){
            setStartDate(new Date(editMeeting.data().startDate))
        }
        if(editMeeting && editMeeting.data().startTime){
            
            setStartTime(editMeeting.data().startTime)
        }
        if(editMeeting && editMeeting.data().endDate){
            setEndDate(editMeeting.data().endDate);
        }
        if(editMeeting && editMeeting.data().endTime) {
            setEndTime(editMeeting.data().endTime);
        }
        if(editMeeting && editMeeting.data().meetingId) {
            setMeetingId(editMeeting.data().meetingId); 
        }
        if(editMeeting && editMeeting.id){
            setToEditID(editMeeting.id); 
        }
    }, [editMeeting])
    useEffect(() => {
        if(saveStatus.loading === true) {
            Notiflix.Loading.Standard();
        }
        else{
            Notiflix.Loading.Remove();
        }
        if(saveStatus.success === true){
            Notiflix.Report.Success( 'Success', 
            'Your meeting has been saved',
             'Ok', 
             function() {
                 dispatch(resetSchedule()); 
                 if(theJob && applicant){
                    MailSender({name:applicant.name, email:applicant.email, data:scheduleData}, 'interviewSchedule')
                }
                 onClose(); 
             } ); 
        }
        else if(saveStatus.error !== null) {
            Notiflix.Report.Failure( 'Something went wrong', 
            `${saveStatus.error.message}`,
             'Ok' );
        }
    }, [saveStatus])

    const copyShare = (e) =>{
        console.log("COPY THE SHARING LINK....",e.target.id)
        const meetingId= e.target.getAttribute("data-meetingid")  
        const copyString = `${getDomainUrl()}/voost-rooms?id=${meetingId}`;
        navigator.clipboard.writeText(copyString);  
        Notiflix.Report.Success( 'Success',  'Your share link has been copied.', 'Ok');

    }
    const handleRecipientChange = (e) =>{
        setRecipientEmail(e.target.value)
    }


    const handleSchedule = () => {
        if (topic==="" ){
            Notiflix.Report.Failure(
                'Incomplete form',
                `Please enter a topic`,
                'Ok'
                );
                return;
        }
        
        if (startDate === null  || typeof startDate === "undefined" ){
            Notiflix.Report.Failure(
                'Incomplete form',
                `Please enter start date`,
                'Ok'
                );
                return;
        }
        
        if (startTime === null  || typeof startTime === "undefined" ){
            Notiflix.Report.Failure(
                'Incomplete form',
                `Please enter a start time`,
                'Ok'
                );
                return;
        }
        // else if (endDate === null ){
        //     Notiflix.Report.Failure(
        //         'Incomplete form',
        //         `Please enter an end date`,
        //         'Ok'
        //         );
        // }
        
        // else if (endTime === null){
        //     Notiflix.Report.Failure(
        //         'Incomplete form',
        //         `Please enter an end time`,
        //         'Ok'
        //         );
        // }
        
        if (!meetingId){
            setMeetingId(uuidv4());
        }

        else{
            const recruiter = profile; 

            console.log("RECRUITER DATA:", recruiter)
            if(recruiter){
                delete profile.email; 
                setScheduleData({
                    ...scheduleData,
                    recruiter,
                    topic, 
                    startDate: startDate.toUTCString(),
                    startTime: startTime, 
                    meetingRoomId: meetingId,
                    applicant,
                    theJob: theJob ? {jobTitle: theJob.jobTitle, id: theJob.id} : null,
                    id: toEditID, 
                    date: Date.now(),
                    recEmail: recipientEmail,
                    sender: profile.company_name,
                    emailDate: `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
                })
            }else {
                setScheduleData(
                    {topic, 
                    startDate: startDate.toUTCString(),
                    startTime: startTime, 
                    meetingRoomId: meetingId,
                    applicant,
                    theJob: theJob ? {jobTitle: theJob.jobTitle, id: theJob.id} : null,
                    id: toEditID, 
                    date: Date.now(),
                    recEmail: recipientEmail,
                    sender: recruiter?.name,
                    emailDate: `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`,

                });
            }
            


        }
    }

    if (!open) return null
    return(
        <>
            <SettingsWrap>
                <SettingsContainer>
                    <ButtonClose onClick={onClose}/>
                    <H4>Schedule an interview</H4>
                    <Border>
                        <div>
                            <strong>topic</strong>
                            <Topic value={topic} onChange={e => {setTopic(e.target.value)}}/>
                        </div> 
                        <div> 
                            <DateWrap>
                            <strong>Date</strong>
                                <DatePicker monthPlaceholder='mm' dayPlaceholder='dd' onChange={setStartDate} format='dd-MM-yyyy' value={startDate} className='datePicker'/>
                                {/* <DatePicker value={startDate} onChange={e => {setStartDate(e.target.value)}}/> */}
                                {/* <Time value={startTime} onChange={e => {setStartTime(e.target.value)}}/> */}
                                <strong>Time</strong>
                                <TimeRangePicker disableClock rangeDivider='To :' onChange={setStartTime} value={startTime} className='timePicker'/>
                                {/* <Time value={endTime} onChange={e => {setEndTime(e.target.value)}} /> */}
                            </DateWrap>
                        </div>
                    </Border>
                    <Border>
                        <p><strong>meeting id</strong></p>
                        <MeetingID value={meetingId}/>
                    </Border>

                    <Border> 
                        <ShareOptions>
                            <div className="sharing-options">
                                <div className="share-option">
                                    <Button type="greenSmall" text="Copy share link" data-meetingid={meetingId} onClick={copyShare}></Button>
                                </div>
                                <span>Or</span>
                                <div className="share-option">
                                    <label>Email meeting link upon scheduling your meeting</label> 
                                    <Email name="share-email"  data-meetingid={meetingId} onChange={handleRecipientChange} value={recipientEmail} placeholder="Recipient Email"/>
                                </div> 
                            </div>  
                        </ShareOptions>
                    </Border> 

                    {/* <Border>
                        <p><strong>password</strong></p>
                        <div className="password">
                            <MeetingPasswordRadio />
                            <MeetingPasswordInput />
                        </div>
                    </Border> */}

                    {/* <Border>
                        <p><strong>video</strong></p>
                        <div className="video">
                            <p>Host</p>
                            <MeetingVideo type="host"/>
                            <p>Participants</p>
                            <MeetingVideo type="participants"/>
                        </div>
                    </Border> */}
                    <ScheduleButtonContainer> 
                        <Button type="primarySmall" text="schedule" onClick ={handleSchedule}/>
                    </ScheduleButtonContainer>
                </SettingsContainer>
            </SettingsWrap>
        </>
    )
}