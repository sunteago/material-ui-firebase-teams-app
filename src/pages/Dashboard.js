import React from "react";
import PageContainer from "../components/Layout/PageContainer";
import { Typography, Link } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import * as actions from "../store/actions";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  user: {
    alignSelf: "flex-end",
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickSendConfirmationLink = (e) => {
    e.preventDefault();
    dispatch(actions.sendEmailVerification(user));
  };

  return (
    <PageContainer>
      <Typography variant="h4">Dashboard</Typography>
      <Typography className={classes.user}>{user.email}</Typography>
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
      <button onClick={() => dispatch(actions.fetchUserData())}>FETCH</button>
      <button onClick={() => dispatch(actions.postUserData())}>POST</button>
    </PageContainer>
  );
}
