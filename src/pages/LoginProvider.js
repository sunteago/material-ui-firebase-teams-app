import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch} from "react-redux";
import {firebase, uiConfig} from "../config/firebaseConfig";
import {signInWithProvider} from "../store/actions";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import AuthForm from "../components/Authentication/AuthForm";

const useStyles = makeStyles(theme => ({
  oAuthContainer: {
    marginTop: theme.spacing(2)
  }
}))

export default function Login() {
  const classes = useStyles();
  
  const dispatch = useDispatch();

  uiConfig.callbacks.signInSuccessWithAuthResult = () => {
    dispatch(signInWithProvider());
  };

  return (
    <>
      <AuthForm mode="provider">
        <StyledFirebaseAuth
          className={classes.oAuthContainer}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </AuthForm>
    </>
  );
}
