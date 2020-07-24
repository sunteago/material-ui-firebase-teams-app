import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import FormContainer from "../components/Layout/FormContainer";
import CircularLoading from "../components/Layout/CircularLoading";

import LoginProvider from "../pages/LoginProvider";
const Login = React.lazy(() => import("../pages/Login"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const Signup = React.lazy(() => import("../pages/Signup"));

export default function AuthRoutes() {
  return (
    <FormContainer>
      <Switch>

        <Route exact path="/auth/provider">
          <LoginProvider />
        </Route>

        <Route exact path="/auth/login">
          <Suspense fallback={<CircularLoading type="board" />}>
            <Login />
          </Suspense>
        </Route>

        <Route exact path="/auth/signup">
          <Suspense fallback={<CircularLoading type="board" />}>
            <Signup />
          </Suspense>
        </Route>

        <Route exact path="/auth/forgotpassword">
          <Suspense fallback={<CircularLoading type="board" />}>
            <ForgotPassword />
          </Suspense>
        </Route>
        
      </Switch>
    </FormContainer>
  );
}
