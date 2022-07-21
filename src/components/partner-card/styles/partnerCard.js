import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
export const PartnerCardWrap = styled.section`
 .carousel{
    height: 190px;
    padding: 20px;

    .carousel-indicators{
        li{
            background-color: ${global.colorRed}
        }
    }
    .carousel-inner{
        .carousel-item{
            width: auto;
        }
    }
    .carousel-inner .carousel-item-right.active,
    .carousel-inner .carousel-item-next {
    transform: translateX(33.33%);
    }

    .carousel-inner .carousel-item-left.active, 
    .carousel-inner .carousel-item-prev {
    transform: translateX(-33.33%)
    }

    .carousel-inner .carousel-item-right,
    .carousel-inner .carousel-item-left{ 
    transform: translateX(0);
    }
 }
`
export const PartnerImage = styled.img`
    width: auto;
    min-width: 100px; 
    max-width: 200px; 
    
`

export const PartnerCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 50px 0 50px 0;
    border-bottom: 2px solid #f4f4f4;

    @media(max-width: 700px){
        display: inline-block;
    }
`

export const Card = styled.img`
    width: 90%;
    margin: 0 auto;

    // @media(max-width: 700px){
    //     width: 50%;
    //     display: inline-block;
    // }
`