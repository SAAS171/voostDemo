import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import Button from "../components/shared-components/button";
import bolt from "../assets/svg/bolt.svg";
import { useSelector, useDispatch } from "react-redux";

const ReviewApplicationContainer = styled.div`
    max-width: 550px;
    margin: 0 auto 50px;
    position: relative;
    img#right-img {
        position: absolute;
        left: calc(50% + 350px);
    }
    p {
        span {
            color: #dc3163;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .header-content {
        padding: 100px 0 0;
        position: relative;
        margin-bottom: 30px;
        h1 {
            margin: 0;
            text-align: center;
            font-size: 28px;
            letter-spacing: 1px;
            color: #3a426c;
        }
        p {
            font-size: 20px;
            margin: 15px 0;
        }
        span {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
    .starting-recorded-interview {
        padding: 100px 0;
        h1 {
            margin-bottom: 50px;
        }
    }
    .countdown-to-start-container {
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
            font-size: 35px;
            color: white;
            background-color: #dc3163;
            height: 100px;
            width: 100px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

export default function ReviewApplication() {
    const history = useHistory();
    const profile = useSelector((state) => state.profile.profile);

    const backtoprofile = () => {
        history.push("/account");
    };

    return (
        <ReviewApplicationContainer>
            {profile.cvProfile ? (
                <div>
                    <img src={bolt} id="right-img" />
                    <div className="header-content">
                        <h1>THANK YOU, YOUR APPLICATION IS NOW COMPLETE</h1>
                        <p>The employer has now recieved:</p>
                    </div>
                    <div className="application-review">
                        <div>
                            <p>Your CV</p>
                        </div>
                        <div>
                            <p>Your Pre-recorded interview questions</p>
                        </div>
                    </div>
                    <Button
                        type="primarySmall"
                        text="Back to profile"
                        onClick={backtoprofile}
                    />
                </div>
            ) : (
                <div>
                    <img src={bolt} id="right-img" />
                    <div className="header-content">
                        <h1>
                            Thank you for your application, we just need one
                            more thing from you!
                        </h1>
                        <p>
                            You have successfully applied for this job, but your
                            application was submitted without a CV attached!
                        </p>
                        <p>
                            Please upload your CV below to maximise your
                            application. And add your phone number
                        </p>
                    </div>
                    <Button
                        type="primarySmall"
                        text="Upload CV"
                        onClick={(e) => history.push("/profile-builder")}
                    />
                    <p>
                        <span onClick={(e) => history.push("/account")}>
                            I’ll do this later, take me to my dashboard
                        </span>
                    </p>
                </div>
            )}
        </ReviewApplicationContainer>
    );
}
