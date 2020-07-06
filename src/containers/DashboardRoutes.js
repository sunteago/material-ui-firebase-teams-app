import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import News from "../pages/News";
import SingleNews from "../pages/SingleNews";
import Group from '../pages/Group';
import PageContainer from "../components/Layout/PageContainer";

export default function DashboardRoutes() {
  return (
    <PageContainer>
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
      <Route exact path="/groups/:groupId">
        <Group />
      </Route>
      <Route path="*">
        <h2>This page couldn't be found!</h2>
      </Route>
    </PageContainer>
  );
}
