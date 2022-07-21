import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
export const Div = styled.div`
    width: 700px;
    margin: 5px auto;

    @media(max-width: 760px){
        width: 100%;
    }
`

export const Input = styled.input`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;

    border: 1px solid ${global.colorRed};
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media(max-width: 800px){
    }
`


export const InputFile = styled.input`
    width: auto;
    height: 50px;
    margin: 10px auto;

    text-indent: 10px;
 
`

export const InputPhone= styled.textarea`
    width: 100%;
    height: 200px;
    margin: 10px 0px;

    text-indent: 10px;

    &:focus{
        -webkit-box-shadow: 8px 8px 12px 0px rgba(50, 50, 50, 0.15);
        -moz-box-shadow: 8px 8px 12px 0px rgba(50, 50, 50, 0.15);
        box-shadow: 8px 8px 12px 0px rgba(50, 50, 50, 0.15);
    }
`