import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;

    z-index: 1000;
`;

const Wrapper = styled.div`
    border-radius: 12px;
    background-color: #ffffff;
    max-width: 800px;
    margin: 0 auto;
    padding: 16px 16px 16px 16px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background-color: #ffffff;
    padding-top: 40px;
    max-width: 800px;
    margin: 0 auto;
`;

const Inner = styled.div`
    max-width: 650px;
`;

const Title = styled.h2`
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    font-family: Nunito;
    line-height: 49px;
`;

const SubTitle = styled.h3`
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    font-family: Nunito;
    line-height: 49px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 24px;
    gap: 15px;
`;

const Text = styled.p`
    color: #4C567C;
    font-family: Nunito;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 31px;
    letter-spacing: 0.06em;
    text-align: center;
`;

const Button = styled.button`
    background-color: #DC3163;
    text-transform: uppercase;
    border-radius: 12px;
    letter-spacing: 0.06em;
    font-weight: normal;
    font-style: normal;
    font-family: Nunito;
    font-size: 14px;
    color: #ffffff;
    padding: 12px;
    width: 100%;
    border: none;
    cursor: pointer;

    display: inline-block;
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

    @media(max-width: 450px){
        width: 100%;
        padding: 17.5px 13px
        font-size: 10px;
        margin: 0px;
        margin-bottom: 10px;
    }

    @media(max-width:830px){
        &:hover{
            transform: translateY(0);
        }
    
        &:active{
            transform: translateY(0);
        }
    }
`;

const InversedButton = styled.button`
    background-color: #ffffff;
    text-transform: uppercase;
    border-radius: 12px;
    letter-spacing: 0.06em;
    font-weight: normal;
    font-style: normal;
    font-family: Nunito;
    font-size: 14px;
    border: 2px solid ${props => `${props.color}`};
    color: ${props => `${props.color}`};
    cursor: pointer;
    padding: 12px;
    width: 100%;

    display: inline-block;
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

    @media(max-width: 450px){
        width: 100%;
        padding: 17.5px 13px
        font-size: 10px;
        margin: 0px;
        margin-bottom: 10px;
    }

    @media(max-width:830px){
        &:hover{
            transform: translateY(0);
        }
    
        &:active{
            transform: translateY(0);
        }
    }
`;

export {
    Container,
    Form,
    Title,
    SubTitle,
    Text,
    Button,
    Wrapper,
    InversedButton,
    ButtonWrapper,
    Inner
}