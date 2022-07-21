import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
import { getEndpoint } from "../../endpoints";
import { formatRelative } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import Notiflix from "notiflix";
import {useHistory} from 'react-router-dom'; 
import upload from "../../assets/svg/upload.svg";



import Button from '../shared-components/button';  
import styled from 'styled-components';    
import {auth, db, rdb, storage} from '../../firebase'; 
import { v4 as uuidv4 } from 'uuid'; 
 

//Styles
import {
  ChatWrap,
  ChatPanel,
  Chat,
  Participants,
  ParticipantCard,
  Picture,
  Name,
  MessageCard,
  ChatInputWrapper,
  MessageDiv,
  MsgTime,
  Send,
  ChatInput,
  MessagesWrapper,
  Header,
} from "./styles/meetingRoomChat";
import {
  H4, 
  BorderContainer,
} from "../../styles/components/shared-components";

import send from "../../assets/svg/send.svg";

const Ch = require("twilio-chat");




const OutterWrap = styled.div`

  .preview-file-modal{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: ease-in-out 200ms all;
        pointer-events: none;
        &.show-preview-modal{ 
            opacity: 1;
            transition: ease-in-out 200ms all;
            pointer-events: all;
        }

        .preview-file-upload-container{
            background-color: white;
            border-radius: 8px;
            width: 500px;
            height: auto;
            padding: 30px;
            iframe{
                width: 100%;
                height: 450px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                border-radius: 8px;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .btn-container{
            margin-top: 15px;
            button{
                margin: 0;
                &.cancel-button{
                    background-color: white;
                    border-radius: 4px;
                    border: 1px solid #DC3163;
                    color: #DC3163;
                    padding: 10px 25px;
                    margin-right: 10px;
                }

            } 
        }
  }
  .hidden {
      display: none;
  }
  #upload-btn{
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 20px;
    border: none;
    background: none;
  }
`
 
function MeetingRoomChat(props) {
  const history = useHistory(); 
  const { match } = props;
  const name = useSelector((state) => state.meeting_name);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState(
    match && match.params && match.params.id ? match.params.id : ""
  );
  // const [roomId, setRoomId] = useState(uuidv4());
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);
  const [text, setText] = useState("");
  const [members, setMembers] = useState([]);


  const [iframeLocation, setIframeLocation] = useState("");
  const [showIframeModal, setShowIframeModal] = useState(false);
   

  const uploadedFileRef= useRef(null); 
  const iframeRef= useRef(null); 



  const formatRelativeLocale = {
    lastWeek: "'Last' eeee",
    yesterday: "'Yesterday'",
    today: "'Today'",
    tomorrow: "'Tomorrow'",
    nextWeek: "'Next' eeee",
    other: "dd.MM.yyyy",
  };
  const locale = {
    ...enGB,
    formatRelative: (token) => formatRelativeLocale[token],
  };
  useEffect(() => {
    document.addEventListener("keydown", entFunction, false);

    return () => {
      document.removeEventListener("keydown", entFunction, false);
    };
  }, []);
  const entFunction = useCallback((event) => {
    if (event.keyCode === 13) {
      //Do whatever when esc is pressed
      sendMessage();
    }
  }, []);


  useEffect(() => {
    if (channel) {
      getmembers();
      async function getmembers() {
        const getmembers = await channel.getMembers();
        console.log(await getmembers);
        getmembers.forEach((member) => {
          console.log(member.identity);
        });
        setMembers(getmembers);
      }

      channel.on("memberLeft", function (member) {
        console.log(member.identity + "has left the channel.");
        Notiflix.Notify.Info(`${member.identity} has left the meeting.`);
        getmembers();
      });
      channel.on("memberJoined", function (member) {
        console.log(member.identity + "has joined the channel.");
        Notiflix.Notify.Info(`${member.identity} has joined the meeting`);
        getmembers();
      });
      channel.on('messageAdded', function(message) {
        console.log(message.author, message.body);
        console.log(messages)
        // const list = [...messages]
        // list.push(message)
        // setMessages(list);
        // console.log(messages)
        getRecentMessages()
      });

      async function getRecentMessages(){
        const messagesList = await channel.getMessages();
          // console.log("channelJoined");

          setMessages([...messagesList.items]);
          console.log(messagesList.items);
          // this.scrollToBottom();
      }
      // channel.on()
    }
    return () => {
      if (channel) {
        channel.removeAllListeners();

        channel.leave();
        channel.delete().then(function (channel) {
          console.log("Deleted channel: " + channel.sid);
        });

      }

    };
  }, [channel]);

  useEffect(() => {
    setRoomName(
      match && match.params && match.params.id ? match.params.id : ""
    );
  }, [match]);

  useEffect(() => {
    if (roomName!=="" && username!=="") {
      handleSubmit();
    }
  }, [roomName, username]);

  useEffect(() => {
    setUsername(name);
  }, [name]);

  const ScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() =>
      elementRef.current.scrollIntoView(
        {
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        },
        []
      )
    );
    return <div style={{ border: "1psx solid red" }} ref={elementRef} />;
  };

  useEffect(() => {
    start();
    async function start() {
      if (token!=="" && username !== "") {
        const client = await Ch.Client.create(token);

        client.on("tokenAboutToExpire", async () => {
          const token = await this.getToken(username);
          client.updateToken(token);
        });

        client.on("tokenExpired", async () => {
          const token = await this.getToken(username);
          client.updateToken(token);
        });

        client.on("channelJoined", async (channel) => {
          // getting list of all messages since this is an existing channel
          const messagesList = await channel.getMessages();
          console.log("channelJoined");

          setMessages([...messagesList.items]);
          console.log(messagesList.items);
          // this.scrollToBottom();
        });

        try {
          const channel = await client.getChannelByUniqueName(roomName);
          joinChannel(channel);
        } catch (err) {
          try {
            const channel = await client.createChannel({
              uniqueName: roomName,
              friendlyName: roomName,
            });

            joinChannel(channel);
          } catch(err) {
            console.log(err)
            Notiflix.Report.Failure(
              "Something went wrong",
              `Try starting the call again from the voost room`,
              'Try again', 
              function(){
                history.push('/voost-rooms');
              }
              );
          }
        }
      }
    }
  }, [token, name]);

  const joinChannel = async (channel) => {
    
    if (channel.channelState.status !== "joined") {
      try {
         await channel.join();
         console.log("joined chat");
      }catch(err) {
        console.log(err)
      }
     

    }
    setLoading(true);
    setChannel(channel);
    setLoading(false);
    // channel.on("messageAdded", (message) => {
    //   //    handleMessageAdded(message)
    //   console.log(message.author, message.body);
    //   const newMessage = [...messages, message];
    //   setMessages(newMessage);
    // });
  };

  const handleMessageAdded = (messageItem) => {
    setMessages([...messages, messageItem]);
    console.log("messages");
    console.log({messages});
  };

  const handleSubmit = useCallback(
    async (event) => {
      // event.preventDefault();
      console.log("endpoint: " + getEndpoint());
      const data = await fetch(`${getEndpoint()}/chat/token`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          identity: username.name,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    },
    [username, roomName]
  );

  const sendMessage = () => {
    if (text) {
      setLoading(true);
      channel.sendMessage(String(text).trim());
      setText("");
      setLoading(false);
    }
  };
  const handleEnter = (event) => {
    if (event.keyCode === 13 && text) {
      setLoading(true);
      channel.sendMessage(String(text).trim());
      setText("");
      setLoading(false);
    }
  };
 

  const sendAttachmentMessage = async () =>{ 

    if(iframeLocation.length < 1 || channel === null){
        setIframeLocation("")   
        setShowIframeModal(false)
        Notiflix.Notify.Failure(channel === null ? "Please rejoin room and try again" : 'Please choose a file to upload.');
        return;
    }


    setIframeLocation("")   
    setShowIframeModal(false)
    Notiflix.Loading.Circle('UPLOADING FILE');
    

    const file = uploadedFileRef.current.files[0]  // new File([videoBlob], “video.webm”  , {type:“video/webm”, lastModified: new Date().getTime()}); //URL.createObjectURL(new Blob( [videoSrc], {“type” : “video\/webm”}))
    let file_id= uuidv4();
    const filename= file.name;  
    const ext = filename.substring(filename.lastIndexOf('.') + 1)
    const dirPath = `room-message-uploads/${roomName}/`;
    const hashed_filename = file_id + ext 
    var pathToUploadedFileRef = storage.ref().child(dirPath+hashed_filename);

    const uploadedFileUrl = await pathToUploadedFileRef
        .put(file)
        .then( async (snapshot) => { 
            return await pathToUploadedFileRef.getDownloadURL()
        }).catch((e)=>{
          console.log("FILE UPLOAD ERROR: ", e)
          Notiflix.Loading.Remove(); 
          Notiflix.Notify.Failure( "An error has occurred whilst uploading your file, please try again. " );

        });


        if(typeof uploadedFileUrl !== "undefined"){
          
          const mymessage = `<a target="__blank" href='${uploadedFileUrl}'>File upload: attachment.${ext}</a>`;
          setLoading(true);
          channel.sendMessage(String(mymessage).trim());
          uploadedFileRef.current.value = '';
          Notiflix.Loading.Remove(); 

        }

}

const prepareUpload = (e) =>{
    e.preventDefault();  
    console.log("PREPARE UPLOADER ")  
    const file = e.target.files[0] 
    var tmppath = URL.createObjectURL(file);
    setIframeLocation(tmppath)   
    setShowIframeModal(true) 
}

const sendFile =(e) =>{
    e.preventDefault(); 
    console.log("SEND FILE ")
    sendAttachmentMessage();

}

const cancelSend =(e) =>{
  e.preventDefault(); 
  console.log("CANCEL SEND")

  setIframeLocation("")   
  setShowIframeModal(false)
}
  
const onLoad = (e) =>{ 
  var style = document.createElement('style');
  style.textContent = 'img { max-width:100%; } ';  
  style.textContent = 'body {text-align: center; } ';  
  let i = iframeRef.current; 
  if(!i) return;  
  i.contentDocument.head.appendChild(style);  
}

  return (
    <>
    <OutterWrap>
      <ChatWrap>
        <BorderContainer>
          <H4>LIVE CHAT </H4>
          <ChatPanel>
            <Participants>
              <Header>
                <h4>Participants</h4>
              </Header>
              {members.map((member, i) => {
                return (
                  <ParticipantCard key={i}>
                    <p>{member.identity}</p>
                  </ParticipantCard>
                );
              })}
            </Participants>

            <Chat>
              <MessagesWrapper>
                {messages.map((message) => {
                  const initials = message.author
                    .split(" ")
                    .map((n) => n[0])
                    .join(".");
                  const date = new Date(message.dateUpdated.toString());

                  return (
                    <MessageDiv key={message.sid}>
                      <Picture>
                        <p>{initials}</p>
                      </Picture>
                      <Name />

                      <MessageCard>
                        <p className="message-p" dangerouslySetInnerHTML={{__html: `${message.body}`}}></p>
                      </MessageCard>
                      <MsgTime>{formatRelative(date, new Date())}</MsgTime>
                    </MessageDiv>
                  );
                })}
                <ScrollToBottom />
              </MessagesWrapper>

              <ChatInputWrapper>
                <ChatInput
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleEnter}
                />
                <Send onClick={sendMessage}>
                  <img src={send} alt="send-button" />
                </Send>
                <label id="upload-btn" htmlFor="uploadFile">
                  <img src={upload} alt="attach-button" />
                </label> 
                <input ref={uploadedFileRef} type="file" name="uploadFile" id="uploadFile" className="hidden" onChange={ (e) => prepareUpload(e) } /> 

              </ChatInputWrapper>
            </Chat>
          </ChatPanel>
        </BorderContainer>
      </ChatWrap>

      <div className={`preview-file-modal ${showIframeModal ? "show-preview-modal" : ""}`}>
        <div className="preview-file-upload-container">
            <div className="iframe-container">
                <iframe id="myiframe" ref={iframeRef}   onLoad={onLoad}
                    title="File Preview"
                    // width="300"
                    // height="500"
                    src={iframeLocation}
                    />
            </div>
            <div className="btn-container">
                <button className="cancel-button" onClick={cancelSend}>Cancel</button> 
                <Button   
                    type="primarySmall"
                    text="Send File"
                    onClick={sendFile}
                />
            </div>
        </div>
      </div>
    </OutterWrap>
</>
  );
}
export default MeetingRoomChat;