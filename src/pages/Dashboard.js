import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";

import * as alertTypes from "../constants/alertTypes";
import PageContainer from "../components/Layout/PageContainer";
import RecActList from "../components/RecentActivity/RecentActivityList";
import TopNewsList from "../components/News/NewsList";
import GroupList from "../components/Group/GroupList";
import UserInfo from "../components/UserInfo/UserInfo";
import FullLoading from "../components/Layout/FullLoading";
import AlertMessage from "../components/Layout/AlertMessage";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    margin: theme.spacing(2),
  },
  userInfo: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    margin: theme.spacing(3),
    textAlign: "center",
  },
  mainPanelContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  boxContainer: {
    width: "100%",
    textAlign: "center",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const { lastNews, topActivePublicGroups, userGroupsContent } = useSelector(
    (state) => state.userData
  );
  const { isFullLoading } = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  const onClickSendConfirmationLink = (e) => {
    e.preventDefault();
    dispatch(actions.sendEmailVerification(user));
  };

  return isFullLoading ? (
    <FullLoading />
  ) : (
    <PageContainer>
      <Typography className={classes.pageTitle} variant="h3">
        Dashboard
      </Typography>
      {!user.emailVerified ? (
        <AlertMessage
          severity="error"
          action={alertTypes.email_confirm}
          handler={onClickSendConfirmationLink}
        />
      ) : null}
      <UserInfo classes={classes} user={user} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <RecActList title="Recent Activity" groups={userGroupsContent} />
        </Grid>

        <Grid item xs={12} md={3}>
          <TopNewsList title="Last News" news={lastNews} />
          <GroupList title="Top Groups" groups={topActivePublicGroups} />
          <GroupList title="My Groups" groups={userGroupsContent} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
