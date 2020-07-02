import React from "react";
import { Typography, Link, Avatar, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";


import PageContainer from "../components/Layout/PageContainer";
import UserInfo from '../components/UserInfo/UserInfo';
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import NewsCardContainer from "../components/News/NewsCardContainer";
import FullLoading from "../components/Layout/FullLoading";

const useStyles = makeStyles((theme) => ({
  userInfo: {
    alignSelf: "flex-start",
    display: 'flex',
    alignItems: 'center',
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  recentNewsContainer: {
    textAlign: "right",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const { lastNews } = useSelector((state) => state.userData);
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
      <Typography variant="h3">Dashboard</Typography>
      {!user.emailVerified ? (
        <Alert severity="error">
          Your account is not verified, if you haven't received confirmation
          email, click{" "}
          <Link href="#" onClick={onClickSendConfirmationLink}>
            here
          </Link>
          !
        </Alert>
      ) : null}
     <UserInfo classes={classes} user={user} />
      <Box className={classes.recentNewsContainer}>
        <Typography variant="h4" className={classes.recentNews}>
          Recent News
        </Typography>
        <NewsCardContainer news={lastNews} />
      </Box>
    </PageContainer>
  );
}
