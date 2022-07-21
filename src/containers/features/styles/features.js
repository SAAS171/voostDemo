import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const FeatWrap = styled.section`
    background-image: linear-gradient(
        to right, 
        rgb(0, 0, 0, 0.6), 
        rgb(0, 0, 0, 0.6)),  
        ${props => `url( ${props.background})` };
    background-size: cover;
    padding: 0 0px 70px 0px;

    @media( max-width: 800px) {
        background-position: center;
    }

    @media( max-width: 580px) {
        background-image: none;
        background-color:${global.colorBlue};
    }
` 

export const FeatContainer = styled.div`
   
`
export const FeaturedItem = styled.div`
        margin-top: 30px;
`
