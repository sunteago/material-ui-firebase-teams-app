import React, { useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { firebase, uiConfig } from "../config/firebaseConfig";
import { startSignInWithProvider, signInWithProvider } from "../store/actions";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AuthForm from "../components/Authentication/AuthForm";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  oAuthContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [isOAuthReady, setIsOAuthReady] = useState(false);
  const dispatch = useDispatch();

  const onStartOAuth = useCallback((e) => {
    const authProvider = e.target.closest("li");
    if (authProvider !== null) dispatch(startSignInWithProvider())
  }, [dispatch]);

  useEffect(() => {
    let oAuthBtns;
    if (isOAuthReady) {
      oAuthBtns = document.querySelector(".firebaseui-card-content ul");
      oAuthBtns.addEventListener("click", onStartOAuth, true);
    }
    return () => {
      if (oAuthBtns) {
        oAuthBtns.removeEventListener('click', onStartOAuth);
      }
    };
  }, [isOAuthReady, onStartOAuth]);

  uiConfig.callbacks.signInSuccessWithAuthResult = (result) => {
    dispatch(signInWithProvider(result));
    return false;
  };

  uiConfig.callbacks.uiShown = () => setIsOAuthReady(true);

  return (
      <AuthForm mode="provider">
        <StyledFirebaseAuth
          className={classes.oAuthContainer}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </AuthForm>
  );
}
