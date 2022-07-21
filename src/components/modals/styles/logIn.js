import styled from "styled-components";
import * as global from "../../../styles/components/globalVariables";
import BoldX from "../../../assets/svg/BoldX.svg";
import Profile from "../../../assets/svg/profile.svg";

export const ForgotButtonApply = styled.p`
    color: #dc3163;
    cursor: pointer;
    text-decoration: underline;
    margin: 0;
    font-weight: 600;
`;

export const LoginApplyFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 20px 0;
`;

export const RememberMe = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    flex-direction: row;
    cursor: pointer;
    div {
        width: 20px;
        height: 20px;
        border: 1px solid #000000;
        border-radius: 2px;
        background-color: white;
        transition: ease-in-out 200ms all;
        &.checked {
            background-color: blue;
            transition: ease-in-out 200ms all;
        }
    }
    p {
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #000000;
        font-weight: 400;
        margin: 0 10px;
        font-size: 20px;
        line-height: 1;
    }
`;

export const LoginWrap = styled.div`
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

    h4 {
        text-align: center;
        padding: 10px 40px 0px 40px;
        font-size: 22.5px;
    }
`;
export const Login_options = styled.div`
    margin: 0 auto;
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    P {
        padding: 20px 18px;
        margin: 0px !important;
        line-height: 15px;
        font-size: 15px;
        cursor: pointer;
        text-transform: uppercase;
        color: ${global.colorGrey};
    }

    .active {
        p {
            color: ${global.colorRed};
        }
    }
`;
export const SeekerOption = styled.div`
    width: 50%;
    border-right: 1px solid ${global.colorLightGrey};
`;
export const RecruiterOption = styled.div`
    width: 50%;
    border-left: 1px solid ${global.colorLightGrey};
`;
export const LoginContainer = styled.div`
    background-color: white;
    margin: 0 auto;
    padding: 20px 80px;
    width: 700px;
    overflow: auto;
    position: relative;

    @media (max-width: 850px) {
        width: 90%;
        padding: 10px 40px;
    }

    @media (max-width: 500px) {
        width: 100%;
        padding: 50px 20px;
    }
`;

export const LoginHeader = styled.div`
    text-align: left;

    h4 {
        text-align: center;
        padding: 10px 40px 30px 40px;
        font-size: 30px;
    }

    &:after {
        content: url(${Profile});
        position: absolute;
        top: 4%;
    }
`;

// TYPOGRAPHY

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
        content: "";
        border-top: 2px solid #f3f3f3;
        width: 45%;
    }
`;

export const FacebookDiv = styled.div`
    border-bottom: 2px solid #f3f3f3;
`;

export const OptionDiv = styled.div`
    padding: 0px 0px 15px 0px;
    display: flex;
    justify-content: space-around;
`;

export const Login_label = styled.label`
    padding-left: 5px;
`;

export const LoginInput = styled.input``;

export const LoginButton = styled.p`
    content: url(${BoldX});
    position: absolute;
    cursor: pointer;

    top: 5%;
    left: 90%;

    @media (max-width: 500px) {
        top: 5%;
        left: 90%;
    }
`;
