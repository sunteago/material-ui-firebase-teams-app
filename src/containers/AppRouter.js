import React, { Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import CircularLoading from "../components/Layout/CircularLoading";

const DashboardRoutes = React.lazy(() => import("./DashboardRoutes"));

function AppRouter({ isAuth }) {
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

export default AppRouter;
