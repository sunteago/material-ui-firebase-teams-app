import React from 'react'
import {useDispatch} from "react-redux";
import {firebase, uiConfig} from "../config/firebaseConfig";
import {signInWithProvider} from "../store/actions";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import AuthForm from "../components/Authentication/AuthForm";

export default function Login() {
  const dispatch = useDispatch();

  uiConfig.callbacks.signInSuccessWithAuthResult = () => {
    dispatch(signInWithProvider());
  };

  return (
    <>
      <AuthForm mode="provider">
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </AuthForm>
    </>
  );
}
