import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
import BoldX from '../../../assets/svg/BoldX.svg';

export const  SettingsWrap = styled.section`
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);

    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;

    z-index: 1000;

    h4{
        text-align: center;
        padding: 10px 40px 0px 40px;
        color: ${global.colorBlue};
    }

    .date,
    .password,
    .video{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: ${global.colorBlueLight};
        margin-bottom: 0;

        p{
            font-size: 16px;
            margin-bottom: 0;
        }

        @media(max-width: 850px){
        }
    
        @media(max-width: 500px){
            width: 100%;
            padding: 50px 20px;
            flex-direction: column;
        }
    }

    .button{
        text-align: center;
        width: 100%;

        @media(max-width: 500px){
            margin: 20px;
        }
    }
`
export const DateWrap = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 430px;
    margin: 20px 0; 
    .datePicker{
        margin: 10px 0;
        .react-date-picker__wrapper{
            padding: 10px;
            border: 1px solid ${global.colorRed};
            
        }
        
    }
    .timePicker{
        margin: 10px 0; 
        .react-timerange-picker__wrapper{
            padding: 10px;
            border: 1px solid ${global.colorRed};
        }
    }
`
export const  SettingsContainer = styled.div`
    margin: 0 auto;
    padding: 20px 80px 0px 80px;
    width: 700px;
    overflow: auto;
    position: relative;
    background-color: white;
    text-align: left;

    @media(max-width: 850px){
        width: 90%;
        padding: 10px 30px;
    }

    @media(max-width: 500px){
        width: 100%;
        padding: 30px 20px 0 20px;
    }
    
    strong{
        text-transform: uppercase;
        font-size: 15px;
        color: black;
    }
`

export const ButtonClose = styled.div`
    content: url(${BoldX});
    position: absolute;
    left: 90%;
    top: 5%;
    cursor: pointer;
`
export const  Border = styled.div`
    border-bottom: 2px solid ${global.colorLightGrey};
    padding-top: 20px;
    padding-bottom: 20px;
`

