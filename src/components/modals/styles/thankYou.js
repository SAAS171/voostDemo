import React from 'react';
import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

//SVG
import BoldX from '../../../assets/svg/BoldX.svg';

export const Thankyou_wrap = styled.div`
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
export const Thankyou_container = styled.div`
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
        padding: 30px 10px;
    }
`
export const Thankyou_header = styled.div`
    padding-bottom: 20px;
    color: ${global.colorBlue};
    position: relative;
`
export const Thankyou_body = styled.div`
`


export const Thankyou_button = styled.p`
  content: url(${BoldX});
  position: absolute;
  left: 105%;
  top: 10%;

  @media(max-width: 850px){
      left: 100%;
    }
  @media(max-width: 500px){
      top: -30%;
      left: 95%;
  }
`
