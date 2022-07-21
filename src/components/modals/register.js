import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    FullName,
    Phone,
    Email,
    CreatePassword,
    ConfirmPassword,
    GeneralText,
} from "../shared-components/formInput";
import ButtonXL from "../shared-components/buttonXL";
import Button from "../shared-components/button";
import { useDispatch, useSelector } from "react-redux";
import {
    signupUser,
    clearLoginErrors,
    closeRegister,
    openLogin,
    getVerificationLink,
} from "../../store/actions/actions";
import Notiflix from "notiflix";
import { auth } from "../../firebase";

//STYLES
import {
    RegisterWrap,
    RegisterContainer,
    RegisterHeader,
    RegisterButton,
    H2,
    RegisterOptions,
    SeekerOption,
    RecruiterOption,
} from "./styles/register";
import { H4 } from "../../styles/components/shared-components";
import * as global from "../../styles/components/globalVariables";
import mailSender from "../../Mail/MailSender";

export default function Register({ open, onClose, loginBtn, openTypeValue }) {
    const regModalType = useSelector((state) => state.regModalType);

    useEffect(() => {
        console.log("REG MODAL TYPE: ", regModalType);
    }, [regModalType]);

    const history = useHistory();
    const signUpErr = useSelector((state) => state.user.signup_error);
    const loader = useSelector((state) => state.user.loading);
    // const register_completed = useSelector(state => state.signup_completed);
    //USER LOGIN STATE
    const [recruiter, setRecruiter] = useState(true);
    const [email, setemail] = useState("");
    const [emailResend, setemailResend] = useState("");
    const [nameResend, setNameResend] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [companyPosition, setCompanyPosition] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [name, setname] = useState("");
    const dispatch = useDispatch();
    const [awaitingVerified, setAwaitingVerified] = useState(false);

    let location = useLocation();

    useEffect(() => {
        setRecruiter(
            openTypeValue == "seeker" || openTypeValue == "seeker-apply"
                ? false
                : true
        );
    }, [openTypeValue]);

    useEffect(() => {
        if (loader === true) {
            Notiflix.Loading.Standard();
        } else {
            Notiflix.Loading.Remove();
        }

        return () => {
            Notiflix.Loading.Remove();
        };
    }, [loader]);

    useEffect(() => {
        if (signUpErr) {
            Notiflix.Loading.Remove();
            Notiflix.Report.Failure(
                "Error",
                signUpErr.message,
                "retry",
                function () {
                    dispatch(clearLoginErrors());
                }
            );
        }
    }, [signUpErr]);

    useEffect(() => {
        // console.log("awaitingVerified: ", awaitingVerified)
        if (awaitingVerified) {
            setemailResend(email);
            setNameResend(name);
            setemail("");
            setPhone("");
            setCompany("");
            setpassword("");
            setCompanyPosition("");
            setconfirmPass("");
            setname("");
        }
    }, [awaitingVerified]);

    const handleChange = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "email":
                setemail(e.target.value);
                break;
            case "createPass":
                setpassword(e.target.value);
                break;
            case "confirmPass":
                setconfirmPass(e.target.value);
                break;
            case "firstName":
                setname(e.target.value);
                break;
            case "phone":
                setPhone(e.target.value);
                break;
            case "company-name":
                setCompany(e.target.value);
                break;
            case "company-position":
                setCompanyPosition(e.target.value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (auth?.currentUser != null) {
            if (auth?.currentUser) {
                Notiflix.Loading.Remove();
                history.push("/settings");
                if (location.pathname.indexOf("jobId") < 1) {
                    history.push("/settings");
                }
            } else {
                Notiflix.Loading.Remove();
                setAwaitingVerified(true);
            }
        } else {
            console.log(
                "CURRENT USER CHANFED IN REGISTER....EMAIL NOT VERIFIED"
            );
            Notiflix.Loading.Remove();
        }
    }, [auth.currentUser]);

    function submitRegister(e) {
        e.preventDefault();
        if (password === confirmPass) {
            Notiflix.Loading.Standard();

            dispatch(
                signupUser({
                    email,
                    password,
                    name,
                    phone,
                    company,
                    companyPosition,
                    recruiter: recruiter,
                })
            );
            // setAwaitingVerified(true);
        } else {
            //err
            console.log("error passwords dont match");
            Notiflix.Report.Failure(
                "Error",
                "Your passwords do not match",
                "retry"
            );
        }
    }

    const finishRegister = (e) => {
        e.preventDefault();
        setAwaitingVerified(false);

        onClose();
        // dispatch(closeRegister());
    };

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(closeRegister());
        if (window.location.pathname.indexOf("jobs") > -1) {
            let loc = window.location.href;
            const remainder = "/" + loc.substring(loc.indexOf("job"));
            dispatch(openLogin(remainder));
        } else {
            dispatch(openLogin("/account"));
        }
    };

    const resendEmail = (e) => {
        e.preventDefault();
        console.log("RESEND EMAIL.....", emailResend);
        dispatch(
            getVerificationLink({
                email: emailResend,
                name: nameResend,
                isRecruiter: false,
            })
        );
        alert("Verification email resent");
    };

    if (!open) return null;
    return (
        <RegisterWrap>
            {!awaitingVerified ? (
                <RegisterContainer>
                    <RegisterHeader>
                        <RegisterButton onClick={onClose}>X</RegisterButton>
                        <H4 color={global.colorBlue}>
                            {regModalType == "seeker-apply"
                                ? "Sign up to complete your application"
                                : "Thanks for choosing to sign up to Voost"}
                        </H4>
                    </RegisterHeader>

                    <RegisterOptions>
                        <SeekerOption
                            className={recruiter === false ? "active" : ""}
                            onClick={() => setRecruiter(false)}
                        >
                            <p>Sign up as job seeker</p>
                        </SeekerOption>
                        <RecruiterOption
                            className={recruiter === true ? "active" : ""}
                            onClick={() => setRecruiter(true)}
                        >
                            <p>Sign up as recruiter</p>
                        </RecruiterOption>
                    </RegisterOptions>

                    <FullName value={name} onChange={(e) => handleChange(e)} />
                    <Email
                        value={email}
                        text="Email"
                        onChange={(e) => handleChange(e)}
                    />

                    {recruiter === true ? (
                        <>
                            <Phone
                                value={phone}
                                text="Telephone"
                                onChange={(e) => handleChange(e)}
                            />
                            <GeneralText
                                name="company-name"
                                value={company}
                                placeholder="Company name"
                                onChange={(e) => handleChange(e)}
                            />
                            <GeneralText
                                name="company-position"
                                value={companyPosition}
                                placeholder="Position in company"
                                onChange={(e) => handleChange(e)}
                            />
                        </>
                    ) : (
                        ""
                    )}
                    <CreatePassword
                        value={password}
                        onChange={(e) => handleChange(e)}
                    />
                    <ConfirmPassword
                        value={confirmPass}
                        onChange={(e) => handleChange(e)}
                    />

                    <ButtonXL
                        text="SIGN UP"
                        onClick={(e) => submitRegister(e)}
                    />
                    <H2 size="small">OR</H2>
                    <ButtonXL
                        color="transparent"
                        text="ALREADY HAVE AN ACCOUNT?"
                        onClick={(e) => handleLogin(e)}
                    />
                </RegisterContainer>
            ) : (
                <RegisterContainer>
                    <RegisterHeader className="awaiting-verify">
                        <RegisterButton onClick={finishRegister}>
                            X
                        </RegisterButton>
                        <H4 color={global.colorBlue}>
                            Please verify your email to complete your
                            registration
                        </H4>
                        <p className="awaiting-verify">
                            Please follow the link in the verification email we
                            have sent to you to log in,{" "}
                            <b>make sure to check your Junk inbox as well.</b>
                        </p>
                        <p>
                            Didn't receive an email?
                            <span
                                style={{
                                    cursor: "pointer",
                                    fontWeight: 500,
                                    textDecoration: "underline",
                                }}
                                onClick={resendEmail}
                            >
                                Re-send email
                            </span>
                        </p>
                    </RegisterHeader>
                    <Button
                        type="primarySmall"
                        text="OK"
                        onClick={finishRegister}
                    />
                </RegisterContainer>
            )}
        </RegisterWrap>
    );
}
