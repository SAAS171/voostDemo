import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
//SVG's
import edit from '../../../assets/upload.svg';

export const SettingsWrap = styled.section`
    height: 100%;
    width: 100%;
    margin: 30px auto 100px auto;

    a{
        color: ${global.colorBlue} !important;
        float: left;
        text-decoration: none;
        &:hover{
            color: ${global.colorGreen} !important;
        }
    }
`
export const SettingsPanel = styled.form`
    height: 100%;
    width: 100%;
    margin: 20px 0px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    transition: all .2s;

    .input-div{
        position: relative;
        width: 550px;
        margin: 0 auto;

        @media(max-width: 620px){
            width: 100%;
        }
    }

    .password{
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .password-show {
        display: flex;
        flex-direction: column;
        animation-name: example;
        animation-duration: 0.2s;
        margin: 0 auto;
      }

    .password-hidden{
        display: none;
    }

    @media(max-width: 700px){
        width: 100%;
    }
`

export const I = styled.i`
    content: url(${edit});
    position: absolute;
    top: 30%;
    right: 2.5%;
    cursor:pointer;
    z-index:99;
`
export const SaveBtn = styled.button`
    position: absolute;
    top: 50%;
    right: 2.5%;
    cursor:pointer;
    z-index:99;
    background: #DC3163;
    transition: all .2s;
    border-radius: 5px;
    color: #fff;
    letter-spacing: 2px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    text-transform: uppercase;
    box-shadow: none;
    border: 0;
    font-size: 10px;
    padding: 5px 15px;
    transform: translateY(-50%);
`