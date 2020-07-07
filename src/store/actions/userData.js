import * as actionTypes from "../../constants/types";
import { db, firebase } from "../../config/firebaseConfig";
import { getLastMonth } from "../../utils/helpers";

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
        dispatch(fetchGroupsData(dashboardData));
      } else {
        dispatch({type: actionTypes.FINISH_FETCHING_INITIAL_DATA})
      }
    })
    .catch((err) => {
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

export const fetchGroupsData = (groupsArr) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_GROUP_DATA_START });
  const groupsRef = db.collection("groups");
  const groupsToFetchList = groupsArr.inGroups.map((group) => {
    return groupsRef.doc(group).get();
  });
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
      dispatch(clearActivityCommentLocal(groupsArr.seenMessages));
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCH_GROUP_DATA_FAILED });
      console.log(err);
    });
};

export const fetchSingleGroup = (groupId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_SINGLE_GROUP_START });
  const groupRef = db.collection("groups").doc(groupId);
  groupRef
    .get()
    .then((doc) => {
      dispatch({
        type: actionTypes.FETCH_SINGLE_GROUP_SUCCESS,
        payload: {...doc.data(),groupId: doc.id },
      });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCH_SINGLE_GROUP_FAILED, payload: err });
    });
};

export const clearActivityCommentLocal = (commTimestamp) => {
  const payload = !commTimestamp.length ? [commTimestamp] : commTimestamp;
  return {
    type: actionTypes.CLEAR_DASHBOARD_DATA_LOCAL,
    payload,
  };
};

export const clearActivityCommentDB = (commTimestamp, userId) => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_DASHBOARD_DATA_START });
  dispatch(clearActivityCommentLocal(commTimestamp));

  const userRef = db.collection("users").doc(userId);
  userRef
    .update({
      seenMessages: firebase.firestore.FieldValue.arrayUnion(commTimestamp),
    })
    .then(() => {
      dispatch({ type: actionTypes.CLEAR_DASHBOARD_DATA_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.CLEAR_DASHBOARD_DATA_FAILED });
    });
};

export const toggleTaskItem = (groupId, newTask, oldTask) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LIST_ITEM_START });
  const batch = db.batch();
  const groupRef = db.collection("groups").doc(groupId);
  batch.update(groupRef, {
    todoList: firebase.firestore.FieldValue.arrayRemove(oldTask),
  });
  batch.update(groupRef, {
    todoList: firebase.firestore.FieldValue.arrayUnion(newTask),
  });

  batch
    .commit()
    .then(() => {
      dispatch({ type: actionTypes.TOGGLE_LIST_ITEM_LOCAL });
      dispatch({ type: actionTypes.TOGGLE_LIST_ITEM_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.TOGGLE_LIST_ITEM_FAILED, payload: err });
    });
};

export const postUserData = () => (dispatch) => {};
