import React, { useEffect, useState } from "react";
import "./App.css";
import loading_gif from "../src/assets/init-loading.gif";
import styled from "styled-components";
// import {Redirect, useHistory} from 'react-router-dom'
import { Route, useHistory } from "react-router-dom";
// import { createHistory } from 'history';
import Notiflix from "notiflix";
import RouterApp from "./router";
// //NAV
// import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
// import {Header} from './components/header';
// import Footer from './components/footer/footer';
// import SidebarNav from './components/header/sidebarNav';
// import SidebarNavRecruiter from './components/header/sidebarNavRecruiter';
// import SidebarNavSeeker from './components/header/sidebarNavSeeker';
// import ScrollToTop from './ScrollToTop';
// import FourOFour from './pages/404';

import { auth } from "./firebase";
import {
    login,
    logout,
    getVacancies,
    getUserProfile,
    setIsRecruiter,
} from "./store/actions/actions";

import ReactPixel from "react-facebook-pixel";
import { useDispatch, useSelector } from "react-redux";
// import TagManager from 'react-gtm-module';

const LoadingContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    img {
        width: 180px;
        height: 180px;
        object-fit: contain;
    }
`;

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const fetchedProfile = useSelector((state) => state.profile.profile);
    const recruiter = useSelector((state) => state.isRecruiter);

    useEffect(() => {
        setLoading(false);
        console.log("RECRUITER: ", recruiter);
        // dispatch(startLoginRedirect(payload.ral))
        if (typeof recruiter != "undefined") {
            // console.log("recruiter ", recruiter)
        } else {
            // console.log("RECRUITER: ", recruiter)
        }
        // setLoading(false);
    }, [recruiter]);

    useEffect(() => {
        console.log("fetchedProfile CHANGED...");
        if (
            fetchedProfile != null &&
            typeof fetchedProfile.recruiter !== "undefined" &&
            auth?.currentUser
        ) {
            console.log(
                "fetchedProfile CHANGED... NOT NULL: ",
                fetchedProfile?.recruiter
            );
            console.log("STEP 1 - DID GET PROFILE: ", fetchedProfile.recruiter);
            if (
                typeof recruiter != "undefined" &&
                recruiter == fetchedProfile.recruiter
            ) {
                setLoading(false);
            }
            dispatch(setIsRecruiter(fetchedProfile?.recruiter));
        } else {
            // console.log("fetchedProfile CHANGED false...")
            setLoading(false);
        }
    }, [fetchedProfile]);

    useEffect(() => {
        setLoading(true);
        dispatch(getVacancies());

        auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                console.log("AUTH CHANGED...");
                // if(!currentUser.emailVerified){
                //   // console.log("is email verified: " ,currentUser.emailVerified)
                //   // dispatch(logout());
                //   setLoading(false)
                // }else{
                //   dispatch(login(currentUser));
                //   dispatch(getUserProfile());
                //   // console.log("LOGING IN... SHOULD BE GETTING PROFILE ")
                // }
                dispatch(login(currentUser));
                dispatch(getUserProfile());
                setLoading(false);
            } else {
                setLoading(false);
                dispatch(logout());
            }
        });
    }, []);

    function build_tracking(script_url) {
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.async = true;
        b.src = script_url;
        s.parentNode.insertBefore(b, s);
    }

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
            event: "PageView",
        });

        build_tracking(
            "//cdn.mouseflow.com/projects/74118a68-4272-4300-8e28-3a029a49adea.js"
        );
        build_tracking(
            "https://www.googletagmanager.com/gtm.js?id=GTM-TXNS3LT"
        );
        window.dataLayer.push({ event: "PageView" });
    }, []);

    return (
        <div>
            {loading ? (
                <LoadingContainer>
                    <img src={loading_gif} alt="loading the page." />
                </LoadingContainer>
            ) : (
                <RouterApp />
            )}
        </div>
    );
}

export default App;
