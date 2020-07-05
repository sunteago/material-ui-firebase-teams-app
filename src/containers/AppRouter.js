import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import News from "../pages/News";
import SingleNews from "../pages/SingleNews";
import Group from '../pages/Group';

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
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/about">
            <Dashboard />
          </Route>
          <Route exact path="/news">
            <News />
          </Route>
          <Route exact path="/news/:newsId">
            <SingleNews />
          </Route>
          <Route exact path="/groups/:groupId">
            <Group />
          </Route>
          <Route path="*">Not found</Route>
      </Switch>
    </>
  );
}

export default AppRouter;
