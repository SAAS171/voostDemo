import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

export const CardDiv = styled.div`
    width: 100%;
    border-radius: 10px;
    margin-top: 30px;
    background-color: #fff;

    -webkit-box-shadow: ${props => `${props.shadow ? "" : "0px 0px 17px -2px rgba(0,0,0,0.35)" }`};
    -moz-box-shadow:${props => `${props.shadow ? "" : "0px 0px 17px -2px rgba(0,0,0,0.35)" }`};
    box-shadow: ${props => `${props.shadow ? "" : "0px 0px 17px -2px rgba(0,0,0,0.35)"}`};

    img{
        width: auto;
        height: 70px;
        margin: 0px;
        
        display: inline-block;

        @media(max-width: 600px){
        
            width: 125px;
            
        }
    }

///////////////////// CARD TOP  ////////////////

    .app-top{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        width: 98%;
        margin: 0 auto;

        border-bottom: ${props => `${props.shadow ? "" : "2px solid" + `${global.colorLightGrey}` }`};
    }

    .top-left{
        display: flex;
        flex-direction: row;
        width: 100%;

        @media(max-width: 600px){
        
            height: auto;
            text-align: center;
            flex-direction: column;
            align-items: center;
            
        }
    }

    .job-title{
        font-weight: bold;
    }

    ///////////////////// APPLICANT DATA /////////////////////

    .applicant-details{
        width: 98%;
        margin: 0 auto;
        padding: 20px;
        border-top: ${props => `${props.shadow ? "" : " 2px solid" + `${global.colorLightGrey}`}`};
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .detail-item{
            height: 30px
        }

        .CV{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px !important;
        }   
    }

    ///////////////////// DROP DOWN /////////////////////

    .dropdown-toggle::after{
        display:none;
    }
    .checked-container{
        position: relative;

        .checked{
            position: absolute;
        }
    }
    #respond-toggle{
        padding: 10px;
        width: 8rem;
        height: 40px;
    
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;
        text-align: center;
    
        color: ${global.colorRed};
        background-color: white;
        border:none;
        border-radius: 20px;
    
        -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    }

    .respond-item{
        width: 100%;
        height: 100%;
        position: relative;

        .checked{
            opacity: 0;
        }


        input {
            opacity: 0;
            height: auto;
        }
        label{
            font-family: 'Nunito';
            height: auto;
            cursor: pointer;
            width: 100%;
            padding: 0;
            padding-left: 20px;
        }
        input:checked + label{
            color: ${global.colorGreen};

            .checked{
                opacity: 1;
                padding: 0;
                margin: 0;
                width: 10px;
                height: 10px;
                left: 2.5%;
                top: 25%;
                border-radius: 50%;
                background-color: ${global.colorGreen};
            }
        }
    }

///////////////////// MEDIA QUERIES /////////////////////

    @media (max-width: 768px) {
        padding: 15px;
    }

    @media(max-width: 600px){
        padding: 10px 0px;
        .app-top{
            text-align: center;
            flex-direction: column;
            margin: 0 auto;
        }

        .applicant-details{
            flex-direction: column;
            margin-top: 10px;

            .detail-item{
                flex-direction: column;
                height: 100%;
                align-items: flex-start;
            }
        }
    }
`
export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
`

export const Applicant = styled.div`
    padding: 10px 0px 10px 20px;
    width: 98%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    ///////////////////// CARD LEFT AND RIGHT & ACCORDION TOGGLE  /////////////////////

    .app-left{
        padding-top: 10px;
        display: flex;
        justify-content: flex-start;

    }

    .app-right{
        display: flex;
        justify-content: flex-end;

        .toggle{
            background: none;
            border: none;
            outline: none;
        }
    }

    ///////////////////// MEDIA QUERIES  /////////////////////

    @media(max-width: 600px){
        padding: 0px;
        flex-direction: column;

        .app-left{
            flex-direction: column;
            text-align: center;
            padding: 10px 0px;
        }

        .app-right{
            flex-direction: column;
            text-align: center;
        }
    }
`

export const LabelP = styled.p`
    color: ${global.colorBlue};
    padding: 0px;
    margin:0px;
    display: inline-block
`
export const InputP = styled.p`
    color: ${global.colorGrey};
    padding: 0 0 0 4px;
    margin:0px;
    display: inline-block

`