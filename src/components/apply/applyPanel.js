import React, { useState, useEffect } from "react";
import {
    ResumeFullName,
    ResumeEmail,
    ResumeWebsite,
    ResumeCV,
    ResumePhone,
} from "./applyInput";
import { Submit } from "../../styles/components/shared-components";
import { JobCard } from "../general-job-card";
import { NavLink } from "react-router-dom";
import Button from "../shared-components/button";

//Styles
import * as global from "../../styles/components/globalVariables";
import {
    CvWrap,
    ResumeWrapper,
    ResumeWrap,
    ApplyPanel,
} from "./styles/applyPanel";
import { BorderContainer, H4 } from "../../styles/components/shared-components";
import { useSelector, useDispatch } from "react-redux";
import {
    applyForVacancy,
    clearApplication,
    getProfile,
    resetCv,
    updateUserProfile,
} from "../../store/actions/actions";
import { useHistory } from "react-router-dom";
import Notiflix from "notiflix";
import mailSender from "../../Mail/MailSender";
import styled from "styled-components";
import CvPreviewModal from "../profile-builder/cvPreviewModal";

import ReactPixel from "react-facebook-pixel";
import {
    updateCvModal,
    updateIsReviewingState,
    updateProfileBuilderSelection,
    updateProfileBuilderState,
} from "../../store/actions/actions";

const DivMaxWidthWrapper = styled.div`
    max-width: 250px;
    margin: 0 auto;
    display: block;
    position: relative;
    * {
        max-width: 100%;
        p {
            width: 100%;
            margin: 0;
        }
    }
`;
export default function ApplyPanelElem(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const applyState = useSelector((state) => state.apply);

    // const {hasPreRecorded} = history.location.state ;
    // const {jobId} = history.location.state ;

    const profile = useSelector((state) => state.profile.profile);
    const { id } = props;
    const newCv = useSelector((state) => state.cv);
    const updateRecruiter = useSelector(
        (state) => state.updateRecruiter.loading
    );
    const jobs = useSelector((state) => state.jobs.vacancies);

    const [name, setName] = useState(
        profile && profile.name ? profile.name : ""
    );
    const [email, setEmail] = useState(
        profile && profile.email ? profile.email : ""
    );
    const [phone, setPhone] = useState(
        profile != null && profile?.cvProfile?.telephone
            ? profile?.cvProfile?.telephone
            : profile != null && profile?.phone
            ? profile?.phone
            : ""
    );
    // const [userId, setUserId] = useState(profile && profile.id ? profile.id : '');
    const [resume, setResume] = useState(
        profile != null && profile?.cv
            ? profile?.cv
            : profile?.cvProfile
            ? profile?.cvProfile
            : false
    );
    const [recruiter, setRecruiter] = useState("");
    const [website, setWebsite] = useState("");
    const [job, setJob] = useState({});
    const [cv, setCv] = useState([]);

    useEffect(() => {
        console.log("STEP 2 - MY PROFILE", profile);
    }, []);

    useEffect(() => {
        if (newCv.loading) {
            Notiflix.Loading.Standard("Please wait...");
        } else {
            Notiflix.Loading.Remove();
        }
        if (newCv.error) {
            Notiflix.Report.Failure(
                "Something went wrong",
                newCv.error.message,
                "try again",
                function () {
                    dispatch(resetCv());
                }
            );
        } else if (newCv.success) {
            Notiflix.Report.Success(
                "YAY!",
                "Your Cv has been updated",
                "Ok",
                function () {
                    dispatch(resetCv());
                }
            );
        }
    }, [newCv]);

    useEffect(() => {
        if (updateRecruiter.loading) {
            Notiflix.Loading.Standard();
        } else {
            Notiflix.Loading.Remove();
        }
    }, [updateRecruiter]);

    const applyData = {
        name,
        email,
        phone,
        cv: resume,
        website,
        date: new Date(),
        jobId: id,
    };

    // filter the jobs and find the job id that we're interested in. we'll need the job to show the job card so that the user knows which job they're about to apply for.
    //the recruiter is so we can save the job in the recruiters' collection
    useEffect(() => {
        if (jobs && jobs.length > 0) {
            const theJob = jobs.filter((job) => job.data().id === id);
            if (typeof theJob[0] != "undefined") {
                console.log("job: ", theJob[0]);
                setJob(theJob[0].data());
                setRecruiter(theJob[0].data().recruiter_id);
            }
        }
    }, [jobs, id]);

    useEffect(() => {
        // if (resume.loading) {
        //     Notiflix.Loading.Standard('Please wait...');
        // } else if (resume.error) {
        //     Notiflix.Report.Failure('Something went wrong',
        //         resume.error.message,
        //         'try again');
        // } else if (resume.success) {
        //     Notiflix.Report.Success('YAY!',
        //         'Your Cv has been saved',
        //         'Ok',
        //         function () {
        //             dispatch(resetCv());
        //         });
        // }
    }, [resume]);

    useEffect(() => {
        if (cv.length && cv.length >= 1) {
            dispatch(updateUserProfile({ cv: cv[0] }));
        }
    }, [cv]);

    useEffect(() => {
        if (applyState.error) {
            Notiflix.Report.Failure(
                "Something went wrong",
                applyState.error.message,
                "Try Again",
                function () {
                    Notiflix.Loading.Remove();
                    dispatch(clearApplication());
                }
            );
        } else if (applyState.success) {
            ReactPixel.trackCustom("SubmitApplication", {});
            window.dataLayer.push({ event: "SubmitApplication" });

            Notiflix.Report.Success(
                "Good Luck!!",
                `You have successfully applied for the ${
                    job && job.jobTitle ? job.jobTitle : ""
                } role`,
                "Dismiss",
                function () {
                    dispatch(clearApplication());
                    Notiflix.Loading.Remove();
                    history.push("/applications");
                }
            );
        }
    }, [applyState]);

    const handleChange = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "fullName":
                setName(e.target.value);
                break;
            case "resumeWebsite":
                setWebsite(e.target.value);
                break;
            case "resumePhone":
                setPhone(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "resumeCV":
                setCv(e.target.files);
                break;
            default:
                break;
        }
    };

    // sends to the profile builder with an options create and/or upload CV
    const sendToCreateOrUploadResume = () => {
        window.sessionStorage.setItem("returnToJob", id);
        dispatch(updateIsReviewingState(false));
        dispatch(updateProfileBuilderSelection("selection"));
        dispatch(updateProfileBuilderState(""));
        history.push("/profile-builder");
    };

    const handleSubmit = (e) => {
        if (!name || name === "") {
            Notiflix.Report.Failure(
                "Form Incomplete",
                "Please enter you name to apply.",
                "Ok"
            );
        } else if (!email || email === "") {
            Notiflix.Report.Failure(
                "Form Incomplete",
                "Please enter you email to apply.",
                "Ok"
            );
        } else if (!phone || phone === "") {
            Notiflix.Report.Failure(
                "Form Incomplete",
                "Please enter you phone number to apply.",
                "Ok"
            );
        } else if (
            !resume.firstname &&
            !resume.name &&
            cv.length === 0 &&
            website === ""
        ) {
            Notiflix.Report.Failure(
                "Form Incomplete",
                "Please submit a CV or Portfolio website url to apply.",
                "Ok"
            );
        } else {
            //handle dispatch
            if (job.questions) {
                console.log("ANSEWR QUESTIONS.....");
                const fullApplication = {
                    applyData: applyData,
                    id: id,
                    recruiter: recruiter,
                    job: job,
                };
                history.push({
                    pathname: "/start-pre-recorded-interview",
                    state: { jobId: id, fullApplication: fullApplication },
                });
            } else {
                dispatch(applyForVacancy(applyData, id, recruiter, job));
                mailSender(
                    { name: profile.name, email: profile.email, data: job },
                    "jobApplication"
                );
            }
        }
    };

    const showPreviewModal = (e) => {
        e.preventDefault();
        console.log("show modal....");
        dispatch(updateCvModal({ showModal: true }));
    };

    return (
        <ResumeWrap>
            {applyState.loading && Notiflix.Loading.Hourglass("Loading...")}
            <BorderContainer>
                <NavLink to="/">
                    <a>&lt; Back</a>
                </NavLink>

                <ApplyPanel>
                    <div className="title-container">
                        <H4 color={`${global.colorBlue}`}>
                            Fill in your details and upload your CV and one of
                            our team members will be in touch shortly.
                        </H4>
                        <JobCard job={job} />
                    </div>

                    <ResumeFullName
                        value={name}
                        onChange={(e) => handleChange(e)}
                    />
                    <ResumeEmail
                        value={email}
                        onChange={(e) => handleChange(e)}
                    />
                    <ResumePhone
                        value={phone}
                        onChange={(e) => handleChange(e)}
                    />
                    <ResumeWrapper>
                        {resume ? (
                            resume.firstname?.length > 1 ? (
                                <>
                                    <p>Applying with</p>
                                    <Button
                                        type="greenSmall"
                                        text={"Voost Profile"}
                                        onClick={showPreviewModal}
                                    ></Button>
                                    <CvPreviewModal />
                                </>
                            ) : (
                                <>
                                    <p>
                                        Apply with the cv you uploaded to your
                                        profile
                                    </p>
                                    <DivMaxWidthWrapper>
                                        <CvWrap
                                            target="_blank"
                                            href={resume.url}
                                        >
                                            <p>{resume.name}</p>
                                        </CvWrap>
                                    </DivMaxWidthWrapper>
                                </>
                            )
                        ) : (
                            <>
                                <p>Create OR Upload your CV</p>
                                <Button
                                    type="greenSmall"
                                    text={"Manage CV"}
                                    onClick={sendToCreateOrUploadResume}
                                ></Button>
                            </>
                        )}
                        <h2>Add Portfolio</h2>
                        <ResumeWebsite onChange={(e) => handleChange(e)} />
                    </ResumeWrapper>
                </ApplyPanel>
                <Submit
                    payload={{ text: "apply" }}
                    onClick={(e) => handleSubmit(e)}
                />
                <p className="consent-p">
                    By submitting your information, you are giving consent for
                    us to store your data and contact you regrading jobs and all
                    recruitment related media. For more information refer to our{" "}
                    <span>privacy policy</span>.
                </p>
            </BorderContainer>
        </ResumeWrap>
    );
}
