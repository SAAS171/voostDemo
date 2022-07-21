import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaMoneyCheckAlt } from "react-icons/fa";
import Button from "../shared-components/button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import mailSender from "../../Mail/MailSender";
import exit from "../../assets/svg/BoldX.svg";

//Styles
import { IconContext } from "react-icons";
import * as global from "../../styles/components/globalVariables";
import {
    JobWrap,
    CardWrap,
    ButtonClose,
    ApplicationSuccessful,
} from "./styles/job";
import {
    CardHeader,
    CardLogoWrap,
    CategoryItem,
    HeaderContent,
    HeaderTitle,
    HeaderSub,
    LabelPill,
    CardBody,
    BodyRow,
    CardFooterModal,
} from "../job-card/styles/styles";
import Notiflix from "notiflix";
import { auth } from "../../firebase";
import {
    openRegister,
    getMyApplications,
    openLogin,
    registerOpenType,
    applyForVacancy,
    clearApplication,
} from "../../store/actions/actions";

export default function Job(props) {
    const profile = useSelector((state) => state.profile.profile);
    const my_apps = useSelector(
        (state) => state.my_applications.my_applications
    );
    const history = useHistory();
    const dispatch = useDispatch();
    const job = props.job;
    const jobs = useSelector((state) => state.jobs.vacancies);

    const { open, onClose } = props;
    const {
        id,
        recruiter_name,
        recruiter_image,
        description,
        jobCategory,
        jobTitle,
        jobType,
        location,
        salary,
        salaryRange,
        salaryType,
    } = job;
    // const [desc, setDesc] = useState(null);
    const [applicationModal, setApplicationModal] = useState(true);
    const [recruiter, setRecruiter] = useState("");
    const applicationState = useSelector((state) => state.apply);
    useEffect(() => {
        console.log("APPLICATION MODAL IS: ", applicationModal);
    }, [applicationModal]);
    useEffect(() => {
        console.log("APPLICATION STATE IS: ", applicationState);
        if (applicationState) {
            if (applicationState?.success) {
                console.log("APPLICATION SUCCESSFULLY MADE....");
                dispatch(clearApplication());
                setApplicationModal(true);
            } else {
            }
        }
    }, [applicationState]);

    useEffect(() => {
        if (jobs && jobs.length > 0) {
            const theJob = jobs.filter((job) => job.data().id === id);
            if (typeof theJob[0] != "undefined") {
                console.log("job: ", theJob[0]);
                setRecruiter(theJob[0].data().recruiter_id);
            }
        }
    }, [jobs, id]);

    const [isRecruiter, setIsRecruiter] = useState(false);
    useEffect(() => {
        if (profile && profile.recruiter) {
            setIsRecruiter(profile.recruiter);
        }
    }, [profile]);

    useEffect(() => {
        dispatch(getMyApplications());
    }, []);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const iconStyles = {
        color: `${global.colorBlue}`,
        size: "2rem",
    };
    function handleApply(e, jobId) {
        e.preventDefault();

        if (!isRecruiter && auth.currentUser) {
            const jobExists = my_apps.filter(
                (application) => application.data().jobId === jobId
            );
            if (jobExists.length > 0) {
                console.log(jobExists);
                Notiflix.Report.Failure(
                    "Already Applied",
                    "You have already applied for this role",
                    "Ok"
                );
            } else {
                const phone =
                    typeof profile?.cvProfile?.telephone === "undefined"
                        ? ""
                        : profile.cvProfile.telephone;

                const cvp =
                    typeof profile?.cvProfile === "undefined"
                        ? ""
                        : profile.cvProfile;

                const applyData = {
                    name: profile.name,
                    email: profile.email,
                    phone: phone,
                    cv: cvp,
                    website: "",
                    date: new Date(),
                    jobId: jobId,
                };
                const fullApplication = {
                    applyData: applyData,
                    id: jobId,
                    recruiter: recruiter,
                    job: job,
                };

                if (job.questions) {
                    console.log("HAS QUESTIONS SEND TO PAGE----");

                    history.push({
                        pathname: "/pre-recorded-questions",
                        state: {
                            jobId: jobId,
                            fullApplication: fullApplication,
                        },
                    });

                    // history.push({
                    //     pathname: "/start-pre-recorded-interview",
                    //     state: {
                    //         jobId: jobId,
                    //         fullApplication: fullApplication,
                    //     },
                    // });
                    return;
                } else {
                    // AUTO APPLY FOR JOB HERE
                    dispatch(applyForVacancy(applyData, jobId, recruiter, job));
                    mailSender(
                        { name: profile.name, email: profile.email, data: job },
                        "jobApplication"
                    );
                }
            }
        } else if (!auth.currentUser) {
            dispatch(registerOpenType("seeker-apply"));
            // Notiflix.Report.Failure(
            //     "Sign in to apply",
            //     "Sign up with a job seeker account to apply for this role",
            //     'Sign up',
            //     function(){

            //         // dispatch(openRegister())
            //         // history.push('/');
            //     }
            // )
        } else {
            Notiflix.Report.Failure(
                "Sorry, you can't do that",
                "Recriuter accounts can't apply for vacancies. Create a seeker account to apply",
                "close"
            );
        }
    }

    const modalSwitch = (e) => {
        e.preventDefault();
        console.log("HELLO...");
        setApplicationModal(false);
    };

    if (!open) return null;

    return (
        <>
            <JobWrap className="jobwrap">
                {/* <div className="job-container" style={{'maxHeight': '100vh', 'overflow': 'auto'}}> */}
                <CardWrap>
                    <CardHeader>
                        <ButtonClose onClick={onClose}> </ButtonClose>
                        <CardLogoWrap>
                            {recruiter_image ? (
                                <img
                                    src={
                                        recruiter_image
                                            ? recruiter_image.url
                                            : ""
                                    }
                                    alt="Job "
                                />
                            ) : (
                                ""
                            )}
                            {/* <img src={recruiter_image ? recruiter_image.url : ''} alt="job "/> */}
                        </CardLogoWrap>
                        <HeaderContent>
                            <div>
                                <HeaderTitle>
                                    {jobTitle ? jobTitle : ""}
                                </HeaderTitle>
                                <HeaderSub>
                                    {recruiter_name ? recruiter_name : ""}
                                </HeaderSub>
                            </div>

                            <LabelPill payload={{ color: "#49B140" }}>
                                {job.jobType}
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
                                {/* <p>£{salary ? numberWithCommas(salary) : 'TBC'} {salaryType ? numberWithCommas(salaryType) : ''}  </p> */}

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
                            </BodyRow>
                        </div>
                    </CardBody>
                    <CardFooterModal>
                        <div className="category-container">
                            <span>Category</span>
                            {jobCategory &&
                                jobCategory.map((cat, i) => {
                                    return (
                                        <CategoryItem key={i}>
                                            {cat}
                                        </CategoryItem>
                                    );
                                })}
                        </div>
                        <br />
                        <div
                            dangerouslySetInnerHTML={{ __html: description }}
                        ></div>
                    </CardFooterModal>

                    <div className="btn-container">
                        <Button
                            id="test"
                            type="primarySmall"
                            text="apply"
                            onClick={(e) => handleApply(e, id)}
                        />
                    </div>
                </CardWrap>
            </JobWrap>
            <ApplicationSuccessful className={applicationModal ? "hide" : ""}>
                <div>
                    <img src={exit} onClick={modalSwitch} />
                    <h3>
                        Thank you for your application, we just need one more
                        thing from you!
                    </h3>
                    <p>
                        You have successfully applied for this job, but your
                        application was submitted without a CV attached!{" "}
                    </p>
                    <p>
                        Please upload your CV below to maximise your
                        application. And add your phone number
                    </p>
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
            </ApplicationSuccessful>
        </>
    );
}
