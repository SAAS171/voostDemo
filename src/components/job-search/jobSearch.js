import React, { useState, useEffect } from "react";
import { FeaturedCard } from "../../components/job-card";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import Notiflix from "notiflix";

import { useHistory } from "react-router-dom";

//Styles
import {
    ResetBtn,
    Select,
    SelectWrap,
    JobWrap,
    JobPanel,
    SearchBar,
    SearchMain,
    SearchSecondary,
    JobDisplay,
    InputLocation,
} from "./styles/jobSearch";
// import * as global from '../../styles/components/globalVariables';
import { BorderContainer } from "../../styles/components/shared-components";
import { Submit } from "../../styles/components/shared-components";
import { categories, jobTypes } from "../../categories";
import {
    loadingJobs,
    fetchedJobs,
    errorLoadingJobs,
} from "../../store/actions/actions";
// import AutocompleteLocation from '../autocomplete-location/AutocompleteLocation';

export default function JobSearch() {
    const getJobs = useSelector((state) => state.jobs.vacancies);
    const history = useHistory();

    const dispatch = useDispatch();
    const [urlParam, setUrlParam] = useState("");
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(getJobs);
    const [limit, setLimit] = useState(25);
    const [isSearching, setIsSearching] = useState(false);

    const [snap, setSnap] = useState(0);
    //searc inputs
    const [jobTitleInput, setJobTitleInput] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [addedSearch, setAddedSearch] = useState(false);

    useEffect(() => {
        if (addedSearch) {
            setLimit(0);
            fetchJobs(true);
            setIsSearching(true);
            setAddedSearch(false);
        }
    }, [addedSearch]);

    useEffect(() => {
        setJobs(getJobs);
        setFilteredJobs(getJobs);
    }, [getJobs]);

    useEffect(() => {
        fetchJobs(false);
        setUrlParam(getQueryVariable("jobId"));
        if (history?.location?.state) {
            setJobTitleInput(history?.location?.state?.what);
            setLocationInput(history?.location?.state?.where);
            setAddedSearch(true);
        }
    }, []);

    useEffect(() => {
        if (snap == -1) {
            fetchJobs(false);
        }
    }, [snap]);

    const buildFilter = (input) => {
        let search = input.trim();
        let output = [];
        if (search.split(" ").length > 1) {
            output = [
                ...output,
                ...search.split(" "),
                ...search
                    .split(" ")
                    .map((e) => e.charAt(0).toUpperCase() + e.slice(1)),
                ...search.split(" ").map((e) => e.toLowerCase()),
            ];
        }
        output = [
            ...output,
            search,
            search.toLowerCase(),
            search.toUpperCase(),
            search.replace(/ /g, ""),
            search.toLowerCase().charAt(0).toUpperCase() +
                search.toLowerCase().slice(1),
        ];
        return [...new Set(output)].slice(0, 10);
    };

    const fetchJobs = (shouldUseSearchValues) => {
        Notiflix.Loading.Standard();

        const jobsRef = db.collection("jobs");
        // console.log("LOOKING FOR MORE JOBS...")
        if (shouldUseSearchValues === true) {
            if (jobTitleInput && locationInput) {
                jobsRef
                    .where(
                        "searchTitle",
                        "array-contains-any",
                        buildFilter(jobTitleInput)
                    )
                    .where(
                        "locationSearch",
                        "==",
                        locationInput.toLowerCase().trim()
                    )
                    .orderBy("date")
                    .startAfter(limit)
                    .limit(25)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.empty) {
                            // No Results
                            Notiflix.Notify.Failure(
                                "No results where found for your search terms"
                            );
                        }
                        const vacancies = [];
                        snapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            vacancies.push(doc);
                        });
                        dispatch(fetchedJobs(vacancies));
                        console.log(vacancies.length);
                        dispatch(loadingJobs(false));
                        setLimit(limit + 25);
                        Notiflix.Loading.Remove();
                    })
                    .catch((err) => {
                        dispatch(errorLoadingJobs(err));
                        dispatch(loadingJobs(false));
                        Notiflix.Loading.Remove();
                        Notiflix.Report.Failure(
                            "Something went wrong",
                            err.message,
                            "close"
                        );
                    });
            } else if (jobTitleInput) {
                jobsRef
                    .where(
                        "searchTitle",
                        "array-contains-any",
                        buildFilter(jobTitleInput)
                    )
                    .orderBy("date")
                    .startAfter(limit)
                    .limit(25)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.empty) {
                            // No Results
                            Notiflix.Notify.Failure(
                                "No results where found for your search terms"
                            );
                        }
                        const vacancies = [];
                        snapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            vacancies.push(doc);
                        });
                        dispatch(fetchedJobs(vacancies));
                        console.log(vacancies.length);
                        dispatch(loadingJobs(false));
                        setLimit(limit + 25);
                        Notiflix.Loading.Remove();
                    })
                    .catch((err) => {
                        dispatch(errorLoadingJobs(err));
                        dispatch(loadingJobs(false));
                        Notiflix.Loading.Remove();
                        Notiflix.Report.Failure(
                            "Something went wrong",
                            err.message,
                            "close"
                        );
                    });
                console.log(jobTitleInput);
            } else if (locationInput) {
                jobsRef
                    .where(
                        "locationSearch",
                        "==",
                        locationInput.toLowerCase().trim()
                    )
                    .orderBy("date")
                    .startAfter(limit)
                    .limit(25)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.empty) {
                            // No Results
                            Notiflix.Notify.Failure(
                                "No results where found for your search terms"
                            );
                        }
                        const vacancies = [];
                        snapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            vacancies.push(doc);
                        });
                        dispatch(fetchedJobs(vacancies));
                        console.log(vacancies.length);
                        dispatch(loadingJobs(false));
                        setLimit(limit + 25);
                        Notiflix.Loading.Remove();
                    })
                    .catch((err) => {
                        dispatch(errorLoadingJobs(err));
                        dispatch(loadingJobs(false));
                        Notiflix.Loading.Remove();
                        Notiflix.Report.Failure(
                            "Something went wrong",
                            err.message,
                            "close"
                        );
                    });
                console.log(locationInput);
            } else {
                Notiflix.Notify.Failure(
                    "Enter a job title or location to search"
                );
                Notiflix.Loading.Remove();
                return;
            }
        } else {
            jobsRef
                .orderBy("date")
                .startAt(snap ? snap : 0)
                .limit(25)
                .get()
                .then((snapshot) => {
                    if (snapshot.empty) {
                        // No Results
                        Notiflix.Notify.Failure("No more jobs");
                    }

                    const tempSnap = snap;
                    console.log("getting jobs now");
                    const vacancies = [];
                    let snapshotCount = 0;
                    snapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log("DOC DATA:", doc.data().id);
                        vacancies.push(doc);
                        snapshotCount++;
                        if (snapshotCount == vacancies.length)
                            setSnap(doc.data().date);
                        setLimit(vacancies.length);
                    });

                    if (tempSnap === -1) {
                        dispatch(fetchedJobs([...vacancies]));
                    } else {
                        dispatch(fetchedJobs([...jobs, ...vacancies]));
                    }

                    console.log(vacancies.length);
                    dispatch(loadingJobs(false));
                    Notiflix.Loading.Remove();
                })
                .catch((err) => {
                    dispatch(errorLoadingJobs(err));
                    dispatch(loadingJobs(false));
                    Notiflix.Loading.Remove();
                    Notiflix.Report.Failure(
                        "Something went wrong",
                        err.message,
                        "close"
                    );
                });
        }
    };

    const handleNext = () => {
        fetchJobs(false);
    };

    //Filter Send
    function handleSearch(e) {
        e.preventDefault();
        setLimit(0);
        fetchJobs(true);
        setIsSearching(true);
    }

    //Range bar
    // const [salary, setSalary] = useState(1000);
    //// FILTER FUNCTIONS ////

    const filterType = (e) => {
        console.log(e.target.value);
        if (e.target.value === "All") {
            setFilteredJobs(getJobs);
        } else {
            const filterList = jobs.filter((job) => {
                const type = job.data().jobType;
                return type.includes(e.target.value);
            });
            setFilteredJobs(filterList);
        }
    };

    const filterCategory = (e) => {
        if (e.target.value === "All") {
            setFilteredJobs(getJobs);
        } else {
            const filterList = jobs.filter((job) => {
                const categories = job.data().jobCategory;
                return Array.isArray(categories)
                    ? categories.includes(e.target.value)
                    : null;
            });
            setFilteredJobs(filterList);
        }
    };

    /*
        const salaryDisplay = (e) => {
            setSalary(e.target.value * 1000);
            const slider = document.getElementById('salary');
            slider.addEventListener('mousemove', () => {
                const x = slider.value;
                const color = `linear-gradient(90deg, ${global.colorGreen} ${x}%, ${global.colorLightGrey} ${x}%)`;
                slider.style.background = color;

            })
        }

    */

    //    console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
    //    console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    //    console.log(query)//"app=article&act=news_content&aid=160990"

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return false;
    }

    const handleReset = () => {
        //clear location and jobtitle search inputs
        // show all jobs
        setJobTitleInput("");
        setLocationInput("");
        // fetchJobs(false);
        setSnap(-1);
        setIsSearching(false);
        // setFilteredJobs(getJobs);
        // history.push("/jobs")
    };

    const jobSearch = (
        <JobWrap>
            <BorderContainer>
                <JobPanel>
                    <SearchMain>
                        <SearchBar
                            placeholder="Search Jobs"
                            value={jobTitleInput}
                            onChange={(e) => setJobTitleInput(e.target.value)}
                        />
                        {/* <Location_bar placeholder="Location" value={locationInput} onChange={e => setLocationInput(e.target.value)}/> */}
                        <InputLocation
                            handleAutocompletion={setLocationInput}
                        />
                        <Submit
                            className="standard-search"
                            payload={{ text: "Search" }}
                            onClick={handleSearch}
                        />
                    </SearchMain>
                    <SearchSecondary>
                        <SelectWrap>
                            <Select onChange={(e) => filterType(e)}>
                                <option value="All">Job type</option>
                                <option value="All">All</option>
                                {jobTypes.map((type) => (
                                    <option key={type.name}>{type.name}</option>
                                ))}
                            </Select>
                        </SelectWrap>
                        <SelectWrap>
                            <Select onChange={(e) => filterCategory(e)}>
                                <option defaultValue value="All">
                                    Category
                                </option>
                                <option value="All">All</option>
                                {categories.map((cat, i) => (
                                    <option key={i}>{cat.name}</option>
                                ))}
                            </Select>
                        </SelectWrap>

                        {/* <div className="responsive-search">
                            <Submit payload={{text: "Search"}}  onClick={ (e) => handleSearch(e)}/>
                        </div> */}
                    </SearchSecondary>
                    <ResetBtn
                        className={` ${isSearching ? "show-reset" : ""} `}
                        onClick={handleReset}
                    >
                        Clear search
                    </ResetBtn>

                    <JobDisplay>
                        {Array.isArray(filteredJobs) &&
                            filteredJobs.map((job, i) => {
                                return (
                                    <div id={job.id} key={job.id}>
                                        <FeaturedCard
                                            noFeedback={true}
                                            urlParam={urlParam}
                                            job={job.data()}
                                        />
                                    </div>
                                );
                            })}
                    </JobDisplay>
                    {limit > 24 && (
                        <Submit
                            payload={{ text: "More" }}
                            onClick={handleNext}
                        />
                    )}
                </JobPanel>
            </BorderContainer>
        </JobWrap>
    );
    return jobSearch;
}
