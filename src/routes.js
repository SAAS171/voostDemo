import React from "react";
// import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const { isRecruiter, isAuthUser, type, usertype } = props;
 //if the path is recruiter and a seeker routes here, redirect to home
  if (usertype === "seeker" && isRecruiter) return <Redirect to="/" />;
 //
  else if (type === "private" && usertype === 'seeker' && (!isAuthUser || isRecruiter)) return <Redirect to="/" />;
  else if (type === "private" && !isAuthUser) return <Redirect to="/" />;
  else if (usertype === "recruiter" && !isRecruiter) return <Redirect to="/" />;

  return <Route {...props} />;
};



export default AuthRoute;