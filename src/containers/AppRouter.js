import React, { Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import CircularLoading from "../components/Layout/CircularLoading";
import AuthRoutes from "./AuthRoutes";

import PropTypes from 'prop-types';

const DashboardRoutes = React.lazy(() => import("./DashboardRoutes"));

export default function AppRouter({ isAuth }) {
  const location = useLocation();
  
  let redirectPath;

  if (isAuth) {
    if (location.pathname === "/") redirectPath = "/dashboard";
    else redirectPath = location.pathname + location.search;
  } else {
    if (location.pathname.includes("/news")) redirectPath = location.pathname;
    else redirectPath = "/auth/provider";
  }

  return (
    <>
      <Redirect to={redirectPath} />
      <Switch>
        <Route path="/auth">
          <AuthRoutes />
        </Route>
        <Route path="*">
          <Suspense fallback={<CircularLoading type="full" />}>
            <DashboardRoutes />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
}

AppRouter.propTypes = {
  isAuth: PropTypes.bool.isRequired
};
