import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import CircularLoading from "../components/Layout/CircularLoading";
import Dashboard from "../pages/Dashboard";
import PageContainer from "../components/Layout/PageContainer";
import Group from "../pages/Group";
import Notifications from "../pages/Notifications";
import CreateGroup from "../pages/CreateGroup";
import Profile from "../pages/Profile";

const SingleNews = React.lazy(() => import("../pages/SingleNews"));
const InvitationLink = React.lazy(() => import("../pages/InvitationLink"));
const News = React.lazy(() => import("../pages/News"));
const About = React.lazy(() => import("../pages/About"));

console.log("code splitting");
export default function DashboardRoutes() {
  return (
    <PageContainer>
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/notifications">
          <Notifications />
        </Route>
        <Route exact path="/news">
          <Suspense fallback={<CircularLoading type="board" />}>
            <News />
          </Suspense>
        </Route>
        <Route exact path="/profile/:userId">
          <Profile />
        </Route>
        <Route exact path="/news/:newsId">
          <Suspense fallback={<CircularLoading type="board" />}>
            <SingleNews />
          </Suspense>
        </Route>
        <Route exact path="/groups/create">
          <CreateGroup />
        </Route>
        <Route exact path="/groups/:groupId/invite">
          <Suspense fallback={<CircularLoading type="board" />}>
            <InvitationLink />
          </Suspense>
        </Route>
        <Route exact path="/groups/:groupId">
          <Group />
        </Route>
        <Route exact path="/about">
          <Suspense fallback={<CircularLoading type="board" />}>
            <About />
          </Suspense>
        </Route>
        <Route path="/">
          <h2>This page couldn't be found!</h2>
        </Route>
      </Switch>
    </PageContainer>
  );
}
