import styled from "styled-components";
import * as global from "../../../styles/components/globalVariables";

export const ChatWrap = styled.section`
  padding-bottom: 40px;
  margin: 0;
  height: 100%;
`;

export const ChatPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-height: 500px;
  @media (max-width: 850px) {
    flex-direction: column;
    height: calc(100% + 2000px);
  }
`;

export const Participants = styled.div`
  padding: 0 25px;
  overflow: auto;

  @media (max-width: 850px) {
    display: flex;
    padding: 15px 0;

    h4 {
      font-size: 18px;
      left: 0;
      margin: 0;
      padding-left: 5px;
    }
  }
`;
export const Header = styled.div`
  h4 {
    margin: 0;
    position: sticky;
    top: 0;
    text-align: center;
    text-transform: uppercase;
    font-family: "Nunito";
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: #000000;
    margin-bottom: 15px;
  }
  @media (max-width: 850px) {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid;
    position: sticky;
    left: 0;
    background: #fff;
    h4 {
      font-size: 18px;
      left: 0;
      margin: 0;
      padding-right: 20px;
    }
  }
`;

export const ParticipantCard = styled.div`
  width: 100%;
  min-height: 25px;
  box-shadow: 0px 0px 24px 0px rgb(50 50 50 / 20%);
  padding: 10px;
  border: 1px solid #eed9d9e0;
  border-radius: 10px;
  margin-bottom: 15px;
  p {
    line-height: 1;
    font-weight: 700;
    text-transform: capitalize;
    margin: 0;
    font-family: "source sans pro";
    color: #3a4263;
    margin-bottom: 5px;
  }
  @media (max-width: 850px) {
    width: fit-content;
    margin: 5px 10px;
  }
`;

export const Chat = styled.div`
  padding: 30px;
  height: 500px;
  flex: 1;
  border-left: 2px solid ${global.colorLightGrey};
  display: block;
  overflow: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 850px) {
    border-top: 2px solid ${global.colorLightGrey};
    border-left: none;
  }
`;
export const MessageDiv = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: center;
  flex-wrap: wrap;
`;
export const Picture = styled.div`
    min-width: 70px;
    min-height: 70px;
    background-color: red;
    border-radius: 50%;

    p{
        font-size: 30px;
        color: white;   
        text-align: center;
        padding-top: 10px;
    }

    @media(max-width: 800px){
       background-color: transparent;
       min-width: auto;
       min:height: auto;
        

        p{
            font-size: 15px;
            color: ${global.colorBlue};
        }
    }
`;
export const Name = styled.div``;
export const MessageCard = styled.div`
  height: 100%;
  margin-left: 20px;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #eed9d9e0;
  -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
  -moz-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
  box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);

  .message-p {
    text-align: left;
    margin: 0;
    font-weight: 700;
  }
`;

export const MsgTime = styled.div`
  font-size: 10px;
  width: 100%;
  text-align: left;
`;

export const ChatInput = styled.input`
  resize: none;
  flex: 1;
  height: 65px;
  border-radius: 5px;
  box-shadow: 0px 0px 24px 0px rgb(50 50 50 / 20%);
  border: 1px solid lightslategrey;
  padding: 0 115px 0 10px;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 65px;
  margin-top: 10px;
`;
export const Send = styled.button`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 60px;
  border: none;
  background: none;
`;

export const MessagesWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;
