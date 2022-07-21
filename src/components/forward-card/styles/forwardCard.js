import styled from 'styled-components'; 

//SVG's
import ellipse from '../../../assets/svg/ellipse-6.svg';
import plus from '../../../assets/svg/plus.svg';
import group from '../../../assets/svg/group.svg';
import lightning from '../../../assets/svg/lightning.svg';

export const CardWrap = styled.section`
    height: 100%;
    padding-bottom: 40px; 
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: center;
    position: relative;
   
`
/// SVGS ///

//Quarter circle
export const CardWrapEllipse = styled.div`
    content: url(${ellipse});
    position: absolute;
    top: 5%;
    left: 90%;

    z-index: -1000;

    @media(max-width: 800px){
        left: 80%;
    }
    
`
//Circle & unerline
export const CardWrapGroup = styled.div`
    content: url(${group});
    position: absolute;
    top: 50%;
    left: 85%;

    z-index: -1000;

    @media(max-width: 800px){
        display: none;
    }
`

//Plus
export const CardWrapPlus = styled.div`
    content: url(${plus});
    position: absolute;
    top: 70%;
    left: 70%;

    z-index: -1000;

    @media(max-width: 550px){
        display:none;
    }
    
`
//Lightning
export const CardWrapLightning = styled.div`
    content: url(${lightning});
    position: absolute;
    top: 35%;
    left: 75%;
    
    z-index: -1000;

    @media(max-width: 800px){
        display: none;
    }
    
`

export const CardCaptionWrap = styled.div`
    width: 50%;

    @media (max-width: 1250px) {
        width: 70%;
    }

    @media (max-width: 1250px) {
        width: 100%;
    }
`
