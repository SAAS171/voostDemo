import React, {useState} from 'react';
import Button from '../shared-components/button';
import {InputText} from '../../styles/components/formInput';
import companyLogo from '../../assets/teslaLogo.png';


import { NavLink
} from "react-router-dom";


//Styles
import {BorderContainer, H6} from '../../styles/components/shared-components';
import {Meeting} from './styles/accountMeetingsCard';
import {Status} from './styles/accountApplicationsCard';
import {CardDiv, CardTop} from './styles/accountSettingsCard';

export default function MeetingsCard(props){
    const [roomID, setRoomId] = useState('')
    const joinRoom = (e) => {
        props.history.push(`/meetingRoom?rid=${roomID}`);
    }
    const updateRoomId = (e) => {
        setRoomId(e.target.value)
    }
    return(
        <BorderContainer>
            <CardDiv>
                <CardTop>
                    <H6>Meetings</H6>
                </CardTop>
                <Meeting>
                        <div className="join-text">
                            <H6>Join a meeting</H6>
                            <InputText className="join-text-input" placeholder="Meeting room key..." value={roomID} onChange={e => updateRoomId(e)}/>
                        </div>
                        <div className="join-btn">
                            <Button type="primarySmall" text='Join' onClick={joinRoom} />
                        </div>
                </Meeting>
                <Meeting>
                        <div className="meet-left">
                            <img src={`${companyLogo}`}/>
                            <div>
                                <H6>Tesla</H6>
                                <p className="job-title">Product Designer</p>
                            </div>
                        </div>

                        <div className="meet-center">
                            <div className="date">
                                <p>14th November</p>
                            </div>
                            <div className="time">
                                <p>13:30</p>
                            </div>
                        </div>

                        <div className="meet-right">
                            <Status>Video call</Status>
                            <NavLink to="/meetingRoom">
                                <Button type="primarySmall" text="view"/>
                            </NavLink>
                        </div>
                    </Meeting>

                    <Meeting>
                        <div className="meet-left">
                            <img src={`${companyLogo}`}/>
                            <div>
                                <H6>Tesla</H6>
                                <p className="job-title">Product Designer</p>
                            </div>
                        </div>

                        <div className="meet-center">
                            <div className="date">
                                <p>14th November</p>
                            </div>
                            <div className="time">
                                <p>13:30</p>
                            </div>
                        </div>

                        <div className="meet-right">
                            <Status>Video call</Status>
                            <NavLink to="/meetingRoom">
                                <Button type="primarySmall" text="view"/>
                            </NavLink>
                        </div>
                    </Meeting>
            </CardDiv>
        </BorderContainer>
    )
}