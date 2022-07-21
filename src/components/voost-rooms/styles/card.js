import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

import interviewIcon from '../../../assets/icons/features-1.svg';
import GroupSVG from '../../../assets/svg/group.svg';
import PlusSVG from '../../../assets/svg/plus.svg';

export const VoostRoomsWrap = styled.section`
`

export const VoostRoomsContainer = styled.div`
    display: flex;
    justify-content: space-betwen;
    text-align: left;
    height: 100%;

    .container-left{
        width: 50%;
    }

    .container-right{
        width: 50%;
        position: relative;
        display: flex;
        justify-content: flex-end;
    }

    @media(max-width: 720px){
        .container-left{
            width: 100%;
        }

        .container-right{
            width: 10%;
        }

    }
`

export const Icon = styled.div`
    content: url(${interviewIcon});
    transform: scale(1.5);
    padding-right: 30px;

    @media(max-width: 700px){
        display: none;
    }
`

export const Group = styled.div`
    content: url(${GroupSVG});
    padding-right: 30px;

    @media(max-width: 700px){
        z-index: -10;
    }
`


export const Plus = styled.div`
    content: url(${PlusSVG});
    padding-right: 30px;
    position: absolute;
    left: 50%;
    top: 80%;

    @media(max-width: 700px){
        z-index: -10;
        left: -80%;
    }

`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 300px;
    p.divider{
        
    }
`


export const Border = styled.div`
    padding: 3rem;
    margin: 0 auto;
    border-bottom: 2px solid ${global.colorLightGrey};

    @media(max-width: 800px){
       padding: 1rem;
    }
`   