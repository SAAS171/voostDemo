import styled from 'styled-components';

export const JobsPostedWrap = styled.section`
`
export const JobsPostedContainer = styled.section`
    height: 100%;
    margin: 20px auto;
    padding: 30px 30px;
    max-width: 900px;
    border-radius: 10px;

    h6{
        width: 100%;
        text-align: left;

    }

    @media(max-width: 600px){
        padding: 0px;
    }

    @media(max-width: 500px){
        h6{
            text-align: center;
        }
    }

    -webkit-box-shadow:  0px 0px 17px -2px rgba(0,0,0,0.35);
    -moz-box-shadow: 0px 0px 17px -2px rgba(0,0,0,0.35);
    box-shadow:  0px 0px 17px -2px rgba(0,0,0,0.35);

    img{
        width: auto;
        height: 70px;
        margin: 0px;
        
        display: inline-block;

        @media(max-width: 600px){
        
            width: 125px;
            
        }
    }
`
