const functions = require("firebase-functions");
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();
const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const ObjectsToCsv = require("objects-to-csv");
const { chatToken, videoToken, voiceToken } = require("./tokens");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());
let allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
};
app.use(allowCrossDomain);

const sendTokenResponse = (token, res) => {
    res.set("Content-Type", "application/json");
    res.send(
        JSON.stringify({
            token: token.toJwt(),
        })
    );
};

const updateSeekerApplicationStatus = async (req, res) => {
    const applicationID = req.body.applicationID;
    const applicantID = req.body.applicantId;
    const status = req.body.status;
    res.send("ok");
    const theApplication = await admin
        .firestore()
        .collection("users")
        .doc(applicantID)
        .collection("myApplications")
        .doc(applicationID)
        .update({ status: status })
        .then((snapshot) => {
            res.statusCode = 201;
            res.send();
            return;
        })
        .catch((err) => {
            res.statusCode = 400;
            res.send(err);
            return;
        });

    return;
};
const getMyAppliedJobs = async (req, res) => {
    res.set("Content-Type", "application/json");
    const jobsArray = req.body.jobs;
    if (jobsArray && jobsArray.length && jobsArray.length > 0) {
        const jobsRef = await admin
            .firestore()
            .collection("jobs")
            .where("id", "in", jobsArray);
        jobsRef
            .get()
            .then((snapshot) => {
                responseArray = [];
                snapshot.forEach((job) => {
                    responseArray.push(job.data());
                });
                res.send(
                    JSON.stringify({
                        jobs: responseArray,
                    })
                );
                return;
            })
            .catch((err) => {
                res.status(500);
                res.send(
                    JSON.stringify({
                        error: err,
                    })
                );
                return;
            });
    } else {
        res.status(500);
        res.send(
            JSON.stringify({
                error: "Bad Request",
            })
        );
        return;
    }
};

const createSeekerMeeting = async (req, res) => {
    if (!req.body.seekerId || !req.body.meetingId || !req.body.meeting) {
        res.statusCode = 400;
        res.send("Bad request");
        return;
    } else {
        const seekerID = req.body.seekerId;
        const meetingId = req.body.meetingId;
        const meeting = req.body.meeting;
        const meetingRef = await admin
            .firestore()
            .collection("users")
            .doc(seekerID)
            .collection("meetings")
            .doc(meetingId)
            .set(meeting)
            .then(async () => {
                //update application status
                if (req.body.meeting.theJob) {
                    const applicationRef = await admin
                        .firestore()
                        .collection("users")
                        .doc(seekerID)
                        .collection("myApplications")
                        .where("jobId", "==", req.body.meeting.theJob.id)
                        .limit(1)
                        .get()
                        .then((snap) => {
                            const theApplication = snap.docs[0];
                            theApplication.ref
                                .update({ status: "Interview" })
                                .then(() => {
                                    res.statusCode = 201;
                                    res.send();
                                    return;
                                })
                                .catch((err) => {
                                    res.statusCode = 401;
                                    res.send(JSON.stringify(err));
                                    return;
                                });
                            return;
                        })
                        .catch((err) => {
                            res.statusCode = 401;
                            res.send(JSON.stringify(err));
                            return;
                        });
                } else {
                    res.statusCode = 401;
                    res.send("bad request");
                    return;
                }
                return;
            })
            .catch((err) => {
                res.statusCode = 401;
                res.send(JSON.stringify(err));
                return;
            });
    }
};
const addJob = async (req, res) => {
    const jobId = req.body.id;
    const jobsRef = await admin
        .firestore()
        .collection("jobs")
        .doc(jobId)
        .set(req.body)
        .then(() => {
            res.statusCode = 201;
            res.send();
            return;
        })
        .catch((err) => {
            res.statusCode = 401;
            res.send(JSON.stringify(err));
            return;
        });
};
app.get("/api/greeting", (req, res) => {
    const name = req.query.name || "World";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post("/api/jobs/applied", (req, res) => {
    getMyAppliedJobs(req, res);
});
app.post("/api/jobs/create", (req, res) => {
    addJob(req, res);
});

app.post("/api/application/updateStatus", (req, res) => {
    updateSeekerApplicationStatus(req, res);
});

app.post("/api/seeker/meeting", (req, res) => {
    createSeekerMeeting(req, res);
});

app.get("/chat/token", (req, res) => {
    const identity = req.query.identity;
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
});

app.post("/chat/token", (req, res) => {
    const identity = req.body.identity;
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
});

app.get("/api/video/token", (req, res) => {
    const identity = req.query.identity;
    const room = req.query.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});

app.post("/api/video/token", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    const identity = req.body.identity;
    const room = req.body.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});

app.get("/voice/token", (req, res) => {
    const identity = req.body.identity;
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
});

app.post("/voice/token", (req, res) => {
    const identity = req.body.identity;
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
});

app.get("/report/users/:week", async (req, res) => {
    try {
        let week = req.params.week;
        let onlyData = [];
        const usersRef = await admin.firestore().collection("users").get();

        await usersRef.forEach(async (doc) => {
            functions.logger.log("-------", doc.id);
            let newData = await doc.data();

            if (!newData.recruiter && newData.email) {
                await newData
                    .collection("myApplications")
                    .get()
                    .then(async (snap) => {
                        newData["applications"] = await snap.size;
                        return await snap.size;
                    });
                console.log();
            }

            await onlyData.push(newData);
        });

        const csv = new ObjectsToCsv(onlyData);

        await csv.toDisk("/tmp/data.csv");
        res.sendFile("/tmp/data.csv");

        // res.send({ success: true, users: onlyData });
    } catch (err) {
        res.send({ success: false, err: err.message });
    }
});

exports.app = functions.https.onRequest(app);
