import * as actionTypes from "../../constants/types";
import { app, db, firebase } from "../../config/firebaseConfig";
import { fetchUserData } from "./userData";
import User from "../../models/User";

export const standardSignup = (email, password, displayName) => (dispatch) => {
  dispatch({ type: actionTypes.STANDARD_SIGN_UP_START });
  const userCollectionRef = db.collection("users");
  let user;
  app
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      user = result.user;
    })
    .then(() => {
      //creates user data in db
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const userModel = new User(email, timestamp, displayName);
      return Promise.all([
        userCollectionRef.doc(user.uid).set({ ...userModel }),
        user.updateProfile({ displayName }),
      ]);
    })
    .then(() => {
      dispatch({ type: actionTypes.STANDARD_SIGN_UP_SUCCESS });
      dispatch(sendEmailVerification(user));
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

export const sendEmailVerification = (user) => (dispatch) => {
  dispatch({ type: actionTypes.SEND_VERIFICATION_EMAIL_START });
  user
    .sendEmailVerification()
    .then(() => {
      dispatch({ type: actionTypes.SEND_VERIFICATION_EMAIL_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SEND_VERIFICATION_EMAIL_FAILED,
        payload: err,
      });
    });
};

export const startAuthStateChecker = () => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_CHECK_START });
  app.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch({ type: actionTypes.AUTH_CHECK_SUCCESS, payload: user });
      dispatch(fetchUserData(user.uid));
    } else {
      dispatch({ type: actionTypes.AUTH_CHECK_FAILED });
    }
  });
};
