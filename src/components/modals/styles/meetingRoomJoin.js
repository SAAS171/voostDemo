import styled from 'styled-components';

export const JoinWrap = styled.section`
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

    h4{
        text-align: center;
        padding: 10px 40px 0px 40px;
        font-size: 24px;
        color: ${global.colorBlue};
    }
`

export const JoinContainer = styled.div`
    margin: 0 auto;
    padding: 20px 80px 0px 80px;
    width: 700px;
    overflow: auto;
    position: relative;
    background-color: white;
    text-align: left;

    @media(max-width: 850px){
        width: 90%;
        padding: 10px 30px;
    }

    @media(max-width: 500px){
        width: 100%;
        padding: 30px 20px 0 20px;
    }
`