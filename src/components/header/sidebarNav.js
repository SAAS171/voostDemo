import React, { useState, useEffect } from "react";
import LogIn from "../modals/logIn";
import LogInApply from "../modals/login-apply";

import Register from "../modals/register";

import { Link, useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

// import {Navbar, Nav, I, Sidebar} from '../../styles/components/sidebarNav';
import "./styles/sidebarNav.css";
import { useSelector, useDispatch } from "react-redux";
import {
    openLogin,
    closeLogin,
    openRegister,
    closeRegister,
    startLoginRedirect,
    registerOpenType,
} from "../../store/actions/actions";

const SidebarNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const openLoginModal = useSelector((state) => state.login_modal);
    const modalState = useSelector((state) => state.register_modal);
    const regModalType = useSelector((state) => state.regModalType);

    //SIDEBAR ACTIVATION FUNCTIONS
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    //MODAL FUNCTIONS
    const [isOpenLogInApply, setIsOpenLogInApply] = useState("");
    const [isOpenLogIn, setIsOpenLogIn] = useState(openLoginModal);
    const [isOpenReg, setIsOpenReg] = useState(modalState);
    const [redirLoc, setRedirLoc] = useState("");
    const [openRegType, setRegOpenType] = useState("");

    useEffect(() => {
        console.log("modal state: ", modalState);
        setIsOpenReg(modalState);
    }, [modalState]);

    useEffect(() => {
        console.log("REGISTER OPEN TYPE : ", regModalType);
        if (
            "seeker-apply" == regModalType ||
            "seeker" == regModalType ||
            "recruiter" == regModalType
        ) {
            setRegOpenType(regModalType);
            dispatch(openRegister());
        } else {
            dispatch(closeRegister());
        }
    }, [regModalType]);

    useEffect(() => {
        console.log("OPEN MODAL....", openLoginModal.redirect);
        console.log(
            "OPEN MODAL openLoginModal.switchTrigger....",
            openLoginModal.switchTrigger
        );
        if (openLoginModal.redirect != null) {
            console.log("login redirect: ", openLoginModal.redirect);
            const isJob = openLoginModal.redirect.includes("jobs/?jobId");
            if (isJob) {
                console.log("LOGIN APPLY ACTIVATED........");
                setRedirLoc(openLoginModal.redirect);
                setIsOpenLogInApply(openLoginModal.switchTrigger);
            } else {
                setRedirLoc(openLoginModal.redirect);
                setIsOpenLogIn(openLoginModal.switchTrigger);
            }
        } else {
            setRedirLoc(openLoginModal.redirect);
            setIsOpenLogIn(openLoginModal.switchTrigger);
            setIsOpenLogInApply(openLoginModal.switchTrigger);
        }
    }, [openLoginModal]);

    const handleClose = () => {
        dispatch(closeLogin());
    };

    const handleOpen = () => {
        console.log("OPENIN.....");
        dispatch(openLogin());
        dispatch(closeRegister());
    };

    const openRegisterModal = () => {
        // handleClose();
        console.log("open register again....");
        dispatch(closeLogin());
        setRegOpenType("recruiter");
        dispatch(openRegister());
    };

    const closeRegisterModal = () => {
        console.log("SETTING REG OPEN TYPE");
        // setRegOpenType(null);
        dispatch(registerOpenType(null));
    };

    // useEffect(() => {
    //     setIsOpenReg(modalState);
    // }, [modalState])

    return (
        <>
            <div className="nav-container">
                <div className="sidebar-nav">
                    <div className="navbar">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </div>

                    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                        <ul className="nav-menu-items" onClick={showSidebar}>
                            <li className="nav-bar-toggle">
                                <Link to="#" className="menu-bars">
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/">
                                    <span>home</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/about">
                                    <span>about voost</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/jobs">
                                    <span>jobs</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/voost-rooms">
                                    <span>Voost rooms</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/contactUs">
                                    <span>contact us</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="#" onClick={() => handleOpen()}>
                                    <span>log in</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link
                                    to="#"
                                    onClick={() => openRegisterModal()}
                                >
                                    <span>register</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <LogIn
                redir={redirLoc}
                open={isOpenLogIn}
                onClose={() => handleClose()}
            />
            <LogInApply
                redir={redirLoc}
                open={isOpenLogInApply}
                onClose={() => handleClose()}
            />
            <Register
                openTypeValue={openRegType}
                open={isOpenReg}
                onClose={() => closeRegisterModal()}
            />
        </>
    );
};

export default SidebarNav;
