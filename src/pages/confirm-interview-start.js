import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';  

import styled from 'styled-components';   
import Button from '../components/shared-components/button'; 



const ConfirmStartInterviewContainer = styled.div`
    min-height: calc(100vh - 540px);
    max-width: 1140px;
    margin: 0 auto 50px;  
    .header-content{
        padding: 100px 0 0; 
        position: relative; 
        margin-bottom: 30px;
        h1{
            margin: 0;
            text-align: center;
            font-size: 28px;
            letter-spacing: 1px;
        }
        p{
            font-size: 20px;
            margin: 15px 0;
        }
        span{
            position: absolute;
            left: 0;
            top: 50% ;
            transform: translateY( -50% );
            cursor: pointer;

        }
    }
    .starting-recorded-interview{
        padding: 100px 0;
        h1{
            margin-bottom: 50px;
        }

    }
    .countdown-to-start-container{
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
            font-size: 35px;
            color: white;
            background-color: #DC3163;
            height: 100px;
            width: 100px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .btns-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        > * {
            width: 100%;
            max-width: 400px;

        }
    }
 
    @media screen and (max-width: 992px) { 
 
        .btns-container{
            padding: 0 15px;
            flex-direction: column;
            > button{
                width: 100%!important;
            }
        }
    } 
`

export default function ConfirmStartInterview() {
    const history = useHistory();
    const {jobId, fullApplication} = history.location.state ;  
    const [startInterview, setStartInterview] = useState(false)
    const [countdown, setCountdown] = useState(5)
    
    const goBack = () =>{ 
        history.goBack();
    }

    useEffect(() =>{
        console.log("FULL OBJUST: ", {jobId: jobId, fullApplication: fullApplication})
    }, [])

    const getStarted =() =>{

        // const obj = {jobId: jobId, fullApplication: fullApplication  }
        // history.push( {pathname: `/record-interview`, state:obj });


        setStartInterview(true)
        let counter= 5
        const interval = setInterval(() => {
            console.log("counter " , counter)
            console.log("COUNT DOWN " , countdown)

            if(counter === 1){
                const obj = {jobId: jobId, fullApplication: fullApplication  }
                history.push( {pathname: `/record-interview`, state:obj });

                clearInterval(interval)
            }else{
                setCountdown(--counter)

            }
        }, 1000);
    }
     
    return (
        <ConfirmStartInterviewContainer>
            {
                !startInterview ? 
                    <div> 
                        <div className="header-content">
                            <h1>Are you sure you want to start? </h1>
                            <p>Once started you cannot re-record questions or stop the recording.</p>
                        </div> 
                        <div className="btns-container">

                            <Button 
                                classsName=""
                                type="primarySmall"
                                text="START PRE-RECORDED INTERVIEW"
                                onClick={getStarted}
                            /> 
                            <Button 
                                type="ghostRed"
                                text="BACK"
                                onClick={goBack}
                            /> 
                        </div> 
                    </div>
                :

                <div className="starting-recorded-interview">
                    <h1>Continue to employers video</h1>
                    <div  className="countdown-to-start-container">
                        <span className="countdown-to-start">{countdown}</span>
                    </div>
                </div>
            
            }
        </ConfirmStartInterviewContainer>
    )

}