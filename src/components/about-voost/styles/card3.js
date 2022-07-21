import styled from 'styled-components';
import * as global from '../../../styles/components/globalVariables';
import chevron from '../../../assets/svg/chevron.svg';
import star from '../../../assets/svg/star.svg';

export const CardWrap = styled.section`
    height: 100%;
    width: 100%;
    margin-bottom: 40px;

    #testimonial{
        width: 500px;
        height: 500px;
        background-color: black;
        margin: 0 auto;
        border-radius: 10px;
    
        -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
        box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    
        .test-top{
            margin: 0 auto;
            padding-top: 10px;
            width: 90%;
            display: flex;
            justify-content: space-between;
            text-align: left;
            border-bottom: 2px solid ${global.colorLightGrey};
    
            p{
                font-weight: bold;
            }
    
            .rating{
                display: flex;
                .star{
                    content: url(${star});
                    margin: 3px;
                }
            }
        }
    
        .test-bottom{
            p{
                padding: 10px;
            }
        }
    
        @media(max-width: 500px){
            .test-top{
                width: 100%;
                flex-direction: column;
            }
        }
    }
`
export const TestimonialsWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    
`

export const TestimonialsDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media(max-width: 1000px){
        flex-direction: column;
    }
`

export const Testimonial = styled.div`
    margin: 10px 10px;
    border-radius: 10px;
    max-width: 460px;
    width: 100%;
    height: 260px;
    padding: 5px;


    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;

    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);
    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);

    .test-top{
        margin: 0 auto;
        padding-top: 10px;
        width: 90%;
        display: flex;
        justify-content: space-between;
        text-align: left;
        border-bottom: 2px solid ${global.colorLightGrey};

        p{
            font-weight: bold;
        }

        .rating{
            display: flex;
            .star{
                content: url(${star});
                margin: 3px;
            }
        }
    }

    @media(max-width: 768px){
        .test-top{
            width: 100%;
            flex-direction: column;
            text-align: left;
        }
    }
`

export const ChevronLeft = styled.div`
    content: url(${chevron});
    margin: 10px;
    cursor: pointer;
    use-select: none;
    
    @media(max-width: 500px){
        display: none;
    }
`

export const ChevronRight = styled.div`
    content: url(${chevron});
    margin: 10px;
    transform: rotate(180deg);
    cursor: pointer;
    use-select: none;

    @media(max-width: 500px){
        display: none;
    }
`