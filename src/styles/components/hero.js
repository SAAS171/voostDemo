import styled from "styled-components";
import * as global from "./globalVariables";

//SVG's
import greenLightning from "../../assets/svg/green-lightning.svg";
import heroSearch from "../../assets/svg/herosearch.svg";

export const FullButton = styled.button`
    width: 100%;
    margin-top: 20px;
    background: #dc3163;
    color: white;
    border-radius: 4px;
    padding: 10px;
    border: none;
`;
export const HeroSearchTitle = styled.h1`
    font-size: 70px;
    font-weight: 700;
    color: #4c567c;
    text-align: center;
    margin-bottom: 45px;
    @media only screen and (max-width: 992px) {
        font-size: 30px;
        margin-bottom: 20px;
    }
`;

export const MobileLabel = styled.div`
    display: none;
    width: 100%;
    margin-bottom: 5px;
    color: #4c567c;
    margin-top: 20px;
    @media only screen and (max-width: 992px) {
        display: block;
    }
`;

export const IconButton = styled.button`
    cursor: pointer;
    border: none;
    display: inline-block;
    background-color: #6fc7ba;
    color: white;
    border-radius: 5px;
    padding: 10px;
    font-size: 17px;
    margin: 20px;
    padding-left: 50px;
    padding-right: 20px;
    background-position: 15% 50%;
    background-repeat: no-repeat;
    background-size: 20px;
    font-weight: 600;
    @media only screen and (max-width: 992px) {
        font-size: 16px;
        width: 100%;
        margin: 10px 0px;
    }
`;

export const QuickButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    @media only screen and (max-width: 992px) {
        flex-direction: column;
        text-align: left;
        padding: 0 15px;
        margin-bottom: 20px;
    }
`;

export const PopularSearches = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    @media only screen and (max-width: 992px) {
        justify-content: center;
    }
    flex-wrap: wrap;
    span {
        color: #4c567c;
        font-size: 22px;

        @media only screen and (max-width: 992px) {
            width: 100%;
            text-align: center;
            flex-shrink: 0;
        }
    }
`;

export const EmptyButton = styled.button`
    background-image: url(${heroSearch});

    font-size: 20px;
    padding: 17px;
    border-radius: 5px;
    box-shadow: 0px 0px 14.4px rgba(0, 0, 0, 0.15);
    color: #a4a2a2;
    padding-right: 65px;
    background-position: 90% 50%;
    background-repeat: no-repeat;
    background-size: 26px;
    border: none;
    background-color: transparent;
    margin: 10px;
    cursor: pointer;
    @media only screen and (max-width: 992px) {
        font-size: 16px;
        padding-right: 45px;
        background-size: 18px;
    }
`;

export const HeroSearchWrap = styled.div`
    position: relative;
    z-index: 0;
    padding: 50px 0 100px;
    border-bottom: 1px solid lightgrey;
    @media only screen and (max-width: 992px) {
        padding-bottom: 50px;
    }
`;
export const HeroSearchContent = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    margin: 50px 0;
    @media only screen and (max-width: 992px) {
        margin: 15px 0;
    }
    &:after {
        content: "";
        width: 100%;
        height: 1px;
        margin-top: 50px;
        max-width: 900px;
        background-color: lightgrey;
        @media only screen and (max-width: 992px) {
            margin-top: 15px;
        }
    }
    form {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: row;
        width: 100%;
        max-width: 800px;
        @media only screen and (max-width: 992px) {
            flex-direction: column;
            text-align: left;
            padding: 0 15px;
            margin-bottom: 20px;
        }
    }
`;
export const BgIconsContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    > img:first-of-type {
        position: absolute;
        top: 90px;
        left: calc(50vw - 650px);
        width: 128px;
    }
    > img:last-of-type {
        position: absolute;
        top: 250px;
        right: calc(50vw - 650px);
        width: 180px;
    }
`;

export const HeroWrap = styled.section`
    width: 100%;
    height: 100vh;
    background-image: ${(props) => `url( ${props.bg})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;
    position: relative;
    padding: 70px 0;

    @media (max-width: 1350px) and (min-height: 750px) {
        background-position: center;
        height: 100%;
    }

    // Surface Duo
    @media (max-width: 545px) and (max-height: 724px) {
        font-size: calc(100% - 5px);
    }

    //iPad Pro Portrait
    @media (max-width: 1030px) and (max-height: 1370px) {
        background: none;
    }

    @media (max-width: 1370px) and (max-height: 1030px) {
        background: none;
    }

    @media (max-width: 1100px) and (min-height: 750px) {
        /* background-position: -500px 0px; */
    }

    @media (max-width: 830px) {
        background-image: none;
        padding-bottom: 100px;
    }

    @media (max-width: 700px) {
        height: 100%;
    }

    @media (max-width: 350px) {
        padding: 0px auto;
    }
`;

export const WhatInput = styled.input`
    width: 100%;
    text-indent: 10px;

    font-size: 20px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    margin: 0px 10px 0;

    -webkit-box-shadow: 0px 0px 10px 10px rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 0px 0px 10px 10px rgba(50, 50, 50, 0.2);
    box-shadow: 0px 0px 10px 10px rgba(50, 50, 50, 0.2);

    &::placeholder {
        color: lightgrey;
    }
`;

export const WhereInput = styled.input`
    width: 100%;
    font-size: 20px;
    padding: 8px;
    text-indent: 10px;
    border: none;
    border-radius: 5px;
    margin: 0px 10px 0;

    -webkit-box-shadow: 0px 0px 10px 10px rgba(50, 50, 50, 0.3);
    -moz-box-shadow: 0px 0px 10px 10px rgba(50, 50, 50, 0.3);
    box-shadow: 0px 0px 10px 10px rgba(50, 50, 50, 0.3);
    &::placeholder {
        color: lightgrey;
    }
`;

export const GreenLightning = styled.div`
    content: url(${greenLightning});
    position: absolute;
    top: 50%;
    left: 65%;

    @media (min-width: 2000px) {
        transform: scale(2);
    }
`;
export const HeroCaptionWrap = styled.div`
    max-width: 840px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
    top: -2.5%;
    margin-left: 50px;

    .logo-phone {
        display: none;

        @media (max-width: 830px) {
            margin: 40px auto;
            font-family: "nunito";
            font-size: 100px;
            letter-spacing: 1.5px;
            display: inline-block;
            text-transform: lowercase;

            //Phone Horizontal
            @media (max-width: 830px) and (max-height: 420px) {
                margin-top: 80px;
            }
        }
    }

    @media (min-width: 2000px) {
        margin: 0 auto;
    }

    @media (max-width: 1100px) {
        margin: 0 auto;
    }

    @media (max-width: 350px) {
        margin-top: 0px;
    }
`;

export const HeroTitle = styled.h1`
    font-family: Nunito;
    font-size: 5em;
    color: #fff;
    font-weight: 400;
    line-height: 1.4;
    text-align: center;
    margin: 0 3rem;

    //iPad Pro Portrait
    @media (max-width: 1030px) and (max-height: 1370px) {
        color: ${global.colorBlue};
    }

    //iPad Pro Landscape
    @media (max-width: 1370px) and (max-height: 1030px) {
        color: ${global.colorBlue};
    }

    //Phone Horizontal
    @media (max-width: 830px) and (max-height: 420px) {
        padding: 0px !important;
    }

    @media (max-width: 830px) {
        color: ${global.colorBlue};
    }

    @media (max-width: 700px) {
        margin: 0 1rem;
    }

    @media (max-width: 500px) {
        font-size: 50px;
    }

    @media (max-width: 450px) {
        font-size: 35px;
    }

    //LANDSCAPE
    @media (max-height: 500px) {
        padding-top: 80px;
        font-size: 35px;
    }
`;
export const Herosub = styled.p`
    margin: 1.5rem auto;
    margin-bottom: 1.5em;
    width: 100%;
    text-align: center;

    font-family: Nunito;
    font-size: 2em;
    font-weight: 400;
    color: white;

    @media (min-width: 1800px) {
        margin: 0rem;
    }

    //iPad Pro Portrait
    @media (max-width: 1030px) and (max-height: 1370px) {
        color: ${global.colorBlue};
    }

    //iPad Pro Landscape
    @media (max-width: 1370px) and (max-height: 1030px) {
        color: ${global.colorBlue};
    }

    @media (max-width: 830px) {
        color: ${global.colorBlue};
    }

    @media (max-width: 500px) {
        font-size: 25px;
    }

    @media (max-width: 450px) {
        font-size: 15px;
        margin: 10px 0px;
    }

    //LANDSCAPE
    @media (max-height: 500px) {
        font-size: 20px;
        margin-bottom: 0.5em;
    }
`;
export const Hero_form_wrap = styled.div`
    margin-top; 
    align-items: center; 
    justify-content: center;
`;
export const Hero_form = styled.form`
    padding: 0;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    border-radius: 5px;
    overflow: hidden;
`;

export const Search_input_wrap = styled.div`
    float: none;
    width: auto;
    padding-right: 0;
    display: flex;
    flex: 1;
    padding-left: 0;
`;
export const Search_input = styled.input.attrs((props) => ({
    type: "text",
    placeholder: props.placeholder ? props.placeholder : "",
}))`
    border-radius: 0;
    height: 60px;
    border-top: none;
    border-bottom: none;
    border-right: none;
    font-size: 0.8888em;
    font-weight: 400;
    padding: 10px 20px;
    color: #666;
`;
