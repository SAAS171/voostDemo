import React, {useEffect, useState} from 'react';
import Button from '../shared-components/button';
import {useSelector, useDispatch} from 'react-redux'; 
import Notiflix from 'notiflix';
import {  NavLink} from "react-router-dom";
import {fetchMyMeetings} from '../../store/actions/actions'; 
import { format } from 'date-fns'
import enGB from 'date-fns/locale/en-GB';
import VoostRoomsSettings from '../modals/meetingRoomSettings';
//Styles
import {BorderContainer, H6, P} from '../../styles/components/shared-components';
import {Meeting} from './styles/accountMeetingsCard';
import {Status} from './styles/accountApplicationsCard';
import {CardDiv, CardTop} from './styles/accountSettingsCard';


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
        nextWeek: "'Next' eeee",
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
        const toEdit = meetingsArray.filter(meeting => meeting.id === e.target.getAttribute('data-meetingId')); 
        setEditMeeting(toEdit[0]); 
        console.log(toEdit[0].data())
        setIsOpenSettings(true);
    }
    return(
        <BorderContainer className="myMeetingsWrap">
            <CardDiv>
                <CardTop>
                    <H6>Meetings</H6>
                </CardTop>
                {meetingsArray.length < 1 && (
                    <Meeting>
                        <div>
                            <p>You have no scheduled calls</p>
                        </div>
                        <div>
                            <Button type="primarySmall" text='Voost rooms' onClick={create} />
                        </div>
                    </Meeting>
                )}
                
                {
                    meetingsArray.map(meeting => {
                        

                        return <Meeting key={meeting.id}>
                                <div className="meet-center">
                                    {meeting.data().topic ? <H6>{meeting.data().topic}</H6> : '' }
                                    {meeting.data().recruiter ? <p>with: {meeting.data().recruiter.company_name}</p> : '' }
                                   {meeting.data().theJob ?  <p className="job-title"><NavLink to ={`/jobs/?jobId=${meeting.data().theJob.id}`}>{`Role: ${meeting.data().theJob.jobTitle}`} </NavLink></p> : ''}
                                    <P>Meeting ID: {meeting.data().meetingRoomId}</P>
                                    <div className="date">
                                        <p>{format(new Date(meeting.data().startDate), "dd-MM-yyyy")}</p>
                                        
                                    </div>
                                    <div className="time">
                                        <p>{meeting.data().startTime[0]} - {meeting.data().startTime[1]}</p>
                                    </div>
                                </div>

                                <div className="meet-right">
                                    
                                    <NavLink to ={`/voost-rooms?id=${meeting.data().meetingRoomId}`}>
                                    <Status>Enter call</Status>
                                    </NavLink>
                                    
                                </div>
                            </Meeting>
                        
                    })
                }
                
            </CardDiv>
            <VoostRoomsSettings editMeeting={editMeeting} open={isOpenSettings} onClose={() => setIsOpenSettings(false)} />
        </BorderContainer>
    )
}