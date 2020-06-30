import * as actionTypes from "../types";
import { app } from "../../config/firebaseConfig";

export const standardSignup = (email, password) => (dispatch) => {
  dispatch({ type: actionTypes.STANDARD_SIGN_UP_START });
  app
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      dispatch({
        type: actionTypes.STANDARD_SIGN_UP_SUCCESS,
        payload: result.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.STANDARD_SIGN_UP_FAILED,
        payload: err,
      });
    });
};

export const logIn = (email, password) => (dispatch) => {
  dispatch({ type: actionTypes.LOG_IN_START });
  app
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch({ type: actionTypes.LOG_IN_SUCCESS }))
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.LOG_IN_FAILED, payload: err });
    });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: actionTypes.SIGN_OUT_START });
  app
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: actionTypes.SIGN_OUT_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.SIGN_OUT_FAILED, payload: err });
    });
};

export const startAuthStateChecker = () => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_CHECK_START });
  app.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch({ type: actionTypes.AUTH_CHECK_SUCCESS, payload: user });
    } else {
      dispatch({ type: actionTypes.AUTH_CHECK_FAILED });
    }
  });
};
