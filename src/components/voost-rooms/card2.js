import React, {useState, useEffect} from 'react';
import Button from '../shared-components/button';
import MeetingRoomJoin from '../modals/meetingRoomJoin';
//Styles
import {VoostRoomsWrap, VoostRoomsContainer, ButtonContainer, Border, Group, Plus } from './styles/card';
import {BorderContainer, H3, P} from '../../styles/components/shared-components';

export default function Card2(){
    const [isOpenJoin, setIsOpenJoin] = useState(false);
    const [meetingId, setMeetingId] = useState(null); 
    useEffect(() => {
        getQueryVariable('id'); 
        if(getQueryVariable('id')){
            const id = getQueryVariable('id');
            console.log(id);
            setMeetingId(id);
            setIsOpenJoin(true);

        }
    }, [])
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        // console.log(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        // console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    // console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
        if(pair[0] === variable){return pair[1];}
        }
        return(false);
    }
    return(
        <>
            <VoostRoomsWrap>
                <Border>
                    <BorderContainer>
                        <VoostRoomsContainer>
                        <div className="container-left">
                                <H3>Join a call</H3>
                                <P>
                                    Join a call with Voost’s video and text chat. Here, you have the chance to join your scheduled interview or meet for business live from anywhere in the world.
                                </P>
                            </div>
                            <div className="container-right">
                                <Group/>
                                <Plus/>
                            </div>
                        </VoostRoomsContainer>
                        <ButtonContainer>
                            <Button type="primarySmall" text="Join Call" onClick={() => setIsOpenJoin(true)}/>
                        </ButtonContainer>
                    </BorderContainer>
                </Border>
            </VoostRoomsWrap>

            <MeetingRoomJoin meetingIdToJoin={meetingId} open={isOpenJoin} onClose={() => setIsOpenJoin(false)}/>
        </>
    )
}