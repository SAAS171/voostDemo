import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

//SVG's
import Plus from '../../../assets/svg/plus.svg';
import Group from '../../../assets/svg/group.svg';

export const Border = styled.section`
    padding: 3rem;
    margin: 0 auto;
    border-bottom: 2px solid ${global.colorLightGrey};

    @media(max-width:  800px){
        padding: 1rem;
     }
`   
export const CardPlus = styled.div`
    content: url(${Plus});
    position: absolute;
    top: 10%;
    left: 90%;

    z-index: -1000;

    @media(max-width:  550px){
        top: 5%;
        left: 80%;
     }
`

export const CardGroup = styled.div`
    content: url(${Group});
    position: absolute;
    top: 40%;
    left: 75%;

    z-index: -1000;

    @media(max-width:  550px){
        top: 45%;
        left: -10%;
     }
`