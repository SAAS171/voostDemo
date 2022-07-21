import styled from 'styled-components'; 
import * as global from '../../../styles/components/globalVariables';
export const CardHeader = styled.div`
    position: relative; 
    width: 100%;
    margin:0 0 10px 0;
    height: auto;
    min-height: 60px;
    padding-left: 75px;
    margin-bottom: 10px;
    @media(max-width: 768px){
        padding-left: 5px;
    }

`
export const HeaderTitle = styled.h6`
    color: #5C6271;
    font-weight: 900; 
    display: block;
    margin: 0;
`
export const HeaderSub = styled.p`
    color: #000; 
    display: block; 
    margin: 0;
    font-size: 11px;
 
`
export const CardWrap = styled.div`
    background-color: #fff;  
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0px 0px 17px -2px rgba(0,0,0,0.35);
    -moz-box-shadow: 0px 0px 17px -2px rgba(0,0,0,0.35);
    box-shadow: 0px 0px 17px -2px rgba(0,0,0,0.35);
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;

    .modal{
        
    }

    .card-container{
        padding: 20px 40px;
        height: auto;
    }
    @media (max-width: 768px) {
        padding: 15px;
        height: 100%;
      }
`
export const CardLogoWrap = styled.div`
        height: 60px;
    position: absolute;
    width: 60px; 
    top: calc(50% + 5px); 
    transform: translateY(-50%);
    left: 5px; 
    display: block;
    overflow: hidden;
    border-radius: 10px;
    > img { 
        width: 100%;
        height: 100%;
        object-fit: contain;
    } 
      @media(max-width: 768px){
          display: none
      }
`
export const HeaderContent = styled.div`
    text-align: left;
    position: relative;
    transform: translateY(15px);
    padding: 5px 10px;
    > * {
        }
`
export const CardBody = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid #f4f4f4;
      border-bottom: 1px solid #f4f4f4;

      p{
        padding: 2px 0;
        font-size: 20px; 
        color: ${global.colorBlueLight};
        font-weight: 600;
      }

      @media(max-width: 768px){
          display: flex;
          flex-direction: column;
          align-items: flex-start;
      }
`
export const CardFooter = styled.div`
    height: auto;
    padding: 15px 0;

    display: flex;
    flex-wrap: wrap;

    #test{
        font-size: 16px;
    }

    > * {
        margin: 0 15px;
        font-size: 11px;
    }
    >span {
        font-weight: 800;
        font-size: 14px;
        color: ${global.colorBlue};
    }
    .category-container{
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span{
            margin-right: 20px;
        }
    }
`

export const CardFooterModal = styled.div`
    height: auto;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: left;

    #test{
        font-size: 16px;
    }

    > * {
        margin: 0 15px;
        font-size: 11px;

        @media(max-width: 350px){
            margin: 0;
            height: auto;
        }
    }
    >span {
        font-weight: 800;
        font-size: 14px;
        color: ${global.colorBlue};
    }
    .category-container{
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span{
            margin-right: 20px;
        }
    }
`

export const CategoryItem = styled.button`
    padding: 1px 10px; 
    height: 25px;
    font-size: 9px; 
    background-color: #EDEEF2; 
    border:none;
    text-transform: uppercase;
    margin-right: 5px;

`

export const LabelPill = styled.span`
    background-color: #fff; 
    text-align:center; 
    text-transform: uppercase; 
    border-radius: 40px; 
    padding: 5px 20px;
    font-size: 11px;
    -webkit-box-shadow: 0px 10px 32px -1px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 10px 32px -1px rgba(0,0,0,0.25);
    box-shadow: 0px 10px 32px -1px rgba(0,0,0,0.25);
    position: absolute; 
    right: 15px; 
    top: 50%; 
    transform: translateY(-50%);
    color: ${props => ` ${(props.payload && props.payload.color) ? props.payload.color : '#000'};`}
    @media(max-width: 768px){
        display: none;
    }
`
export const BodyRow = styled.div`
    margin: 10px 0;
    padding: 5px 15px;
    display: flex; 
        > *{
            margin-right: 15px;
            font-size: 12px;
            line-height: 1;
        }
        > p {
            margin: 0;
        }
`