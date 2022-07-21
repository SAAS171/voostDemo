import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
import AutocompleteLocation from '../../autocomplete-location/AutocompleteLocation';

export const Form = styled.div`
    width: 700px;
    margin: 5px auto;
    font-family: 'nunito';
    text-align: left;
    background-color: #fff;
    label{
        /* text-indent: 20px; */
        font-weight: bold;
    }
    @media(max-width: 760px){
        width: 100%;
    }
    
    .dropdown{
        width: 100%;
    } 

    .standard-search{
        @media(max-width: 650px){
            display: none;
        }
    }
    .responsive-search{
        display: none;
        @media(max-width: 650px){
            display: block;
        }
    }

    a{
        color: ${global.colorBlue} !important;
        float: left;
        text-decoration: none;
        &:hover{
            color: ${global.colorGreen} !important;
        }
    }

    .checked-container{
        position: relative;

        .checked{
            position: absolute;
        }
    }

    #category-toggle,
    #type-toggle{
        width: 100%;
        padding: 20px 0;
        margin-bottom: 10px;
        text-indent: 10px;

        font-family: 'nunito';
        cursor: pointer;
        text-align: left;
    
        color: ${global.colorGrey};
        background-color: white;
        border: none;
        border-radius: 5px;
    
        -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    }

    #category-item,
    #type-item{
        width: 100%;
        height: 100%;
        position: relative;


        .checked{
            opacity: 0;
        }

        input {
            display: none;
            height: auto;
        }
        label{
            font-family: 'Nunito';
            height: auto;
            cursor: pointer;
            width: 100%;
            padding: 5px 20px;
            margin-bottom: 0;
        }
        input:checked + label{
            color: ${global.colorGreen};

            .checked{
                opacity: 1;
                padding: 0;
                margin: 0;
                width: 10px;
                height: 10px;
                left: 10px;
                top: 15px;
                border-radius: 50%;
                background-color: ${global.colorGreen};
            }
        }
    }
`


export const Label = styled.label`
    text-align: left;
    display: block;
    
    text-transform: capitalize;
`

export const InputLocation = styled(AutocompleteLocation)`
  width: 700px;
  margin: 5px auto;
  font-family: "nunito";
  text-align: left;
  background-color: #fff;
  & label {
    text-indent: 20px;
    font-weight: bold;
  }
  & input {
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;
    border: 1px solid ${global.colorRed};
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
  }
`;

export const CustomSelect = styled.div`
  width: 100%;
  max-height: 120px;
  overflow-y: auto;
  position: relative;
  & div {
    cursor: pointer;
    &.selected {
    color: #fff;
      background: ${global.colorBlue};
    }
  }
`;


//INPUT
export const InputText = styled.input`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;

    border: 1px solid ${global.colorRed};
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`
export const InputNumber = styled.input`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;

    border: 1px solid ${global.colorRed};
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`
//JOB

export const Input_location = styled.input`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;

    border: none;
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`
export const SmallPill = styled.p`
    font-size: 14px; 
    padding: 5px 10px; 
    margin-right: 5px;
    border-radius: 30px;
    background-color: #61dafb;
    display: inline-block;
`
export const PillWrap = styled.div`
    margin-top: 15px;
    display: flex; 
    width: 100%; 
    flex-wrap: wrap; 
`
export const Select_jobType = styled.div.attrs(props => ({name: props.name}))`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;
    background-color: white;

    border: none;
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    .option{
        color: black;
    }

`

export const Select_jobCategory = styled.select`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;

    border: none;
    border-radius: 5px;


    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`

export const InputDescription = styled.textarea`
    width: 100%;
    height: 250px;
    text-indent: 10px;
    margin: 10px 0px;

    border: none;
    border-radius: 5px;


    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`

//COMPANY

export const Input_companyWebsite = styled.input`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;

    border: none;
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`

export const InputCompanyLogo = styled.input`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;

    border: none;
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`