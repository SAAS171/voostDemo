import styled from 'styled-components';
import * as global from './globalVariables';

export const HeaderWrap = styled.section`
    width: 100%; 
    margin: 0; 
    padding: 0; 
    background-color:
    position: fixed;
    background-color: #fff;
    font-family: 'nunito';

    @media (max-width: 870px) {
        display: none;
    }
    
`
export const HeaderContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
`
export const HeaderLogoWrap = styled.div`
    padding: 10px 20px;
    width: 250px; 

    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
`

export const Logo = styled.h4`
    color: ${props => `${props.color}`};
    font-size: 40px;
    letter-spacing: 1.5px;
    display: inline-block;
    text-transform: lowercase;
    cursor: pointer;

    user-select: none;
    
    &:active{
        color: ${global.colorGreen};
    }
`
export const Img = styled.img`
    display: inline-block;
    margin-bottom: 10px;
    user-select: none;
`


