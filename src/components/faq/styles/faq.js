import styled from 'styled-components';

//CONTAINER
export const FaqWrap = styled.section`
    padding: 40px 0px;
    border-bottom: 2px solid #f3f3f3;

`

export const FaqContainer = styled.div`
    width: 70%;
    margin: 0 auto;

    @media(max-width: 900px) {
        width: 100%;
    }

    .more-faqs{
        border: none;
        outline: none;
        background: none;
    }
`

//QUESTIONS
export const QCont = styled.div`

`

export const QItem = styled.div`
    text-align: left;
    font-size: 22.5px;
    border-bottom: 2px solid #f3f3f3;

`

export const QAns = styled.div`

`

export const QQu = styled.div`
    font-weight: 600;
    padding: 17.5px;

    @media(max-width: 450px){
        font-size: 20px;
    }
`

export const SpanQ = styled.div`
    color: grey;
    font-weight: 300;
    float: right;
    display: inline-block;
`