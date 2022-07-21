import React, { useState, useEffect, useRef } from "react";
import { Salary, JobTitle, SalaryRange } from "./postJobInput";
import Question from "../question";
// import firebase from 'firebase';
// import { db } from '../../firebase';
import { useHistory } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";

//Styles
import * as global from "../../styles/components/globalVariables";
import { PostWrap, PostPanel } from "./styles/postJobPanel";
import {
    BorderContainer,
    H4,
    Submit,
    ButtonWrap,
} from "../../styles/components/shared-components";
import {
    saveVacancy,
    clearVacancySaveState,
} from "../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Notiflix from "notiflix";
import JoditEditor from "jodit-react";
import { categories, jobTypes, salaryTypes } from "../../categories";
import { MultiSelectWrap } from "../../styles/components/formInput";
import { InputLocation } from "./styles/postJobInput";
import mailSender from "../../Mail/MailSender";
import Button from "../shared-components/button";
import styled from "styled-components";
import exit from "../../assets/svg/exit.svg";

const FieldContainer = styled.div`
    text-align: left;
    width: 700px;
    margin: 5px auto;
`;
const JobLocation = styled.input`
    width: 100%;
    height: 70px;
    text-indent: 10px;
    margin: 10px 0px;
    border: 1px solid #dc3163;
    border-radius: 5px;
    box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);
`;

const AddQuestionsModal = styled.div`
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

        @media (max-width: 768px) {
            width: 80%;
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

const PostJobPanel = (props) => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const postState = useSelector((state) => state.posts);
    const [postDate, setPostDate] = useState("");
    const [addQuestions, setAddQuestions] = useState(false);
    const history = useHistory();
    const editor = useRef();

    const [show, setShow] = React.useState(false);

    useEffect(() => {
        if (postState?.loading === true) {
            Notiflix.Loading.Standard("Saving...");
        } else {
            Notiflix.Loading.Remove();
        }
        if (postState && postState.errors) {
            Notiflix.Report.Failure(
                "Something went wrong",
                postState.errors.message,
                "Try Again",
                function () {
                    dispatch(clearVacancySaveState());
                }
            );
        } else if (postState.success !== null) {
            mailSender(
                {
                    company_name: profile.profile.company_name,
                    name: profile.profile.company_name,
                    email: profile.profile.email,
                    data: postDate,
                },
                "postJob"
            );

            if (addQuestions) {
                console.log("MY VACANCY ID: ", postState.newVacancy);
                dispatch(clearVacancySaveState());

                history.push({
                    pathname: "/recruiter/confirm-job-posts",
                    state: { jobTitle: jobTitle, jobId: postState.newVacancy },
                });
            } else {
                Notiflix.Report.Success(
                    "Success",
                    `Your Vacancy has been published`,
                    "Close",
                    function () {
                        dispatch(clearVacancySaveState());
                        history.push("/myPosts");
                    }
                );
            }
        }
    }, [postState]);

    const [jobTitle, setjobTitle] = useState("");
    const [jobCategory, setjobCategory] = useState([]);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("Full-time");
    const [salaryType, setSalaryType] = useState("Annually");

    const [salary, setSalary] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [isLive, setIsLive] = useState(true);
    const [published, setPublished] = useState(null);
    const options = categories;
    const [selected, setSelected] = useState([]);
    const [selectedSalaryType, setSelectedSalaryType] = useState([]);
    const [selectedJobType, setSelectedJobType] = useState([]);

    //Catergory

    // const filterCategory = (e) => {
    //     setjobCategory(getSelectValues(e.target));
    //     console.log(getSelectValues(e.target));

    // };

    const handleJobTitleChange = (e) => {
        setjobTitle(e.target.value);
    };
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };
    const handleSalaryRangeChange = (e) => {
        setSalaryRange(e.target.value);
    };

    const handleJobDescriptionChange = (e) => {
        console.log("innerHTML", e);

        setDescription(e);
    };

    const handleChange = (e) => {
        switch (e.target.getAttribute("name")) {
            case "jobType":
                setJobType(e.target.value);
                break;
            case "jobCategory":
                console.log(e.target);
                setjobCategory(...jobCategory, ...e.target.value);
                break;
            default:
                break;
        }
    };
    const postObject = {
        jobTitle: jobTitle.trim(),
        searchTitle: [
            jobTitle.toLocaleLowerCase().trim(),
            jobTitle.toLocaleUpperCase().trim(),
            jobTitle.replace(/ /g, ""),
            ...jobTitle.split(" "),
        ],
        jobCategory,
        location: location.trim(),
        locationSearch: location.toLocaleLowerCase().trim(),
        description,
        jobType,
        salaryType,
        salary,
        salaryRange,
        isLive,
        published,
        recruiter_image:
            profile && profile.profile.company_image
                ? profile.profile.company_image
                : false,
        recruiter_name:
            profile && profile.profile.company_name
                ? profile.profile.company_name
                : false,
        recruiter_id:
            profile && profile.profile.id ? profile.profile.id : false,
        date: Date.now(),
    };

    const handlePublish = (addQuestions) => {
        // history.push( {pathname: "/recruiter/confirm-job-posts", state: { jobTitle: "x", jobId:"zzzzz"  }});
        // return ;

        setAddQuestions(addQuestions);
        //Checks is job category array has any value then executes the same for the postObject array
        if (postObject.jobCategory === "") {
            console.log("empty");
            Notiflix.Notify.Failure("Select one or more category");
        } else {
            console.log("has something", postObject.jobCategory);
            if (!jobTitle) {
                Notiflix.Notify.Failure("Enter a job title");
            } else if (!salaryType) {
                Notiflix.Notify.Failure("Enter a salary type");
            } else if (!location) {
                Notiflix.Notify.Failure("Enter a job location");
            }
            // else if (!description) {
            //     Notiflix.Notify.Failure("Enter a job description");
            // }
            // else if(!salary){
            //     Notiflix.Notify.Failure('Enter a job a salary range');
            // }
            else if (!postObject.jobCategory) {
                console.log(postObject.jobCategory);
                Notiflix.Notify.Failure("Select a category");
            } else if (!location) {
                Notiflix.Notify.Failure(
                    "enter a location. or indicate if the role is remote"
                );
            } else if (!jobType) {
                Notiflix.Notify.Failure("Select a job type");
            } else {
                if (postObject !== "") {
                    // save and publish
                    setIsLive(true);
                    setPublished(Date.now());
                    dispatch(saveVacancy(postObject));
                    setPostDate(postObject);
                }
            }
        }
    };

    const config = {
        autofocus: false,
        useSearch: false,
        removeButtons: [
            "source",
            "|",
            "brush",
            "paragraph",
            "|",
            "table",
            "link",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "hr",
            "eraser",
            "uploader",
        ],
    };

    // const handleDescription = (event) => {
    //     console.log(event);
    //     handleJobDescriptionChange(event.target.innerHTML)

    // }

    const handleCategorySelection = (list, newCat) => {
        console.log({ list, newCat });
        const cat = [];
        list.map((c) => {
            console.log(c);
            cat.push(c.name);
        });
        setjobCategory(cat);
        setSelected([...list]);
    };
    const handleJobTypeSelection = (list, newType) => {
        console.log(newType);
        setSelectedJobType(newType);
        setJobType(newType.name);
    };

    const handleSalaryTypeSelection = (list, newType) => {
        console.log(newType);
        setSelectedSalaryType(newType);
        setSalaryType(newType.name);
    };

    const handleCategoryRemoval = (selectedList, removedItem) => {
        console.log({ selectedList, removedItem });
        const cat = [];
        selectedList.map((c) => {
            return cat.push(c.name);
        });
        setjobCategory(cat);
        setSelected([...selectedList]);
    };

    return (
        <PostWrap>
            <BorderContainer>
                <PostPanel>
                    <div className="title-container">
                        <H4 color={`${global.colorBlue}`}>
                            Upload your brief and a member from our lovely team
                            will be in touch as soon as your perfect candidate
                            comes up!
                        </H4>
                    </div>
                    <JobTitle
                        value={jobTitle}
                        onChange={handleJobTitleChange}
                    />
                    <FieldContainer>
                        <label>Job Location</label>
                        <JobLocation
                            value={location}
                            onChange={handleLocationChange}
                            placeholder="Location"
                        />
                    </FieldContainer>
                    {/* <InputLocation handleAutocompletion={handleLocationChange} label={true}/> */}

                    <MultiSelectWrap>
                        <label style={{ textAlign: "left" }}>Salary Type</label>
                        <Multiselect
                            options={salaryTypes}
                            value={selectedSalaryType}
                            onSelect={handleSalaryTypeSelection}
                            singleSelect
                            placeholder="Select Salary Type"
                            displayValue="name"
                        />
                    </MultiSelectWrap>

                    <Salary value={salary} onChange={handleSalaryChange} />
                    <SalaryRange
                        value={salaryRange}
                        onChange={handleSalaryRangeChange}
                    />

                    <div
                        style={{
                            width: "700px",
                            margin: "0 auto",
                            textAlign: "initial",
                            listStylePosition: "inside",
                        }}
                    >
                        <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) =>
                                handleJobDescriptionChange(newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            askBeforePasteHTML={false}
                            askBeforePasteFromWord={false}
                        />
                    </div>
                    <MultiSelectWrap>
                        <Multiselect
                            options={jobTypes}
                            value={selectedJobType}
                            onSelect={handleJobTypeSelection}
                            singleSelect
                            placeholder="Select Job Type"
                            displayValue="name"
                        />
                        {/* <PillWraper>
                                 <JobTypePill text={jobType} />
                        </PillWraper> */}
                        <Multiselect
                            options={options}
                            value={selected}
                            onSelect={handleCategorySelection}
                            placeholder="Select Category"
                            displayValue="name"
                            showCheckbox
                            showArrow
                            onRemove={handleCategoryRemoval}
                        />
                    </MultiSelectWrap>
                </PostPanel>
                {/* Remove Modal and sent Directly to next stage */}
                <Question.TernaryButton onClick={() => handlePublish(true)}>
                    Add Pre-recorded Questions
                </Question.TernaryButton>
                {/* <ButtonWrap>
                    <Question.Button onClick={(e) => handlePublish(false)}>
                        Save & Publish
                    </Question.Button>
                </ButtonWrap> */}
            </BorderContainer>
            <AddQuestionsModal className={`${show ? "show-modal" : ""}`}>
                <div className="modal-box">
                    <button
                        onClick={() => setShow(false)}
                        className="closeBtn"
                    ></button>
                    <h4>
                        Would you like to add pre-recorded interview questions
                        to your job posting?
                    </h4>
                    <div className="btns-container">
                        <Button
                            type="primarySmall"
                            text="YES"
                            onClick={() => handlePublish(true)}
                        />
                    </div>
                </div>
            </AddQuestionsModal>
        </PostWrap>
    );
};

export default PostJobPanel;
