import styled from "styled-components";

//SVG
import BoldX from "../../../assets/svg/BoldX.svg";

export const ApplicationSuccessful = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 9999;
    &.hide {
        display: none;
    }
    > div {
        max-width: 550px;
        padding: 30px;
        background-color: white;
        position: relative;
        h3 {
            color: #3a426c;
            font-weight: 300;
            margin-bottom: 20px;
        }
        p {
            margin-top: 30px;
            span {
                color: #dc3163;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        img {
            position: absolute;
            right: 15px;
            top: 15px;
            height: 20px;
            cursor: pointer;
        }
    }
`;

export const JobWrap = styled.div`
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
    z-index: 1;
`;

export const CardWrap = styled.div`
    background-color: white;
    margin: 20px auto;
    text-align: left;
    padding: 20px 80px;
    width: 700px;
    overflow: auto;
    position: relative;

    .btn-container {
        display: flex;
        justify-content: center;
    }

    @media (max-width: 850px) {
        width: 90%;
        padding: 10px 40px;
    }

    @media (max-width: 500px) {
        width: 100%;
        padding: 20px 20px;
        margin: 0;
    }

    span {
        font-weight: bold;

        @media (max-width: 350px) {
            margin: 2px !important;
        }
    }
`;

export const ButtonClose = styled.div`
    content: url(${BoldX});
    position: absolute;
    left: 105%;

    @media (max-width: 850px) {
        left: 95%;
    }
`;
