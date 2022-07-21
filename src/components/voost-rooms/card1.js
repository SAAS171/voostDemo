import React, {useState, useEffect} from 'react';
import Button from '../shared-components/button';
import VoostRoomsSettings from '../modals/meetingRoomSettings';
import {useHistory} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from 'react-redux'; 
import {MeetingUsername} from '../../styles/components/formInput'; 
import Notiflix from "notiflix";
import {db} from '../../firebase';
//Bootstrap 
import {setMeetingName, setChatMeetingId} from '../../store/actions/actions'
//styles
import {VoostRoomsWrap, VoostRoomsContainer, Icon, ButtonContainer, Border } from './styles/card';
import {BorderContainer, H3, P} from '../../styles/components/shared-components';
export default function Card1() {
    const history = useHistory(); 
    const dispatch = useDispatch(); 
    const username = useSelector(state => { return state.profile?.name ? state.profile.name : ""});     
    const recruiter = useSelector(state => state.isRecruiter); 
    const [name, setName] = useState('')
    const [meetingId, setMeetingId] = useState(uuidv4());  
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    useEffect(() => {
        if(username){
            setName(username); 
        }
    }, [username])

    useEffect(() => {
        if(meetingId != null){ 
            dispatch(setChatMeetingId(meetingId));
        }
    }, [meetingId])

    

   


    // function iOS() {
    //     console.log("navigator.platform", navigator.platform)
    //     console.log("navigator.userAgent", navigator.userAgent)
        
    //     return [
    //       'iPad Simulator',
    //       'iPhone Simulator',
    //       'iPod Simulator',
    //       'iPad',
    //       'iPhone',
    //       'iPod'
    //     ].includes(navigator.platform)
    //     // iPad on iOS 13 detection
    //     || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    //   }

    const handleMeetingStart = () => {
        if(name === '') {
            //
            Notiflix.Notify.Failure('Please enter your name');
        }
        // else if(iOS()){
        //     Notiflix.Report.Info(
        //         "It's worth the wait!",
        //         `Please use your desktop browser for now whilst we Voost up the iOS Meeting Room. Thanks!`,
        //         'Ok'
        //         );
        // }
        else if(meetingId === ''){
            setMeetingId(uuidv4())
            handleMeetingStart(); 
        }
        else {

            console.log("card1..........")
            const unique_name= `${Date.now()}-${name}`;
            
            
            //check if id exist already and add it if not so others can join. 
            //if it does exist then we'll need a new id cos this one's taken. this should be near impossible 
            db.collection('meetings').where('meetingRoomId', '==', `${meetingId}`).get().then( querySnap => {
                console.log("MEETING ID: ", meetingId)
                // console.log("QUERY SNAP: ", querySnap); 
                if(querySnap.empty){
                    gotoMeeting()
                }else {
                    setMeetingId(uuidv4());
                    handleMeetingStart(); 
                }

                function gotoMeeting(){ 
                   
                    console.log("go to meeting: ", unique_name )

                    db.collection('meetings').doc().set({meetingRoomId: meetingId}).then( () => {
                        dispatch(setMeetingName(unique_name))
                        history.push(`/meeting-room/${meetingId}`); 
                    }).catch(err => {
                        Notiflix.Report.Failure(
                        "Something went wrong",
                        `We couldn't create your meeting room, Reload the page and try again`,
                        'close'
                        );
                    })
                }
            }).catch(err => {
                Notiflix.Report.Failure(
                'Something went wrong',
                err.message,
                'close'
                );
            })
            dispatch(setMeetingName(unique_name));
            history.push(`/meeting-room/${meetingId}`); 
        }
    }
    
    return(
        <>
            <VoostRoomsWrap>
                <Border>
                    <BorderContainer>
                        <VoostRoomsContainer>
                           
                                {
                                    recruiter && (
                                    <div className="container-left">
                                        <H3>Schedule a call</H3>
                                        <P>
                                        Whether it’s for a business meeting or to interview your future employee, schedule a video call using Voost and you have the exclusive ability to meet face-to-face on live video.
                                        </P> 
                                    </div>               
                                    )
                                }
                                {
                                !recruiter &&   (
                                        <div className="container-left">
                                    <H3>Start a call</H3>
                                    <P>
                                     Whether it’s for a business meeting or to interview your future employee, start a video call using Voost and you have the exclusive ability to meet face-to-face on live video.
                                     </P>
                                        </div>
                                    )
                                }
                            <div className="container-right">
                                <Icon/>
                            </div>
                        </VoostRoomsContainer>
                        <ButtonContainer>
                            {recruiter && (
                                <>
                                <Button type="primarySmall" text="Schedule"  onClick={() => setIsOpenSettings(true)}/>
                                <p className="divider" style={{'display': 'block'}}> OR</p>
                                </>
                            )}
                            
                            <MeetingUsername value={name} placeholder='Your name' onChange = {e => setName(e.target.value)}/>
                            <Button type="primarySmall" text="Start a call" onClick={handleMeetingStart}/>

                        </ButtonContainer>
                    </BorderContainer>
                </Border>
            </VoostRoomsWrap>

            <VoostRoomsSettings open={isOpenSettings} onClose={() => setIsOpenSettings(false)} />
        </>
    )
}