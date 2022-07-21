import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
import BoldX from '../../../assets/svg/BoldX.svg';
import Profile from '../../../assets/svg/profile.svg';

export const RegisterWrap = styled.div`
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
`
export const RegisterContainer= styled.form`
    background-color: white;
    margin: 0 auto;
    padding: 20px 80px;
    width: 700px;
    overflow: auto;
    position: relative;
    @media(max-width: 850px){
        width: 90%;
        padding: 10px 40px;
    }

    @media(max-width: 500px){
        width: 100%;
        padding: 50px 20px;
    }

`

export const RegisterHeader = styled.div`
    padding: 15px 8px;
    text-align: center;
    position: relative;
    position: cursor;

    &.awaiting-verify{
        p{
            margin-top: 30px
        }
        &:after{
            content: "";
        }
    }

    &:after{
        content: url(${Profile});
        position: absolute;
        top: 30%;
        left: -5%;
    }
`

export const RegisterOptions = styled.div`
    margin: 0 auto;
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    P{
        padding: 20px 18px;
        margin: 0px !important;
        line-height: 15px;
        font-size: 15px;
        cursor: pointer;
        text-transform: uppercase;
        color: ${global.colorGrey};
    }

    .active{
        p{
            color: ${global.colorRed};
        }
    }
`
export const SeekerOption = styled.div`
    width: 50%;
    border-right: 1px solid ${global.colorLightGrey};
`
export const RecruiterOption = styled.div`
    width: 50%;
    border-left: 1px solid ${global.colorLightGrey};

`

//TYPOGRAPHY

export const H2 = styled.h2`
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 400;
    font-size: 15px;

    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    &:before,
    &:after {
        content: '';
        border-top: 2px solid #f3f3f3;
        width: 45%;
    }
`

export const P = styled.p`
    padding-bottom: 0px;
    font-weight: 600;
`

export const RegisterButton= styled.p`
    button-style: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    color: #eb274e;
    float: right;

    content: url(${BoldX});
    position: absolute;
    right: -5%;
    top: 30%;
  
    @media(max-width: 500px){
        top: -20px;
        right: 15px;
    }
`