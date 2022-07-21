import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonXL from '../shared-components/buttonXL';
import { EnterID } from '../shared-components/formInput';
//Styles
import * as global from '../../styles/components/globalVariables';
import { JoinWrap, JoinContainer } from './styles/meetingRoomJoin';
import { ButtonClose } from './styles/MeetingRoomSettings';
import { H4 } from '../../styles/components/shared-components';
import { MeetingUsername } from '../../styles/components/formInput';
import Notiflix from 'notiflix';
import { useHistory } from 'react-router-dom';
import { setMeetingName, updateVoostRoomUser, setChatMeetingId } from '../../store/actions/actions';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase';
import { getByDisplayValue } from '@testing-library/react';
export default function MeetingRoomJoin({ open, onClose, meetingIdToJoin }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProifle = useSelector(state => state.profile?.profile ? state.profile?.profile : null);

    const [name, setName] = useState('');
    const [meetingId, setMeetingId] = useState('');
    useEffect(() => {
        if (meetingIdToJoin) {
            setMeetingId(meetingIdToJoin);
        }

    }, [meetingIdToJoin]);

    useEffect(() => {

        if (userProifle?.name || userProifle?.company_name) {
            setName(userProifle.name ? userProifle.name : userProifle.company_name);
        }
    }, [userProifle]);

    // function iOS() {
    //     return [
    //         'iPad Simulator',
    //         'iPhone Simulator',
    //         'iPod Simulator',
    //         'iPad',
    //         'iPhone',
    //         'iPod'
    //     ].includes(navigator.platform)
    //         // iPad on iOS 13 detection
    //         || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    // }

    const handleMeeting = () => {
        if (!name) {
            //
            Notiflix.Report.Failure(
                'Incomplete form',
                `Please enter your name`,
                'Ok'
            );
        }
        else if (!meetingId) {
            Notiflix.Report.Failure(
                'Incomplete form',
                `Please enter a meeting id`,
                'Ok'
            );
        }
        // else if (iOS()){
        //     Notiflix.Report.Info(
        //         "It's worth the wait!",
        //         `Please use your desktop browser for now whilst we Voost up the iOS Meeting Room. Thanks!`,
        //         'Ok'
        //         );
        // }
        else {
            db.collection('meetings').where('meetingRoomId', '==', `${meetingId}`).get().then(querySnap => {

                const elem_id = Date.now();
                const elem_name = name;
                dispatch(updateVoostRoomUser({ id: elem_id, name: elem_name }));
                const unique_name = `${elem_id}-${elem_name}`;

                dispatch(setChatMeetingId(meetingId));

                console.log("name: ", unique_name);
                console.log(meetingId);

                console.log(querySnap);



                if (!querySnap.empty) {
                    dispatch(setMeetingName(unique_name));
                    history.push(`/meeting-room/${meetingId}`);

                } else {
                    Notiflix.Report.Failure(
                        'Something went wrong',
                        `We couldn't find a meeting with that Id. check you have the correct id and try again`,
                        'close'
                    );
                }
            }).catch(err => {
                Notiflix.Report.Failure(
                    'Something went wrong',
                    err.message,
                    'close'
                );
            });

        }
    };
    if (!open) return null;

    return (
        <>
            <JoinWrap>
                <JoinContainer>
                    <ButtonClose onClick={onClose} />
                    <H4 color={global.colorBlue}>Join a Call</H4>
                    <label>Name: </label>
                    <MeetingUsername value={name} placeholder='Your name' onChange={e => setName(e.target.value)} />
                    <EnterID value={meetingId} onChange={e => setMeetingId(e.target.value)} />
                    <ButtonXL text="JOIN" onClick={handleMeeting} />
                </JoinContainer>
            </JoinWrap>
        </>
    );
}