import React, { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Notiflix from "notiflix";
import { Question } from "../../components";
import { ConnectionPolicyInstance } from "twilio/lib/rest/voice/v1/connectionPolicy";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Button from "../../components/shared-components/button";

const ResponsiveContainer = styled.div`
    @media screen and (max-width: 992px) {
        h1 {
            font-size: 30px !important;
            line-height: 1.4 !important;
        }
        fieldset {
            margin-bottom: 30px !important;
            label {
                width: 100%;
                text-align: left;
            }
            input,
            select {
                width: 100% !important;
            }
        }

        .inner-dynamic-questions {
            > div {
                padding: 50px 0 10px !important;
                margin-bottom: 30px !important;
            }
        }
    }
`;

const DynamicQuestions = styled.div`
    .blue {
        border: 1px solid #243665;
        background-color: #243665;
    }
    .inner-dynamic-questions {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        > div {
            padding: 50px 0;
            border-bottom: 1px solid lightgrey;
            position: relative;
            button {
                position: absolute;
                right: 0;
                top: 15px;
            }
            fieldset {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;
                margin-bottom: 100px;
                &:last-of-type {
                    margin-bottom: 20px;
                }
                label {
                    color: #243665;
                    letter-spacing: 1px;
                    font-size: 18px;
                }
                select,
                input[type="text"] {
                    width: 50%;
                    padding: 16px;
                    border-radius: 8px;
                    border: NONE;
                    box-shadow: 0 0 10px -3px rgb(0, 0, 0, 0.4);
                }
            }
        }
    }
`;

function Questionnaire(props) {
    const QUESTION_LIMIT = 5;
    let newQuestion = () => ({ id: uuidv4(), question: "", timer: "15" });

    const history = useHistory();
    const { selectedJobs, originalQuestions } = history.location.state;
    const [questions, setQuestions] = React.useState([newQuestion()]);

    useEffect(() => {
        if (originalQuestions) setQuestions(originalQuestions);
    }, []);

    const updateQ = (e) => {
        const myValue = e.target.value;
        const targetId = e.target.getAttribute("data-qid");
        const qtype = e.target.getAttribute("data-type");
        const editableQuestions = [...questions];

        editableQuestions.forEach((element) => {
            if (element.id === targetId) {
                if (qtype == "q") {
                    element.question = myValue;
                } else {
                    element.timer = myValue;
                }
            }
        });
        setQuestions(editableQuestions);
    };

    const deleteQuestion = (id) => {
        if (typeof id != "undefined") {
            if (questions.length < 2) {
                Notiflix.Notify.Warning("You need atleast 1 question.");
                return;
            }
            const myArr = [...questions].filter((o) => o.id !== id);
            setQuestions(myArr);
        }
    };

    const addQuestion = () => {
        if (questions.length < QUESTION_LIMIT) {
            const myArr = [...questions, newQuestion()];
            setQuestions(myArr);
        } else {
            Notiflix.Notify.Warning("You may add no more than 5 questions.");
        }
    };

    function handleNext() {
        if (questions.length > 0) {
            const emptyQusetions = questions.filter(
                (item) => item.question.length < 1
            );
            if (emptyQusetions.length) {
                Notiflix.Notify.Warning(
                    "Please add a question before continuing."
                );
                return;
            }
        }
        history.push({
            pathname: "/recruiter/questions/review",
            state: { selectedJobs: selectedJobs, questions: questions },
        });
    }

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <Question.Section>
                    <Question>
                        <Question.Title>
                            Your pre-recorded video questions
                        </Question.Title>
                        <DynamicQuestions>
                            <div className="inner-dynamic-questions">
                                {questions.map((q, key) => {
                                    return (
                                        <div key={key}>
                                            <Button
                                                type="primarySmall"
                                                text="Delete"
                                                onClick={() =>
                                                    deleteQuestion(q.id)
                                                }
                                            />
                                            <fieldset>
                                                <label for={`q-${key}`}>
                                                    Question {key + 1}
                                                </label>
                                                <input
                                                    type="text"
                                                    data-type="q"
                                                    id={`q-${key}`}
                                                    data-qid={q.id}
                                                    onChange={updateQ}
                                                    name={`q-${key}`}
                                                    value={q.question}
                                                    placeholder="Enter question here"
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <label for={`time-${key}`}>
                                                    How long does the candidate
                                                    have to answer?
                                                </label>
                                                <select
                                                    value={q.timer}
                                                    data-qid={q.id}
                                                    data-type="timer"
                                                    onChange={updateQ}
                                                    className="time-select"
                                                    id={`time-${key}`}
                                                >
                                                    <option value="15">
                                                        15 Seconds
                                                    </option>
                                                    <option value="30">
                                                        30 Seconds
                                                    </option>
                                                    <option value="45">
                                                        45 Seconds
                                                    </option>
                                                    <option value="60">
                                                        60 Seconds
                                                    </option>
                                                    <option value="90">
                                                        90 Seconds
                                                    </option>
                                                </select>
                                            </fieldset>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="additional-btns">
                                <Button
                                    type="primarySmall"
                                    className="blue"
                                    text="ADD ANOTHER QUESTION"
                                    onClick={addQuestion}
                                />
                            </div>

                            <div className="additional-btns">
                                <Button
                                    type="primarySmall"
                                    text="CREATE"
                                    onClick={handleNext}
                                />
                            </div>
                        </DynamicQuestions>
                    </Question>
                </Question.Section>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

export default Questionnaire;
