import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import { RoomWrap, VideoChatContainer } from './styles/meetingRoomVideo';
import Notiflix from 'notiflix';
// import {getDomainUrl} from '../../endpoints'; 

import { useSelector, useDispatch } from 'react-redux';
import { updateRoomParticipants } from "../../store/actions/actions";

const Room = ({ roomName, token, handleLogout }) => {
const [room, setRoom] = useState(null);
const [participants, setParticipants] = useState([]);    
const participantList = useSelector(state => state.participantList.participantArray); 

const dispatch = useDispatch();





  useEffect(() => {
     
      let arrayToSave = [];
      if(participants.length){
        participants.forEach(p_element => {
          console.log("participant element: ", p_element.identity)
          const element = p_element.identity
          const elem_id = element.substring(0, element.indexOf("-")); 
          const elem_name = element.substring( element.indexOf("-")+1); 
          arrayToSave.push( {id: elem_id, name: elem_name}) 
        }); 
      }
      console.log("ROOMS - ARRAY TO SAVE: ", arrayToSave)
      dispatch(updateRoomParticipants(arrayToSave))  

  }, [participants])
 
 
 
 
  React.useEffect(() => {
    if (!room) {
      Notiflix.Block.Standard('.VideoWrap', 'Loading video stream...');
    } else {
      Notiflix.Block.Remove('.VideoWrap');
    }
  }, [room])
  
 
  React.useEffect(() => {

    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]); 
    };


    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

 
    Video.createLocalTracks({ audio: true, video: { facingMode: 'user' } }).then(tracks => {
      
      Video.connect(token, {
        name: roomName,
        tracks
      })
      .then(room => {
        setRoom(room); 

        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);

        const localVideoTrack = tracks.find(track => track.kind === 'video');

        room.localParticipant.publishTrack(localVideoTrack);
        room.participants.forEach(participantConnected);
 
      }).catch(err => {

        Notiflix.Block.Remove('.VideoWrap');
        console.log(err);
        
        Notiflix.Report.Failure(
          err.message,
          "You can still use the chat window",
          'close'
        );
      });

    });
 

    return () => {
      //Note that here we use the callback version of the setRoom function that we got from useState earlier. 
      //If you pass a function to setRoom then it will be called with the previous value, in this case the existing room which we'll call currentRoom, and it will set the state to whatever you return.
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);
 
  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} roomSize={ (participants.length + 1 ) > 2} participant={participant} participantType='remote' />
  ));
 
  return (
      <VideoChatContainer  >
        <RoomWrap className={`room  size-${(participants.length + 1 ) > 2}`}>
          {participants.length > 0 ? <>{remoteParticipants}</> : ''}
          { room ? <Participant 
            key={room.localParticipant.sid} 
            id="localVideo" 
            roomSize={  (participants.length + 1 ) > 2} 
            handleLogout={handleLogout} 
            roomName={roomName} 
            room={room} 
            participantType='local'  
            participant={room.localParticipant} 
            localParticipant={room.localParticipant} 
            /> : ""
          }
        </RoomWrap>
      </VideoChatContainer> 
  );
};

export default Room;