import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";

import * as alertTypes from "../constants/alertTypes";
import PageContainer from "../components/Layout/PageContainer";
import UserInfo from "../components/UserInfo/UserInfo";
import RecentActivity from "../components/RecentActivity/RecentActivityList";
import RightPanel from "../components/Layout/Dashboard/RightPanel";

import CircularLoading from "../components/Layout/CircularLoading";
import AlertMessage from "../components/Layout/AlertMessage";
import Grid from "@material-ui/core/Grid";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";

const useStyles = makeStyles((theme) => ({
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
  alertMsg: {
    marginTop: theme.spacing(2)
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);
  const { lastNews, topActivePublicGroups, userGroupsContent,  } = useSelector(
    (state) => state.userData
  );
  const { isFullLoading } = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  const onClickSendConfirmationLink = (e) => {
    e.preventDefault();
    dispatch(actions.sendEmailVerification(user));
  };

  const handleClearComment = (commentTimestamp) => {
    dispatch(actions.clearActivityCommentDB(commentTimestamp, user.uid));
  };

  return isFullLoading ? (
    <CircularLoading type="full" />
  ) : (
    <PageContainer>
      <SectionTitle variant="h3">Dashboard</SectionTitle>
      {!user.emailVerified ? (
        <AlertMessage
          alertStyles={classes.alertMsg}
          severity="error"
          action={alertTypes.EMAIL_CONFIRM}
          handler={onClickSendConfirmationLink}
        />
      ) : null}
      <UserInfo userInfoStyle={classes.userInfo} user={user} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <RecentActivity
            title="Recent Activity"
            handleClearComment={handleClearComment}
            groups={userGroupsContent}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <RightPanel
            lastNews={lastNews}
            topActiveGroups={topActivePublicGroups}
            myGroups={userGroupsContent}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
