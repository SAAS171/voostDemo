import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const PostWrap = styled.section`
    height: 100%;
    width: 100%;
    margin: 30px auto 100px auto;

    a{
        color: ${global.colorBlue} !important;
        float: left;
        text-decoration: none;
        &:hover{
            color: ${global.colorGreen} !important;
        }
    }
`

export const PostPanel = styled.div`
    height: 100%;
    width: 100%;
    margin: 20px 0px;

    display: flex;
    flex-direction: column;
    justify-items: center;

    & h4{
        text-align: left;
        padding-left: 10px;
    }

    .title-container{
        padding: 0 14rem 2rem 14rem;
        h4{
            text-align: center;
        }

        @media(max-width: 1000px){
            padding: 0 2rem 2rem 2rem;
        }

        @media(max-width: 450px){
            padding: 0;
        }
    }
`

