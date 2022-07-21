import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const ResumeWrap = styled.section`
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

    h2{
        width: 750px;
        margin: 20px auto;
        max-width: 100%; 
        
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 400;
        font-size: 15px;
    
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    
        &::before,
        &::after {
            content: '';
            border-top: 2px solid #f3f3f3;
            width: 35%;
        }
    }

    .file-p{
        color: ${global.colorGrey};
    }

    .consent-p{
        margin: 20px auto 0px auto;
        width: 60%;

        color: ${global.colorBlue};

        span{
            color: ${global.colorGreen};
            margin: 0;
        }
        
        @media(max-width: 570px){
            width: 95%;
        }
    }


`
export const ResumeWrapper = styled.div`
    margin: 24px auto; 
    width: 100%; 
`
export const CvWrap = styled.a`
    width: 100%; 
    padding: 20px; 
    p {
        border: 1px dashed ${global.colorRed};
        display: inline-block;
        padding: 10px 15px;
        font-weight: 900;
        text-decoration: underline;
    }

`

export const ApplyPanel = styled.div`
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
