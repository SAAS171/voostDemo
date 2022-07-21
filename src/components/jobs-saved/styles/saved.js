import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const SavedWrap = styled.section`
    height: 100%;
    width: 100%;
    margin: 30px auto 100px auto;

    a{
        color: ${global.colorBlue} !important;
        float: left;
        text-decoration: none;
        display: block;
        z-index: 1000px;

        &:hover{
            color: ${global.colorGreen} !important;
        }
    }
`

export const SavedDiv = styled.div`
    padding-top: 5rem;
    height: 100%;
    margin: 20px auto;
    padding: 30px 30px;
    max-width: 900px;
`
export const Job = styled.div`
   position: relative;

//    .x-svg{
//         content: url();
//         top: -10%;
//         left: 98%;
//         position: absolute;
//         cursor: pointer;
//    }
`