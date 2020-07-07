import React from "react";
import { Route, Switch } from "react-router-dom";

import PageContainer from "../components/Layout/PageContainer";
import Dashboard from "../pages/Dashboard";
import News from "../pages/News";
import SingleNews from "../pages/SingleNews";
import Group from "../pages/Group";
import InvitationLink from "../pages/InvitationLink";

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
          <News />
        </Route>
        <Route exact path="/news/:newsId">
          <SingleNews />
        </Route>
        <Route exact path="/groups/:groupId/invite">
          <InvitationLink />
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
