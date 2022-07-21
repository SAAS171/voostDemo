import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
import AutocompleteLocation from '../../autocomplete-location/AutocompleteLocation';

// LAYOUT //
export const JobWrap = styled.section`

    height: 100%;
    width: 100%;

    margin-bottom: 100px;

    .dropdown{
        width: 100%;
    } 

    .standard-search{
        @media(max-width: 650px){
           padding: 10px; 
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

    #type-toggle{
    
        color: ${global.colorBlue};
        border-radius: 5px;
        text-indent: 10px;
        
        width: 350px;
        padding: 20px 0;
        text-indent: 10px;
        font-family: 'nunito';
        cursor: pointer;
    
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    
        color: ${global.colorBlue};
        background-color: white;
        border: none;
        border-radius: 5px;
    
        -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

        @media(max-width: 850px){
            width: 200px;
        }
    
        @media(max-width:650px){
            width: 80%;
            margin-bottom: 15px;
        }
    }

    #type-item{
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

    #category-toggle{
    
        color: ${global.colorBlue};
        border-radius: 5px;
        text-indent: 10px;
        
        width: 350px;
        padding: 20px 0;
        text-indent: 10px;
        font-family: 'nunito';
        cursor: pointer;
    
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    
        color: ${global.colorBlue};
        background-color: white;
        border: none;
        border-radius: 5px;
    
        -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

        @media(max-width: 850px){
            width: 200px;
        }
    
        @media(max-width:650px){
            width: 80%;
            margin-bottom: 15px;
        }
    }

    #category-item{
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
`
export const JobPanel = styled.div`
    height: 100%;
    margin: 20px auto;
    max-width: 900px;

`

export const JobDisplay = styled.div`
    padding: 30px 30px;

    @media(max-width: 650px){
        padding: 0;
        margin: 0 0 20px 0;
    }

`

export const SearchMain = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: 'Nunito';

    @media(max-width: 650px){
        flex-direction: column;
    }

`

export const SearchSecondary = styled.div`
    padding: 10px 0px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Nunito';

    @media(max-width: 650px){
        flex-direction: column;
        align-items: baseline;
    }
`
export const ResetBtn = styled.button`
    display: block;
    border: none;
    background: none;
    margin: 20px auto 0 auto;
    color: grey;
    border-bottom: 1px solid #d0d0d0;
    padding: 2px 2px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    opacity: 0;
    transition: ease-in-out 200ms all;
    pointer-events: none;
    &.show-reset{
        opacity: 1;
        pointer-events: all;
    }
`
export const Slide_container = styled.div`
    width: 400px;
    text-align: left;
    //Google Chrome
    input[type=range]::-webkit-slider-thumb{
        width: 15px;
        height: 15px;

        -webkit-appearance: none;
        border-radius: 50%;
        background: ${global.colorRed};
        color: ${global.colorRed};
    }

    //Mozilla Firefox
    input[type=range]::-webkit-slider-thumb{
        width: 15px;
        height: 15px;

        border-radius: 50%;
        background: ${global.colorRed};
        color: ${global.colorRed};
    }

    #salary{
        width: 100%;
        height: 10px;
    
        -webkit-appearance: none;
        color: white;
        background: linear-gradient(90deg, ${global.colorLightGrey} 60%,  ${global.colorLightGrey} 60%);
        border-radius: 12px;
        outline: none;
    
        @media(max-width:650px){
            margin: 15px 0;
            width: 200px;
        }
    }
`

// INPUT
export const  SearchBar = styled.input`
    width: 540px;
    height: 70px;
    text-indent: 10px;
    

    border: 1px solid ${global.colorRed};
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media(max-width:768px){
        width: 100%;
    }

`

export const InputLocation = styled(AutocompleteLocation)`
  & input {
    width: 300px;
    height: 70px;
    margin-left: 10px;
    text-indent: 10px;
    border: 1px solid ${global.colorRed};
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media (max-width: 650px) {
      width: 100%;
      margin: 15px 0;
    }
  }
`;

export const Location_bar = styled.input`
    width: 300px;
    height: 70px;
    margin-left: 10px;
    text-indent: 10px;

    border: 1px solid ${global.colorRed};
    border-radius: 5px;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    @media(max-width:650px){
        width: 100%;
        margin: 15px 0;
    }
`

export const Salary_menu = styled.input`
    width: 100%;
    height: 20px;

    -webkit-appearance: none;
    background: ${global.colorGreen};
    border-radius: 12px;
    outline: none;

    @media (max-width: 650px){
        margin: 15px 0;
    }
`

//DROPDOWN

export const Input = styled.input`
`
export const SelectWrap = styled.div`
    & {
    position: relative;
    display: flex;
    width: 49%;
    padding: 20px 10px;
    background: #fff;
    overflow: hidden;
    border-radius: .25em;
    color: #3A4263;
    box-shadow: 0px 0px 24px 0px rgba(50,50,50,0.2);}
    margin-bottom: 10px;
    }
    &:after {
        content: '\\25BC';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        padding: 0 1em;
        background: #fff;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;
      }

    &:hover:after {
        color: #f39c12;
      }
      @media(max-width: 768px){
          width: 100%;
      }
   
`
export const Select = styled.select`
-webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #fff;
  background-image: none;
  color: #3A4263;
  width: 540px;
  text-indent: 10px;
  flex: 1;
  cursor: pointer;
@media(max-width: 768px){
    width: 100%;
}
`
