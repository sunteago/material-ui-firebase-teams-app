import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";

import DashboardRoutes from "./DashboardRoutes";

function AppRouter({ isAuth }) {
  const location = useLocation();

  let redirectPath;

  if (isAuth) {
    if (location.pathname === "/") redirectPath = "/dashboard";
    else redirectPath = location.pathname;
  } else {
    if (location.pathname === "/news") redirectPath = "/news";
    else redirectPath = "/login";
  }

  return (
    <>
      <Redirect to={redirectPath} />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="*">
          <DashboardRoutes />
        </Route>
      </Switch>
    </>
  );
}

export default AppRouter;
