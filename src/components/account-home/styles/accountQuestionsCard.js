import styled from 'styled-components'
import * as global from '../../../styles/components/globalVariables';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: grow;
    width: 900px;
    height: 100%;
    margin: 20px auto;
    padding: 20px;
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
    
    @media(max-width: 1000px){
       width: 100%;
    }
    @media(max-width: 600px){
        padding: 10px 0px;
    }
`;

const Title = styled.h6`
    font-weight: 700; 
    display: block;
    margin: 0;
    font-size: 30px;
    font-family: 'source sans pro';
    color: ${global.colorBlue};
`;

const Button = styled.button`
    margin: 10px 5px;
    padding: ${props =>`${props.type == "primarySmall" ?  "10px 20px" : "22px 15px"}`};
    min-width: ${props =>`${props.type == "primarySmall" ?  "8rem" : "17rem"}`};
    letter-spacing: 2px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    text-transform: uppercase;
    text-align: center;
    display: inline-block;
    color: #fff;
    font-weight: 400;
    font-size:${props =>`${props.type == "primarySmall" ? ".888em" : "1em"}`};
    background: ${props => `${(props.type == "primaryLarge" || props.type == "primarySmall") ? `${global.colorRed}` : "transparent"}`};
    border: 2px solid ${props => `${(props.type ==  "primaryLarge" || props.type == "primarySmall") ? `${global.colorRed}` : "white"}`};
    border-radius: 5px;
    transition: all .2s;
    &:hover{
        transform: translateY(-5px);
    }
    &:active{
        transform: translateY(2.5px);
    }
    &:focus {
        outline: none;
        box-shadow: none;
    }
    //iPad Pro Portrait
    @media (max-width: 1030px) and (max-height: 1370px){
        color: ${props => `${(props.type == 'secondary') ? `${global.colorBlue}` : ''}`};
        border: 2px solid ${props => `${(props.type === 'secondary') ? `${global.colorBlue}` : ''}`};
    }
    //iPad Pro Landscape
    @media (max-width: 1370px) and (max-height: 1030px){
        color: ${props => `${(props.type == 'secondary') ? `${global.colorBlue}` : ''}`};
        border: 2px solid ${props => `${(props.type === 'secondary') ? `${global.colorBlue}` : ''}`};
    }
    @media(max-width: 830px){
        color: ${props => `${(props.type == 'secondary') ? `${global.colorBlue}` : ''}`};
        border: 2px solid ${props => `${(props.type === 'secondary') ? `${global.colorBlue}` : ''}`};
        &:hover{
            transform: translateY(0);
        }
        &:active{
            transform: translateY(0);
        }
    }
    @media(max-width:450px){
        margin: 0px;
        margin-bottom: 10px;
    }
`;

const Text = styled.p`
    display: inline-block;
    margin: 0 auto;
`;

export {
    Card,
    Title,
    Button,
    Text
}  