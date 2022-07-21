import React, { useState, useEffect, useRef } from "react";
import {
    Salary,
    SalaryRange,
    JobTitle,
    Location,
    JobTypePill,
    PillWraper,
    QuestionsContainer,
} from "./postJobInput";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
//Styles
import * as global from "../../styles/components/globalVariables";
import { PostWrap, PostPanel } from "./styles/postJobPanel";
import {
    BorderContainer,
    H4,
    Submit,
    ButtonWrap,
} from "../../styles/components/shared-components";
import { MultiSelectWrap } from "../../styles/components/formInput";
import Button from "../shared-components/button";

import { categories, jobTypes, salaryTypes } from "../../categories";
import {
    saveVacancy,
    getJob,
    saveQuestions,
} from "../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Notiflix from "notiflix";
// import { db } from '../../firebase';
import JoditEditor from "jodit-react";
import { Multiselect } from "multiselect-react-dropdown";

const EditbleQuestions = styled.div`
    display: flex;
    max-width: 700px;
    margin: 0 auto;
    flex-direction: column;
    align-items: flex-start;
    .singleQuestion {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid lightgrey;
        width: 100%;
        label {
            align-items: center;
            display: flex;
            justify-content: space-between;
        }
        input {
            width: 100%;
            height: auto;
            padding: 15px 5px;
            text-indent: 10px;
            margin: 10px 0px;
            border: 1px solid #dc3163;
            border-radius: 5px;
        }
        select {
            width: 100%;
            height: auto;
            padding: 15px 5px;
            text-indent: 10px;
            margin: 10px 0px;
            border: 1px solid #dc3163;
            border-radius: 5px;
        }
    }
`;

const PostJobPanel = (props) => {
    const dispatch = useDispatch();
    const isloading = useSelector((state) => state.posts.loading);
    // const error = useSelector((state) => state.posts.errors);
    const profile = useSelector((state) => state.profile);
    const jobToEdit = useSelector((state) => state.my_jobs.my_jobs);

    const editableJob = useSelector((state) => state.editableJob);
    const history = useHistory();
    const editor = useRef();
    const jobId = window.location.pathname.split("/").pop();

    useEffect(() => {
        dispatch(getJob(jobId));
    }, []);

    useEffect(() => {
        setLoading(isloading);
    }, [isloading]);

    useEffect(() => {
        if (!editableJob.loading) {
            Notiflix.Loading.Remove();
        } else {
            Notiflix.Loading.Standard();
        }
        if (editableJob.job != null) {
            console.log("GOT THE JOB", editableJob.job);

            const data = editableJob.job;
            console.log(data);
            setjobTitle(data.jobTitle ? data.jobTitle : "");
            setLocation(data.location ? data.location : "");
            setDescription(data.description ? data.description : "");
            setSalary(data.salary);
            setSalaryRange(
                data.salaryRange != "undefined" &&
                    data.salaryRange != null &&
                    data.salaryRange != ""
                    ? data.salaryRange
                    : ""
            );
            setJobType(data.jobType);
            setjobCategory(data.jobCategory ? data.jobCategory : []);
            setInterviewQuestions(data.questions ? data.questions : []);
            setSavableInterviewQuestions(data.questions ? data.questions : []);
            const toSave = salaryTypes.find(
                (elem) => elem.name == data.salaryType
            );
            console.log("TO SAVE: ", toSave);
            setSelectedSalaryType(
                salaryTypes.find((elem) => elem.name == data.salaryType)
            );
        }
    }, [editableJob]);

    const [jobTitle, setjobTitle] = useState("");
    const [jobCategory, setjobCategory] = useState([]);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState("");
    const [isLive, setIsLive] = useState(true);
    const [published, setPublished] = useState(null);
    const [loading, setLoading] = useState(isloading);
    const [id, setId] = useState(props.match.params.id);
    const [selectedJobType, setSelectedJobType] = useState([]);
    const [interviewQuestions, setInterviewQuestions] = useState([]);
    const [savableInterviewQuestions, setSavableInterviewQuestions] = useState(
        []
    );
    const [salaryRange, setSalaryRange] = useState("");

    const [salaryType, setSalaryType] = useState("");
    const [selectedSalaryType, setSelectedSalaryType] = useState();

    //Catergory
    const options = categories;
    const [selected, setSelected] = useState([]);

    const filterCategory = (e) => {
        setjobCategory(getSelectValues(e.target));
        console.log(getSelectValues(e.target));
    };

    useEffect(() => {
        console.log("selectedSalaryType", selectedSalaryType);
    }, [selectedSalaryType]);

    const handleChange = (e) => {
        switch (e.target.getAttribute("name")) {
            case "jobTitle":
                setjobTitle(e.target.value);
                break;
            case "location":
                setLocation(e.target.value);
                break;
            case "jobType":
                setJobType(e.target.value);
                break;
            case "jobCategory":
                setjobCategory(e.target.value);
                break;
            case "jobDescription":
                setDescription(e.target.value);
                break;
            case "salary":
                setSalary(e.target.value);
            case "salaryRange":
                setSalaryRange(e.target.value);
            default:
                break;
        }
    };
    const postObject = {
        id,
        jobTitle,
        searchTitle: [
            jobTitle.toLocaleLowerCase(),
            jobTitle.toLocaleUpperCase(),
            jobTitle.replace(/ /g, ""),
            ...jobTitle.split(" "),
        ],
        jobCategory,
        location,
        locationSearch: location.toLocaleLowerCase(),
        description,
        jobType,
        salary,
        salaryRange,
        salaryType,
        isLive,
        published,
        recruiter_image: profile?.profile?.company_image
            ? profile.profile.company_image
            : false,
        recruiter_name:
            profile && profile.profile.company_name
                ? profile.profile.company_name
                : false,
        recruiter_id:
            profile && profile.profile.id ? profile.profile.id : false,
    };

    const handleSave = (payload) => {
        //TODO save post
        dispatch(saveVacancy(postObject));
    };

    const handlePublish = (payload) => {
        //Checks is job category array has any value then executes the same for the postObject array
        if (postObject.jobCategory === "") {
            console.log("empty");
            Notiflix.Notify.Failure("Please fill in the required sections");
        } else {
            if (!jobTitle) {
                Notiflix.Notify.Failure("Enter a job title");
            } else if (!location) {
                Notiflix.Notify.Failure("Enter a job location");
            }
            // else if(!description){
            //     Notiflix.Notify.Failure('Enter a job description');
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
                    setPublished(
                        firebase.firestore.FieldValue.serverTimestamp()
                    );
                    postObject.date = Date.now();
                    dispatch(saveVacancy(postObject));
                    if (interviewQuestions.length > 0) {
                        dispatch(
                            saveQuestions({
                                id: jobId,
                                questions: interviewQuestions,
                            })
                        );
                    }
                    Notiflix.Notify.Success("Post successful");
                    history.push("/myposts");
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
    const handleDescription = (event) => {
        console.log("innerHTML", event);
        setDescription(event);
    };
    function getSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;

        for (var i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    }

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
    const handleCategoryRemoval = (selectedList, removedItem) => {
        console.log({ selectedList, removedItem });
        const cat = [];
        selectedList.map((c) => {
            cat.push(c.name);
        });
        setjobCategory(cat);
        setSelected([...selectedList]);
    };

    const handleChangeQuestionText = (e) => {
        const qid = e.target.getAttribute("id");
        const q = e.target.value;
        let tempQs = [...interviewQuestions];
        tempQs.forEach((element) => {
            if (element.id === qid) {
                element.question = q;
            }
        });
        setInterviewQuestions(tempQs);
    };
    const handleChangeQuestionTimer = (e) => {
        const qid = e.target.getAttribute("id");
        const q = e.target.value;
        console.log("Q", q);
        let tempQs = [...interviewQuestions];
        tempQs.forEach((element) => {
            if (element.id === qid) {
                element.timer = q;
            }
        });
        setInterviewQuestions(tempQs);
    };

    const removeQuestion = (e) => {
        const qid = e.target.getAttribute("id");
        let tempQs = [...interviewQuestions];

        const Qs = tempQs.filter((element) => {
            return element.id !== qid;
        });

        console.log("Qs: ", Qs);

        setInterviewQuestions(Qs);
    };

    const handleSalaryTypeSelection = (list, newType) => {
        console.log(newType);
        setSelectedSalaryType(newType);
        setSalaryType(newType.name);
    };

    return (
        <PostWrap>
            {loading ? Notiflix.Loading.Standard() : Notiflix.Loading.Remove()}
            <BorderContainer>
                <PostPanel>
                    <div className="title-container">
                        <H4 color={`${global.colorBlue}`}>
                            Upload your brief and our team will be in touch as
                            soon as your perfect candidate comes up
                        </H4>
                    </div>
                    <JobTitle
                        value={jobTitle}
                        onChange={(e) => handleChange(e)}
                    />
                    <Location
                        value={location}
                        onChange={(e) => handleChange(e)}
                    />

                    <MultiSelectWrap>
                        <label style={{ textAlign: "left" }}>Salary Type</label>
                        <Multiselect
                            options={salaryTypes}
                            value={selectedSalaryType}
                            onSelect={handleSalaryTypeSelection}
                            singleSelect
                            selectedValues={selectedSalaryType}
                            placeholder="Select Salary Type"
                            displayValue="name"
                        />
                    </MultiSelectWrap>
                    <Salary value={salary} onChange={(e) => handleChange(e)} />

                    <SalaryRange
                        value={salaryRange}
                        onChange={(e) => handleChange(e)}
                    />
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "700px",
                            margin: "5px auto",
                            textAlign: "left",
                        }}
                    >
                        <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) =>
                                handleDescription(newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {
                                // handleDescription(newContent);
                            }}
                            askBeforePasteHTML={false}
                            askBeforePasteFromWord={false}
                        />
                    </div>
                    {/* <JobDescription editorState={editorState} onChange={setEditorState} name='jobDescription' /> */}
                    <MultiSelectWrap>
                        {/* <SelectWrap>
                        <JobType jobType={jobType} link={handleChange} onChange={(e) => handleChange(e)}/>
                   </SelectWrap> */}
                        <Multiselect
                            options={jobTypes}
                            value={selectedJobType}
                            onSelect={handleJobTypeSelection}
                            singleSelect
                            placeholder="Select Job Type"
                            displayValue="name"
                            showCheckbox
                        />
                        <PillWraper>
                            <JobTypePill text={jobType} key={jobType} />
                        </PillWraper>

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
                        <PillWraper>
                            {Array.isArray(jobCategory) &&
                                jobCategory.map((cat, i) => {
                                    return <JobTypePill text={cat} key={i} />;
                                })}
                        </PillWraper>
                    </MultiSelectWrap>
                </PostPanel>

                {interviewQuestions.length > 0 ? (
                    <EditbleQuestions className="editbleQuestions">
                        <div>
                            <h5>Interview Questions</h5>
                        </div>
                        {interviewQuestions.map((elem, index) => {
                            return (
                                <div key={index} className="singleQuestion">
                                    <label>
                                        Question {index + 1}
                                        <Button
                                            type="primarySmall"
                                            text="Delete"
                                            id={elem.id}
                                            text="Delete"
                                            onClick={removeQuestion}
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        name="question"
                                        onChange={handleChangeQuestionText}
                                        id={elem.id}
                                        value={elem.question}
                                    />
                                    <br />
                                    <select
                                        id={elem.id}
                                        onChange={handleChangeQuestionTimer}
                                    >
                                        <option
                                            selected={
                                                elem.timer == "15"
                                                    ? true
                                                    : false
                                            }
                                            value="15"
                                        >
                                            15 seconds
                                        </option>
                                        <option
                                            selected={
                                                elem.timer == "30"
                                                    ? true
                                                    : false
                                            }
                                            value="30"
                                        >
                                            30 seconds
                                        </option>
                                        <option
                                            selected={
                                                elem.timer == "45"
                                                    ? true
                                                    : false
                                            }
                                            value="45"
                                        >
                                            45 seconds
                                        </option>
                                        <option
                                            selected={
                                                elem.timer == "60"
                                                    ? true
                                                    : false
                                            }
                                            value="60"
                                        >
                                            60 seconds
                                        </option>
                                        <option
                                            selected={
                                                elem.timer == "90"
                                                    ? true
                                                    : false
                                            }
                                            value="90"
                                        >
                                            90 seconds
                                        </option>
                                    </select>
                                </div>
                            );
                        })}
                    </EditbleQuestions>
                ) : (
                    ""
                )}

                <ButtonWrap>
                    <Submit
                        payload={{ text: "save & publish" }}
                        onClick={handlePublish}
                    />
                    {/* <Submit payload={{text:"Save"}} onClick={handleSave}/> */}
                </ButtonWrap>
            </BorderContainer>
        </PostWrap>
    );
};

export default PostJobPanel;
