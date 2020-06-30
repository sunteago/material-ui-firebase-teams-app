import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";

function AppRouter({ isAuth }) {
  return (
    <>
      {isAuth ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
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
        <Route path="*">Not found</Route>
      </Switch>
    </>
  );
}

export default AppRouter;
