import styled from 'styled-components';

//SVG's
import group from '../../../assets/svg/group.svg';
import lightning from '../../../assets/svg/lightning.svg';


export const SubscribeCardWrap = styled.section`
    padding: 0 0px 100px 0px;
    position: relative;
`

export const SubscribeCardContainer = styled.div`
    width: 100%;
    margin: 0 auto;

    p{
        margin: 0 auto;
        padding: 30px 0;
        max-width: 800px;

        @media(max-width: 360px){
            text-align: left;
        }
    }
    
`

export const Form = styled.form`
`

/// SVG's ///

//Lightning
export const SubscribeCardLightning = styled.div`
    &::after{
        content: url(${lightning});
        position: absolute;
        top: 25%;
        left: 93%;

        transform: scale(2);
        
        z-index: -1000;

        @media(max-width: 800px){
            top: 10%;
        }
    }
`

//Circle & underline
export const SubscribeCardGroup = styled.div`
    &::after{
        content: url(${group});
        position: absolute;
        top: 50%;
        left: 5%;

        transform: scale(1.5);
        
        z-index: -1000;

        @media(max-width: 800px){
            top: 90%;
        }
    }
`