import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import PageContainer from "../components/Layout/PageContainer";
import Dashboard from "../pages/Dashboard";
import Group from "../pages/Group";

const News = React.lazy(() => import("../pages/News"));
const SingleNews = React.lazy(() => import("../pages/SingleNews"));
const InvitationLink = React.lazy(() => import("../pages/InvitationLink"));
const CreateGroup = React.lazy(() => import("../pages/CreateGroup"));

export default function DashboardRoutes() {
  return (
    <PageContainer>
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/about">
          <Dashboard />
        </Route>
        <Route exact path="/news">
          <Suspense fallback={<div>Loading News</div>}>
            <News />
          </Suspense>
        </Route>
        <Route exact path="/news/:newsId">
          <Suspense fallback={<div>Loading News</div>}>
            <SingleNews />
          </Suspense>
        </Route>
        <Route exact path="/groups/create">
          <Suspense fallback={<div>Loading CreateGroup</div>}>
            <CreateGroup />
          </Suspense>
        </Route>
        <Route exact path="/groups/:groupId/invite">
          <Suspense fallback={<div>Loading Invitation Link</div>}>
            <InvitationLink />
          </Suspense>
        </Route>
        <Route exact path="/groups/:groupId">
          <Group />
        </Route>
        <Route path="/">
          <h2>This page couldn't be found!</h2>
        </Route>
      </Switch>
    </PageContainer>
  );
}
