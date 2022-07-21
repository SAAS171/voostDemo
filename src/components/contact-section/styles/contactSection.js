import styled from 'styled-components';

//SVG's
import lightning from '../../../assets/svg/lightning.svg';
import plus from '../../../assets/svg/plus.svg';
import ellipse from '../../../assets/svg/ellipse-6.svg';

export const ContactPageWrap = styled.section`
    padding: 40px 0px;
    height: 100%;

    position: relative;
    border-bottom: 2px solid #f3f3f3;
`

export const PageFlex = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    

    @media (max-width: 1200px) {
        flex-direction: column;
        
    }
`
/// SVGS ///
export const ContactLightning = styled.div`
    content: url(${lightning});
    position: absolute;
    top: 55%;
    left: -2.5%;
    
    z-index: -1000;

    @media (max-width: 1550px) {
        top: 65%;
    }

    @media(max-width: 1200px){
        top: 50%;
    } 
`

export const ContactPlus = styled.div`
    content: url(${plus});
    position: absolute;
    top: 70%;
    left: 30%;
    
    z-index: -1000;

    @media(max-width: 1200px){
        top: 70%;
        left: 80%;
    }
`

export const ContactEllipse = styled.div`
    content: url(${ellipse});
    position: absolute;
    top: 55%;
    left: -2.5%;
    transform: rotate(-90deg);
    
    z-index: -1000;

    @media (max-width: 1550px) {
        top: 65%;
    }

    @media(max-width: 1200px){
        top: 50%;
    }

`


//CONTACT PAGE
export const ContactPageInfo = styled.div`
    width: 50%;
    height: 100%;
    text-align: left;
    display: inline-block;
    padding-right: 10px;

    @media (max-width: 1200px) {
        width:100%;
        margin: 0 auto;
        border-bottom: 2px solid #f3f3f3;
    }

`

export const SocDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 25px;

    @media(max-width: 1500px) and (min-width: 1400px){
        padding-top: 40px;
    }

    @media (max-width: 1200px) {
       padding-bottom: 20px
    }
`

// CONTACT FORM
export const ContactPageForm = styled.div`
    width: 50%;
    height: 100%;
    text-align: left;
    display: inline-block;

    @media (min-width: 1800px) {
        zoom: 1.2;
    }

    @media (max-width: 1200px) {
        margin: 0 auto;
        width:100%;
        padding: 0px auto;
        padding-top: 50px;
        text-align: center;

        display: flex;
        flex-direction: column;
        justify-content:center;
    }
`

export const FormDiv = styled.div`

@media(max-width: 650px){
    display:inline-block
}
`


