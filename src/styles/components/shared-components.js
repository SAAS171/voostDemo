import styled from "styled-components";
import * as global from "./globalVariables";

export const textInput = styled.input.attrs({
    type: "text",
})`
    height: 70px;
    width: 100%;
    color: #777777;
    font-size: 18px;
    font-weight: 400;
    padding: 9px 33px 9px 32px;
    border: none;
    border-radius: 0px;
    position: relative;
`;

// LAYOUT //

export const BorderContainer = styled.div`
    padding: 0rem 4rem;
    margin: 0 auto;
    max-width: 1400px;

    @media (max-width: 1000px) {
        padding: 0rem 15px;
    }
`;
export const LegalCopyWrap = styled.div`
    padding: 50px 15px;
    text-align: left;
`;
// BUTTON //

export const ButtonWrap = styled.div`
    z-index: 1;
    text-align: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const ButtonStyle = styled.button`
    margin: 10px 5px;
    padding: ${(props) =>
        `${
            props.type === "primarySmall" ||
            props.type === "ghostRed" ||
            props.type === "greenSmall"
                ? "10px 20px"
                : "22px 15px"
        }`};
    min-width: ${(props) =>
        `${
            props.type === "primarySmall" || props.type === "ghostRed"
                ? "8rem"
                : "17rem"
        }`};
    letter-spacing: 2px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;

    text-transform: uppercase;
    text-align: center;
    display: inline-block;
    color: ${(props) =>
        `${props.type === "ghostRed" ? `${global.colorRed}` : "#fff"}`};
    font-weight: 400;
    font-size: ${(props) =>
        `${props.type === "primarySmall" ? ".888em" : "1em"}`};
    background: ${(props) =>
        `${
            props.type === "primaryLarge" || props.type === "primarySmall"
                ? `${global.colorRed}`
                : props.type === "greenLarge" || props.type === "greenSmall"
                ? `${global.colorGreen}`
                : "transparent"
        }`};
    border: 2px solid
        ${(props) =>
            `${
                props.type === "primaryLarge" ||
                props.type === "ghostRed" ||
                props.type === "primarySmall"
                    ? `${global.colorRed}`
                    : "white"
            }`};
    border-radius: 5px;

    transition: all 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    &:active {
        transform: translateY(2.5px);
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }

    //iPad Pro Portrait
    @media (max-width: 1030px) and (max-height: 1370px) {
        color: ${(props) =>
            `${props.type === "secondary" ? `${global.colorBlue}` : ""}`};
        border: 2px solid
            ${(props) =>
                `${props.type === "secondary" ? `${global.colorBlue}` : ""}`};
    }

    //iPad Pro Landscape
    @media (max-width: 1370px) and (max-height: 1030px) {
        color: ${(props) =>
            `${props.type === "secondary" ? `${global.colorBlue}` : ""}`};
        border: 2px solid
            ${(props) =>
                `${props.type === "secondary" ? `${global.colorBlue}` : ""}`};
    }

    @media (max-width: 830px) {
        color: ${(props) =>
            `${props.type === "secondary" ? `${global.colorBlue}` : ""}`};
        border: 2px solid
            ${(props) =>
                `${props.type === "secondary" ? `${global.colorBlue}` : ""}`};

        &:hover {
            transform: translateY(0);
        }

        &:active {
            transform: translateY(0);
        }
    }

    @media (max-width: 450px) {
        margin: 0px;
        margin-bottom: 10px;
    }
`;

export const ButtonSimple = styled.button`
    margin: 10px 5px;
    padding: ${(props) =>
        `${props.type === "primarySmall" ? "10px 20px" : "22px 15px"}`};
    min-width: ${(props) =>
        `${props.type === "primarySmall" ? "8rem" : "17rem"}`};
    letter-spacing: 2px;
    font-family: "Nunito" !important;
    background: "transparent";
    border: none;

    &:focus {
        outline: none;
        box-shadow: none;
    }

    //iPad Pro Landscape
    @media (max-width: 1370px) and (max-height: 1030px) {
    }

    @media (max-width: 830px) {
    }

    @media (max-width: 450px) {
    }
`;
export const LabelPill = styled.span`
    padding: 8px 15px;

    background-color: #fff;
    text-align: center;
    text-transform: uppercase;
    border-radius: 40px;
    -webkit-box-shadow: 0px 10px 32px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 10px 32px -1px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 10px 32px -1px rgba(0, 0, 0, 0.75);
`;

// BUTTON SUBMIT //

export const Submit = styled.input.attrs((props) => ({
    type: "submit",
    name: "submit",
    value: props.payload.text,
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
    border-radius: 5px;


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
`;

// BUTTON XL //

export const ButtonStyleXL = styled.button`
    padding: 12px 15px;
    width: 540px;
    margin: 25px 0px;
    font-size: 1em;

    font-weight: 400;
    color: ${(props) =>
        `${props.color === "transparent" ? `${global.colorRed}` : "white"}`};
    display: inline-block;
    background: ${(props) =>
        `${
            props.color === `${props.color}`
                ? `${props.color}`
                : `${global.colorRed}`
        }`};
    border: 2px solid
        ${(props) =>
            `${
                props.color === `${global.colorBlue}`
                    ? `${props.color}`
                    : `${global.colorRed}`
            }`};
    border-radius: 5px;

    transition: all 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    &:active {
        transform: translateY(2.5px);
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }

    @media (max-width: 650px) {
        width: 100%;
    }

    @media (max-width: 830px) {
        &:hover {
            transform: translateY(0);
        }

        &:active {
            transform: translateY(0);
        }
    }
`;

// TYPOGRAPHY //

export const H2 = styled.h2`
    color: ${(props) => `${props.color}`};
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 400;
    font-family: Nunito;
    padding: 40px 0px 30px 0px;

    @media (max-width: 450px) {
        font-size: 25px;
    }
`;

export const H3 = styled.h3`
    font-size: 40px;
    font-weight: 400;
    font-family: Nunito;
    color: ${global.colorBlue};
    padding-top: 20px;
    padding-bottom: 20px;

    @media (max-width: 830px) {
        font-size: 40px;
    }

    @media (max-width: 450px) {
        font-size: 30px;
    }
`;

export const H4 = styled.h4`
    padding-top: 20px;
    font-weight: 400;
    font-size: 30px;
    font-family: "Nunito";
    color: ${(props) => props.color};
    margin: 0 auto;

    @media (max-width: 450px) {
        font-size: 25px;
    }
`;
export const H5 = styled.h5`
    font-size: 40px;
    font-weight: 400;
    font-family: Nunito;
    letter-spacing: 2px;
    color: white;
`;
export const H6 = styled.h6`
    font-weight: 700;
    display: block;
    margin: 0;

    font-size: 30px;
    font-family: "source sans pro";
    color: ${global.colorBlue};
`;
export const MeetingIdWrap = styled.div`
    display: flex;
    pointer: cursor;
`;
export const P = styled.p`
    padding-bottom: 20px;
    margin-right: 5px;
    @media (max-width: 450px) {
        font-size: 14px;
        padding-bottom: 10px;
    }
`;

export const I = styled.i`
    @media (max-width: 450px) {
        font-size: 10px;
    }
`;

export const SocI = styled.i`
    font-size: 35px;
    padding-right: 40px;
    color: ${(props) =>
        `${props.color === "green" ? `${global.colorGreen}` : "white"}`};

    @media (max-width: 1100px) {
        padding-right: 0px;
        padding: 30px;
    }

    @media (max-width: 1100px) {
        padding-right: 0px;
        padding: 30px;
    }

    @media (max-width: 450px) {
        padding: 0px 10px;
    } ;
`;
