import React from "react";
import PageContainer from "../components/Layout/PageContainer";
import { Typography, Link } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import * as actions from "../store/actions";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickSendConfirmationLink = (e) => {
    e.preventDefault();
    dispatch(actions.sendEmailVerification(user));
  };

  return (
    <PageContainer>
      <Typography>Welcome {user.email}</Typography>
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
};

export default Dashboard;
