import React, { useState, useEffect } from "react";
import ApplicantsCard from "./applicantsCard";
import { useSelector, useDispatch } from "react-redux";
import { getApplicants } from "../../store/actions/actions";
import { NavLink } from "react-router-dom";
import VoostRoomsSettings from "../modals/meetingRoomSettings";
import { Multiselect } from "multiselect-react-dropdown";

//Styles
import { ApplicationsWrap, Filter, JobPanel } from "./styles/applications";
import { BorderContainer } from "../../styles/components/shared-components";
import { applicantStatus } from "../../categories";

export default function Applicants(props) {
    const dispatch = useDispatch();
    const myJobs = useSelector((state) => state.my_jobs.my_jobs);
    const applicantsArray = useSelector((state) => state.applicants.applicants);
    const { id } = props;
    const [filter, setFilter] = useState("");
    const [theJob, setTheJob] = useState([]);
    const [jobApplicants, setJobApplicants] = useState([]);
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    const [applicant, setApplicant] = useState(null);
    const [filteredApplicants, setFilteredApplicants] = useState(
        jobApplicants ? jobApplicants : []
    );

    useEffect(() => {
        // console.log(filter);
        if (filter.toLocaleLowerCase() === "all") {
            setFilteredApplicants(jobApplicants);
        } else {
            if (filter) {
                const filteredList = jobApplicants.filter(
                    (applicant) =>
                        applicant.data().status.toLocaleLowerCase() ===
                        filter.toLocaleLowerCase()
                );
                setFilteredApplicants([...filteredList]);
                if (!filteredList) {
                    console.log("throw notiflix error here for no results");
                }
            }
        }
    }, [filter]);
    const displayFilter = (selectedList, selectedItem) => {
        setFilter(selectedItem.name);
    };
    useEffect(() => {
        if (myJobs) {
            setTheJob(myJobs.filter((job) => job.data().id === id));
        }
    }, [myJobs]);

    useEffect(() => {
        dispatch(getApplicants(id));
    }, []);

    useEffect(() => {
        if (applicantsArray.length > 0) {
            setJobApplicants(applicantsArray);
            setFilteredApplicants(applicantsArray);
        }
    }, [applicantsArray]);

    const handleSchedule = (candidate) => {
        setApplicant(candidate);
        setIsOpenSettings(true);
    };
    return (
        <ApplicationsWrap>
            <BorderContainer>
                <NavLink to="/accountRecruiter"> &lt; Back </NavLink>
                <Filter>
                    <p>{jobApplicants.length} applicants</p>

                    <Multiselect
                        options={applicantStatus}
                        value={filter}
                        onSelect={displayFilter}
                        singleSelect
                        placeholder="Select Job Type"
                        displayValue="name"
                        showCheckbox
                    />
                </Filter>
                <JobPanel>
                    <h4>
                        {theJob.length !== 0 ? theJob[0].data().jobTitle : ""}
                    </h4>
                    {filteredApplicants &&
                        filteredApplicants.map((applicant, i) => {
                            console.log("Applicant Data:", applicant.data());
                            console.log("Applicant ID:", applicant.id);
                            console.log(
                                "the Job: ",
                                theJob.length > 0
                                    ? theJob[0].data().id
                                    : "no jobs"
                            );
                            return (
                                <ApplicantsCard
                                    theJob={
                                        theJob.length !== 0
                                            ? theJob[0].data()
                                            : null
                                    }
                                    key={i}
                                    applicationID={applicant.id}
                                    applicant={applicant}
                                    handleSchedule={handleSchedule}
                                />
                            );
                        })}
                </JobPanel>
            </BorderContainer>
            <VoostRoomsSettings
                theJob={theJob.length !== 0 ? theJob[0].data() : null}
                applicant={applicant}
                open={isOpenSettings}
                onClose={() => setIsOpenSettings(false)}
            />
        </ApplicationsWrap>
    );
}
