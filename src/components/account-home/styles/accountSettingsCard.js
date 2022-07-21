import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const CardDiv = styled.div`
    width: 900px;
    height: 100%;
    margin: 20px auto;
    padding: 20px;
 
    max-width: 100%;
    border-radius: 10px;
    text-align: left;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media(max-width: 1000px){
        width: 100%;
    }

    @media(max-width: 600px){
        padding: 10px 0px;
    }
    .card-inside-card{
        display: flex;
        flex-direction: column;
        > div{
            width: 100%;
        }
        .accept-reject-container{
            display: flex;
        }
    }

`
export const CardTop = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 10px;

    border-bottom: 2px solid ${global.colorLightGrey};

    h6{
        display: inline-block;
        margin-bottom: 15px;
    }

    @media(max-width: 500px){
        justify-content: center;
        flex-direction: column;

        text-align: center;
    }
`

export const LabelP = styled.p`
    color: ${global.colorBlue};
    margin: 0px;
    display: inline-block
`
export const InputP = styled.p`
    color: ${global.colorGrey};
    padding: 0 0 0 4px;
    margin:0px;
    display: inline-block

`