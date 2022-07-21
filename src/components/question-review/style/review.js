import styled from 'styled-components'


const ReviewSection = styled.section`
    min-height: 75vh;
    max-width: 1000px;
    margin: 0 auto;
`;

const ReviewContainer = styled.div`
    margin: 25px 30px;
    border-radius: 12px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;

    background: #fff;
    color: #555E82;
    text-indent: 10px;
    box-shadow: 0px 0px 24px 0px rgba(50,50,50,0.2); 
`;

const ReviewHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ReviewInner = styled.div`
    display: flex;
    flex-direction: row;
`;


const ReviewTitle = styled.h5`
    color: #555E82;
    font-weight: 600;
    font-style: normal;
    font-family: "Source Sans Pro";
    line-height: 31px;
    margin-left: 5px;
    padding-top: 12px;
`;

const ReviewSubTitle = styled.h6`
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    margin-right: 15px;
    font-size: 25px;
    padding-top: 12px;
`;

const ReviewText = styled.p`
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: inherit;
    text-align: start;
    text-indent: 0;
    padding-left: 25px;
    padding-right: 25px;
    margin-left: 15px;
`;

const ReviewBody = styled.div`
    padding: 12px 12px 12px 12px;
    margin-left: 20px;
`;

const ReviewHeaderColorised = styled.div`
    border-radius: 12px 0px 4px;
    background-color: #DC3163;
    padding: 12px 0 px 5px;
`;

const ReviewHeaderColorisedText = styled.div`
    color: #fff;
    font-weight: 600;
    font-style:normal;
    font-size: 25px;
    font-family: Source Sans Pro;
    padding: 9px 12px 9px 6px;
`

const ReviewEditAction = styled.div``;

const ReviewIconButton = styled.button`
    border: none;
    font-size: 24px;
    color: ${props =>`${props.color}`};
    background-color: #ffffff;
    opacity: 0.7;

    &:hover {
        color: ${props =>`${props.color}`};
        opacity: 1.0;
    }
`;

const ReviewButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 750px;
    gap: 50px;
`;

export {
    ReviewSection,
    ReviewInner,
    ReviewEditAction,
    ReviewHeaderColorisedText,
    ReviewHeaderColorised,
    ReviewContainer,
    ReviewHeader,
    ReviewTitle,
    ReviewSubTitle,
    ReviewIconButton,
    ReviewText,
    ReviewBody,
    ReviewButtonWrapper
}