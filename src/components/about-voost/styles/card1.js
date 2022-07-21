import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

//SVG's
import Ellipse from '../../../assets/svg/ellipse-6.svg';
import Lightning from '../../../assets/svg/lightning.svg';

export const Border = styled.section`
    padding: 3rem;
    margin: 0 auto;
    border-bottom: 2px solid ${global.colorLightGrey};

    @media(max-width:  800px){
       padding: 1rem;
    }
`   
export const CardEllipse = styled.div`
    content: url(${Ellipse});
    position: absolute;
    top: 10%;
    left: 90%;

    z-index: -1000;

    @media(max-width:  1100px){
        top: 10%;
        left: 80%;
    }
`

export const CardLightning = styled.div`
    content: url(${Lightning});
    position: absolute;
    top: 30%;
    left: 80%;

    z-index: -1000;

    @media(max-width:  1100px){
        top: 60%;
        left: 70%;
    }

    @media(max-width:  550px){
        top: -5%;
        left: 5%;
        transform: scale(1.5);
     }
`