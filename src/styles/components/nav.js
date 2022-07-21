import styled from 'styled-components'; 
import * as global from './globalVariables';
import profileRed from '../../assets/svg/profileRed.svg';

export const NavWrap = styled.nav`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background-color: #fff; 
    margin: 0;
    padding: 0; 

` 

export const NavUl = styled.ul`
    margin: 0;
    padding: 10px;
    list-style: none;
    font-weight: 500;
    letter-spacing: 0.4px;
    position: relative;

    .account{
        color: ${global.colorRed};
        text-indent: 20px;

        &:after{
            content: url(${profileRed});
            position: absolute;
            left: -5%;
        }
    }
`

export const NavLi = styled.li`
    font-size: .888em;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    font-weight: 700;
    padding: 17px;
    padding-right: 20px;
    color: #000;
    text-transform: uppercase;
    
    &:active {
        color: ${global.colorGreen};
    }

`
