import React, { useState, useEffect } from "react";
import ButtonXL from "../shared-components/buttonXL";
// import Register from './register';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeAuth, login } from "../../store/actions/actions";
import Notiflix from "notiflix";

import { auth } from "../../firebase";

//STYLES
import {
    LoginWrap,
    LoginContainer,
    LoginHeader,
    H2,
    OptionDiv,
    LoginButton,
} from "./styles/logIn";
import { Email, Password } from "../shared-components/formInput";
import { ButtonSimple, H4 } from "../../styles/components/shared-components";
import * as global from "../../styles/components/globalVariables";
import {
    clearLoginErrors,
    openRegister,
    closeRegister,
    closeLogin,
    resendVerification,
    loadingUser,
    startLoginRedirect,
} from "../../store/actions/actions";

export default function LogIn({ open, onClose, signUpBtn, redir }) {
    const history = useHistory();
    const redirectAfterLogin = redir;
    // const [isOpenReg, setIsOpenReg] = useState(false);

    const loginError = useSelector((state) => state.user.errors);
    // const modalState = useSelector(state => state.register_modal) ;
    const loader = useSelector((state) => state.user.loading);
    //USER DETAILS
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginRedirect = useSelector((state) => state.loginRedirect);

    useEffect(() => {
        // console.log("loginRedirect MODAL STATE: ", loginRedirect)

        if (loginRedirect != null) {
            dispatch(closeLogin());
            history.push(loginRedirect);
            dispatch(startLoginRedirect(null));
        }
    }, [loginRedirect]);

    const updateField = (e) => {
        e.preventDefault();
        if (loginError != null) {
            dispatch(clearLoginErrors());
        }
        switch (e.target.getAttribute("name")) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // console.log("LOADER CHANGED......", loader)

        if (loader === true) {
            Notiflix.Loading.Standard();
        } else {
            if (auth.currentUser) {
                // history.push('/account');
            }
            Notiflix.Loading.Remove();
        }

        return () => {
            Notiflix.Loading.Remove();
        };
    }, [loader]);

    useEffect(() => {
        if (loginError) {
            console.log("LOGIN ERROR.....", loginError);
            if (loginError?.message) {
                Notiflix.Report.Failure(
                    "Error",
                    loginError.message,
                    "retry",
                    function () {
                        dispatch(clearLoginErrors());
                    }
                );
            } else {
                // Notiflix.Report.Failure('Error', loginError, 'retry', function(){ dispatch(clearLoginErrors()) }  )
                Notiflix.Confirm.Show(
                    "Error",
                    loginError,
                    "Resend?",
                    "close",
                    function () {
                        dispatch(resendVerification({ email, password }));
                    },
                    function () {
                        dispatch(clearLoginErrors());
                    }
                );
            }
        }
    }, [loginError]);

    const handleRegister = () => {
        dispatch(closeLogin());
        dispatch(openRegister());
    };

    const handleLogin = () => {
        dispatch(loadingUser(true));
        if (email !== "" && password !== "") {
            dispatch(changeAuth({ email, password, ral: redirectAfterLogin }));
        }
    };

    const handleForgotPAss = () => {
        dispatch(closeLogin());
        dispatch(closeRegister());
        history.push("/forgot-password");
    };

    if (!open) return null;

    return (
        <>
            <LoginWrap>
                <LoginContainer>
                    <LoginHeader>
                        <LoginButton onClick={onClose}> </LoginButton>
                        <H4 color={`${global.colorBlue}`}>
                            Please login to your Voost account
                        </H4>
                    </LoginHeader>

                    <Email
                        text="email"
                        name="email"
                        value={email}
                        onChange={(e) => updateField(e)}
                    />
                    <Password
                        name="password"
                        value={password}
                        onChange={(e) => updateField(e)}
                    />
                    <ButtonXL onClick={handleLogin} text="LOG IN" />
                    <OptionDiv>
                        <ButtonSimple
                            type="primarySmall"
                            onClick={handleForgotPAss}
                        >
                            FORGOT PASSWORD
                        </ButtonSimple>
                    </OptionDiv>

                    <H2 size="small">OR</H2>
                    {/* 
                            <FacebookDiv>
                                <ButtonXL color={global.colorBlue} text="LOG IN VIA FACEBOOK" />
                            </FacebookDiv> 
                            */}

                    <H4 color={`${global.colorBlue}`}>
                        Do you not have an account yet?
                    </H4>
                    <ButtonXL
                        color="transparent"
                        text="SIGN UP"
                        onClick={handleRegister}
                    />
                </LoginContainer>
            </LoginWrap>
        </>
    );
}
