import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const CardBody = styled.div`
    .card-button{
        padding-top: 20px;
        margin: 0 auto;
        width: 100%;
        
        letter-spacing: 1.5px;
        font-size: 20px;
        text-transform: uppercase;

        color: ${global.colorGrey};
        background: none;
        border: none;

        &:focus{
            outline: none;
        }
    }
`

export const Application = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: ${props => `${props.shadow ? "" : " 2px solid" + `${global.colorLightGrey}`}`};

    h6{
        font-size: 30px;
        display: inline-block
    }

    img{
        width: auto;
        height: 70px;
        margin: 0px;
        border-radius: 4px;
        margin-right: 15px; 
        display: inline-block;
    }

    .job-title{
        font-weight: bold;
    }

    .app-left{
        display: flex;
        align-items: center;
        p{
            font-weight: bold;
        } 
    }

    .app-center{
        display: flex;
        align-items:center;
    }

    .app-right{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media(max-width: 500px){
        flex-direction: column;

        .app-left{
            flex-direction: column;
            text-align: center;
        }
    }
`

export const Status = styled.div`
    padding: 10px;
    width: 8rem;
    margin-bottom: 25px;

    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;

    color: ${global.colorRed};
    border-radius: 20px;
    border: 1px solid ${global.colorRed};
    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`
