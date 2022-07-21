import React from 'react';
import HeaderSmall from '../components/header/headerSmall';
import MeetingRoomVideo from '../components/meeting-room/meetingRoomVideo';
import MeetingRoomChat from '../components/meeting-room/meetingRoomChat';
import CustomMeetingRoomChat from '../components/meeting-room/customMeetingRoomChat';
import bg from '../assets/account-header.jpg';
export default function MeetingRoom(props){
    const {match} = props
   console.log(props.match)

    return(
        <>
            <HeaderSmall bg={bg} text="Meeting Room" />
            <MeetingRoomVideo match = {match} />
            {/* <MeetingRoomChat match = {match} /> */}
            <CustomMeetingRoomChat match = {match} />

        </>
    )
}