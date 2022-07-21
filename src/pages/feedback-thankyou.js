import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';  

import styled from 'styled-components';   
import Button from '../components/shared-components/button'; 


const FeedbackThankyouContainer = styled.div`

    max-width: 1140px;
    margin: 0 auto 50px;  
    .header-content{
        padding: 50px 0;
        position: relative; 
        margin-bottom: 50px;
        h1{
            margin: 0;
            text-align: center;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        span{
            position: absolute;
            left: 0;
            top: 50% ;
            transform: translateY( -50% );
            cursor: pointer;

        }
    }
`

export default function FeedbackThankyouPage() {
    const history = useHistory();
    const {name} = history.location.state ; 

    const backToDashboard = () =>{ 
        history.push("/accountRecruiter")
    }

    return (
        <FeedbackThankyouContainer>
            <div className="header-content">
                <h1>THANK YOU</h1>
                <p>Your feedback has successfully been sent to {name}.</p>
            </div>
            <div className="btns-container">
                <Button 
                    type="primarySmall"
                    text="Back to dashboard"
                    onClick={backToDashboard}
                />
            </div>
        </FeedbackThankyouContainer>
    )

}