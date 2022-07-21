import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import Button from "../components/shared-components/button";

import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { openLogin } from "../store/actions/actions";

import ReactPixel from "react-facebook-pixel";

const VerificationElem = styled.div`
    height: calc(100vh - 350px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Verification() {
    const history = useHistory();
    const [showVerifiedMessage, setShowVerifiedMessage] = useState(null);
    const dispatch = useDispatch();
    const [jobId, setJobId] = useState("");

    const loginModal = (e) => {
        e.preventDefault();
        if (jobId != "") {
            dispatch(openLogin(`jobs/?jobId=${jobId}`));
        } else {
            dispatch(openLogin(`/account`));
        }
    };

    useEffect(() => {
        Notiflix.Loading.Standard("Verifying Email...");
        const urlParams = new URLSearchParams(window.location.search);
        const url_email = urlParams.get("email");
        const endpoint =
            (!process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                : process.env.REACT_APP_LIVE_NODE_ENDPOINT) + `/verify_user`;
        // const endpoint =   process.env.REACT_APP_TEST_NODE_ENDPOINT +  `/verify_user`
        // console.log("endpoint: ", endpoint)

        if (urlParams.get("jobId")) {
            setJobId(urlParams.get("jobId"));
        }

        axios
            .post(endpoint, {
                email: url_email,
            })
            .then(function (response) {
                // handle success
                setShowVerifiedMessage(response.data.success);
                Notiflix.Loading.Remove();
                console.log(response);

                window.dataLayer.push({ event: "CompleteRegistration" });
                ReactPixel.track("CompleteRegistration", {}); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
                // ReactPixel.trackCustom("CompleteRegistration", "track"); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setShowVerifiedMessage(false);
                Notiflix.Loading.Remove();
            })
            .then(function () {
                // always executed
            });
    }, []);

    const goBack = () => {
        history.goBack();
    };

    // This snippet allows to check if the user using Safari 3.0+ browser
    var isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(
            !window["safari"] ||
                (typeof safari !== "undefined" &&
                    window["safari"].pushNotification)
        );

    return (
        <VerificationElem>
            <div className="">
                {showVerifiedMessage == null ? (
                    <>
                        <div className="verified-inner">
                            <h1>Verification Pending...</h1>
                        </div>
                    </>
                ) : (
                    <>
                        {showVerifiedMessage ? (
                            <>
                                <div className="verified-inner">
                                    <h1>Verification Successful</h1>
                                    <p>
                                        We have successfully verified your email
                                        address, please log in to your account
                                        to start using the Voost platform.
                                    </p>
                                    <Button
                                        onClick={loginModal}
                                        type="primarySmall"
                                        text="Log in"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="verified-inner">
                                    <h1>Verification Unsuccessful</h1>
                                    <p>
                                        We have not been able to verify your
                                        email address, please try again.
                                    </p>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </VerificationElem>
    );
}
