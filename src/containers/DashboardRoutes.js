import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import CircularLoading from "../components/Layout/CircularLoading";
import PageContainer from "../components/Layout/PageContainer";
import Dashboard from "../pages/Dashboard";
import Group from "../pages/Group";
import Notifications from "../pages/Notifications";

const News = React.lazy(() => import("../pages/News"));
const SingleNews = React.lazy(() => import("../pages/SingleNews"));
const InvitationLink = React.lazy(() => import("../pages/InvitationLink"));
const CreateGroup = React.lazy(() => import("../pages/CreateGroup"));
const Profile = React.lazy(() => import("../pages/Profile"));
const About = React.lazy(() => import("../pages/About"));

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
          <Suspense fallback={<CircularLoading type='board'/>} >
            <News />
          </Suspense>
        </Route>
        <Route exact path="/profile/:userId">
          <Suspense fallback={<CircularLoading type='board'/>} >
            <Profile />
          </Suspense>
        </Route>
        <Route exact path="/news/:newsId">
          <Suspense fallback={<CircularLoading type='board'/>} >
            <SingleNews />
          </Suspense>
        </Route>
        <Route exact path="/groups/create">
          <Suspense fallback={<CircularLoading type='board'/>} >
            <CreateGroup />
          </Suspense>
        </Route>
        <Route exact path="/groups/:groupId/invite">
          <Suspense fallback={<CircularLoading type='board'/>} >
            <InvitationLink />
          </Suspense>
        </Route>
        <Route exact path="/groups/:groupId">
          <Group />
        </Route>
        <Route exact path="/about">
          <Suspense fallback={<CircularLoading type='board'/>} >
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
