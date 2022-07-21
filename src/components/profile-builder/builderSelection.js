import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../shared-components/button";
import createCv from "../../assets/svg/create-cv.svg";
import uploadCv from "../../assets/svg/upload-cv.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProfileBuilderState,
    updateProfileBuilderSelection,
} from "../../store/actions/actions";
import Notiflix from "notiflix";
import { useHistory } from "react-router-dom";

const ProfileBuilderSelectionContainer = styled.div`
    .profilebuilder-selection {
        h1 {
            margin-top: 50px;
        }
    }
    .selected {
        border: 1px solid red;
        transform: scale(1.05) !important;
    }
    .selection-boxs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 900px;
        margin: 60px auto;
        > div {
            width: calc(50% - 20px);
            height: auto;
            border-radius: 20px;
            box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.5);
            padding: 25px;
            transition: ease-in-out 200ms all;
            transform: none;
            &:hover {
                cursor: pointer;
                transform: scale(1.05);
                transition: ease-in-out 200ms all;
            }
            * {
                pointer-events: none;
            }
            img {
                max-height: 80px;
            }

            .selection-main {
                margin: 20px 0 0;
                border-top: 1px solid lightgrey;
                padding-top: 20px;
                p:first-of-type {
                    font-size: 34px;
                    font-weight: 800;
                    color: #4c567c;
                }
            }
        }
    }
    .selection-buttons {
        padding: 0px 0 100px;
    }
    @media screen and (max-width: 992px) {
        h1 {
            margin-top: 70px !important;
            font-size: 26px;
        }
        .selection-boxs {
            flex-direction: column;
            max-width: 100%;
            padding: 15px;
            margin: 0;
            > div {
                width: 100%;
                max-width: 400px;
                margin: 0 auto 30px;
            }
        }
    }
`;
export default function BuilderSelection() {
    const dispatch = useDispatch();
    const [profileBuildType, setProfileBuildType] = useState(0);
    const selectionBuilderState = useSelector(
        (state) => state.selectionselection
    );
    const history = useHistory();

    const profileState = useSelector((state) => state.profile);

    useEffect(() => {
        console.log("BUILD TYPE SELECTED.....");
        nextStep();
    }, [profileBuildType]);

    const handleSelectionClick = (e) => {
        e.preventDefault();
        const t = e.target.getAttribute("data-type");
        setProfileBuildType(t);
        console.log("CLICKED....");
    };

    const backStep = (e) => {
        e.preventDefault();
        console.log("CLICKED....back");
        history.goBack();
    };
    const nextStep = () => {
        // e.preventDefault();
        // console.log("CLICKED....next ")

        if (profileState.profile?.cvProfile) {
            console.log("HAS PROFILE");

            // dispatch(updateProfileBuilderState("createcv-review"))
            dispatch(updateProfileBuilderSelection("createcv-review"));
            return;
        }

        if (profileBuildType) {
            console.log("DO PERSONAL... ");

            dispatch(updateProfileBuilderState("personalDetails"));
            dispatch(updateProfileBuilderSelection(profileBuildType));
            return;
        }
        Notiflix.Notify.Failure("Please choose how to build your profile.");
    };

    const ProfileBuilderSelection = (
        <ProfileBuilderSelectionContainer>
            <div className="profilebuilder-selection">
                <h1>How do you want to start?</h1>
                <div className="selection-boxs">
                    <div
                        className={`selection-box ${
                            profileBuildType === "createcv" ? "selected" : ""
                        }`}
                        data-type="createcv"
                        onClick={handleSelectionClick}
                    >
                        <img src={createCv} alt="create cv" />
                        {profileState.profile?.cvProfile ? (
                            <div className="selection-main">
                                <p>Edit your CV</p>
                                <p>Edit your CV step by step </p>
                            </div>
                        ) : (
                            <div className="selection-main">
                                <p>Create a new CV</p>
                                <p>Create your CV step by step with our help</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`selection-box ${
                            profileBuildType === "uploadcv" ? "selected" : ""
                        }`}
                        data-type="uploadcv"
                        onClick={handleSelectionClick}
                    >
                        <img src={uploadCv} alt="upload cv" />
                        <div className="selection-main">
                            <p>Upload a CV</p>
                            <p>
                                Use an existing CV and we will reformat it to
                                fit your profile
                            </p>
                        </div>
                    </div>
                </div>
                <div className="selection-buttons">
                    <Button
                        type="primarySmall"
                        text="BACK"
                        onClick={backStep}
                    />
                    {/* <Button type="primarySmall" text="NEXT"  onClick={nextStep}/> */}
                </div>
            </div>
        </ProfileBuilderSelectionContainer>
    );
    return ProfileBuilderSelection;
}
