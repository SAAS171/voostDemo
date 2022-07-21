import styled from 'styled-components';
import * as global from './globalVariables';

export const HeaderWrap = styled.section`
    padding: 80px 0px;

    text-align: left;
    text-transform: capitalize;
    background-size: cover;
    background-image: linear-gradient(
        to right, 
        rgb(0, 0, 0, 0.6), 
        rgb(0, 0, 0, 0.6)), 
    ${props => `url( ${props.bg})` };
    color: white;
    
    @media(max-width: 1300px){
        background-repeat: no-repeat;
    }

    @media(max-width: 800px){
        padding: 30px;
        background-repeat: no-repeat;
    }

    @media(max-width: 750px){
        padding: 30px;
    }

    @media(max-width: 350px){
        padding: 30px;
    }
`

export const SpanGt = styled.span`
    color: ${global.colorGreen};
    margin: 0px 10px;
`