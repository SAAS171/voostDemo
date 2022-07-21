import React, {useState, useEffect, useCallback} from 'react';
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'; 
import {getEndpoint} from '../../endpoints'; 
//Styles
import {VideoWrap } from './styles/meetingRoomVideo';
import {BorderContainer} from '../../styles/components/shared-components';
import Room from './Rooms';
import Notiflix from 'notiflix'; 

import { updateRoomParticipants,setChatMeetingId, updateVoostRoomUser, createRoomChat } from "../../store/actions/actions";

export default function MeetingRoomVideo(props){
    const history = useHistory(); 
    const {match} = props; 
    const name = useSelector(state => state.meeting_name); 
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState(match && match.params && match.params.id ? match.params.id : '');
    const [token, setToken] = useState('')


    const dispatch = useDispatch();
    
    Notiflix.Block.Standard('.VideoWrap', 'Loading video stream...');

    useEffect(() => {
        setRoomName(match && match.params && match.params.id ? match.params.id : '');
    }, [match])

    useEffect(() => {
        if(roomName !== '' && username!==''){
            handleSubmit(); 
        }
    }, [roomName, username])
    
    useEffect(() => {
        setUsername(name);
    }, [name])
    
    useEffect(() => {
        // console.log(`token: ${token}`);
    }, [token])
    
    const handleSubmit = useCallback(async event => {
        
        
        const data = await fetch(`${getEndpoint()}/api/video/token`, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            identity: username,
            room: roomName
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());
        // console.log("DATA THAT WAS RETURNED BEFORE CRASH....", data) 
        setToken(data.token);  
        const elem_id = username.name.substring(0, username.name.indexOf("-")); 
        const elem_name = username.name.substring( username.name.indexOf("-")+ 1); 
        dispatch( updateVoostRoomUser( {id: elem_id, name: elem_name} ) ) 
        dispatch( createRoomChat(roomName ) ) 
        
 
      }, [username, roomName]);
    
      const handleLogout = useCallback(event => {
        setToken(null);
        history.push('/voost-rooms'); 
      }, []);
    
      
    return(
        <VideoWrap className='VideoWrap'>
            <BorderContainer> 
                {token ?  <Room handleLogout={handleLogout} roomName={roomName} token={token} /> : null}  
            </BorderContainer>
        </VideoWrap>
    )
}