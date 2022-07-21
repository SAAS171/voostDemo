import React, {useEffect, useState} from 'react';
import Button from '../shared-components/button';
import {useSelector, useDispatch} from 'react-redux'; 
import Notiflix from 'notiflix';
import {   NavLink} from "react-router-dom";
import {fetchMyMeetings} from '../../store/actions/actions'; 
import { format } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import VoostRoomsSettings from '../modals/meetingRoomSettings';
// import {getDomainUrl} from '../../endpoints'; 
//Styles
import {BorderContainer, H6, P, MeetingIdWrap} from '../../styles/components/shared-components';
import {Meeting} from './styles/accountMeetingsCard';
import {Status} from './styles/accountApplicationsCard';
import {CardDiv, CardTop} from './styles/accountSettingsCard';
import { FaCopy } from 'react-icons/fa';


export default function MeetingsCard(props){
    const dispatch = useDispatch();
    const [meetingsArray, setMeetingsArray] = useState([]);
    const [editMeeting, setEditMeeting] = useState(null); 
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    const meetings = useSelector(state => state.myMeetings); 
    const formatRelativeLocale = {
        lastWeek: "'Last' eeee",
        yesterday: "'Yesterday'",
        today: "'Today'",
        tomorrow: "'Tomorrow'",
        other: 'dd.MM.yyyy',
      };
      const locale = {
        ...enGB,
        formatRelative: (token) => formatRelativeLocale[token],
      };
    useEffect(() => {
       dispatch(fetchMyMeetings()); 

    }, [])
    useEffect(() => {
        if(meetings.loading ===true){
            Notiflix.Block.Standard('.myMeetingsWrap', 'Loading...');
        }else {
            Notiflix.Block.Remove('.myMeetingsWrap');
        }
        if(meetings.meetings !== null && meetings.meetings.length){
            setMeetingsArray(meetings.meetings)
           
        }
        else if (meetings.error) {
            Notiflix.Notify.Failure(meetings.error.message);
        }
    }, [meetings])
    function create() {
        props.history.push(`/voost-rooms`);
    }
    const handleEdit= (e) => {
        e.preventDefault(); 
        const toEdit = meetingsArray.filter(meeting => meeting.id===e.target.getAttribute('data-meetingid')); 
        setEditMeeting(toEdit[0]); 
        console.log(toEdit[0].data())
        setIsOpenSettings(true);
    }
    const handleCopy = (e) => {
        e.stopPropagation();
        console.log(e.currentTarget.getAttribute('data-meeting-id'));
        if (!navigator.clipboard) {
            Notiflix.Notify.Failure("Your browser doenst support this function"); 
            return;
          }
          navigator.clipboard.writeText(e.currentTarget.getAttribute('data-meeting-id')).then(function() {
            Notiflix.Notify.Success("COPIED")
          }, function(err) {
            console.error('Could not copy text: ', err);
          });
    }
    return(
        <BorderContainer id="meeting-card" className="myMeetingsWrap">
            <CardDiv>
                <CardTop>
                    <H6>Meetings</H6>
                </CardTop>
                <Meeting>
                        <div>
                            <H6>Start a meeting</H6>
                        </div>
                        <div>
                            <Button type="primarySmall" text='Start' onClick={create} />
                        </div>
                    
                </Meeting>
                {
                    meetingsArray.map(meeting => {
                        

                        return <Meeting key={meeting.id}>
                                <div className="meet-center">
                                    {meeting.data().topic ? <H6>{meeting.data().topic}</H6> : '' }
                                    {meeting.data().applicant ? <p>with: {meeting.data().applicant.name}</p> : '' }
                                   {meeting.data().theJob ?  <p className="job-title"><NavLink to ={`/jobs/?jobId=${meeting.data().theJob.id}`}>{`Role: ${meeting.data().theJob.jobTitle}`} </NavLink></p> : ''}
                                    <MeetingIdWrap onClick={e => handleCopy(e)} data-meeting-id={meeting.data().meetingRoomId}>
                                        <P>Meeting ID: {meeting.data().meetingRoomId}</P>
                                        <FaCopy />
                                    </MeetingIdWrap>
                                    
                                    <div className="date">
                                        {/* BUG: this line throught and Error */}
                                        <p>{format(new Date(meeting.data().startDate), "dd-MM-yyyy")}</p>
                                        
                                    </div>
                                    <div className="time">
                                        
                                        <p>{meeting.data().startTime[0]}</p>
                                    </div>
                                </div>

                                <div className="meet-right">
                                    
                                    <NavLink to={`/voost-rooms?id=${meeting.data().meetingRoomId}`}>
                                    <Status>Enter call</Status>
                                    </NavLink>
                                    <Button type="primarySmall" text="Edit" data-meetingid={meeting.id} onClick={e => handleEdit(e)}/>
                                </div>
                            </Meeting>
                        
                    })
                }
                
            </CardDiv>
            <VoostRoomsSettings theJob={editMeeting?.data().theJob} applicant={editMeeting?.data().applicant ? editMeeting.data().applicant : null} editMeeting={editMeeting} open={isOpenSettings} onClose={() => setIsOpenSettings(false)} />
        </BorderContainer>
    )
}