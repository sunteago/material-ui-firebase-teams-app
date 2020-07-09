import * as actionTypes from "../../constants/types";
import { db, firebase } from "../../config/firebaseConfig";
import { getLastMonth } from "../../utils/helpers";
import Group from "../../models/Group";

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
        payload: { ...doc.data(), groupId: doc.id },
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

export const fetchGroupInvitationLinkData = (inviteLinkId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_INVITATION_LINK_START });
  const linkRef = db.collection("invitationLinks").doc(inviteLinkId);
  linkRef
    .get()
    .then((linkDoc) => {
      if (!linkDoc.exists) {
        throw new Error("Invalid Link");
      }
      dispatch({
        type: actionTypes.FETCH_INVITATION_LINK_SUCCESS,
        payload: linkDoc.data(),
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.FETCH_INVITATION_LINK_FAILED,
        payload: { msg: err },
      });
    });
};

export const acceptOrDeclineInvitation = (...args) => (dispatch) => {
  const [userAccepted, linkId, groupId, userId, history] = args;

  dispatch({ type: actionTypes.ACCEPT_OR_DECLINE_INVITATION_START });

  const groupRef = db.collection("groups").doc(groupId);
  const linkRef = db.collection("invitationLinks").doc(linkId);
  const userRef = db.collection("users").doc(userId);

  db.runTransaction((transaction) => {
    return Promise.all([linkRef.get(), userRef.get()]).then((docs) => {
      if (!docs[0].exists) {
        throw new Error(
          "This invitation link is not valid or has already been used"
        );
      }

      if (docs[1].get("inGroups").includes(groupId)) {
        throw new Error("You are already in this group");
      }

      transaction.update(groupRef, {
        activeInvitationLinks: firebase.firestore.FieldValue.arrayRemove(
          linkId
        ),
      });

      transaction.delete(linkRef);

      if (userAccepted) {
        transaction.update(groupRef, {
          [`roles.${userId}`]: "member",
        });

        transaction.update(userRef, {
          inGroups: firebase.firestore.FieldValue.arrayUnion(groupId),
        });
      }
    });
  })
    .then(() => {
      dispatch({
        type: actionTypes.ACCEPT_OR_DECLINE_INVITATION_SUCCESS,
        payload: userAccepted,
      });
      if (userAccepted) history.push(`/groups/${groupId}`);
      else history.push("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: actionTypes.ACCEPT_OR_DECLINE_INVITATION_FAILED,
        payload: err,
      });
    });
};

export const createGroupInvitationLink = (groupId, groupName, message) => (
  dispatch
) => {
  dispatch({ type: actionTypes.CREATE_GROUP_INVITATION_LINK_START });
  const groupRef = db.collection("groups").doc(groupId);
  const linkCollectionRef = db.collection("invitationLinks");
  let invitationLinkId;
  linkCollectionRef
    .add({
      groupId,
      groupName,
      message,
    })
    .then((linkId) => {
      invitationLinkId = linkId.id;
      return groupRef.update({
        activeInvitationLinks: firebase.firestore.FieldValue.arrayUnion(
          linkId.id
        ),
      });
    })
    .then(() => {
      dispatch({
        type: actionTypes.CREATE_GROUP_INVITATION_LINK_SUCCESS,
        payload: `${window.location}/invite?link=${invitationLinkId}`,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.CREATE_GROUP_INVITATION_LINK_FAILED,
        payload: err,
      });
    });
};

export const createNewGroup = (groupData, userId, history) => (dispatch) => {
  dispatch({ type: actionTypes.CREATE_NEW_GROUP_START });

  const userRef = db.collection("users").doc(userId);
  const groupsRef = db.collection("groups");
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const groupModel = new Group(groupData, userId, timestamp);
  
  let groupId;

  groupsRef
    .add({ ...groupModel })
    .then((doc) => {
      groupId = doc.id;
      return userRef.update({
        inGroups: firebase.firestore.FieldValue.arrayUnion(groupId),
      });
    })
    .then(() => {
      dispatch({ type: actionTypes.CREATE_NEW_GROUP_SUCCESS });
      history.push(`/groups/${groupId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.CREATE_NEW_GROUP_FAILED });
    });
};
