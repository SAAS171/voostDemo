import React, { useState, useEffect, useRef, useCallback } from "react";
import { DisableAction, RemoteVideoContainer, Video, RemoteVideo, VideoContainer, VideoOptions, Mute, Stop, ParticipantsIdentity, Participants } from './styles/meetingRoomVideo';
import { FaShareSquare, FaFileUpload } from 'react-icons/fa';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md'
import Button from '../shared-components/button';
import Notiflix from 'notiflix';
import { getDomainUrl } from '../../endpoints';

import { LocalVideoTrack } from 'twilio-video';

const Participant = ({  roomName, room, roomSize, participant, handleLogout, participantType, localParticipant }) => {


  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [shareScreen, setShareScreen] = useState(false)
  const [screenTrack, setScreenTrack] = useState([])


  const [mute, setMute] = useState(false);
  const [stopVideo, setStopVideo] = useState(false);
  const [roomId, setroomId] = useState(roomName)
  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => { setroomId(roomName); }, [roomName])

  const trackpubsToTracks = (trackMap) => Array.from(trackMap.values()).map((publication) => publication.track).filter((track) => track !== null);


  useEffect(() => {
    
    setVideoTracks(trackpubsToTracks(participant.videoTracks)); 
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };





    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };

  }, [participant]);
 
  useEffect(() => { 
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);

      return () => {
        videoTrack.detach();
      };
    }

  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  useEffect(() => {

    var ua = navigator.userAgent.toLowerCase();  
    console.log("CHECK USER AGENT....." )
    
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) {  // check is chrome - apple require different implementation
        console.log("NOT SAFARI BROWSER...." )

        if (shareScreen) { getscreen(); }
        else if (Object.keys(screenTrack).length) { getVideoStream(); }

      
      }else{
        
        if(!shareScreen && Object.keys(screenTrack).length){
          console.log("USER AGENT SAFARI STOP SCREEN SHARE....." )
          getVideoStream();
        }

      }
    } 

    async function getVideoStream (){

      console.log("STOP SCREENSHARE....RECAPTURE CAMERA....")
      participant.unpublishTrack(screenTrack);
      screenTrack.stop();
      setScreenTrack({});

      const videoStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user' } })
      const camVideoTrack = await  videoStream.getVideoTracks()[0] 
      room.localParticipant.publishTrack(camVideoTrack); 
      const screenTrack2 = await  new  LocalVideoTrack(camVideoTrack); 

      screenTrack2.attach(videoRef.current);
    }

  }, [shareScreen])

 
  async function getscreen() {

    console.log("GET SCREENSHARE...") 

    let capturestream = null
    var mediaoption = {  video: true,  audio: false  }

    room.localParticipant.tracks.forEach(trackPublished => { 
      if(trackPublished.kind === 'video') room.localParticipant.unpublishTrack(trackPublished.track) 
    }); 

    try {

        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });  
        const screenShareVideoTrack = await screenStream.getVideoTracks()[0]
        room.localParticipant.publishTrack(screenShareVideoTrack); 
          participant.publishTrack(screenShareVideoTrack); 
          const screenTrack2 = await new LocalVideoTrack(screenShareVideoTrack); 
          screenTrack2.attach(videoRef.current); 
          setScreenTrack(screenTrack2);    
  
  
    }catch(e){
      console.log("ERROR: ", e)
    }
    
  }
 
  // Toggle screen sharing to on/off
  const handleScreenSharing = () => {
    var ua = navigator.userAgent.toLowerCase(); 
    console.log("start screensharing")
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) {
        console.log("start screensharing - FOR CHROME...")

        setShareScreen(!shareScreen);

      }else   { 
        if(!shareScreen) getscreen()
        setShareScreen(!shareScreen);
      }
    }
  }
 
  const handleMute = () => {
    toggleAudioEnabled();
  }

  const toggleAudioEnabled = useCallback(() => {
    if (!mute) {
      localParticipant.audioTracks.forEach(function (audioTrack) {
        audioTrack.track.disable();
      });
      setMute(!mute);
    } else {
      localParticipant.audioTracks.forEach(function (audioTrack) {
        audioTrack.track.enable();
      });
      setMute(!mute);
    }

  }, [mute]);

  const handleVideoStop = () => {
    toggleVideoEnabled()
  }

  // Toggle video on/off
  const toggleVideoEnabled = useCallback(() => {
    if (!stopVideo) {
      localParticipant.videoTracks.forEach(function (videoTracks) {
        videoTracks.track.disable();
      });

      setStopVideo(!stopVideo);
    } else {
      localParticipant.videoTracks.forEach(function (videoTracks) {
        videoTracks.track.enable();
        setStopVideo(!stopVideo);
      });
    }

  }, [stopVideo]);

  // function copy to the clipboard the current roomId
  const handleShare = (e) => {
    if (roomId) {
      e.stopPropagation();
      if (!navigator.clipboard) {
        Notiflix.Notify.Failure("Your browser doenst support this function");
        return;
      }
      navigator.clipboard.writeText(`${getDomainUrl()}/voost-rooms?id=${roomId}`).then(function () {
        Notiflix.Report.Success(
          "Success",
          "The share link for this room has been copied to your clipboard",
          "close"
        )
      }, function (err) {
        console.error('Could not copy text: ', err);
        Notiflix.Report.Failure(
          "Couldn't copy to clipboard",
          `Share url: ${getDomainUrl()}/voost-rooms?id=${roomId}`,
          "close"
        )
      });
    }
  }

  return (
    <RemoteVideoContainer className={`p-size-${roomSize}`}>
      {participantType === 'remote' ? (
        <VideoContainer>
          {/* {console.log('video ref:', videoRef)} */}
          {participantType === 'local' ? <Video ref={videoRef} autoPlay={true} /> : <RemoteVideo ref={videoRef} autoPlay={true} />}
          <audio ref={audioRef} autoPlay={true} muted={false} />
          <ParticipantsIdentity>
            {participant.identity.substring( participant.identity.indexOf("-")+ 1) }
          </ParticipantsIdentity>
        </VideoContainer>
      ):""}

      {participantType === 'local' ? (
        <VideoContainer>
          {participantType === 'local' ? <Video ref={videoRef} autoPlay={true} /> : <RemoteVideo ref={videoRef} autoPlay={true} />}
          <audio ref={audioRef} autoPlay={true} muted={true} />
          {participantType !== 'local' ? <ParticipantsIdentity> {participant.identity.substring( participant.identity.indexOf("-")+ 1) } </ParticipantsIdentity> : ""}
        </VideoContainer>
      ): ""}
      {participantType === 'local' ?  (
        <VideoOptions>
          <div className="options-container">

            <div className="option" onClick={handleMute}>
              <Mute style={{ width: '28px', height: '28px', color: '#A5A5A5' }} />
              <p>{mute ? "Unmute" : "Mute"}</p>
              {mute ? <DisableAction></DisableAction> : null}
            </div>


            <div className="option" onClick={handleVideoStop}>
              <Stop style={{ width: '28px', height: '28px', color: '#A5A5A5' }} />
              <p>{stopVideo ? "Show Video" : "Stop Video"}</p>
              {stopVideo ? <DisableAction></DisableAction> : null}
            </div>


            {roomId ?  (
              <div className="option" onClick={handleShare} >
                <FaShareSquare style={{ width: '28px', height: '28px', color: '#A5A5A5' }} />
                <p>Share</p>
              </div>
            ): ""}


            {roomId ? (
              <div className="option" onClick={handleScreenSharing}>
                <MdScreenShare style={{ width: '28px', height: '28px', color: '#A5A5A5' }} />
                <p>{!shareScreen ? 'Screen Share' : 'Stop Screen Share'}</p>
                {shareScreen ? <DisableAction></DisableAction> : null}
              </div>
            ):""}

          </div>


          <div className="call-buttons">
            <Button type="primarySmall" text="End call" onClick={handleLogout} />
          </div>
        </VideoOptions>
      ) : ""}
    </RemoteVideoContainer>
  );
};

export default Participant;