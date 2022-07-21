import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const Card  = styled.div`
    padding: 0.8rem;
    background-color: white;
    border-radius: 4px;
    height: 100%;
`

export const Img = styled.img`
    font-size: 4rem;
    
    @media(max-width: 450px){
        font-size: 35px;
    }
`

export const CardTitle = styled.h3`
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    color: ${global.colorBlue};

    @media(max-width: 450px){
        font-size: 20px;
    }
`

export const CardText = styled.p`
    font-size: 12px;
    font-weight:600;
`