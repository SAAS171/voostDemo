import React, { useState } from "react";
import Button from "../shared-components/button";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import greenLine from "../../assets/svg/green-lightning.svg";
import plus from "../../assets/svg/plus.svg";

import voostroomIcon from "../../assets/svg/voostroomIcon.svg";
import jobIcon from "../../assets/svg/postjobIcon.svg";
import cvbuilderIcon from "../../assets/svg/cvbuilderIcon.svg";
import { registerOpenType } from "../../store/actions/actions";

//Styles
import {
    HeroSearchTitle,
    BgIconsContainer,
    HeroSearchContent,
    HeroSearchWrap,
    PopularSearches,
    WhereInput,
    WhatInput,
    QuickButtons,
    EmptyButton,
    IconButton,
    MobileLabel,
    FullButton,
} from "../../styles/components/hero";

export default function HeroSearch(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const recruiter = useSelector((state) => state.isRecruiter);
    const profileState = useSelector((state) => state.profile);

    const [where, setWhere] = useState("");
    const [what, setWhat] = useState("");
    const popularSearches = [
        "Sales Advisor",
        "Full Time",
        "Work from home",
        "Customer service",
    ];
    const searchJobs = (sendWhat, sendWhere) => {
        history.push({
            pathname: "/jobs",
            state: { what: sendWhat, where: sendWhere },
        });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        searchJobs(what, where);
    };

    const goTo = (pageToGo) => {
        if (pageToGo == "/post-job") {
            if (profileState.profile) {
                history.push(pageToGo);
            } else {
                dispatch(registerOpenType("recruiter"));
            }
        }
        if (pageToGo == "/profile-builder") {
            if (profileState.profile) {
                history.push(pageToGo);
            } else {
                dispatch(registerOpenType("seeker"));
            }
        }
        if (pageToGo == "/voost-rooms") {
            history.push(pageToGo);
        }
    };

    const HeroSearch = (
        <HeroSearchWrap>
            <BgIconsContainer>
                <img src={plus} />
                <img src={greenLine} />
            </BgIconsContainer>
            <HeroSearchContent>
                <HeroSearchTitle>Find Your Future</HeroSearchTitle>
                <form>
                    {window.innerWidth > 992 ? (
                        <>
                            <MobileLabel>What</MobileLabel>
                            <WhatInput
                                type="text"
                                value={what}
                                placeholder="What"
                                onChange={(e) => setWhat(e.target.value)}
                            />
                            <MobileLabel>Where</MobileLabel>
                            <WhereInput
                                type="text"
                                value={where}
                                placeholder="Where"
                                onChange={(e) => setWhere(e.target.value)}
                            />
                            <Button
                                type="primarySmall"
                                text="Search"
                                onClick={submitSearch}
                            />
                        </>
                    ) : (
                        <>
                            <MobileLabel>What</MobileLabel>
                            <WhatInput
                                type="text"
                                value={what}
                                placeholder="Job title, skill or company"
                                onChange={(e) => setWhat(e.target.value)}
                            />
                            <MobileLabel>Where</MobileLabel>
                            <WhereInput
                                type="text"
                                value={where}
                                placeholder="Town, city or postcode"
                                onChange={(e) => setWhere(e.target.value)}
                            />
                            <FullButton onClick={submitSearch}>
                                Find Jobs
                            </FullButton>
                        </>
                    )}
                </form>
                <QuickButtons>
                    {(profileState.profile && !recruiter) ||
                    profileState.profile == null ? (
                        <IconButton
                            style={{
                                backgroundImage: `url("${cvbuilderIcon}")`,
                            }}
                            onClick={(e) => {
                                goTo("/profile-builder");
                            }}
                        >
                            C-voost
                        </IconButton>
                    ) : (
                        ""
                    )}
                    {(profileState.profile && recruiter) ||
                    profileState.profile == null ? (
                        <IconButton
                            style={{ backgroundImage: `url("${jobIcon}")` }}
                            onClick={(e) => {
                                goTo("/post-job");
                            }}
                        >
                            Post a Job
                        </IconButton>
                    ) : (
                        ""
                    )}

                    <IconButton
                        style={{ backgroundImage: `url("${voostroomIcon}")` }}
                        onClick={(e) => {
                            goTo("/voost-rooms");
                        }}
                    >
                        Voost Rooms
                    </IconButton>
                </QuickButtons>
            </HeroSearchContent>
            <PopularSearches>
                <span>Popular Searches :</span>
                {popularSearches.map((e, i) => {
                    return (
                        <EmptyButton
                            key={i}
                            onClick={(e) => {
                                searchJobs(e.target.textContent, "");
                            }}
                        >
                            {e}
                        </EmptyButton>
                    );
                })}
            </PopularSearches>
        </HeroSearchWrap>
    );
    return HeroSearch;
}
