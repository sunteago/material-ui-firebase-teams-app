import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";

export default function AppRouter({ isAuth }) {
  return (
    <Switch>
      <Route exact path="/login">
        <Login isAuth={isAuth} />
      </Route>
      <Route exact path="/signup">
        <Signup isAuth={isAuth} />
      </Route>
      <Route exact path="/forgotpassword">
        <ForgotPassword />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="*">Not found</Route>
    </Switch>
  );
}
