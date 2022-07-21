import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

import location from '../../../assets/svg/location.svg';
import clock from '../../../assets/svg/clock.svg';

export const Meeting = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid ${global.colorLightGrey};

 
    h6{
        font-size: 30px;
        display: inline-block
    }

    img{
        width: auto;
        height: 70px;
        margin: 0px;
        
        display: inline-block;
    }

    .join-btn{
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .create-btn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .empty-p{
            color: ${global.colorGrey};
            font-weight: 600;
            padding: 0;
        }
    }

    .meet-left{
        display: flex;
        align-items: center;


        p{
            font-weight: bold;
        }
    }
    .meet-center{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;

        color: ${global.colorBlue};

        p{
            font-weight: bold;
        }

        .date{
            text-indent: 30px;
            &:before{
                content: url(${location});
                position: absolute;
                left: -28px;
            }
        }

        .time{
            text-indent: 30px;
            &:before{
                content: url(${clock});
                position: absolute;
                left: -28px;
            }
        }
    }

    @media(max-width: 780px){
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .join-text{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            H6{
                text-align: center;
            }

            &-input{
                margin: 20px auto 0px auto;
            }
        }

        .meet-center{
            padding: 10px 0px;
            text-aling: center;

            .date{
                text-align: center;

                &:before{
                    left: 0%;
                }
            }
    
            .time{
                text-align: center;

                &:before{
                    left: 0%;
                }
            }
        }

        .meet-left{
            flex-direction: column;
            text-align: center;
        }
    }
`