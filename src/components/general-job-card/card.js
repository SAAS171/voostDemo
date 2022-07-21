import React, { useEffect, useState } from "react";
import Button from "../shared-components/button";
import { FaMapMarkerAlt, FaMoneyCheckAlt } from "react-icons/fa";
// import tesla from '../../assets/teslaLogo.png'
import { useHistory } from "react-router-dom";
//Styles
import { IconContext } from "react-icons";
import * as global from "../../styles/components/globalVariables";
import { withRouter } from "react-router"; // further imports omitted

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

const JobCard = (props) => {
    const history = useHistory();
    const {
        id,
        jobCategory,
        jobTitle,
        jobType,
        location,
        salary,
        recruiter_image,
        recruiter_name,
    } = props.job;
    const { urlParam } = props;
    // const [job, setJob] = useState(props.job);
    const [isOpenJob, setIsOpenJob] = useState(false);

    const iconStyles = {
        color: `${global.colorBlue}`,
        size: "2rem",
    };

    useEffect(() => {
        console.log(urlParam);
        console.log(`id: ${id}`);
        if (urlParam !== "" && urlParam === id) {
            setIsOpenJob(true);
        }
    }, [urlParam]);
    useEffect(() => {
        if (urlParam !== "" && urlParam === id) {
            setIsOpenJob(true);
        }
    }, []);
    useEffect(() => {
        console.log(props.job);
    }, [props.job]);
    /*
        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            console.log(query)//"app=article&act=news_content&aid=160990"
            var vars = query.split("&");
            console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
            for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=");
                        console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
            if(pair[0]===variable){return pair[1];}
            }
            return(false);
        }
    */
    const handleOpenDetail = (e) => {
        e.preventDefault();
        history.push(`/jobs/?jobId=${e.target.name}`);
        setIsOpenJob(true);
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
                    </CardLogoWrap>
                    <HeaderContent>
                        <HeaderTitle>
                            {recruiter_name ? recruiter_name : ""}
                        </HeaderTitle>
                        <HeaderSub>{jobTitle}</HeaderSub>
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
                            </IconContext.Provider>
                            <p>{location ? location : "TBC"}</p>
                        </BodyRow>
                        <BodyRow>
                            <IconContext.Provider value={iconStyles}>
                                <div>
                                    <FaMoneyCheckAlt />
                                </div>
                            </IconContext.Provider>
                            <p>
                                £{" "}
                                {salary
                                    ? salary.length === 3
                                        ? salary + " Per day"
                                        : salary
                                    : "TBC"}
                            </p>
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
                    <span>Category</span>
                    {jobCategory &&
                        Object.keys(jobCategory).map((cat, i) => {
                            if (jobCategory[cat] === true) {
                                return (
                                    <CategoryItem key={i}>{cat}</CategoryItem>
                                );
                            } else {
                                return "";
                            }
                        })}
                    {/* <CategoryItem>Design</CategoryItem>
                    <CategoryItem>HTML</CategoryItem>
                    <CategoryItem>ADOBE</CategoryItem> */}
                </CardFooter>
            </CardWrap>
        </>
    );

    return card;
};

export default withRouter(JobCard);
