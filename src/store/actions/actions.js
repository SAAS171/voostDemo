import * as constants from "../constants/contstants";
import { auth, db, rdb, storage } from "../../firebase";
import { collection, query, orderBy, startAt } from "firebase/firestore";
import mailSender from "../../Mail/MailSender";
import ReactPixel from "react-facebook-pixel";

import { v4 as uuidv4 } from "uuid";
import { getEndpoint } from "../../endpoints";
// import firebase from 'firebase';
const axios = require("axios");

export const startLoginRedirect = (payload) => {
    return { type: constants.LOGIN_REDIRECT, payload };
};

export const deleteJobPost = (payload) => {
    return { type: constants.JOB_POST_DELETED, payload };
};

export const openLogin = (payload) => {
    return { type: constants.LOGIN_MODAL_OPEN, payload };
};
export const closeLogin = (payload) => {
    return { type: constants.LOGIN_MODAL_CLOSED, payload };
};

export const registerOpenType = (payload) => {
    return { type: constants.REGISTER_MODAL_TYPE, payload };
};
export const openRegister = (payload) => {
    return { type: constants.REGISTER_MODAL_OPEN, payload };
};
export const closeRegister = (payload) => {
    return { type: constants.REGISTER_MODAL_CLOSED, payload };
};
export const login = (payload) => {
    return { type: constants.USER_LOGGED_IN, payload: payload };
};
export const loginError = (payload) => {
    return { type: constants.LOGIN_ERRORED, payload: payload };
};
export const clearLoginErrors = (payload) => {
    return { type: constants.CLEARED_LOGIN_ERROR, payload: payload };
};
export const logUserout = () => {
    return { type: constants.USER_LOGGED_OUT, payload: null };
};
export const loadingUser = (payload) => {
    return { type: constants.LOADING_USER, payload: payload };
};
export const signupEror = (payload) => {
    return { type: constants.SIGNUP_ERRORED, payload: payload };
};
export const updateProfile = (payload) => {
    return { type: constants.USER_PROFILE_UPDATED, payload: payload };
};
export const vacancySaved = (payload) => {
    return { type: constants.NEW_VACANCY_SAVED, payload };
};
export const newVacancy = (payload) => {
    return { type: constants.NEW_VACANCY_DATA, payload };
};

export const vacancySavError = (payload) => {
    return { type: constants.NEW_VACANCY_SAVE_ERROR, payload };
};
export const saveInProgress = (payload) => {
    return { type: constants.SAVE_IN_PROGRESS, payload };
};
export const clearVacancySaveState = () => {
    return { type: constants.CLEAR_POST_JOB_STATE };
};
export const getProfile = (payload) => {
    return { type: constants.FETCHED_USER_PROFILE, payload: payload };
};
export const setIsRecruiter = (payload) => {
    return { type: constants.IS_RECRUITER_SET, payload: payload };
};
export const failedFethingProfile = (payload) => {
    return { type: constants.FETCHING_USER_PROFILE_FAILED, payload: payload };
};
export const profileUpdateInProgress = (payload) => {
    return { type: constants.USER_UPDATE_IN_PROGRESS, payload };
};
export const loadingProfile = (payload) => {
    return { type: constants.LOADING_PROFILE, payload: payload };
};
export const loadingMeta = () => {
    return { type: constants.LOADING_CV_META };
};
export const failedFetchingMeta = (payload) => {
    return { type: constants.FAILED_FETCHING_CV_META, payload: payload };
};
export const fetchedCvMeta = (payload) => {
    return { type: constants.FETCHED_CV_META, payload: payload };
};
export const resetCv = () => {
    return { type: constants.RESET_CV };
};
export const fetchedJobs = (payload) => {
    return { type: constants.FETCHED_JOBS, payload };
};
export const loadingJobs = (payload) => {
    return { type: constants.LOADING_VACANCIES, payload };
};
export const errorLoadingJobs = (payload) => {
    return { type: constants.ERROR_LOADING_VACANCIES, payload };
};
export const fetchedMyjob = (payload) => {
    return { type: constants.FETCHED_MY_VACANCIES, payload };
};
export const ErrorFetchingMyJobs = (payload) => {
    return { type: constants.ERROR_FETCHING_MY_VACANCIES, payload };
};
export const loadingMyJobs = (payload) => {
    return { type: constants.LOADING_MY_VACANCIES, payload };
};
export const loadingPasswordReset = (payload) => {
    return { type: constants.LOADING_PASSWORD_RESET, payload };
};
export const passwordRestSuccess = (payload) => {
    return { type: constants.PASSWORD_RESET_SUCCESS, payload };
};
export const passwordRestFailed = (payload) => {
    return { type: constants.PASSWORD_RESET_FAILED, payload };
};
export const clearPassInputs = (payload) => {
    return { type: constants.CLEAR_PASSWORD_RESET_INPUTS, payload };
};
export const resetPassReset = (payload) => {
    return { type: constants.CLEAR_PASS_RESET, payload };
};
export const userEmailUpdated = (payload) => {
    return { type: constants.USER_EMAIL_UPDATED, payload };
};
export const userEmailUpdateFailed = (payload) => {
    return { type: constants.USER_EMAIL_UPDATE_FAILED, payload };
};
export const updateUserTel = (payload) => {
    return { type: constants.USER_PHONE_UPDATED, payload };
};
export const updateUserTelFailed = (payload) => {
    return { type: constants.USER_PHONE_UPDATE_FAILED, payload };
};
export const updateUserWeb = (payload) => {
    return { type: constants.USER_WEBSITE_UPDATED, payload };
};
export const updateUserWebFailed = (payload) => {
    return { type: constants.USER_WEBSITE_UPDATE_FAILED, payload };
};
export const updateUserDisplayName = (payload) => {
    return { type: constants.USER_DISPLAYNAME_UPDATED, payload };
};
export const updateUserDisplayNameInProgress = (payload) => {
    return { type: constants.USER_DISPLAYNAME_UPDATED_IN_PROGRESS, payload };
};
export const updateDisplaynameFailed = (payload) => {
    return { type: constants.USER_DISPLAYNAME_UPDATE_FAILED, payload };
};
export const clearRecruiterUpdate = () => {
    return { type: constants.CLEAR_RECRUITER_UPDATE };
};
export const updateRecruiterImageFailed = (payload) => {
    return { type: constants.UPDATE_RECRUITER_IMAGE_FAILED, payload };
};
export const updateRecruiterInProgress = (payload) => {
    return { type: constants.UPDATE_RECRUITER_IMAGE_IN_PROGRESS, payload };
};
export const updateRecruiter = (payload) => {
    return { type: constants.UPDATE_RECRUITER_IMAGE, payload };
};
export const applicationSuccess = (payload) => {
    return { type: constants.APPLICATION_SUCCESS, payload };
};
export const applicationInProgress = (payload) => {
    return { type: constants.APPLICATION_IN_PROGRESS, payload };
};
export const applicationFailed = (payload) => {
    return { type: constants.APPLICATION_FAILED, payload };
};
export const clearApplication = () => {
    return { type: constants.CLEAR_APPLICATION };
};
export const fetchedApplicants = (payload) => {
    return { type: constants.FETCHED_APPLICANTS, payload };
};
export const loadingApplicants = (payload) => {
    return { type: constants.LOADING_APPLICANTS, payload };
};
export const failedFetchingApplicants = (payload) => {
    return { type: constants.FAILED_FETCHING_APPLICANTS, payload };
};
export const clearApplicants = () => {
    return { type: constants.CLEAR_APPLICANTS };
};
export const fetchedMyApplication = (payload) => {
    return { type: constants.FETCHED_MY_APPLICATIONS, payload };
};
export const loadingMyApplication = (payload) => {
    return { type: constants.LOADING_MY_APPLICATIONS, payload };
};
export const failedFetchingMyApplication = (payload) => {
    return { type: constants.FAILED_FETCHING_MY_APPLICATIONS };
};
export const setMeetingName = (payload) => {
    return { type: constants.STORED_USER_MEETING_NAME, payload };
};
export const savedSchedule = (payload) => {
    return { type: constants.SAVED_SCHEDULE, payload };
};
export const savingSchedule = (payload) => {
    return { type: constants.SAVE_SCHEDULE_IN_PROGRESS, payload };
};
export const errorSavingPaylaod = (payload) => {
    return { type: constants.FAILED_SAVING_SCHEDULE, payload };
};
export const resetSchedule = () => {
    return { type: constants.RESET_SCHEDULE };
};
export const fetchedMyMeetings = (payload) => {
    return { type: constants.FETCHED_MY_MEETINGS, payload };
};
export const fetchingMyMeetings = (payload) => {
    return { type: constants.FETCH_MY_MEETINGS_IN_PROGRESS, payload };
};
export const failedfetchingMyMeetings = (payload) => {
    return { type: constants.FAILED_FETCHING_MY_MEETINGS, payload };
};
export const applicantStatusUpdated = (payload) => {
    return { type: constants.APPLICANT_STATUS_UPDATED, payload };
};
export const applicantStatusUpdateInProgress = (payload) => {
    return { type: constants.APPLICANT_STATUS_UPDATE_IN_PROGRESS, payload };
};
export const failedUpdatingApplicantStatus = (payload) => {
    return { type: constants.FAILED_UPDATING_APPLICANT_STATUS, payload };
};
export const resetApplicantStatus = () => {
    return { type: constants.RESET_APPLICANT_STATUS };
};
export const savedCV = () => {
    return { type: constants.SAVED_CV };
};
export const saveCVInProgress = (payload) => {
    return { type: constants.SAVE_CV_IN_PROGRESS, payload };
};
export const errorSavingCV = (payload) => {
    return { type: constants.FAILED_SAVING_CV, payload };
};
export const register_completed = (payload) => {
    return { type: constants.REGISTER_COMPLETED, payload };
};
export const reset_register_completed = (payload) => {
    return { type: constants.RESET_REGISTER_COMPLETED, payload };
};

export const loadingInterviewResponse = (payload) => {
    return { type: constants.LOADING_INTERVIEW_RESPONSE, payload };
};
export const interviewResponseReceived = (payload) => {
    return { type: constants.RESPONDED_INTERVIEW, payload };
};

export const fetchedEditableJob = (payload) => {
    return { type: constants.FETCHED_EDITABLE_JOB, payload };
};
export const loadingFetchedEditableJob = (payload) => {
    return { type: constants.LOADING_EDITABLE_JOB, payload };
};

export const updateRoomParticipants = (payload) => {
    return { type: constants.PARTICIPANTS_LIST_CHANGE, payload };
};

export const updateVoostRoomUser = (payload) => {
    return { type: constants.MY_VOOST_ROOM_USER, payload };
};

export const setChatMeetingId = (payload) => {
    return { type: constants.SET_MEETING_CHAT_ID, payload };
};

export const handleInterviewRequest = (payload) => {
    return (dispatch) => {
        dispatch(loadingInterviewResponse(true));
        var date = new Date();
        const mins = date.getMinutes();
        var readableTime =
            date.getHours() + ":" + (mins.length === 1 ? "0" + mins : mins);
        var readableDate =
            date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        // console.log("APPLICANT ID: ", applicantId)
        const applicationId = payload.applicationId;
        const notifyId = payload.recruiterId;

        console.log("NOTIFY ID: ", notifyId);
        console.log("application ID: ", applicationId);

        rdb.ref("notifications/" + notifyId).set({ unread: true });
        const receiverData = db.collection("users").doc(notifyId);

        const notifications = receiverData.collection("notifications");

        notifications
            .add({
                id: uuidv4(),
                sortDate: date,
                date: readableDate,
                time: readableTime,
                type: "Interview Response",
                viewed: false,
                application_id: applicationId,
                interviewResponse: payload.interviewResponse,
                interviewee: payload.interviewee,
            })
            .then((docRef) => {
                docRef.get().then((doc) => {
                    docRef.update({ ...doc.data(), id: docRef.id });
                });
            });

        if (!payload.interviewResponse) {
            // REMOVE SCHEDULED INTERVIEW.....
            console.error("DELETING MEETING- DUE TO REFUSAL....");
            db.collection("users")
                .doc(payload.recruiterId)
                .collection("meetings")
                .doc(payload.meetingId)
                .delete()
                .then(() => {
                    console.log("Recruiter Document successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });

            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("meetings")
                .doc(payload.meetingId)
                .delete()
                .then(() => {
                    console.log("currentUser Document successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        } else {
            receiverData
                .get()
                .then(async (recDoc) => {
                    const rd = recDoc.data();
                    const emailData = {
                        email: rd.email,
                        name: rd.company_name,
                    };
                    mailSender(emailData, "interviewAccepted");
                })
                .catch((err) => {
                    console.log("ERROR GETTING RECEIVER DATA");
                });
        }
        dispatch(interviewResponseReceived(payload.interviewResponse)); // stops loader also
    };
};

export const updateApplicantStatus = (payload) => {
    return (dispatch) => {
        console.log(" payload.applicationID : ", payload);
        dispatch(applicantStatusUpdateInProgress(payload.applicationID));
        if (
            payload.id &&
            payload.applicantId &&
            payload.applicationID &&
            auth.currentUser.uid
        ) {
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("jobposts")
                .doc(payload.id)
                .collection("applications")
                .doc(payload.applicationID)
                .update({
                    status: payload.status,
                })
                .then(() => {
                    if ("rejected" === payload.status) {
                        var updates = {};
                        updates[
                            "/messages/" + payload.applicationID + "/closed"
                        ] = true;
                        rdb.ref().update(updates);
                    }

                    if (payload.applicantId && payload.applicationID) {
                        console.log(payload.applicantId);
                        console.log(payload.applicationID);
                        fetch(`${getEndpoint()}/api/application/updateStatus`, {
                            method: "POST",
                            body: JSON.stringify(payload),
                            headers: { "Content-Type": "application/json" },
                        })
                            .then((res) => {
                                if (res.ok) {
                                    dispatch(
                                        applicantStatusUpdateInProgress(false)
                                    );
                                    dispatch(
                                        applicantStatusUpdated(
                                            payload.applicationID
                                        )
                                    );
                                    console.log("ok");
                                }
                            })
                            .catch((err) => {
                                dispatch(
                                    applicantStatusUpdateInProgress(false)
                                );
                                dispatch(failedUpdatingApplicantStatus(err));
                                console.log(err);
                            });
                    }

                    dispatch(getApplicants(payload.id));
                })
                .catch((err) => {
                    dispatch(applicantStatusUpdateInProgress(false));
                    dispatch(failedUpdatingApplicantStatus(err));
                });
        } else {
            dispatch(
                failedUpdatingApplicantStatus({
                    message: "Something went wrong, try again later",
                })
            );
        }
    };
};

export const fetchMyMeetings = () => {
    return (dispatch) => {
        dispatch(fetchingMyMeetings(true));
        db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("meetings")
            .get()
            .then((snapshot) => {
                const meetings = [];
                snapshot.forEach((snap) => {
                    meetings.push(snap);
                });
                dispatch(fetchingMyMeetings(false));
                dispatch(fetchedMyMeetings(meetings));
            })
            .catch((err) => {
                dispatch(fetchingMyMeetings(false));
                dispatch(failedfetchingMyMeetings(err));
            });
    };
};

export const createRoomChat = (payload) => {
    console.log("CREATE CHAT ROOM...");
    return (dispatch) => {
        var ref = rdb.ref("voostRoomChat/" + payload);

        ref.once("value").then(function (snapshot) {
            var roomExists = snapshot.exists(); //
            console.log("ROOM EXISTS: ", roomExists);
            if (!roomExists) {
                rdb.ref("voostRoomChat/" + payload).set({
                    active: true,
                    messages: [],
                });
            }
        });
    };
};

export const SaveSchedule = (schedule) => {
    return (dispatch) => {
        console.log(schedule.theJob);
        if (schedule.theJob === null) {
            delete schedule.theJob;
        }

        if (!schedule.id) {
            delete schedule.id;
        }

        if (!schedule.applicant) {
            delete schedule.applicant;
        }

        if (schedule.id && schedule.id !== null) {
            console.log("SETTING MEETING..............");

            console.log(schedule.id);
            dispatch(savingSchedule(true));
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("meetings")
                .doc(schedule.id)
                .update(schedule)
                .then((snap) => {
                    console.log({ schedule });
                    //update seeker meeting
                    if (schedule.applicant?.applicantId) {
                        const scheduleData = {
                            seekerId: schedule.applicant.applicantId,
                            meetingId: schedule.id,
                            meeting: schedule,
                        };
                        console.log({ scheduleData });
                        fetch(`${getEndpoint()}/api/seeker/meeting`, {
                            method: "POST",
                            body: JSON.stringify(scheduleData),
                            headers: { "Content-Type": "application/json" },
                        })
                            .then((res) => {
                                if (res.ok) {
                                    dispatch(savingSchedule(false));
                                    dispatch(savedSchedule({ sucess: true }));
                                    console.log("schedule saved for seeker");
                                    fetchMyMeetings();
                                }
                            })
                            .catch((err) => {
                                dispatch(savingSchedule(false));
                                dispatch(errorSavingPaylaod(err));
                                console.log(err);
                            });
                    } else {
                        dispatch(savingSchedule(false));
                        dispatch(savedSchedule({ sucess: true }));
                        console.log("there was no seeker");
                        fetchMyMeetings();
                    }
                })
                .catch((err) => {
                    dispatch(savingSchedule(false));
                    dispatch(errorSavingPaylaod(err));
                    console.log(err);
                    //
                });
        } else {
            dispatch(savingSchedule(true));

            const scheduleBatch = db.batch();
            if (
                schedule.applicant?.jobId &&
                schedule.applicant?.applicationID
            ) {
                dispatch(
                    applicantStatusUpdateInProgress(
                        schedule.applicant.applicationID
                    )
                );
                const applicationRef = db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("jobposts")
                    .doc(schedule.applicant.jobId)
                    .collection("applications")
                    .doc(schedule.applicant.applicationID);
                scheduleBatch.update(applicationRef, { status: "Interview" });
            }

            const recruiterRef = db
                .collection("users")
                .doc(auth.currentUser.uid)
                .collection("meetings")
                .doc();
            scheduleBatch.set(recruiterRef, schedule);
            const scheduleRef = db.collection("meetings").doc();
            scheduleBatch.set(scheduleRef, {
                meetingRoomId: schedule.meetingRoomId,
            });
            scheduleBatch
                .commit()
                .then(() => {
                    if (schedule.applicant && schedule.applicant.applicantId) {
                        const scheduleData = {
                            seekerId: schedule.applicant.applicantId,
                            meetingId: recruiterRef.id,
                            meeting: schedule,
                        };
                        fetch(`${getEndpoint()}/api/seeker/meeting`, {
                            method: "POST",
                            body: JSON.stringify(scheduleData),
                            headers: { "Content-Type": "application/json" },
                        })
                            .then((res) => {
                                if (res.ok) {
                                    dispatch(savingSchedule(false));
                                    dispatch(
                                        applicantStatusUpdateInProgress(false)
                                    );
                                    dispatch(savedSchedule({ sucess: true }));
                                    console.log("schedule saved for seeker");

                                    if (schedule.applicant?.jobId) {
                                        dispatch(
                                            getApplicants(
                                                schedule.applicant.jobId
                                            )
                                        );
                                    }
                                    fetchMyMeetings();

                                    var date = new Date();
                                    const mins = date.getMinutes();
                                    var readableTime =
                                        date.getHours() +
                                        ":" +
                                        (mins.length === 1 ? "0" + mins : mins);
                                    var readableDate =
                                        date.getDate() +
                                        "/" +
                                        date.getMonth() +
                                        "/" +
                                        date.getFullYear();

                                    // console.log("APPLICANT ID: ", applicantId)
                                    const notifyId =
                                        schedule.applicant.applicantId;
                                    const applicationId =
                                        schedule.applicant.applicationID;

                                    console.log("response data: ", res);
                                    console.log("scheduleData: ", scheduleData);
                                    console.log("NOTIFY ID: ", notifyId);
                                    console.log(
                                        "application ID: ",
                                        applicationId
                                    );

                                    rdb.ref("notifications/" + notifyId).set({
                                        unread: true,
                                    });
                                    const notifications = db
                                        .collection("users")
                                        .doc(notifyId)
                                        .collection("notifications");

                                    notifications
                                        .add({
                                            id: uuidv4(),
                                            sortDate: date,
                                            date: readableDate,
                                            time: readableTime,
                                            type: "Interview",
                                            viewed: false,
                                            application_id: applicationId,
                                            meetingData: scheduleData,
                                        })
                                        .then((docRef) => {
                                            docRef.get().then((doc) => {
                                                docRef.update({
                                                    ...doc.data(),
                                                    id: docRef.id,
                                                });
                                            });
                                        });
                                }
                            })
                            .catch((err) => {
                                dispatch(savingSchedule(false));
                                dispatch(errorSavingPaylaod(err));
                                console.log(err);
                            });
                    } else {
                        if (schedule?.recEmail.length > 0) {
                            const scheduleData = {
                                email: schedule?.recEmail,
                                topic: schedule?.topic,
                                date: schedule?.emailDate,
                                time: schedule?.startTime,
                                sender: schedule?.sender,
                                meetingId: schedule?.meetingRoomId,
                            };
                            mailSender(scheduleData, "scheduleEmail");
                        }

                        dispatch(savingSchedule(false));
                        dispatch(savedSchedule({ sucess: true }));
                        console.log("schedule saved for seeker");
                        fetchMyMeetings();
                    }
                })
                .catch((err) => {
                    dispatch(savingSchedule(false));
                    dispatch(errorSavingPaylaod(err));
                    console.log(err);
                });
        }
    };
};

export const getMyApplications = () => {
    return (dispatch) => {
        if (auth.currentUser) {
            dispatch(loadingMyApplication(true));
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("myApplications")
                .get()
                .then((snapshot) => {
                    const myApplications = [];
                    snapshot.forEach((application) => {
                        myApplications.push(application);
                    });
                    dispatch(loadingMyApplication(false));
                    dispatch(fetchedMyApplication(myApplications));
                })
                .catch((err) => {
                    dispatch(loadingMyApplication(false));
                    dispatch(failedFetchingMyApplication(err));
                });
        } else {
            dispatch(
                failedFetchingMyApplication({ message: "Login Required" })
            );
        }
    };
};

export const getApplicants = (payload) => {
    return (dispatch) => {
        dispatch(loadingApplicants(true));
        db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("jobposts")
            .doc(payload)
            .collection("applications")
            .get()
            .then((snapshot) => {
                dispatch(loadingApplicants(false));
                const applicants = [];
                snapshot.forEach((applicant) => {
                    applicants.push(applicant);
                });
                dispatch(fetchedApplicants(applicants));
            })
            .catch((err) => {
                dispatch(failedFetchingApplicants(err));
            });
    };
};

export const getApplicant = (payload) => {
    return (dispatch) => {
        dispatch(loadingApplicant(true));

        db.collection("users")
            .doc(payload.uid)
            .get()
            .then(async (doc) => {
                // dispatch(loadingApplicant(false));

                const application = await db
                    .collection("users")
                    .doc(payload.uid)
                    .collection("myApplications")
                    .doc(payload.aid)
                    .get()
                    .then((doc_application) => {
                        // const  applicant = {application : {...doc_application.data()}, applicant: {...applicant}}
                        return doc_application.data();
                    })
                    .catch((err) => {
                        dispatch(failedFetchingApplicant(err));
                    });
                const applicant = {
                    a: { ...doc.data() },
                    b: { ...application },
                };

                dispatch(loadingApplicant(false));
                dispatch(fetchedCurrentApplicant(applicant));
            })
            .catch((err) => {
                dispatch(failedFetchingApplicant(err));
            });
    };
};

export const applyForVacancy = (payload, jobId, recruiter, job) => {
    return (dispatch) => {
        dispatch(applicationInProgress(true));
        if (recruiter && jobId) {
            // Get a new write batch
            const batch = db.batch();
            console.log(`recruiter_id: ${recruiter}, id: ${jobId}`);
            //add new application to recruiter jobpost > job > applications
            //TODO: move this to a seperate function
            const apply = db
                .collection("users")
                .doc(recruiter)
                .collection("jobposts")
                .doc(jobId)
                .collection("applications")
                .doc();
            payload.status = "Applied";
            payload.applicantId = auth.currentUser.uid;

            console.log("APPLY IS: ", apply);
            console.log("payload IS: ", payload);
            batch.set(apply, payload);

            //add application to my appplications collections
            const myapplications = db
                .collection("users")
                .doc(auth.currentUser.uid)
                .collection("myApplications")
                .doc(apply.id);
            batch.set(myapplications, {
                applicationId: apply.id,
                jobId,
                jobTitle: job.jobTitle,
                recruiter_name: job.recruiter_name,
                recruiter_image: job.recruiter_image,
                timestamp: new Date(),
                status: "Applied",
            });

            batch
                .commit()
                .then((snap) => {
                    dispatch(applicationInProgress(false));
                    dispatch(applicationSuccess(jobId));
                    dispatch(getMyApplications());

                    var date = new Date();
                    const mins = date.getMinutes();
                    var readableTime =
                        date.getHours() +
                        ":" +
                        (mins.length === 1 ? "0" + mins : mins);
                    var readableDate =
                        date.getDate() +
                        "/" +
                        date.getMonth() +
                        "/" +
                        date.getFullYear();

                    const applicationId = apply.id;
                    const notifyId = recruiter;

                    console.log("NOTIFY ID: ", notifyId);
                    console.log("application ID: ", applicationId);

                    rdb.ref("notifications/" + notifyId).set({ unread: true });

                    const recruiterData = db.collection("users").doc(notifyId);

                    recruiterData
                        .get()
                        .then(async (recDoc) => {
                            const rd = recDoc.data();
                            mailSender(
                                { name: rd.company_name, email: rd.email },
                                "receivedApplication"
                            );
                        })
                        .catch((err) => {
                            console.log("err", err);
                        });

                    const notifications =
                        recruiterData.collection("notifications");
                    notifications
                        .add({
                            id: uuidv4(),
                            sortDate: date,
                            date: readableDate,
                            time: readableTime,
                            type: "Job Application",
                            viewed: false,
                            application_id: applicationId,
                            jobTitle: job.jobTitle,
                            jobId: job.id,
                        })
                        .then((docRef) => {
                            docRef.get().then((doc) => {
                                docRef.update({ ...doc.data(), id: docRef.id });
                            });
                        });

                    const endpoint =
                        (!process.env.NODE_ENV ||
                        process.env.NODE_ENV === "development"
                            ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                            : process.env.REACT_APP_LIVE_NODE_ENDPOINT) +
                        `/report-application`;

                    axios
                        .post(endpoint, {
                            recruiter: job.recruiter_name,
                            values: [
                                job.jobTitle,
                                payload.email,
                                payload.name,
                                readableDate,
                                readableTime,
                            ],
                        })
                        .then(function (response) {
                            console.log("response:.....", response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    axios.post("http://");
                })
                .catch((err) => {
                    dispatch(applicationInProgress(false));
                    dispatch(applicationFailed(err));
                });
        } else {
            dispatch(applicationInProgress(false));
            dispatch(applicationFailed({ message: "Something went wrong" }));
        }
    };
};

export const resetUserPass = (payload) => {
    return (dispatch) => {
        dispatch(loadingPasswordReset(true));
        auth.currentUser
            .updatePassword(payload.password)
            .then(() => {
                dispatch(loadingPasswordReset(false));
                dispatch(passwordRestSuccess(true));
                dispatch(clearPassInputs());
                setTimeout(() => {
                    dispatch(resetPassReset(true));
                }, 5000);
            })
            .catch((err) => {
                dispatch(loadingPasswordReset(false));
                dispatch(passwordRestFailed(err));
                setTimeout(() => {
                    dispatch(resetPassReset(true));
                }, 5000);
            });
    };
};

//this fetcheds only your job posts
export const getMyJobs = () => {
    return (dispatch) => {
        dispatch(loadingMyJobs(true));
        const posts = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("jobposts");

        posts
            .get()
            .then(async (snapshot) => {
                dispatch(loadingMyJobs(false));
                const myvacancies = [];

                // console.log("SNAPSHOW", snapshot)

                snapshot.forEach((doc) => {
                    myvacancies.push(doc);

                    // const apps = posts.doc(doc.data().id).collection('applications')

                    // apps.get().then( async (appSnap) => {
                    //     let counter = 0;
                    //     appSnap.forEach(element => {
                    //         ++counter;
                    //     });
                    //     return counter;

                    // }).then( async (x) => {

                    //     console.log("x", x)
                    //     const obj = {...doc.data(), appCount: x};
                    //     console.log("OBJ: ", obj)

                    // }).catch(err => {
                    //     console.log("err", err)
                    // })
                });

                console.log("GOT JOBS...", myvacancies);
                dispatch(fetchedMyjob(myvacancies));
            })
            .catch((err) => {
                console.log("err", err);
                dispatch(loadingMyJobs(false));
                dispatch(ErrorFetchingMyJobs(err));
            });
    };
};

//this fetcheds only your job posts
export const getJob = (id) => {
    return (dispatch) => {
        dispatch(loadingFetchedEditableJob(true));
        const post = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("jobposts")
            .doc(id);
        post.get()
            .then(async (myJob) => {
                dispatch(fetchedEditableJob(myJob.data()));
            })
            .catch((err) => {
                console.log("err", err);
                dispatch(loadingMyJobs(false));
                dispatch(ErrorFetchingMyJobs(err));
            });
    };
};

//this fetcheds only your job posts
export const deleteJob = (id) => {
    return (dispatch) => {
        console.log("DELETING JOB.....");

        const post = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("jobposts")
            .doc(id);
        post.get()
            .then(async (myJob) => {
                const updatedJob = {
                    ...myJob.data(),
                    closed: true,
                    isLive: false,
                };
                post.set(updatedJob);

                db.collection("jobs")
                    .doc(id)
                    .delete()
                    .then(() => {
                        console.log("Document successfully deleted!");
                        dispatch(deleteJobPost(true));
                    })
                    .catch((error) => {
                        console.error("Error removing document: ", error);
                    });
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
};

//this gets all jobs
export const getVacancies = () => {
    return (dispatch) => {
        dispatch(loadingJobs(true));
        const jobsRef = db
            .collection("jobs")
            .where("isLive", "!=", false)
            .limit(5);
        jobsRef
            .get()
            .then((snapshot) => {
                // dispatch(fetchedJobs(snapshot));
                const vacancies = [];
                snapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    vacancies.push(doc);
                });
                dispatch(fetchedJobs(vacancies));
                dispatch(loadingJobs(false));
            })
            .catch((err) => {
                dispatch(errorLoadingJobs(err));
                dispatch(loadingJobs(false));
            });
    };
};

export const getVerificationLink = (data) => {
    return async (dispatch) => {
        const endpoint =
            (!process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                : process.env.REACT_APP_LIVE_NODE_ENDPOINT) +
            `/send-verification-link`;
        // const endpoint =   process.env.REACT_APP_TEST_NODE_ENDPOINT +  `/verify_user`
        console.log("endpoint: ", endpoint);
        console.log("sending.....");
        console.log("data to send : ", data);
        axios
            .post(endpoint, {
                email: data.email,
            })
            .then(function (response) {
                console.log("response:.....", response);
                if (response.data.success) {
                    const urlParams = new URLSearchParams(
                        window.location.search
                    );

                    mailSender(
                        {
                            email: data.email,
                            name: data.name,
                            link:
                                response.data.link +
                                (!data.isRecruiter && urlParams.get("jobId")
                                    ? `&jobId=${urlParams.get("jobId")}`
                                    : ""),
                        },
                        "verifyAccount"
                    );
                } else {
                    return false;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export function signupUser(payload) {
    return async (dispatch) => {
        dispatch(loadingUser(true));
        if (payload.recruiter === true) {
            let temp_user = 0;
            await auth
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then(async (user) => {
                    dispatch(login(user));
                    temp_user = auth.currentUser.uid;
                    //   auth.currentUser.sendEmailVerification();
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(signupEror(err));
                    dispatch(loadingUser(false));
                });

            // dispatch(
            //     getVerificationLink({
            //         email: payload.email,
            //         name: payload.name,
            //         isRecruiter: true,
            //     })
            // );
            mailSender(
                {
                    email: payload.email,
                    password: payload.password,
                    name: payload.name,
                    recruiter: payload.recruiter,
                },
                "welcome"
            );

            const userPayload = {
                company_name: payload.company,
                company_position: payload.companyPosition,
                phone: payload.phone,
                full_name: payload.name,
                recruiter: true,
                email: payload.email,
                id: temp_user,
                date: Date.now(),
            };

            db.collection("users")
                .doc(temp_user)
                .set(userPayload)
                .then(() => {
                    // dispatch(loadingUser(false));
                    // dispatch(getUserProfile());
                    // dispatch(register_completed(true))

                    console.log("Before Logout");
                    dispatch(loadingUser(false));
                    // dispatch(logout());
                })
                .then(() => {
                    console.log("document set....");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            let temp_user = 0;
            auth.createUserWithEmailAndPassword(payload.email, payload.password)
                .then((user) => {
                    dispatch(login(user));
                    temp_user = auth.currentUser.uid;
                    //   auth.currentUser.sendEmailVerification();
                })
                .then(async () => {
                    ReactPixel.trackCustom("Lead", {});

                    window.dataLayer.push({
                        "gtm.start": new Date().getTime(),
                        event: "gtm.js",
                        event: "Lead",
                    });

                    mailSender(
                        {
                            email: payload.email,
                            password: payload.password,
                            name: payload.name,
                            recruiter: payload.recruiter,
                        },
                        "welcome"
                    );

                    // dispatch(
                    //     getVerificationLink({
                    //         email: payload.email,
                    //         name: payload.name,
                    //         isRecruiter: false,
                    //     })
                    // );

                    db.collection("users")
                        .doc(temp_user)
                        .set(
                            {
                                name: payload.name,
                                recruiter: false,
                                email: payload.email,
                                id: temp_user,
                                date: Date.now(),
                            },
                            { merge: true }
                        )
                        .then(() => {
                            // dispatch(getUserProfile());
                            // dispatch(register_completed(true));
                            console.log("Before Logout");

                            dispatch(loadingUser(false));
                            // dispatch(logout());
                        });
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(signupEror(err));
                    dispatch(loadingUser(false));
                });
        } // request.auth != null
    };
}

export function getUserProfile() {
    return (dispatch) => {
        dispatch(loadingProfile(true));
        // console.log("GOT USER DATA auth.currentUser.uid,,,,,,,,,,,,",auth.currentUser.uid)

        const profileRef = db.collection("users").doc(auth.currentUser.uid);
        profileRef
            .get()
            .then((profileDoc) => {
                dispatch(loadingProfile(false));
                dispatch(getProfile(profileDoc.data()));
                dispatch(setIsRecruiter(profileDoc.data().recruiter));

                if (!profileDoc.data().recruiter) {
                    if (profileDoc.data().cv) {
                        dispatch(fetchedCvMeta(profileDoc.data().cv));
                    }
                }
            })
            .catch((err) => {
                dispatch(loadingProfile(false));
                dispatch(failedFethingProfile(err));
            });
    };
}

export function updateUserProfile(payload) {
    return async (dispatch) => {
        console.log("PAYLOAD: ", payload);
        //dispatch loading
        dispatch(profileUpdateInProgress(true));
        console.log("payload.cv: ", payload.cv);
        if (typeof payload.cv !== "undefined" && payload.cv !== null) {
            dispatch(loadingMeta(true));
            //here we're saving the file
            let metadata = {
                name: payload.cv.name,
            };
            dispatch(saveCVInProgress(true));
            storage
                .ref()
                .child("resumes")
                .child(auth.currentUser.uid)
                .child(payload.cv.name)
                .put(payload.cv, metadata)
                .then((snapshot) => {
                    // the file has saved so we need to return the download url and update our profile

                    snapshot.ref
                        .getDownloadURL()
                        .then((url) => {
                            db.collection("users")
                                .doc(auth.currentUser.uid)
                                .update({
                                    cv: { url, name: snapshot.metadata.name },
                                })
                                .then(() => {
                                    dispatch(profileUpdateInProgress(false));
                                    payload = {
                                        url,
                                        name: snapshot.metadata.name,
                                    };
                                    dispatch(loadingMeta(false));
                                    dispatch(
                                        fetchedCvMeta({
                                            name: payload.name,
                                            url: payload.url,
                                        })
                                    );
                                    console.log("cv url Saved");
                                    dispatch(saveCVInProgress(false));
                                    dispatch(savedCV());
                                    dispatch(getUserProfile());
                                });
                        })
                        .catch((err) => {
                            dispatch(profileUpdateInProgress(false));
                            dispatch(loadingMeta(false));
                            dispatch(errorSavingCV);
                            dispatch(failedFetchingMeta(err));
                        });
                })
                .catch((err) => {
                    dispatch(profileUpdateInProgress(false));
                    console.log("error saving company image: " + err.message);
                    dispatch(updateDisplaynameFailed(err));
                });
        }
        if (payload.email) {
            auth.currentUser
                .updateEmail(payload.email)
                .then(() => {
                    dispatch(userEmailUpdated(true));
                })
                .catch((err) => {
                    dispatch(userEmailUpdateFailed(err));
                });
        }
        if (payload.phone) {
            db.collection("users")
                .doc(auth.currentUser.uid)
                .update(payload)
                .then(() => {
                    dispatch(updateUserTel());
                })
                .catch((err) => {
                    dispatch(updateUserTelFailed(err));
                });
        }
        if (payload?.name) {
            dispatch(updateUserDisplayNameInProgress(true));
            db.collection("users")
                .doc(auth.currentUser.uid)
                .update(payload)
                .then((snap) => {
                    dispatch(updateUserDisplayNameInProgress(false));
                    dispatch(updateUserDisplayName(true));
                    //clear update
                })
                .catch((err) => {
                    dispatch(updateUserDisplayNameInProgress(false));
                    dispatch(updateUserWebFailed(err));
                });
        }
        dispatch(getUserProfile());
    };
}

export function UpdateRecruiteProfile(payload) {
    return (dispatch) => {
        console.log(payload);
        dispatch(updateRecruiterInProgress(true));
        if (payload.email) {
            auth.currentUser
                .updateEmail(payload.email)
                .then(() => {
                    dispatch(userEmailUpdated(true));
                })
                .catch((err) => {
                    dispatch(userEmailUpdateFailed(err));
                });
        }
        if (payload.full_name) {
            db.collection("users")
                .doc(auth.currentUser.uid)
                .update(payload)
                .then(() => {
                    dispatch(updateUserDisplayNameInProgress(false));
                    dispatch(updateUserDisplayName(true));
                })
                .catch((err) => {
                    dispatch(updateUserTelFailed(err));
                });
        }
        if (payload.phone) {
            db.collection("users")
                .doc(auth.currentUser.uid)
                .update(payload)
                .then(() => {
                    dispatch(updateUserTel());
                })
                .catch((err) => {
                    dispatch(updateUserTelFailed(err));
                });
        }
        if (payload.company_website) {
            db.collection("users")
                .doc(auth.currentUser.uid)
                .update(payload)
                .then(() => {
                    dispatch(updateUserWeb(true));
                    //clear update
                })
                .catch((err) => {
                    dispatch(updateUserWebFailed(err));
                });
        }
        if (payload.company_name) {
            dispatch(updateUserDisplayNameInProgress(true));
            db.collection("users")
                .doc(auth.currentUser.uid)
                .update(payload)
                .then((snap) => {
                    dispatch(updateUserDisplayNameInProgress(false));
                    dispatch(updateUserDisplayName(true));
                    //clear update
                })
                .catch((err) => {
                    dispatch(updateUserDisplayNameInProgress(false));
                    dispatch(updateUserWebFailed(err));
                });
        }
        if (payload.company_image) {
            dispatch(updateRecruiterInProgress(true));
            let metadata = {
                name: payload.company_image.name,
            };
            storage
                .ref()
                .child("recruiters")
                .child(auth.currentUser.uid)
                .child(payload.company_image.name)
                .put(payload.company_image, metadata)
                .then((snapshot) => {
                    // the file has saved so we need to return the download url and update our profile

                    snapshot.ref.getDownloadURL().then((url) => {
                        db.collection("users")
                            .doc(auth.currentUser.uid)
                            .update({
                                company_image: {
                                    url,
                                    name: snapshot.metadata.name,
                                },
                            })
                            .then(() => {
                                dispatch(updateRecruiterInProgress(false));
                                dispatch(updateRecruiter());
                                dispatch(getUserProfile());
                                //dispatch success
                            })
                            .catch((err) => {
                                //dispatch error
                                dispatch(updateRecruiterInProgress(false));
                                dispatch(updateRecruiterImageFailed(err));
                                console.log(err);
                            });
                    });
                })
                .catch((err) => {
                    dispatch(updateRecruiterInProgress(false));
                    dispatch(updateRecruiterImageFailed(err));
                    console.log(err);
                });
        }
        dispatch(updateRecruiterInProgress(false));
        dispatch(getUserProfile());
    };
}

export function saveVacancy(payload) {
    return (dispatch) => {
        dispatch(saveInProgress(true));
        if (payload.id) {
            // Get a new write batch
            const batch = db.batch();
            //save to jobs collection
            const vacancy = payload;
            fetch(`${getEndpoint()}/api/jobs/create`, {
                method: "POST",
                body: JSON.stringify(vacancy),
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                if (res.ok) {
                    //save to user collections
                    const userCol = db
                        .collection("users")
                        .doc(auth.currentUser.uid)
                        .collection("jobposts")
                        .doc(payload.id)
                        .update(payload)
                        .then((doc) => {
                            //handle success
                            dispatch(saveInProgress(false));
                            dispatch(vacancySaved(doc));
                            dispatch(getMyJobs());
                        })
                        .catch((err) => {
                            //handle Err
                            dispatch(saveInProgress(false));
                            dispatch(vacancySavError(err));
                            console.log(err);
                        });
                } else {
                    //handle Err
                    dispatch(saveInProgress(false));
                    dispatch(vacancySavError(res));
                    console.log(res);
                    dispatch(saveInProgress(false));
                    if (res.status !== 401 && res.status !== 200) {
                        dispatch(
                            vacancySavError({
                                message: `${res.status}: Something went wrong`,
                            })
                        );
                    } else {
                        dispatch(vacancySavError(res));
                    }
                    console.log(res);
                }
            });
        } else {
            dispatch(saveInProgress(true));
            // Get a new write batch
            const batch = db.batch();
            const docRef = db.collection("jobs").doc();
            //save to jobs collection
            const vacancy = payload;
            vacancy.id = docRef.id;
            fetch(`${getEndpoint()}/api/jobs/create`, {
                method: "POST",
                body: JSON.stringify(vacancy),
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                if (res.ok) {
                    console.log("job svaved");
                    //save to user collections
                    const userCol = db
                        .collection("users")
                        .doc(auth.currentUser.uid)
                        .collection("jobposts")
                        .doc(docRef.id)
                        .set(vacancy)
                        .then((doc) => {
                            //handle success
                            dispatch(newVacancy(vacancy.id));
                            dispatch(saveInProgress(false));
                            dispatch(vacancySaved(doc));
                            dispatch(getMyJobs());
                        })
                        .catch((err) => {
                            //handle Err
                            dispatch(saveInProgress(false));
                            dispatch(vacancySavError(err));
                            console.log(err);
                        });
                } else {
                    dispatch(saveInProgress(false));
                    if (res.status !== 401 && res.status !== 200) {
                        dispatch(
                            vacancySavError({
                                message: `${res.status}: Something went wrong`,
                            })
                        );
                    } else {
                        dispatch(vacancySavError(res));
                    }
                    console.log(res);
                }
            });
        }
    };
}

export function saveQuestions(payload) {
    return (dispatch) => {
        dispatch(savingQuestions(true));
        //save to user collections
        const publishedJobPost = db.collection("jobs").doc(payload.id);
        publishedJobPost
            .get()
            .then((publishedJobPost_doc) => {
                let publishedJobPost_obj = {
                    ...publishedJobPost_doc.data(),
                    questions: payload.questions,
                };
                publishedJobPost.update(publishedJobPost_obj);

                const jobPost = db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("jobposts")
                    .doc(payload.id);
                jobPost
                    .get()
                    .then((doc) => {
                        let obj = {
                            ...doc.data(),
                            questions: payload.questions,
                        };
                        jobPost.update(obj);

                        dispatch(savingQuestions(false));
                        dispatch(savingQuestionsCompleted(true));
                    })
                    .catch((err) => {
                        //handle Err
                        dispatch(savingQuestions(false));
                        dispatch(savingQuestionsError(err));
                        console.log(err);
                    });
            })
            .catch((err) => {
                //handle Err
                dispatch(savingQuestions(false));
                dispatch(savingQuestionsError(err));
                console.log(err);
            });
    };
}

export function resendVerification(payload) {
    return async (dispatch) => {
        auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                console.log(
                    "MY USER LOGGED IN.....",
                    auth.currentUser.emailVerified
                );
                if (!auth.currentUser.emailVerified) {
                    // auth.currentUser.sendEmailVerification();
                    console.log(
                        "RESEND VERIFICATION EMAIL...... does log out somewhere else..."
                    );
                } else {
                    console.log(
                        "MY USER LOGGED IN..... AND WAS VERIFIED so nothing to send..."
                    );
                }
            })
            .catch((err) => {
                console.log("MY USER HAD AN ERROR LOGGING IN.....");
                dispatch(loginError(err));
                dispatch(loadingUser(false));
            });
    };
}

export function changeAuth(payload) {
    return async (dispatch) => {
        // dispatch(loadingUser(true));
        await auth
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                // console.log("MY USER LOGGED IN.....", auth.currentUser.emailVerified)
                console.log("Aris User", user);
                if (auth?.currentUser) {
                    console.log(
                        "MY USER LOGGED IN..... AND WAS VERIFIED: ",
                        payload.ral
                    );
                    // dispatch(login(user))
                    // dispatch(loginError(null));
                    dispatch(loadingUser(false));
                    // dispatch(closeLogin());
                    // dispatch(getUserProfile())
                    dispatch(getMyApplications());
                    dispatch(startLoginRedirect(payload.ral));
                } else {
                    // console.log("MY USER LOGGED IN.....but wasnt verified")
                    dispatch(
                        loginError(
                            "This account has not been verified. Shall we resend your verification link?"
                        )
                    );
                    dispatch(loadingUser(false));
                    dispatch(logout());
                }
            })
            .catch((err) => {
                console.log("MY USER HAD AN ERROR LOGGING IN.....");
                dispatch(loginError(err));
                dispatch(loadingUser(false));
            });
    };
}

export function logout() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(logUserout());
        });
    };
}

export const savingQuestions = (payload) => {
    return { type: constants.SAVING_QUESTIONS, payload };
};
export const savingQuestionsCompleted = (payload) => {
    return { type: constants.SAVED_QUESTIONS, payload };
};
export const savingQuestionsError = (payload) => {
    return { type: constants.SAVING_QUESTIONS_ERROR, payload };
};

export const fetchedCurrentApplicant = (payload) => {
    return { type: constants.FETCHED_CURRENT_APPLICANT, payload };
};
export const loadingApplicant = (payload) => {
    return { type: constants.LOADING_CURRENT_APPLICANT, payload };
};
export const failedFetchingApplicant = (payload) => {
    return { type: constants.FAILED_CURRENT_APPLICANT, payload };
};

export const createdContract = (payload) => {
    return { type: constants.CREATED_CONTRACT, payload };
};
export const loadingContract = (payload) => {
    return { type: constants.LOADING_CONTRACT, payload };
};
export const failedContract = (payload) => {
    return { type: constants.FAILED_CONTRACT, payload };
};

export const createdOffer = (payload) => {
    return { type: constants.CREATED_OFFER, payload };
};
export const loadingOffer = (payload) => {
    return { type: constants.LOADING_OFFER, payload };
};
export const failedOffer = (payload) => {
    return { type: constants.FAILED_OFFER, payload };
};

export const sendingContract = (payload) => {
    return { type: constants.SENDING_CONTRACT, payload };
};
export const sentContract = (payload) => {
    return { type: constants.SENT_CONTRACT, payload };
};
export const sendContractFailed = (payload) => {
    return { type: constants.SEND_CONTRACT_FAILED, payload };
};

export const sendingOffer = (payload) => {
    return { type: constants.SENDING_OFFER, payload };
};
export const sentOffer = (payload) => {
    return { type: constants.SENT_OFFER, payload };
};
export const sendOfferFailed = (payload) => {
    return { type: constants.SEND_OFFER_FAILED, payload };
};

export const sentEmail = (payload) => {
    return { type: constants.SENT_EMAIL, payload };
};
export const sendingEmail = (payload) => {
    return { type: constants.SENDING_EMAIL, payload };
};
export const emailFailed = (payload) => {
    return { type: constants.EMAIL_FAILED, payload };
};

export const fetchedNotifications = (payload) => {
    return { type: constants.FETCHED_NOTIFICATIONS, payload };
};
export const loadingNotifications = (payload) => {
    return { type: constants.LOADING_NOTIFICATIONS, payload };
};
export const failedNotifications = (payload) => {
    return { type: constants.FAILED_NOTIFICATIONS, payload };
};

export const clearJobOffer = (payload) => {
    return { type: constants.CLEAR_JOBOFFER, payload };
};

export const fetchedJobOffer = (payload) => {
    return { type: constants.FETCHED_JOBOFFER, payload };
};

export const loadingJobOffer = (payload) => {
    return { type: constants.LOADING_JOBOFFER, payload };
};

export const failedJobOffer = (payload) => {
    return { type: constants.FAILED_JOBOFFER, payload };
};

export const fetchedContract = (payload) => {
    return { type: constants.FETCHED_CONTRACT, payload };
};

export const loadingFetchedContract = (payload) => {
    return { type: constants.LOADING_FETCHED_CONTRACT, payload };
};

export const failedFetchedContract = (payload) => {
    return { type: constants.FAILED_FETCHED_CONTRACT, payload };
};

export const clearContract = (payload) => {
    return { type: constants.CLEAR_CONTRACT, payload };
};

export const setMessages = (payload) => {
    return { type: constants.SET_MESSAGES, payload };
};

// INTERVIEW ACTIONS
export const fetchedInterview = (payload) => {
    return { type: constants.FETCHED_INTERVIEW, payload };
};

export const loadingFetchedInterview = (payload) => {
    return { type: constants.LOADING_FETCHED_INTERVIEW, payload };
};

export const clearInterview = (payload) => {
    return { type: constants.CLEAR_INTERVIEW, payload };
};

export const failedFetchedInterview = (payload) => {
    return { type: constants.FAILED_FETCHED_INTERVIEW, payload };
};

export const acceptInterview = (payload) => {
    return { type: constants.ACCEPTED_INTERVIEW, payload };
};

export const declineInterview = (payload) => {
    return { type: constants.DECLINED_INTERVIEW, payload };
};

export const cvReset = (payload) => {
    return { type: constants.RESET_CV_ACTION, payload };
};
export const createdCv = (payload) => {
    return { type: constants.CV_CREATED, payload };
};

export const emailedCv = (payload) => {
    return { type: constants.CV_EMAILED, payload };
};

export const loadingCvRequest = (payload) => {
    return { type: constants.LOADING_CV_CREATE, payload };
};

export const failedCreateCv = (payload) => {
    return { type: constants.FAILED_CREATE_CV, payload };
};

export const feebackModalClose = (payload) => {
    return { type: constants.CLOSE_FEEDBACK_MODAL, payload };
};
export const feebackModalChange = (payload) => {
    return { type: constants.IS_OPEN, payload };
};
export const feebackModalContent = (payload) => {
    return { type: constants.FEEDBACK_CONTENT, payload };
};
export const udpateFeedbackId = (payload) => {
    return { type: constants.UPDATE_FEEDBACK_ID, payload };
};

export const gettingFeedbackObject = (payload) => {
    return { type: constants.PREP_FEEDBACK_RESPONSE, payload };
};
export const sendingFeedbackObject = (payload) => {
    return { type: constants.SENDING_FEEDBACK_RESPONSE, payload };
};
export const feebackResponseContent = (payload) => {
    return { type: constants.FEEDBACK_RESPONSE_CONTENT, payload };
};

export const sentFeedbackObject = (payload) => {
    return { type: constants.SENT_FEEDBACK_RESPONSE, payload };
};

export const gettingFeedbackResponse = (payload) => {
    return { type: constants.GETTING_FEEDBACK_RESPONSE, payload };
};
export const fetchedFeedbackResponse = (payload) => {
    return { type: constants.FETCHED_FEEDBACK_RESPONSE, payload };
};

export const errorFeedbackResponse = (payload) => {
    return { type: constants.ERROR_FEEDBACK_RESPONSE, payload };
};

/**
 * APPLICATION FEEDBACK
 */

export const requestFeedback = (payload) => {
    return (dispatch) => {
        dispatch(udpateFeedbackId(payload.jobPostId));

        const application = db
            .collection("users")
            .doc(payload.recruiter_id)
            .collection("jobposts")
            .doc(payload.jobPostId)
            .collection("applications")
            .doc(payload.applicationId);
        application
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let obj = {
                        ...doc.data(),
                        feedbackRequested: true,
                        feedbackContent: {},
                    };
                    application.update(obj);

                    const notifications = db
                        .collection("users")
                        .doc(payload.recruiter_id)
                        .collection("notifications");
                    let d = new Date();
                    const readableDate =
                        d.getDate() +
                        "/" +
                        (d.getMonth() + 1) +
                        "/" +
                        d.getFullYear();
                    const readableTime = d.getHours() + ":" + d.getMinutes();

                    notifications
                        .add({
                            id: uuidv4(),
                            sortDate: d,
                            date: readableDate,
                            time: readableTime,
                            type: "Application Feedback",
                            viewed: false,
                            application_id: payload.applicationId,
                            applicant_id: auth.currentUser.uid,
                        })
                        .then((docRef) => {
                            docRef
                                .get()
                                .then((doc) => {
                                    docRef.update({
                                        ...doc.data(),
                                        id: docRef.id,
                                    });
                                })
                                .catch((error) => {
                                    console.log(
                                        "Error getting document:",
                                        error
                                    );
                                });

                            console.log("sent my notification.....", docRef.id);
                            rdb.ref(
                                "notifications/" + payload.recruiter_id
                            ).set({ unread: true });

                            const myApplication = db
                                .collection("users")
                                .doc(auth.currentUser.uid)
                                .collection("myApplications")
                                .doc(payload.applicationId);
                            myApplication.get().then((doc) => {
                                if (doc.exists) {
                                    let obj = {
                                        ...doc.data(),
                                        feedbackRequested: true,
                                    };
                                    myApplication.update(obj);
                                }
                            });
                        });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
};

export const getFeedbackInfo = (payload) => {
    return (dispatch) => {
        dispatch(gettingFeedbackObject(true));
        let feedbackContent = {};
        console.log("payload.applicantId", payload.applicantId);
        const applicant = db.collection("users").doc(payload.applicantId);
        applicant
            .get()
            .then((doc) => {
                console.log("DATA: ", doc.data());
                feedbackContent["name"] = doc.data().name;
                applicant
                    .collection("myApplications")
                    .doc(payload.applicationId)
                    .get()
                    .then((docApplication) => {
                        feedbackContent = {
                            ...feedbackContent,
                            ...docApplication.data(),
                        };
                        dispatch(feebackResponseContent(feedbackContent));
                    });
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
};

export const sendFeedbackResponse = (payload) => {
    return (dispatch) => {
        // console.log("PAYLOAD: ", payload);
        dispatch(sendingFeedbackObject(true));

        const application = db
            .collection("users")
            .doc(payload.applicant_uid)
            .collection("myApplications")
            .doc(payload.application_id);
        application
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let obj = {
                        ...doc.data(),
                        applicationFeedback: payload.feedbackResponse,
                    };
                    application.update(obj);

                    const notifications = db
                        .collection("users")
                        .doc(payload.applicant_uid)
                        .collection("notifications");
                    let d = new Date();
                    const readableDate =
                        d.getDate() +
                        "/" +
                        (d.getMonth() + 1) +
                        "/" +
                        d.getFullYear();
                    const readableTime = d.getHours() + ":" + d.getMinutes();

                    notifications
                        .add({
                            id: uuidv4(),
                            sortDate: d,
                            date: readableDate,
                            time: readableTime,
                            type: "Feedback",
                            viewed: false,
                            application_id: payload.application_id,
                        })
                        .then((docRef) => {
                            docRef
                                .get()
                                .then((doc) => {
                                    docRef.update({
                                        ...doc.data(),
                                        id: docRef.id,
                                    });
                                })
                                .catch((error) => {
                                    console.log(
                                        "Error getting document:",
                                        error
                                    );
                                });

                            // newNotifications.child(docRef.id).update({id: docRef.id})
                            console.log("sent my notification.....", docRef.id);
                            dispatch(sentFeedbackObject(true));
                            rdb.ref(
                                "notifications/" + payload.applicant_uid
                            ).set({ unread: true });

                            const current_notification = db
                                .collection("users")
                                .doc(auth.currentUser.uid)
                                .collection("notifications")
                                .doc(payload.notificationId);
                            current_notification.get().then((doc) => {
                                let obj = { ...doc.data(), feedBackSent: true };
                                current_notification.update(obj);
                            });
                        });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
                dispatch(sendingOffer(false));
                dispatch(sentOffer(false));
                dispatch(sendOfferFailed(error));
            });
    };
};

export const getFeedbackResponse = (payload) => {
    return (dispatch) => {
        dispatch(gettingFeedbackResponse(true));
        let feedbackContent = {};
        console.log("payload.applicantId", payload.applicantId);
        const applicant = db.collection("users").doc(auth.currentUser.uid);
        applicant
            .get()
            .then((doc) => {
                console.log("DATA: ", doc.data());

                applicant
                    .collection("myApplications")
                    .doc(payload.applicationId)
                    .get()
                    .then((docApplication) => {
                        feedbackContent = { ...docApplication.data() };
                        dispatch(fetchedFeedbackResponse(feedbackContent));
                    });
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
};

export const sendMessageEmail = (payload) => {
    return () => {
        const user = db.collection("users").doc(payload.userId);
        user.get()
            .then((snapshot) => {
                const userData = snapshot.data();
                mailSender(userData, "message");
                console.log("SENDING EMAIL: ", userData);
            })
            .catch((err) => {
                console.log("ERROR SENDING EMAIL: ", err);
            });
    };
};

//GET MESSAGES
export const getMessages = (payload) => {
    return (dispatch) => {
        var messages = rdb.ref("messages/" + payload.applicationId);
        messages.on("value", (snapshot) => {
            const data = snapshot.val();

            console.log("FIREBASE DATA: ", data);
            if (data != null) {
                let arr = Object.keys(data).map((k) => data[k]);
                console.log("ARR: " + arr);
                let sortedMessages = arr.sort(function (x, y) {
                    return x.timestamp - y.timestamp;
                });
                dispatch(setMessages(sortedMessages));
            }

            // setAllMessages([...data])
        });
    };
};

//GET MY NOTIFICATIONS

export const getMyNotifications = () => {
    return (dispatch) => {
        dispatch(loadingNotifications(true));
        // console.log("auth.currentUser.uid ", auth.currentUser.uid)
        db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("notifications")
            .get()
            .then((snapshot) => {
                dispatch(loadingNotifications(false));

                const notifications = [];
                snapshot.forEach((doc) => {
                    notifications.push(doc.data());
                });
                dispatch(fetchedNotifications(notifications));
            })
            .catch((err) => {
                dispatch(loadingNotifications(false));
                dispatch(failedNotifications(err));
            });
    };
};
//GET JOB OFFER
export const fetchJobOffer = (payload) => {
    return (dispatch) => {
        dispatch(loadingJobOffer(true));

        const application = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("myApplications")
            .doc(payload.application_id);

        application
            .get()
            .then((snapshot) => {
                const offerData = snapshot.data().offerData;
                console.log("offerData: ", offerData);
                dispatch(loadingJobOffer(false));
                dispatch(fetchedJobOffer(offerData));
            })
            .catch((err) => {
                dispatch(loadingJobOffer(false));
                dispatch(failedJobOffer(err));
            });
    };
};
//GET CONTRACT
export const fetchContract = (payload) => {
    return (dispatch) => {
        dispatch(loadingFetchedContract(true));

        const application = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("myApplications")
            .doc(payload.application_id);

        application
            .get()
            .then((snapshot) => {
                const contractData = snapshot.data().contractData;
                console.log("contract data: ", contractData);
                dispatch(loadingFetchedContract(false));
                dispatch(fetchedContract(contractData));
            })
            .catch((err) => {
                dispatch(loadingFetchedContract(false));
                dispatch(failedFetchedContract(err));
            });
    };
};

export const fetchInterview = (payload) => {
    return (payload) => {};
};

/**
 * GENERATE CV DOCUMENT
 */

export const requestCreateCV = (payload) => {
    return (dispatch) => {
        const endpoint =
            (!process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                : process.env.REACT_APP_LIVE_NODE_ENDPOINT) +
            `/receive-profile`;
        // console.log("MY ENDPOINT: ", `${endpoint}` );
        // console.log("payload to send to endpoint: ",  payload);
        dispatch(loadingCvRequest(true));
        const user = db.collection("users").doc(auth.currentUser.uid);

        user.get()
            .then((doc) => {
                if (doc.exists) {
                    let cvProfile = doc.data().cvProfile;
                    const obj = {
                        cvData: { ...cvProfile },
                        ...payload,
                        uid: auth.currentUser.uid,
                    };

                    axios
                        .post(endpoint, obj, {
                            headers: { "Content-Type": "application/json" },
                        })
                        .then(function (response) {
                            if (response.data.success) {
                                if (response.data.message === "CV SAVED") {
                                    dispatch(createdCv(true));
                                } else if (
                                    response.data.message ===
                                    "CV SAVED AND MESSAGE SENT"
                                ) {
                                    dispatch(emailedCv(true));
                                }
                            } else {
                                console.log(
                                    "UNABLE TO READ SUCCESS MESSAGE....: ",
                                    response.data.success
                                );
                                dispatch(failedCreateCv(response.data.message));
                            }
                        })
                        .catch(function (error) {
                            console.log("errors: ", error);
                            dispatch(failedCreateCv(error));
                        });
                } else {
                    dispatch(loadingCvRequest(false));
                    dispatch(failedCreateCv("Error retrieving CV"));
                }
            })
            .catch((error) => {
                dispatch(loadingCvRequest(false));
                dispatch(
                    failedCreateCv(
                        "User account error, please log out and try again."
                    )
                );
            });
    };
};

/**
 * SEND CV DOCUMENT
 */

export const requestEmailCV = (payload) => {
    return (dispatch) => {
        dispatch(loadingCvRequest(true));
        console.log(
            "env: ",
            process.env.REACT_APP_ENV,
            "- endpint : ",
            process.env.REACT_APP_TEST_NODE_ENDPOINT
        );
        axios
            .post(
                `${
                    !process.env.NODE_ENV ||
                    process.env.NODE_ENV === "development"
                        ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                        : process.env.REACT_APP_LIVE_NODE_ENDPOINT
                }/receive-profile`,
                payload.cvData,
                { headers: { "Content-Type": "application/json" } }
            )
            .then(function (response) {
                console.log("more DATA: ", response.data);
                if (response.data.success) {
                    if (payload.emailAddress) {
                    } else {
                        dispatch(loadingCvRequest(false));
                        dispatch(createdCv(true));
                    }
                } else {
                    dispatch(loadingCvRequest(false));
                    dispatch(createdCv(false));
                    dispatch(failedCreateCv(response.data.message));
                }
            })
            .catch(function (error) {
                dispatch(loadingCvRequest(false));
                dispatch(failedCreateCv(error));
            });
    };
};

/**
 * MARKED NOTIFICATION VIEWED
 *
 */
export const updateNotification = (payload) => {
    return (dispatch) => {
        const newNotifications = db
            .collection("users")
            .doc(payload.uid)
            .collection("notifications")
            .doc(payload.id);
        newNotifications
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let obj = { ...doc.data(), viewed: true };
                    newNotifications.update(obj);
                    dispatch(getMyNotifications());
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
};

/***
 * SEND DOCUMENTS VIA VOOST
 */

export const sendVoostOffer = (payload) => {
    return (dispatch) => {
        // console.log("PAYLOAD: ", payload);
        dispatch(sendingOffer(true));

        const application = db
            .collection("users")
            .doc(payload.applicant_uid)
            .collection("myApplications")
            .doc(payload.application_id);
        application
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let obj = {
                        ...doc.data(),
                        status: "Offer of Employment",
                        offerData: payload,
                    };
                    application.update(obj);

                    const notifications = db
                        .collection("users")
                        .doc(payload.applicant_uid)
                        .collection("notifications");
                    let d = new Date();
                    const readableDate =
                        d.getDate() +
                        "/" +
                        (d.getMonth() + 1) +
                        "/" +
                        d.getFullYear();
                    const readableTime = d.getHours() + ":" + d.getMinutes();

                    notifications
                        .add({
                            id: uuidv4(),
                            sortDate: d,
                            date: readableDate,
                            time: readableTime,
                            type: "Job Offer",
                            viewed: false,
                            application_id: payload.application_id,
                        })
                        .then((docRef) => {
                            const newNotifications = db
                                .collection("users")
                                .doc(payload.applicant_uid)
                                .collection("notifications")
                                .doc(docRef.id);
                            newNotifications
                                .get()
                                .then((doc) => {
                                    if (doc.exists) {
                                        let obj = {
                                            ...doc.data(),
                                            id: docRef.id,
                                        };
                                        newNotifications.update(obj);
                                    } else {
                                        console.log("No such document!");
                                    }
                                })
                                .catch((error) => {
                                    console.log(
                                        "Error getting document:",
                                        error
                                    );
                                });

                            // newNotifications.child(docRef.id).update({id: docRef.id})
                            console.log("sent my notification.....", docRef.id);
                            dispatch(sendingOffer(false));
                            dispatch(sentOffer(true));
                            rdb.ref(
                                "notifications/" + payload.applicant_uid
                            ).set({ unread: true });
                        });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
                dispatch(sendingOffer(false));
                dispatch(sentOffer(false));
                dispatch(sendOfferFailed(error));
            });
    };
};

export const sendVoostContract = (payload) => {
    return (dispatch) => {
        // console.log("PAYLOAD: ", payload);
        dispatch(sendingContract(true));

        const application = db
            .collection("users")
            .doc(payload.applicant_uid)
            .collection("myApplications")
            .doc(payload.application_id);
        application
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let obj = {
                        ...doc.data(),
                        status: "Contract Sent",
                        contractData: payload,
                    };
                    application.update(obj);

                    const notifications = db
                        .collection("users")
                        .doc(payload.applicant_uid)
                        .collection("notifications");
                    let d = new Date();
                    const readableDate =
                        d.getDate() +
                        "/" +
                        (d.getMonth() + 1) +
                        "/" +
                        d.getFullYear();
                    const readableTime = d.getHours() + ":" + d.getMinutes();

                    notifications
                        .add({
                            id: uuidv4(),
                            sortDate: d,
                            date: readableDate,
                            time: readableTime,
                            type: "Contract",
                            viewed: false,
                            application_id: payload.application_id,
                        })
                        .then((docRef) => {
                            const newNotifications = db
                                .collection("users")
                                .doc(payload.applicant_uid)
                                .collection("notifications")
                                .doc(docRef.id);
                            newNotifications
                                .get()
                                .then((doc) => {
                                    if (doc.exists) {
                                        let obj = {
                                            ...doc.data(),
                                            id: docRef.id,
                                        };
                                        newNotifications.update(obj);
                                    } else {
                                        console.log("No such document!");
                                    }
                                })
                                .catch((error) => {
                                    console.log(
                                        "Error getting document:",
                                        error
                                    );
                                });

                            // newNotifications.child(docRef.id).update({id: docRef.id})
                            console.log("sent my notification.....", docRef.id);
                            dispatch(sendingContract(false));
                            dispatch(sentContract(true));
                            rdb.ref(
                                "notifications/" + payload.applicant_uid
                            ).set({ unread: true });
                        });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
                dispatch(sendingContract(false));
                dispatch(sentContract(false));
                dispatch(sendContractFailed(error));
            });
    };
};

/***
 * SEND DOCUMENTS VIA EMAIL
 */

export const sendEmail = (payload) => {
    return (dispatch) => {
        dispatch(sendingEmail(true));
        const endpoint = `${
            !process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                : process.env.REACT_APP_LIVE_NODE_ENDPOINT
        }/email-document`;
        console.log("SENDING EMAIL ENDPOINT", endpoint);

        axios
            .post(endpoint, payload, {
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                console.log("more DATA: ", response.data.success);
                if (response.data.success) {
                    dispatch(sentEmail(true));
                } else {
                    dispatch(emailFailed(response.data.message));
                }
            })
            .catch(function (error) {
                dispatch(emailFailed(error));
            });
    };
};

/**
 * create documents
 */

export const requestCreateContract = (payload) => {
    return (dispatch) => {
        dispatch(loadingContract(true));

        // SIMULATE.....
        // dispatch(createdContract(true));
        // dispatch(loadingContract(false));
        // return;
        const endpoint = `${
            !process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                : process.env.REACT_APP_LIVE_NODE_ENDPOINT
        }/receive-contract`;
        console.log("endpoint: ", endpoint);
        axios
            .post(endpoint, payload, {
                headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
                console.log("more DATA: ", response.data);
                if (response.data.success) {
                    dispatch(createdContract(true));
                } else {
                    dispatch(failedContract(response.data.message));
                }
            })
            .catch(function (error) {
                console.log("ERROR: ", error);
                dispatch(failedContract(error));
            });
    };
};

export const requestCreateOfferLetter = (payload) => {
    return (dispatch) => {
        dispatch(saveOffer(payload));
        dispatch(loadingOffer(true));
        // SIMULATE.....
        // dispatch(createdOffer(true));
        // dispatch(loadingOffer(false));
        // return;

        // console.log("env: ", process.env.REACT_APP_ENV, "- endpint : ", process.env.REACT_APP_TEST_NODE_ENDPOINT  );
        axios
            .post(
                `${
                    !process.env.NODE_ENV ||
                    process.env.NODE_ENV === "development"
                        ? process.env.REACT_APP_TEST_NODE_ENDPOINT
                        : process.env.REACT_APP_LIVE_NODE_ENDPOINT
                }/receive-job-offer`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            )
            .then(function (response) {
                console.log("more DATA: ", response.data);
                if (response.data.success) {
                    dispatch(createdOffer(true));
                    dispatch(loadingOffer(false));
                } else {
                    dispatch(loadingContract(false));
                    dispatch(createdContract(false));
                    dispatch(failedContract(response.data.message));
                }
            })
            .catch(function (error) {
                dispatch(loadingContract(false));
                dispatch(failedContract(error));
            });
    };
};

export const saveOffer = (payload) => {
    return (dispatch) => {
        // console.log("PAYLOAD: ", payload);

        const application = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("jobposts")
            .doc(payload.job_id)
            .collection("applications")
            .doc(payload.application_id);
        application
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let obj = { ...doc.data(), offerData: payload };
                    console.log("APPLICATION TO SAVE: ", obj);
                    application.update(obj);
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
};

export const saveContract = (payload) => {
    return (dispatch) => {
        // console.log("PAYLOAD: ", payload);
        const application = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("jobposts")
            .doc(payload.job_id)
            .collection("applications")
            .doc(payload.application_id);
        application
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let obj = { ...doc.data(), contractData: payload };
                    console.log("APPLICATION TO SAVE: ", obj);
                    application.update(obj);
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
};

/**
 *  ************************ CV BUILDER ACTIONS ************************
 */

export const updateIsReviewingState = (payload) => {
    return { type: constants.IS_REVIEWING, payload: payload };
};

export const updateCvModal = (payload) => {
    return { type: constants.CV_MODAL, payload: payload };
};

export const updateCvHighlightBuilder = (payload) => {
    return { type: constants.CV_HIGHLIGHT_BUILDER, payload: payload };
};

export const updateCvHighlight = (payload) => {
    return { type: constants.CV_HIGHLIGHT, payload: payload };
};

export const updateSummary = (payload) => {
    return { type: constants.PROFILE_SUMMARY, payload: payload };
};

export const updateSkillsList = (payload) => {
    return { type: constants.SKILLS_LIST, payload: payload };
};

// WORK HISTORY
export const updateAllWorkHistoryItems = (payload) => {
    return { type: constants.ALL_WORK_HISTORY_ITEMS, payload: payload };
};
export const updateWorkHistoryItem = (payload) => {
    return { type: constants.WORK_HISTORY_ITEM, payload: payload };
};

export const updateProfileBuilderWorkHistory = (payload) => {
    return { type: constants.PROFILE_BUILDER_WORK_HISTORY, payload: payload };
};

//EDUCATION HISTORY

export const updateAllEducationHistoryItems = (payload) => {
    return { type: constants.ALL_EDUCATION_HISTORY_ITEMS, payload: payload };
};
export const updateEducationHistoryItem = (payload) => {
    return { type: constants.EDUCATION_HISTORY_ITEM, payload: payload };
};

export const updateProfileBuilderEducationHistory = (payload) => {
    return {
        type: constants.PROFILE_BUILDER_EDUCATION_HISTORY,
        payload: payload,
    };
};

export const updateProfileBuilderVideoSrc = (payload) => {
    return { type: constants.PROFILE_BUILDER_VIDEO_SOURCE, payload: payload };
};
export const updateProfileBuilderModalVideo = (payload) => {
    return { type: constants.PROFILE_BUILDER_VIDEO_MODAL, payload: payload };
};

export const updateProfileBuilderSelection = (payload) => {
    return { type: constants.PROFILE_BUILDER_SELECTION, payload: payload };
};

export const updateProfileBuilderState = (payload) => {
    return { type: constants.PROFILE_BUILDER_STATE, payload: payload };
};

export const updateLocalProfile = (payload) => {
    return { type: constants.LOCAL_USER_PROFILE, payload: payload };
};

// export function updateUserCVProfile(payload){
//     return async (dispatch) => {
//         // console.log("PAYLOAD: ", payload);
//         const user = db.collection('users').doc(auth.currentUser.uid );
//         user.get().then((doc) => {
//             if (doc.exists) {
//                 // user.update( {cvProfile: payload} )

//                 // console.log("USER: ", )
//                 let obj = {...doc.data().cvProfile, ...payload }
//                 // obj[`${payload.type}`] = payload.value;

//                 user.update( {cvProfile: obj} )

//             } else {
//                 console.log("No such document!");
//             }
//         }).catch((error) => {
//             console.log("Error getting document:", error);
//         });
//     }
// }

export function updateUserCVData(payload) {
    console.log("CHECK CV UPLOAD : UPDATING CV DATA: ", payload);
    return async (dispatch) => {
        if (auth.currentUser) {
            const user = db.collection("users").doc(auth.currentUser.uid);
            user.get()
                .then(async (doc) => {
                    if (doc.exists) {
                        console.log("GOT THE DOC");
                        let obj = { ...doc.data().cvProfile, ...payload.value };

                        console.log("OBJ TO UPDATE: ", obj);

                        const didupdate = await user.update({ cvProfile: obj });

                        console.log("update completed....", didupdate);
                        dispatch(getUserProfile());
                    } else {
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    };
}
