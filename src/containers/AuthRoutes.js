import React from "react";
import { Route, Switch } from "react-router-dom";
import FormContainer from "../components/Layout/FormContainer";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";

export default function AuthRoutes() {
  return (
    <FormContainer>
      <Switch>
        <Route exact path="/auth/login">
          <Login />
        </Route>
        <Route exact path="/auth/signup">
          <Signup />
        </Route>
        <Route exact path="/auth/forgotpassword">
          <ForgotPassword />
        </Route>
      </Switch>
    </FormContainer>
  );
}
