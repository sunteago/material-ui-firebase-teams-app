import React from "react";
import { Typography, Link } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";

import PageContainer from "../components/Layout/PageContainer";
import Alert from "@material-ui/lab/Alert";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core";
import NewsCard from "../components/News/NewsCard";

const useStyles = makeStyles((theme) => ({
  userEmail: {
    alignSelf: "flex-end",
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  recentNewsContainer: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    width: '35%',    
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const { lastNews } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const onClickSendConfirmationLink = (e) => {
    e.preventDefault();
    dispatch(actions.sendEmailVerification(user));
  };

  return (
    <PageContainer>
      <Typography variant="h3">Dashboard</Typography>
      <Typography className={classes.userEmail}>{user.email}</Typography>
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
      <Box className={classes.recentNewsContainer}>
        <Typography variant="h4" className={classes.recentNews}>
          Recent News
        </Typography>
        <NewsCard news={lastNews} />
      </Box>
      <button onClick={() => dispatch(actions.fetchUserData())}>FETCH</button>
      <button onClick={() => dispatch(actions.postUserData())}>POST</button>
    </PageContainer>
  );
}
