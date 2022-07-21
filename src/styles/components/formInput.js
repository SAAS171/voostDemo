import styled from 'styled-components';
import * as global from './globalVariables';
import WhiteTick from '../../assets/svg/white-tick.svg';
export const InputText = styled.input`
    padding: 18px 0px;
    margin: 15px 0;
    width: 540px;
    border: 1px solid ${global.colorRed};
    border-radius: 5px;

    text-indent: 10px;
    transition: all .2s;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    &::placeholder {
        color: ${global.colorGrey};
    }

    @media (max-width: 1350px) {
        display: inline-block;
    }

    @media (max-width: 650px){
        width: 100%;
    }

    @media (max-width: 600px){
        width: 100%;
    }

    @media(max-width: 450px){
        padding: 12px 0px; 
        width: 100%;
    }

`

export const InputMessage = styled.textarea`
    padding: 10px 0px;
    margin: 15px 0;
    width: 540px;
    height: 250px;
    border: 1px solid  ${global.colorRed};
    border-radius: 5px;

    text-indent: 10px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    &::placeholder {
        color: ${global.colorGrey};
    }

    &:focus{
        -webkit-box-shadow: 8px 8px 12px 0px rgba(50, 50, 50, 0.15);
        -moz-box-shadow: 8px 8px 12px 0px rgba(50, 50, 50, 0.15);
        box-shadow: 8px 8px 12px 0px rgba(50, 50, 50, 0.15);
    }

    @media (max-width: 1350px) {
        display: inline-block;
    }


    @media (max-width: 650px){
        width:100%;
    }
    
    @media(max-width: 450px){
        padding: 12px 0px; 
    }
`

export const InputMessageInt = styled.textarea`
    resize: none;
    height: 150px;
    width: 80%;
    border: none;
    border-radius: 5px;

    text-indent: 10px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    &::placeholder {
        color: ${global.colorGrey};
        font-weight: 600;
        font-size: 18px;
        padding: 5px;
    }

    &:focus{
        outline: none;
    }

    @media (max-width: 1350px) {
        display: inline-block;
    }

    @media(max-width: 850px){
        height: 120px;
        padding-bottom: 0;
    }


    @media (max-width: 650px){
        width:100%;
    }
    
    @media(max-width: 450px){
        padding: 12px 0px; 
    }
`

export const Input = styled.input`
    outline: none;
    border: none;
    border-radius: 4px;
    width: 125px !important;
    margin: 15px 0;
    padding: 14px 4px;

    color: ${global.colorBlueLight};
    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media(max-width: 500px){
        width: 200px !important;
    }
`
export const Label = styled.label`
    margin-bottom: 15px ;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 14px;
`



export const MeetingId = styled.div`
    display: flex;
    justify-content: space-between;

    .meetingId-container{
        color: ${global.colorBlue}; 
        position: relative;
        margin: 0;
        width: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        font-size: 14px;


        .checked{
            width: 20px;
            height: 20px;
            background-color: ${global.colorLightGrey};
            border-radius: 50%;
            z-index: 1000;
            position: absolute;
            left: -7%;
            cursor: pointer;
        }
        input{
            padding: 18px 0px;
            margin: 15px 0;
            width: 100%;
            border: none;
            border-radius: 5px;

            text-indent: 10px;
            -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
            -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
            box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

            @media(max-width: 700px){
                width: 100%;
            }
        }

        label{
            text-indent: 25px;
            cursor: pointer;
            width: auto;
            margin-bottom: 0px;
            margin-right: 10px;
        }

        input:checked + .checked{
                opacity: 1;
                background-color: white;
                border: 5px solid ${global.colorRed} !important;

        }
    }

    @media(max-width: 700px){
        flex-direction: column;
        .radio-container{
            padding: 25px 0;
            width: 100%;

            .checked{
                left: 0%;
            }

            input{
                left: 5%;
            }

            label {
                padding-left: 20px; 
            }
        }
    }
`

export const MeetingRadioVideo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 140px;
    font-size: 14px;

    .radio-container{
        color: ${global.colorBlue}; 
        position: relative;
        width: 90px;
        .checked{
            width: 20px;
            height: 20px;
            background-color: ${global.colorLightGrey};
            border-radius: 50%;
            z-index: 1000;
            position: absolute;
            left: -30%;
            flex-grow: 1;
        }
        input{
            opacity: 0;
            position: absolute;
            width: 20px;
            height: 20px;
            left: -15%;
            z-index: 1100;
            cursor: pointer;
        }

        label{
            cursor: pointer;
            width: auto;
            text-indent: 20px;
        }

        input:checked + .checked{
                opacity: 1;
                width: 20px;
                height: 20px;
                background-color: white;
                border: 5px solid ${global.colorRed} !important;
                border-radius: 50%;
                z-index: 1000;
                position: absolute;
                left: -30%;
        }
    }

    @media(max-width: 700px){
        .radio-container{
            padding: 25px 0;
            width: 100%;
            text-align: center;

            .checked{
                left: -20%;
            }
            input{
                left: -10%;
            }
    
            input:checked + .checked{
                left: -20%;
            }
        }
    }
`

export const MeetingCheck = styled.form`
    display: flex;
    justify-content: space-between;
    color: ${global.colorBlue};
    cursor: pointer;

    input{ cursor: pointer; opacity: 1; z-index: 200; cursor: pointer;}

    label{
        position: relative;
        padding-left: 20px;
        cursor: pointer;

            .checked{
                opacity: 1;
                width: 20px;
                height: 20px;
                background-color: ${global.colorLightGrey};
                border-radius: 2px;
                z-index: 1000;
                position: absolute;
                left: -17%;
                cursor: pointer;

            }
    }

    input:checked + label{
        position: relative;
        padding-left: 20px;
        .checked{
            content: url(${WhiteTick});
            position: absolute;
            opacity: 1;
            width: 20px;
            height: 20px;
            background-color: ${global.colorRed};
            border-radius: 2px;
            z-index: 1000;
            position: absolute;
            left: -17%;
        }
    }

    @media(max-width: 700px){
        width: 100%;
    }
`
export const MeetingPassword = styled.input`
    padding: 18px 0px;
    margin: 15px 0;
    width: 250px;
    border: none;
    border-radius: 5px;

    text-indent: 10px;
    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media(max-width: 700px){
        width: 100%;
    }
`
export const MeetingUsername = styled.input`
    padding: 18px 0px;
    margin: 15px 0;
    max-width: 450px;
    width: 100%;
    border: 1px solid ${global.colorRed};
    border-radius: 5px;


    text-indent: 10px;
    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media(max-width: 700px){
        width: 100%;
    }
`
export const MultiSelectWrap = styled.div`
position: relative;
    display: block;
    width: 100%;
    max-width:700px;
    margin: 20px auto;
    text-align: left;

    .multiselect-container{
        margin-bottom: 20px;

        .search-wrapper{
           border: 1px solid ${global.colorRed};
           height: 50px;
        }
    }
    
      .multi-select {
        --rmsc-main: #4285f4;
        --rmsc-hover: ${global.colorRed};
        --rmsc-selected: #e2e6ea;
        --rmsc-border: ${global.colorRed};
        --rmsc-gray: #aaa;
        --rmsc-bg: #fff;
        --rmsc-p: 10px; /* Spacing */
        --rmsc-radius: 4px; /* Radius */
        --rmsc-h: 70px; /* Height */
        width: 100%;
        background: #fff0;
        border-radius: .25em;
        color: #3A4263;
        margin-top: 15px;
        box-shadow: 0px 0px 24px 0px rgba(50,50,50,0.2);}
        

        &:hover:after {
            color: #f39c12;
        }
      }
`
export const SelectWrap = styled.div`
    & {
    position: relative;
    display: flex;
    width: 100%;
    padding: 20px 10px;
    background: #fff0;
    border-radius: .25em;
    color: #3A4263;
    margin-top: 15px;
    box-shadow: 0px 0px 24px 0px rgba(50,50,50,0.2);}
    &:after {
        content: '\\25BC';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        padding: 0 1em;
        background: #fff0;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;
      }

    &:hover:after {
        color: #f39c12;
      }
      .multi-select {
        --rmsc-main: #4285f4;
        --rmsc-hover: #f1f3f5;
        --rmsc-selected: #e2e6ea;
        --rmsc-border: ${global.colorRed};
        --rmsc-gray: #aaa;
        --rmsc-bg: #fff;
        --rmsc-p: 10px; /* Spacing */
        --rmsc-radius: 4px; /* Radius */
        --rmsc-h: 70px; /* Height */
        width: 100%; 

      }
`
export const Select = styled.select`
-webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #fff;
  background-image: none;
  color: #3A4263;
flex: 1;
cursor: pointer;

`
