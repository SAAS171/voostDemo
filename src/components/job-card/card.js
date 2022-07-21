import React, { useEffect, useState } from "react";
import Button from "../shared-components/button";
import Job from "../modals/job";
import {
    FaCommentsDollar,
    FaMapMarkerAlt,
    FaMoneyCheckAlt,
} from "react-icons/fa";
// import tesla from '../../assets/teslaLogo.png'
import { useHistory } from "react-router-dom";
//Styles
import { IconContext } from "react-icons";
import * as global from "../../styles/components/globalVariables";

import {
    feebackModalChange,
    feebackModalContent,
    udpateFeedbackId,
} from "../../store/actions/actions";

import styled from "styled-components";
import {
    CategoryItem,
    BodyRow,
    LabelPill,
    HeaderSub,
    HeaderTitle,
    CardHeader,
    CardWrap,
    CardLogoWrap,
    HeaderContent,
    CardBody,
    CardFooter,
} from "./styles/styles";
import { useSelector, useDispatch } from "react-redux";
import {
    getMyNotifications,
    fetchJobOffer,
    fetchContract,
    updateNotification,
} from "../../store/actions/actions";
import { db, rdb, auth } from "../../firebase";

import exit from "../../assets/svg/exit.svg";

const CardFooterInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ShowFeedbackModal = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: ease-in-out 200ms all;
    pointer-events: none;
    z-index: 9;
    .closeBtn {
        height: 50px;
        width: 50px;
        position: absolute;
        right: -45px;
        top: -45px;
        background-color: transparent;
        border: none;
        background-image: url(${exit});
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
    }
    &.show-modal {
        opacity: 1;
        transition: ease-in-out 200ms all;
        pointer-events: all;
    }
    .modal-box {
        position: relative;
        background-color: white;
        padding: 35px;
        max-width: 600px;
        h4 {
            padding: 40px 0;
            font-size: 27px;
        }
    }
    .btns-container {
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        button {
            display: inline-block;
            width: 100%;
            margin: 0;
            &.cancel-button {
                background-color: white;
                border-radius: 4px;
                border: 1px solid #dc3163;
                color: #dc3163;
                padding: 10px 25px;
                margin-right: 10px;
            }
        }
    }
`;

const FeaturedCard = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {
        id,
        jobCategory,
        jobTitle,
        jobType,
        location,
        salary,
        salaryRange,
        salaryType,
        recruiter_image,
        recruiter_name,
        appFeedbackRequested,
    } = props.job;
    const { urlParam } = props;
    const [job, setJob] = useState(props.job);
    const [noFeedback, setNoFeedback] = useState(props.noFeedback);
    const [feedbackRequested, setFeedbackRequested] = useState(
        job.appFeedbackRequested
    );
    const [applicationFeedback, setApplicationFeedback] = useState(
        job.applicationFeedback
    );
    const [isOpenJob, setIsOpenJob] = useState(false);

    const feedbackRequestId = useSelector(
        (state) => state.feedbackRequestId.id
    );

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (feedbackRequestId === id) {
            setFeedbackRequested(true);
            dispatch(udpateFeedbackId(0));
        }
    }, [feedbackRequestId]);

    const iconStyles = {
        color: `${global.colorBlue}`,
        size: "2rem",
    };

    useEffect(() => {
        if (urlParam !== "" && urlParam === id) {
            setIsOpenJob(true);
        }
    }, [urlParam]);

    useEffect(() => {
        if (urlParam !== "" && urlParam === id) {
            setIsOpenJob(true);
        }
    }, []);

    /** 
        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            //"app=article&act=news_content&aid=160990"
            var vars = query.split("&");
            //[ 'app=article', 'act=news_content', 'aid=160990' ]
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
            if(pair[0] ===variable){return pair[1];}
            }
            return(false);
        }
    
     */
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleOpenDetail = (e) => {
        e.preventDefault();
        history.push(`/jobs/?jobId=${e.target.name}`);
        setIsOpenJob(true);
    };

    const requestFeedbackModal = (e) => {
        e.preventDefault();
        console.log("REQUESTING FEEDBACK....", job);
        dispatch(feebackModalContent(job));
        dispatch(feebackModalChange(true));
    };

    const showFeedback = (e) => {
        e.preventDefault();
        console.log("REQUESTING FEEDBACK....", job);
        dispatch(feebackModalContent(job));
        dispatch(feebackModalChange(true));
    };
    //For Modal

    const card = (
        <>
            <CardWrap>
                <CardHeader>
                    <CardLogoWrap>
                        {recruiter_image ? (
                            <img
                                src={recruiter_image ? recruiter_image.url : ""}
                                alt="recruiter "
                            />
                        ) : (
                            ""
                        )}
                        {/* <img src={recruiter_image ? recruiter_image.url : ''} alt="recruiter" /> */}
                    </CardLogoWrap>
                    <HeaderContent>
                        <HeaderTitle>{jobTitle}</HeaderTitle>
                        <HeaderSub>
                            {recruiter_name ? recruiter_name : ""}
                        </HeaderSub>
                        <LabelPill payload={{ color: "#49B140" }}>
                            {jobType === "Temporary" ? "Contract" : jobType}
                        </LabelPill>
                    </HeaderContent>
                </CardHeader>
                <CardBody>
                    <div>
                        <BodyRow>
                            <IconContext.Provider value={iconStyles}>
                                <div>
                                    <FaMapMarkerAlt />
                                </div>
                                <p>{location ? location : "TBC"}</p>
                            </IconContext.Provider>
                        </BodyRow>
                        <BodyRow>
                            <IconContext.Provider value={iconStyles}>
                                <div>
                                    <FaMoneyCheckAlt />
                                </div>
                                <p>
                                    {salary
                                        ? `£${numberWithCommas(salary)} `
                                        : "Not specified "}
                                    {salaryRange != "undefined" &&
                                    salaryRange != null &&
                                    salaryRange != ""
                                        ? `- £${numberWithCommas(salaryRange)} `
                                        : ""}
                                    {salaryType ? salaryType : ""}
                                </p>
                            </IconContext.Provider>
                        </BodyRow>
                    </div>
                    <div>
                        <Button
                            type="primarySmall"
                            name={id}
                            text="view"
                            onClick={(e) => handleOpenDetail(e)}
                        />
                    </div>
                </CardBody>
                <CardFooter>
                    <CardFooterInner>
                        <div>
                            <span> Category </span>
                            {jobCategory &&
                                jobCategory.map((cat, i) => {
                                    return (
                                        <CategoryItem key={i}>
                                            {cat}
                                        </CategoryItem>
                                    );
                                })}
                        </div>

                        {noFeedback ? (
                            ""
                        ) : !applicationFeedback && feedbackRequested ? (
                            "Feedback request sent"
                        ) : applicationFeedback ? (
                            <div>
                                <span>
                                    Feedback Given{" "}
                                    <Button
                                        type="primarySmall"
                                        name={id}
                                        text="View Feedback"
                                        onClick={() =>
                                            alert(
                                                `Feedback from the recruiter: "${applicationFeedback.feedback}"`
                                            )
                                        }
                                    />
                                </span>
                            </div>
                        ) : (
                            <Button
                                type="primarySmall"
                                name={id}
                                text="Request Feedback"
                                onClick={(e) => requestFeedbackModal(e)}
                            />
                        )}
                    </CardFooterInner>
                </CardFooter>
            </CardWrap>

            <Job
                open={isOpenJob}
                onClose={() => setIsOpenJob(false)}
                job={job ? job : ""}
            />
        </>
    );

    return card;
};

export default FeaturedCard;
