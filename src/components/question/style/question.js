import styled from "styled-components";
//SVG's
import group from "../../../assets/svg/group.svg";
import lightning from "../../../assets/svg/lightning.svg";

const Section = styled.section`
    min-height: 95vh;
    padding-top: 50px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Container = styled.div`
    padding: 12px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Text = styled.p`
    line-height: 26px;
    font-size: 25px;
`;

const Title = styled.h1`
    font-family: Nunito;
    font-weight: 400;
    font-style: normal;
    line-height: 61px;
    font-size: 50px;
`;

const SubTitle = styled.h2`
    font-family: Nunito;
    font-weight: 400;
    font-style: normal;
    font-size: 26px;
    line-height: 32px;
`;

const Input = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: none;
    box-shadow: none;
    border: 0 !important;
    border-radius: 12px;
    background: #fff;
    color: #3A4263;
    text-indent: 10px;
    cursor: pointer;

    @media(min-width: 768px){
        width: 100%;
    }
    & {
    position: relative;
    display: flex;
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

    input(:last-child) {
        margin-bottom: 25px;
    }
    
    @media(max-width: 768px){
        width: 100%;
    }

`;

const OrderedList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 50px;
    width: 60%;
    flex-shrink: 0;
    justify-content: center;
    div:not(:last-of-type) {
        margin-bottom: 20px;
    }
`;

const OrderedList1 = styled.ul`
    max-width: 1000px;
    padding-top: 100px;
    padding-bottom: 100px;
    line-height: 26px;
    text-align: left;

    li:not(:last-of-type) {
        margin-bottom: 20px;
    }
`;

const ListItem = styled.li`
    font-weight: 300;
    font-style: normal;
    font-size: 22px;
    color: #243665;
    line-height: 1.6;
    margin-bottom: 10px;
`;

const Image = styled.img``;

const Video = styled.video`
    background-color: aquamarine;
    margin-top: 0;
    width: 100%;
`;

const Select = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    word-wrap: normal;
    outline: none;
    box-shadow: none;
    border: 0 !important;
    background: #fff;
    background-image: none;
    color: #3a4263;
    text-indent: 10px;
    cursor: pointer;
    display: flex;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }

    & {
        position: relative;
        display: flex;
        padding: 20px 10px;
        background: #fff;
        overflow: hidden;
        border-radius: 0.25em;
        color: #3a4263;
        box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);

        margin-bottom: 10px;
    }

    &:after {
        content: "\\25BC";
        position: absolute;
        transform: translateY(-50%);
        right: 0;
        padding: 0 1em;
        background: #fff;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: 0.25s all ease;
        -o-transition: 0.25s all ease;
        transition: 0.25s all ease;
    }
    &:hover:after {
        color: #f39c12;
    }
`;

const SelectOption = styled.option`
    width: max-content;
`;

const Label = styled.label`
    display: flex;
    align-items: flex-start;
    line-height: 26px;
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    color: #243665;
`;

const Form = styled.form`
    max-width: 800px;
    margin: 0 auto;
`;

const Group = styled.div`
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 50px;
    justify-content: center;
`;

const Field = styled.div`
    padding-top: 25px;
    padding-bottom: 12px;
`;

const HorizontalDivider = styled.hr`
    border-bottom: 1px solid #e2e4ea;
    display: block;
`;

const Break = styled.br`
    content: " ";
    display: none;
`;

const Button = styled.button`
    width: 35%;
    margin: 10px 5px;
    padding: 10px 20px;
    text-transform: uppercase;
    background: #dc3163;
    border-radius: 6px;
    letter-spacing: 2px;
    border: none;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    font-size: 14px;
    color: #fff;

    transition: all 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    &:active {
        transform: translateY(2.5px);
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:disabled {
        color: #d0d0d0;
    }
`;

const PrimaryButton = styled.button`
    width: 35%;
    margin: 10px 5px;
    padding: 10px 20px;
    background: #4c567c;
    border: none;
    border-radius: 6px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    color: #fff;
    cursor: pointer;

    letter-spacing: 2px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    font-style: normal;

    text-transform: uppercase;
    text-align: center;
    display: inline-block;
    font-weight: 600;
    font-size: 14px;

    transition: all 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    &:active {
        transform: translateY(2.5px);
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:disabled {
        color: #d0d0d0;
    }
`;

const TernaryButton = styled.button`
    width: 35%;
    margin: 10px 5px;
    padding: 10px 20px;
    background: #6fc7ba;
    border: none;
    border-radius: 6px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    color: #fff;
    cursor: pointer;

    letter-spacing: 2px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    font-style: normal;

    text-transform: uppercase;
    text-align: center;
    display: inline-block;
    font-weight: 600;
    font-size: 14px;

    transition: all 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    &:active {
        transform: translateY(2.5px);
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:disabled {
        color: #d0d0d0;
    }

    @media (max-width: 800px) {
        width: 70%;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`;

const InversedButton = styled.div`
    width: 35%;
    margin: 10px 5px;
    padding: 10px 20px;
    background: #ffffff;
    border: 2px solid ${(props) => `${props.color}`};
    border-radius: 6px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    color: ${(props) => `${props.color}`};
    cursor: pointer;

    letter-spacing: 2px;
    font-family: "Nunito" !important;
    font-weight: 500 !important;
    font-style: normal;

    text-transform: uppercase;
    text-align: center;
    display: inline-block;
    font-weight: 600;
    font-size: 14px;

    transition: all 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    &:active {
        transform: translateY(2.5px);
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

const LighteningCard = styled.div`
    &::after {
        content: url(${lightning});
        position: absolute;
        overflow: hidden;
        top: 25%;
        left: 85%;

        transform: scale(2);

        z-index: -1000;

        @media (max-width: 800px) {
            top: 10%;
        }
    }
`;

const UnderlinedCirleCard = styled.div`
    &::after {
        content: url(${group});
        position: absolute;
        top: 50%;
        left: 5%;

        transform: scale(1.5);

        z-index: -1000;

        @media (max-width: 800px) {
            top: 90%;
        }
    }
`;

const Checkboxes = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;

    &:not(:last-of-type),
    &:not(:first-of-type) {
        margin-left: 12px;
    }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
    margin: 10px !important;
    border: 2px solid #a4a2a2;
    border-radius: 2px;
    cursor: pointer;

    &:checked {
        background: #dc3163;
    }
`;

const Card = styled.div`
    max-width: 450px;
    border-radius: 12px;
    border: 1px solid none;
    box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    text-align: center;
    padding-top: 18px;
    padding-bottom: 6px;
    margin: 0 auto;

    &:not(:last-of-type) {
        margin-bottom: 20px;
    }
`;

const Placeholder = styled.div`
    border: 1px solid none;
    border-radius: 12px;
    box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    padding: 12px 12px 16px 12px;
    text-align: left;

    font-size: 21px;
    font-family: "Source Sans Pro";
    font-style: normal;
    line-height: 21px;
    color: #a4a2a2;

    &:not(:last-of-type) {
        margin-bottom: 20px;
    }
`;

export {
    Section,
    Container,
    Title,
    SubTitle,
    Input,
    Select,
    Video,
    Image,
    SelectOption,
    Text,
    Label,
    Form,
    Group,
    Field,
    HorizontalDivider,
    Break,
    Button,
    PrimaryButton,
    TernaryButton,
    InversedButton,
    ButtonWrapper,
    OrderedList,
    OrderedList1,
    ListItem,
    Checkboxes,
    Checkbox,
    UnderlinedCirleCard,
    LighteningCard,
    Card,
    Placeholder,
};
