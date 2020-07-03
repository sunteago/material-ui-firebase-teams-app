import * as actionTypes from "../../constants/types";
import { db } from "../../config/firebaseConfig";

export const fetchUserData = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_INITIAL_DATA_START });
  const userRef = db.collection("users").doc(userId);
  const generalRef = db.collection("general").doc("dashboard");
  Promise.all([userRef.get(), generalRef.get()])
    .then((data) => {
      let dashboardData = {};
      data.forEach((doc) => {
        if (doc.exists) {
          dashboardData = { ...dashboardData, ...doc.data() };
        }
      });
      dispatch({
        type: actionTypes.FETCH_INITIAL_DATA_SUCCESS,
        payload: dashboardData,
      });
      if (dashboardData.inGroups.length !== 0) {
        dispatch(fetchGroupsData(dashboardData.inGroups));
      }
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCH_INITIAL_DATA_FAILED, payload: err });
    });
};

export const fetchGroupsData = (groupsArr) => (dispatch) => {
  const groupsRef = db.collection("groups");
  const groupNamesArr = groupsArr.map((group) => {
    return groupsRef.doc(group).get();
  });
  dispatch({ type: actionTypes.FETCH_GROUP_DATA_START });
  Promise.all(groupNamesArr)
    .then((groupsDocArr) => {
      const groups = [];
      groupsDocArr.forEach((groupDoc) => {
        if (groupDoc.exists) {
          const group = groupDoc.data();
          group["groupId"] = Math.random();
          groups.push(group);
        }
      });
      dispatch({
        type: actionTypes.FETCH_GROUP_DATA_SUCCESS,
        payload: groups,
      });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCH_GROUP_DATA_FAILED });
      console.log(err);
    });
};

export const postUserData = () => (dispatch) => {
  dispatch({ type: actionTypes.POST_USER_DATA_START });
  dispatch({ type: actionTypes.POST_USER_DATA_SUCCESS });
  dispatch({ type: actionTypes.POST_USER_DATA_FAILED });
};
