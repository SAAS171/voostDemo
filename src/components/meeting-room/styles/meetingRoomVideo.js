import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

import mute from '../../../assets/svg/mute.svg';
import stop from '../../../assets/svg/camera.svg';
import participants from '../../../assets/svg/participants.svg';

export const VideoWrap = styled.section`
    height: auto;
    width: 100%;
    margin: 30px auto 40px auto;
    padding-bottom: 50px;
    border-bottom: 2px solid ${global.colorLightGrey}; 
    z-index: 9;
    a{
        color: ${global.colorBlue} !important;
        float: left;
        text-decoration: none;
        &:hover{
            color: ${global.colorGreen} !important;
        }

        @media(max-width: 1000px){
            padding-bottom: 15px;
        }
    }
`

export const VideoContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    background-color: black;
    overflow: hidden;
    position:relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div{
        height: 100%;
        video{
            max-height: 450px;
            height: 100%;
            object-fit: cover;
        }
    }
    @media(max-width: 1000px){
        width: 100%;
        padding-top: 15px;
    }
    @media(max-width: 768px){
        padding-top: 0px;
    }


    @media(max-width: 500px){
        background-color: ${global.colorDarkGrey};
        height: auto;
    }
`
export const RemoteVideoContainer = styled.div`
    max-width: 800px;
    position: relative;
    > div{
        /* height: 100%; */
        video{
            /* max-height: 450px; */
            height: 100%;
            object-fit: cover;
        }
    }
    &.size-true{
        .options-container{
            p{
                display: none;
            }
            button{
                padding: 5px;
                letter-spacing: 0;
                min-width: 0;
            }
        }
    }
    @media(max-width: 1000px){
        width: 100%;
        padding-top: 15px;
    }
    @media(max-width: 768px){
        padding-top: 0px;
    }

    @media(max-width: 500px){
        background-color: ${global.colorDarkGrey};
        
    }
    @media(max-width: 900px){ 
        .options-container{
            p{
                display: none;
            }
            button{
                padding: 5px;
                letter-spacing: 0;
                min-width: 0;
            }
        }
    }
`
export const Video = styled.video`
    width:100%; 
    margin: 0 auto;
    display: flex;
    flex-grow: grow;

    @media(max-width: 1000px){
        max-width: 100%;
    }

    @media(max-width: 500px){
      max-width: 100%; 
    }
`
export const RemoteVideo = styled.video`
    position: relative;
    width: 100%;
    @media(max-width: 1000px){
        max-width: 100%;
    }

    @media(max-width: 500px){
      max-width: 100%; 
    }
`
export const RemoteParticipants = styled.div`
    

`
export const VideoOptions = styled.div`
    height: auto;
    padding: 5px;
    /* border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px; */
    background-color: ${global.colorDarkGrey};

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    align-items: center;
    bottom: 0;
    width: 100%;
    
    .options-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .option{
            margin: 0px 20px;
            margin-top: 10px;
            width: auto;
            display: block;
            position: relative;
            cursor: pointer;
            p{
                color: white;
                font-size: 14px;
            }

            @media(max-width: 350px){
                margin: 0px;
            }
        }

        @media(max-width: 800px){
            width: 100%;
            bottom: -150px;
        }


    }

    .call-buttons{
        height: 100%;
    }

    @media(max-width: 768px){
        /* display: block;
        bottom: -160px;
        width: 100%;  */


        border-radius: 10px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
        z-index: 9999; 
        width: calc(100vw - 30px);
        max-width: 400px;
        position: fixed;
        top: auto;
        bottom: 10px;
        display: flex;
        align-items: center;
        flex-direction: row;
        .options-container{
            justify-content: flex-start;
            .option {
                margin: 0px 10px;
                margin-top: 10px;
                padding: 0 10px;
                width: auto;
                display: block;
                position: relative;
                cursor: pointer;
            }
        }
        .call-buttons{
            button{
                margin: 0;
            }
        }
    }

`
export const Mute = styled.i`
    content: url(${mute});
    height: 25px;
    padding: 0;

    @media(max-width: 500px){
        height: 20px
    }

`

export const Stop = styled.i`
    content: url(${stop});
    height: 25px;
    margin: 0;
    padding: 0;

    @media(max-width: 500px){
        height: 20px
    }
`

export const Participants = styled.i`
    content: url(${participants});
    height: 25px;
    margin: 0;
    padding: 0;

    @media(max-width: 500px){
        height: 20px
    }
`
export const ParticipantsIdentity = styled.span`
position: absolute; 
font-size: 10px; 
right: 10%;
bottom: 10px;
z-index: 99;
background-color: rgba(255,255,255,0.6);
padding: 10px;

`
export const RoomWrap = styled.div`
    width: 100%;
    display: grid;
    flex-wrap: wrap; 
    gird-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(33%,1fr)); 
    position: relative; 
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    &.size-true{ 
        @media screen and (max-width: 1200px) { 
            grid-template-columns: repeat(auto-fit,minmax(50%,1fr));
        }
        @media screen and (max-width: 900px) { 
            grid-template-columns: repeat(auto-fit,minmax(100%,1fr));
        }   
    }
    .call-buttons{
        button{
            padding: 5px!important;
            min-width: 0!important;
            letter-spacing: 0!important;
            border: 1px solid white!important;
        }
    }

`
export const Participant_wrap = styled.div`
flex: 1 0 33%;
`
export const DisableAction = styled.div`
    position: absolute; 
    width: 2px; 
    height: 60%; 
    left: 50%; 
    top: -5px;
    transform: rotate(45deg);
    background-color: ${global.colorRed}; 
`

export const VideoChatContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 25px;  
    @media screen and (max-width: 768px) {  
        padding-top: 0;  
    }
`

export const Share = styled.input.attrs(props => ({
    type: 'submit',
    name: 'share', 
    value: props.text
    }))`

    padding: 22px 15px;
    width: 14.5rem;
    margin: 10px 10px 10px 10px;

    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 3px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;


    background: ${global.colorRed};
    border: 1px solid ${global.colorRed};
    color: #fff;
    display: inline-block;
    border-radius-left: 5px;
    border-radius-right: 5px;


    transition: all .2s;

    &:hover{
        transform: translateY(-5px);
    }

    &:active{
        transform: translateY(2.5px);
    }
    
    &:focus {
        outline: none;
        box-shadow: none;
    }

    @media(max-width: 450px){
        width: 100%;
        padding: 17.5px 13px
        font-size: 10px;
        margin: 0px;
        margin-bottom: 10px;
    }

    @media(max-width:830px){
        &:hover{
            transform: translateY(0);
        }
    
        &:active{
            transform: translateY(0);
        }
    }
`