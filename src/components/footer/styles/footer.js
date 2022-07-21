import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const FooterWrap = styled.footer`
    padding-top: 60px;
    font-family: 'nunito';
    color: white;
    background-color: ${global.colorBlue};

    z-index: 0;
    position: relative;

    @media (max-width: 1100px) {
        display: none;
    }

`

export const Ico = styled.div`
    padding: 25px 15px;
    color: white;
    text-align: center;
    background-color: grey;
    p{
        margin: 0;

        font-size: 12px;

    }
`

export const FooterContainer = styled.div`
    margin: 0 auto;
    padding: 0px 70px 70px 70px;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const CenterDiv = styled.div`
    margin: 0 auto;

    .img-logo{
        user-select: none;
    }

    .footer-header{
        font-size: 19px;
    }

`

// FOOTER INFO//

export const FooterInfo = styled.div`
    text-align: left; 
    padding-right: 2.5%;
    user-select: none;

    @media(min-width: 1800px) {
        padding-right: 50px; 
    }

    p{
        color: white;
        font-size: 15px;
    }

    img{
        margin-bottom: 10px;
    }
`

// FOOTER INTERNAL LINKS //
export const FooterLinks = styled.div`
    text-align: left;
    width: 100px;
    padding-left: 10%;
    user-select: none;


    h4{
        text-transform: uppercase;
        padding-bottom: 15px;
    }
`

export const LinkCont = styled.div`
    display: flex;
    justify-content: flex-start;

    a{
        text-decoration: none;
    }

    @media (max-width: 1100px){
        flex-direction: row;
        justify-content: center;
        padding: 0 300px;  
    }

    @media (max-width: 850px) {
        flex-direction: column;
        padding: 0px;   
    }


`

export const LinkCont1 = styled.div`
   width:50%;

   @media (max-width: 1100px){
        width:50%
   }

   @media (max-width: 850px) {
        width:100%
    }
`

export const LinkCont2 = styled.div`

    @media (max-width: 1100px){
        width:50%
    }

    @media (max-width: 850px) {
        width:100%
    }
    
`

export const IntLinks = styled.button`
    font-size: 13px;
    padding: 7.5px;
    user-select: none;
    border: none; 
    color: white;
    display: block;
    font-weight: 600;
    letter-spacing: 0.2.5px;
    text-transform: uppercase;
    text-decoration: none;
    background: none;
    text-align: left;
    transition: .2s;

    &:hover{
        text-decoration: none;
        color: ${global.colorGreen};
        cursor: pointer;
    }
`

// FOOTER SOCIAL //
export const FooterSocial = styled.div`
    text-align: left;
    user-select: none;

    display: flex;
    flex-direction: row;

    h4{
        text-transform: uppercase;
        padding-bottom: 15px;
    }

    @media (max-width: 1100px){
        width: 100%;
    }
`

export const IconDiv = styled.div`
    padding-right: 100px;
    user-select: none;

    @media (max-width: 1100px){
        padding-right: 0px;
    }

    @media (max-width: 450px) {
        padding-right: 0px;
       display: flex;
       justify-content: space-between;
    };
`

///////////// FOOTER SMALL //////////////

export const FooterSmall = styled.div`
    display: none;
    font-family: 'nunito';
    color: white;

    @media (max-width: 1100px) {
        display: block;
        background-color: ${global.colorBlue};
    }
`

export const InfoDiv = styled.div`
    padding: 0 5px;
    text-align: center;

    & p {
        color: white;
        margin: 10px 0px;
    }
`

//INTERNAL LINKS
export const IntLinkDiv = styled.div`
    background-color: ${global.colorBlue};
    border: 2px solid ${global.colorBlue};

    h4{
        text-transform: uppercase;
    }
`


//SOCIAL LINKS
export const SocDiv = styled.div`
    background-color: ${global.colorBlue};
    border: 2px solid ${global.colorBlue};

    h4{
        text-transform: uppercase;
    }
    
`


// FOOTER BOTTOM //

export const FooterBtm = styled.div`
    background-color: #A5A5A5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    padding: 0px 70px;

    @media(max-width: 1100px){
        flex-direction: column;
        padding: 30px;
        p {
            line-height: 1.7;

        }
    }
`

export const Copyright = styled.p`
    margin: auto 0;

    color: ${global.colorWhite};
    font-size: 15px;

    @media(max-width:600px) {
        padding-top: 10px
    }
`
export const CopyrightUl = styled.ul`
    margin: 0;
    padding:0;

`

export const CopyrightLi = styled.li`
    padding:1rem;
    
    list-style: none;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    color: white;

    transition: .2s;

    &:hover{
        color: ${global.colorGreen};
    }

    @media(max-width:600px) {
        display:block;
    }
`

export const Copyright_a = styled.a`
    color: ${global.colorWhite};

    &:not(:last-child){
        border-right: 1px solid white;
    }

    @media(max-width:600px) {
        &:not(:last-child){
            border-right: none;
        }
    }

`



