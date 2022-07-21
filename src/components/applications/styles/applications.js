import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';

//SVG
import X from '../../../assets/svg/x.svg';

export const ApplicationsWrap = styled.section`
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

    #drop{
        background-color: white;
        border: none;
        color: ${global.colorBlue};
        padding: 10px 20px;
        display: inline-block;

        -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    }


    .checked-container{
        position: relative;

        .checked{
            position: absolute;
        }
    }

    #filter-toggle{
        width: 150px;
        padding: 10px;
        margin-bottom: 10px;
        text-indent: 10px;

        font-family: 'nunito';
        cursor: pointer;
        text-align: left;

        color: ${global.colorBlue};
        background-color: white;
        border: none;
        border-radius: 5px;

        -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    }

    .filter-item{
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
                left: 1%;
                top: 25%;
                border-radius: 50%;
                background-color: ${global.colorGreen};
            }
        }
    }

`

export const Filter = styled.div`
    width: 100%;
    font-family: 'nunito';
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${global.colorBlue};
    font-size: 25px;
    
    p{
        font-family: 'nunito';
        padding-top: 10px;
        padding-right: 50px;
    }
    .multiselect-container{
        max-width: 50%;
        width: 400px;

        .search-wrapper{
            border: 1px solid ${global.colorRed};

            #search_input {
                font-size: 16px;
            }
        }
    }

`

export const Item = styled.option`
   width: 100%;
   text-align: left;
   text-indent: 10px;
   outline: none;

   color: ${global.colorBlue};
   border: none;
   background-color: white;

   &:hover{
       color: ${global.colorGreen};
   }

   &:active{
    color: ${global.colorGreen};
}
    &:focus{
        color: ${global.colorGreen};
        outline: none;
    }

`

export const JobPanel = styled.div`
    height: 100%;
    margin: 20px auto;
    padding: 30px 30px;
    max-width: 900px;

    @media(max-width: 600px){
        padding: 0px;
    }
`

export const Job = styled.div`
   position: relative;
   .x-svg{
        content: url(${X});
        top: -10%;
        left: 98%;
        position: absolute;
        cursor: pointer;

        @media(max-width: 500px){
            left: 90%;
        }
   }
`