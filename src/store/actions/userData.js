import * as actionTypes from "../../constants/types";
import { db, firebase } from "../../config/firebaseConfig";
import { getLastMonth } from "../../utils/helpers";
import { fetchGroupsData } from "./groupData";

export const fetchUserData = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_INITIAL_DATA_START });
  const userRef = db.collection("users").doc(userId);
  const generalRef = db.collection("general").doc("dashboard");

  Promise.all([userRef.get(), generalRef.get()])
    .then((data) => {
      let dashboardData = {};
      data.forEach((subDocs) => {
        if (subDocs.exists) {
          dashboardData = { ...dashboardData, ...subDocs.data() };
        }
      });
      dispatch({
        type: actionTypes.FETCH_INITIAL_DATA_SUCCESS,
        payload: dashboardData,
      });
      if (dashboardData.inGroups.length !== 0) {
        dispatch(
          fetchGroupsData(dashboardData.inGroups, dashboardData.seenMessages)
        );
      } else {
        dispatch({ type: actionTypes.FINISH_FETCHING_INITIAL_DATA });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.FETCH_INITIAL_DATA_FAILED, payload: err });
    });
};

export const fetchNewsData = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_NEWS_START });
  const newsRef = db.collection("news").where("published", ">", getLastMonth());
  newsRef
    .get()
    .then((doc) => {
      const newsArr = [];
      doc.forEach((newsItem) => {
        newsArr.push({ ...newsItem.data(), newsId: newsItem.id });
      });
      dispatch({ type: actionTypes.FETCH_NEWS_SUCCESS, payload: newsArr });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.FETCH_NEWS_FAILED, payload: err });
    });
};

export const fetchUserProfile = (currentUser, userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_USER_PROFILE_START });

  const userRef = db.collection("users").doc(userId);
  userRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        throw new Error("This user does not exist!");
      }
      dispatch({
        type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
        payload: doc.data(),
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.FETCH_USER_PROFILE_FAILED, payload: err });
    });
};

export const submitProfileChanges = (userId, userData, finishAction) => (
  dispatch
) => {
  dispatch({ type: actionTypes.SUBMIT_PROFILE_CHANGES_START });
  const userRef = db.collection("users").doc(userId);
  const currentUser = firebase.auth().currentUser;

  Promise.all([
    currentUser.updateProfile({
      displayName: userData.name,
      photoURL: userData.imageURL,
    }),
    userRef.update({
      status: userData.description,
      isVisible: userData.isPublic,
      avatar: userData.imageURL,
      name: userData.name
    }),
  ])
    .then(() => {
      dispatch({
        type: actionTypes.SUBMIT_PROFILE_CHANGES_SUCCESS,
        payload: userData,
      });
      finishAction();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: actionTypes.SUBMIT_PROFILE_CHANGES_FAILED,
        payload: err,
      });
    });
};
