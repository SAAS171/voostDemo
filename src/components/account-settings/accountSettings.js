import React, { useState, useEffect } from "react";
import {
  FullName,
  Email,
  Phone,
  CV,
  Password,
  ConfirmNewPassword,
} from "../shared-components/formInput";
import Button from "../shared-components/button";
import LogIn from "../modals/logIn";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRecruiterUpdate,
  updateUserProfile,
  resetUserPass,
  openLogin,
  closeLogin,
  resetCv,
} from "../../store/actions/actions";
// import {useHistory} from 'react-router-dom';
import Notiflix from "notiflix";
import Alert from "react-bootstrap/Alert";
import { NavLink } from "react-router-dom";

//Styles
import {
  SettingsWrap,
  SettingsPanel,
  SaveBtn,
} from "./styles/account-settings";
import { BorderContainer } from "../../styles/components/shared-components";
// import { render } from '@testing-library/react';

export default function AccountSettings() {
  // const history = useHistory();
  const profileState = useSelector((state) => state.profile);
  const resetPass = useSelector((state) => state.password_reset);
  const updatedUser = useSelector((state) => state.updateRecruiter);
  const profile = profileState.profile;
  const OpenLogin = useSelector((state) => state.login_modal);
  const pPhone = profile ? profile.phone : "";
  const pName = profile ? profile.name : "";
  const pEmail = profile ? profile.email : "";
  const pJobInterest = profile ? profile.job_interest : "";
  const newCv = useSelector((state) => state.cv);
  const [name, setName] = useState(pName ? pName : "");
  const [email, setEmail] = useState(pEmail ? pEmail : "");
  const [phone, setPhone] = useState(pPhone ? pPhone : "");
  const [desSalary, setDesSalary] = useState("");
  const [jobInterests, setJobInterests] = useState(pJobInterest);
  const [cv, setCv] = useState("");
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setComnfirmPassword] = useState("");

  useEffect(() => {
    setName(pName);
  }, [pName]);

  useEffect(() => {
    setEmail(pEmail);
  }, [pEmail]);

  useEffect(() => {
    if (newCv.loading) {
      Notiflix.Loading.Standard("Please wait...");
    } else {
      Notiflix.Loading.Remove();
    }
    if (newCv.error) {
      Notiflix.Report.Failure(
        "Something went wrong",
        newCv.error.message,
        "try again",
        function () {
          dispatch(resetCv());
        }
      );
    } else if (newCv.success) {
      Notiflix.Report.Success(
        "YAY!",
        "Your Cv has been updated",
        "Ok",
        function () {
          dispatch(resetCv());
        }
      );
    }
  }, [newCv]);

  useEffect(() => {
    if (updatedUser.loading) {
      Notiflix.Loading.Standard("Please wait...");
    } else if (!updatedUser.loading) {
      Notiflix.Loading.Remove();
    }
    if (updatedUser.update !== null) {
      Notiflix.Report.Success(
        "YAY!",
        `Your profile has been updated`,
        "Ok",
        function () {
          dispatch(clearRecruiterUpdate());
        }
      );
    }
  }, [updatedUser]);

  const updateSettings = (e) => {
    switch (e.target.name) {
      case "firstName":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "desSalary":
        setDesSalary(e.target.value);
        break;
      case "jobinterest":
        setJobInterests(e.target.value);
        break;
      case "cv":
        setCv(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const submitUpdate = (e, field) => {
    e.preventDefault();
    if (field === "full_name") {
      dispatch(updateUserProfile({ name: name }));
    }

    if (field === "email") {
      dispatch(updateUserProfile({ email: email }));
    }

    if (field === "phone") {
      dispatch(updateUserProfile({ phone: phone }));
    }

    if (field === "des_salary") {
      dispatch(updateUserProfile({ des_salary: desSalary }));
    }

    if (field === "job_interest") {
      dispatch(updateUserProfile({ job_interests: jobInterests }));
    }

    if (field === "cv") {
      console.log(cv);
      if (cv) {
        dispatch(updateUserProfile({ cv: cv }));
      } else {
        Notiflix.Notify.Failure("Upload a cv to continue");
      }
    }

    // dispatch(UpdateRecruiteProfile({name, email, phone}))
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(updateUserProfile({ name: name }));
    }
    if (email) {
      dispatch(updateUserProfile({ email: email }));
    }
    if (phone) {
      dispatch(updateUserProfile({ phone: phone }));
    }
    if (desSalary) {
      dispatch(updateUserProfile({ des_salary: desSalary }));
    }
    if (jobInterests) {
      dispatch(updateUserProfile({ job_interests: jobInterests }));
    }
    if (cv) {
      dispatch(updateUserProfile({ cv: cv }));
    }
  };

  const changePass = (e) => {
    e.preventDefault();
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmNewPass") {
      setComnfirmPassword(e.target.value);
    }
  };

  const submitPasswordReset = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(resetUserPass({ password }));
    } else {
      //present error
      Notiflix.Notify.Failure("paswords are not a match");
    }
  };
  const handleClose = () => {
    dispatch(closeLogin());
  };
  const handleOpen = () => {
    dispatch(openLogin("/account"));
  };
  return (
    <SettingsWrap>
      <BorderContainer>
        <NavLink to="/account">
          <span>&lt; Back</span>
        </NavLink>
        <SettingsPanel onSubmit={(e) => submitUpdate(e)}>
          <div className="input-div">
            <FullName value={name} onChange={(e) => updateSettings(e)} />
            {name !== pName && name && (
              <>
                <SaveBtn onClick={(e) => submitUpdate(e, "full_name")}>
                  Save{" "}
                </SaveBtn>
              </>
            )}
          </div>

          <div className="input-div">
            <Email value={email} onChange={(e) => updateSettings(e)} />
            {email !== pEmail && email && (
              <>
                <SaveBtn onClick={(e) => submitUpdate(e, "email")}>
                  {" "}
                  Save
                </SaveBtn>
              </>
            )}
          </div>

          <div className="input-div">
            <Phone value={phone} onChange={(e) => updateSettings(e)} />
            {phone !== pPhone && phone && (
              <>
                <SaveBtn onClick={(e) => submitUpdate(e, "phone")}>
                  {" "}
                  Save
                </SaveBtn>
              </>
            )}
          </div>

          {/* <div className="input-div">
                        <DesSalary  value={desSalary} onChange={(e) => updateSettings(e)}/><SaveBtn onClick={(e) => submitUpdate(e, 'des_salary')}>Save</SaveBtn> 
                    </div>
                     */}

          {/* <div className="input-div">
                        <CV onChange={(e) => updateSettings(e)}/><SaveBtn onClick={(e) => submitUpdate(e, 'cv')}> Save</SaveBtn> 
                    </div> */}
          <Button
            type="primarySmall"
            text="Save all"
            onClick={(e) => handleSave(e)}
          />
        </SettingsPanel>

        <SettingsPanel onSubmit={(e) => submitPasswordReset(e)}>
          <h2>Reset your password</h2>
          <div className="password-show">
            {resetPass && resetPass.error ? (
              <>
                <Alert
                  transition
                  variant="primary"
                  style={{ "max-width": "540px" }}
                >
                  {resetPass.error.message}
                </Alert>
              </>
            ) : (
              ""
            )}

            {resetPass && resetPass.success ? (
              <>
                <Alert
                  transition
                  variant="primary"
                  style={{ "max-width": "540px" }}
                >
                  {}
                  Your password has been reset.
                </Alert>
              </>
            ) : (
              ""
            )}
            <Password value={password} onChange={changePass} />
            <ConfirmNewPassword value={confirmPassword} onChange={changePass} />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              type="primarySmall"
              text="Confirm"
              onClick={(e) => submitPasswordReset(e)}
            />
            {resetPass && resetPass.error ? (
              resetPass.error.code === "auth/requires-recent-login" ? (
                <Button
                  type="primarySmall"
                  text="Reauthenticate"
                  onClick={(e) => handleOpen(e)}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </SettingsPanel>
      </BorderContainer>
    </SettingsWrap>
  );
}
