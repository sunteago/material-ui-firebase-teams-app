import * as actionTypes from "../../constants/types";
import { db, firebase } from "../../config/firebaseConfig";
import { getLastMonth, extractDataFromDocuments } from "../../utils/helpers";

export const fetchUserData = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_INITIAL_DATA_START });
  const userRef = db.collection("users").doc(userId);
  const generalRef = db.collection("general").doc("dashboard");
  const newsRef = db.collection("news").where("published", ">", getLastMonth());

  Promise.all([userRef.get(), generalRef.get(), newsRef.get()])
    .then((data) => {
      const dashboardData = extractDataFromDocuments(data);
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
  const groupsToFetchList = groupsArr.map((group) => {
    return groupsRef.doc(group).get();
  });
  dispatch({ type: actionTypes.FETCH_GROUP_DATA_START });

  Promise.all(groupsToFetchList)
    .then((groupsDocArr) => {
      const groups = [];
      groupsDocArr.forEach((groupDoc) => {
        if (groupDoc.exists) {
          const group = groupDoc.data();
          group.groupId = groupDoc.id;
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

export const clearActivityComment = (commTimestamp, userId) => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_DASHBOARD_DATA_START });
  const userRef = db.collection("users").doc(userId);
  userRef
    .update({
      seenMessages: firebase.firestore.FieldValue.arrayUnion(commTimestamp),
    })
    .then(() => {
      dispatch({
        type: actionTypes.CLEAR_DASHBOARD_DATA_SUCCESS,
        payload: {id: commTimestamp},
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.CLEAR_DASHBOARD_DATA_FAILED });
    });
};

export const postUserData = () => (dispatch) => {
  dispatch({ type: actionTypes.POST_USER_DATA_START });
  dispatch({ type: actionTypes.POST_USER_DATA_SUCCESS });
  dispatch({ type: actionTypes.POST_USER_DATA_FAILED });
};
