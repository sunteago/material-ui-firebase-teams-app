import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import DashboardRoutes from "./DashboardRoutes";
import AuthRoutes from "./AuthRoutes";

function AppRouter({ isAuth }) {
  const location = useLocation();

  let redirectPath;

  if (isAuth) {
    if (location.pathname === "/") redirectPath = "/dashboard";
    else redirectPath = location.pathname + location.search;
  } else {
    if (location.pathname.includes('/news')) redirectPath = location.pathname;
    else redirectPath = "/auth/login";
  }

  return (
    <>
     <Redirect to={redirectPath} />
      <Switch>
        <Route path="/auth">
          <AuthRoutes />
        </Route>
        <Route path="*">
          <DashboardRoutes />
        </Route>
      </Switch>
    </>
  );
}

export default AppRouter;
