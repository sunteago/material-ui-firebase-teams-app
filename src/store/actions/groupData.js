import { db, firebase } from "../../config/firebaseConfig";

import * as actionTypes from "../../constants/types";
import * as alertTypes from "../../constants/alertTypes";

import Group from "../../models/Group";
import Task from "../../models/Task";
import Message from "../../models/Message";
import InvLink from "../../models/InvitationLink";
import UserNotification from "../../models/Notification";

export const fetchGroupsData = (groupsArr, seenMessages) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_GROUP_DATA_START });

  const groupsRef = db.collection("groups");
  const groupsToFetchList = groupsArr.map((groupId) => {
    return groupsRef.doc(groupId).get();
  });

  Promise.all(groupsToFetchList)
    .then((groupsDocArr) => {
      const groups = [];
      groupsDocArr.forEach((groupDoc) => {
        if (groupDoc.exists) {
          const group = groupDoc.data();
          group.groupId = groupDoc.id;
          group.isCurrentUserAMember = true;
          groups.push(group);
        }
      });

      dispatch({
        type: actionTypes.FETCH_GROUP_DATA_SUCCESS,
        payload: groups,
      });

      if (seenMessages) {
        dispatch(clearActivityCommentLocal(seenMessages));
      }
    })
    .catch((err) => {
      console.log(err);
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

export const updateGroupLastActivity = (groupId) => (dispatch) => {
  const dashboardRef = db.collection("general").doc("dashboard");
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  dashboardRef
    .update({
      [`topActivePublicGroups.${groupId}.lastActivity`]: timestamp,
    })
    .then(() => dispatch({ type: actionTypes.UPDATE_GROUP_LAST_ACTIVITY }))
    .catch(console.log);
};

export const addTaskItem = (groupId, newTask) => (dispatch) => {
  dispatch({ type: actionTypes.ADD_TASK_ITEM_START });
  const groupRef = db.collection("groups").doc(groupId);

  const task = { ...new Task(newTask, 1) };
  groupRef
    .update({
      todoList: firebase.firestore.FieldValue.arrayUnion(task),
    })
    .then(() => {
      dispatch({
        type: actionTypes.ADD_TASK_ITEM_SUCCESS,
        payload: {
          groupId,
          newTask: task,
        },
      });
      dispatch(updateGroupLastActivity(groupId));
    })
    .catch((err) => {
      dispatch({ type: actionTypes.ADD_TASK_ITEM_FAILED });
    });
};

export const deleteTaskItem = (groupId, task, onError) => (dispatch) => {
  dispatch({ type: actionTypes.DELETE_TASK_ITEM_START });
  const groupRef = db.collection("groups").doc(groupId);

  groupRef
    .update({
      todoList: firebase.firestore.FieldValue.arrayRemove(task),
    })
    .then(() => {
      dispatch({
        type: actionTypes.DELETE_TASK_ITEM_SUCCESS,
        payload: {
          groupId,
          taskId: task.taskId,
        },
      });
      dispatch(updateGroupLastActivity(groupId));
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETE_TASK_ITEM_FAILED });
      onError({ severity: "error", action: alertTypes.TOGGLE_TASK_FAILED });
    });
};

export const toggleTaskItem = (groupId, updatedTask, oldTask) => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LIST_ITEM_START });

  const batch = db.batch();
  const groupRef = db.collection("groups").doc(groupId);
  batch.update(groupRef, {
    todoList: firebase.firestore.FieldValue.arrayRemove(oldTask),
  });
  batch.update(groupRef, {
    todoList: firebase.firestore.FieldValue.arrayUnion(updatedTask),
  });

  batch
    .commit()
    .then(() => {
      dispatch({ type: actionTypes.TOGGLE_LIST_ITEM_LOCAL });
      dispatch({
        type: actionTypes.TOGGLE_LIST_ITEM_SUCCESS,
        payload: {
          groupId,
          oldTask,
        },
      });
      dispatch(updateGroupLastActivity(groupId));
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.TOGGLE_LIST_ITEM_FAILED,
        payload: {
          severity: "error",
          action: alertTypes.TOGGLE_TASK_FAILED,
          isOpen: true,
        },
      });
    });
};

export const postGroupMessage = (groupId, msg, finishAction) => (dispatch) => {
  dispatch({ type: actionTypes.POST_NEW_MESSAGE_START });
  const groupRef = db.collection("groups").doc(groupId);

  const message = new Message(msg, new Date());
  groupRef
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({ ...message }),
    })
    .then(() => {
      dispatch({ type: actionTypes.POST_NEW_MESSAGE_SUCCESS });
      finishAction();
      dispatch(updateGroupLastActivity(groupId));
    })
    .catch((err) => {
      dispatch({ type: actionTypes.POST_NEW_MESSAGE_FAILED, payload: err });
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
  const [userAccepted, linkId, groupId, user, history] = args;

  dispatch({ type: actionTypes.ACCEPT_OR_DECLINE_INVITATION_START });

  const groupRef = db.collection("groups").doc(groupId);
  const linkRef = db.collection("invitationLinks").doc(linkId);
  const userRef = db.collection("users").doc(user.userId);

  let inGroups;

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
      //save variable for later use (we need to re-fetch data)
      inGroups = docs[1].get("inGroups");

      //delete link from active invitation links
      transaction.update(groupRef, {
        activeInvitationLinks: firebase.firestore.FieldValue.arrayRemove(
          linkId
        ),
        lastInvitationLinkUsed: linkId,
      });
      //delete link document from links collection
      transaction.delete(linkRef);

      if (userAccepted) {
        //set user to member in group document
        transaction.update(groupRef, {
          [`roles.${user.userId}`]: {
            role: "member",
            name: user.name,
          },
        });
        //set groupId in inGroups property within user document
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
      if (userAccepted) {
        history.push(`/groups/${groupId}`);
        //refetch data for the new group
        dispatch(fetchGroupsData([...inGroups, groupId]));
      } else {
        history.push("/dashboard");
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.ACCEPT_OR_DECLINE_INVITATION_FAILED,
        payload: err,
      });
    });
};

export const sendNotificationToUser = (...args) => (dispatch) => {
  dispatch({ type: actionTypes.SEND_NOTIFICATION_START });
  const [invitedUserEmail, groupName, invLink] = args;
  const invUserEmail = invitedUserEmail.toLowerCase();
  const usersRef = db.collection("users").where("email", "==", invUserEmail);

  const notif = new UserNotification(
    "invitation",
    undefined,
    groupName,
    invLink
  );

  usersRef
    .get()
    .then((snapshot) => {
      let userRef;
      snapshot.forEach((doc) => {
        userRef = db.collection("users").doc(doc.id);
      });
      return userRef.update({
        notifications: firebase.firestore.FieldValue.arrayUnion({ ...notif }),
      });
    })
    .then(() => {
      dispatch({
        type: actionTypes.SEND_NOTIFICATION_SUCCESS,
        payload: {
          isOpen: true,
          severity: "success",
          action: alertTypes.SENT_INVITATION_LINK_SUCCESS,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SEND_NOTIFICATION_FAILED,
        payload: {
          isOpen: true,
          severity: "error",
          action: alertTypes.SENT_INVITATION_LINK_FAILED,
        },
      });
    });
};

export const joinPublicGroupNoInvitation = (...args) => (dispatch) => {
  dispatch({ type: actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_START });

  const [user, groupId, inGroups] = args;

  const userRef = db.collection("users").doc(user.userId);
  const groupRef = db.collection("groups").doc(groupId);

  db.runTransaction((transaction) => {
    return transaction.get(userRef).then((userDoc) => {
      if (!userDoc.exists) {
        throw new Error("This user does not exist");
      }

      if (userDoc.data().inGroups.includes(groupId)) {
        throw new Error("This user is already in this group");
      }

      transaction.update(userRef, {
        inGroups: firebase.firestore.FieldValue.arrayUnion(groupId),
      });

      transaction.update(groupRef, {
        [`roles.${user.userId}`]: {
          role: "member",
          name: user.name,
        },
        lastUserJoined: user.userId,
      });
    });
  })
    .then(() => {
      dispatch({
        type: actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_SUCCESS,
      });
      //refetch data for the new group
      dispatch(fetchGroupsData([...inGroups, groupId]));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_FAILED });
    });
};

export const createGroupInvitationLink = (...args) => (dispatch) => {
  dispatch({ type: actionTypes.CREATE_GROUP_INVITATION_LINK_START });

  const [groupId, groupName, message, invitedUserEmail] = args;

  const groupRef = db.collection("groups").doc(groupId);
  const linkCollectionRef = db.collection("invitationLinks");

  const invLink = new InvLink(groupId, groupName, message, invitedUserEmail);
  let invitationLinkId;

  linkCollectionRef
    .add({ ...invLink })
    .then((linkId) => {
      invitationLinkId = linkId.id;
      return groupRef.update({
        activeInvitationLinks: firebase.firestore.FieldValue.arrayUnion(
          linkId.id
        ),
      });
    })
    .then(() => {
      const invitationLink = `${window.location.pathname}/invite?link=${invitationLinkId}`;
      if (invitedUserEmail) {
        dispatch({
          type: actionTypes.CREATE_GROUP_INVITATION_PERSONAL_SUCCESS,
        });
        dispatch(
          sendNotificationToUser(invitedUserEmail, groupName, invitationLink)
        );
      } else {
        dispatch({
          type: actionTypes.CREATE_GROUP_INVITATION_LINK_SUCCESS,
          payload: `${window.location.origin}${window.location.pathname}/invite?link=${invitationLinkId}`,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.CREATE_GROUP_INVITATION_LINK_FAILED,
        payload: err,
      });
    });
};

export const updatePublicGroupDashboard = (groupData) => (dispatch) => {
  const dashboardRef = db.collection("general").doc("dashboard");
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  console.log(groupData);
  dashboardRef
    .update({
      [`topActivePublicGroups.${groupData.groupId}`]: {
        name: groupData.name,
        description: groupData.description,
        lastActivity: timestamp,
        image: groupData.imageURL,
      },
    })
    .then(() => {
      dispatch({ type: actionTypes.UPDATE_PUBLIC_DASHBOARD_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: actionTypes.UPDATE_PUBLIC_DASHBOARD_SUCCESS });
    });
};

export const createNewGroup = (groupData, user, history) => (dispatch) => {
  dispatch({ type: actionTypes.CREATE_NEW_GROUP_START });
  const userRef = db.collection("users").doc(user.userId);
  const groupsRef = db.collection("groups");
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const groupModel = new Group(groupData, user, timestamp);

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
      dispatch({
        type: actionTypes.CREATE_NEW_GROUP_SUCCESS,
        payload: groupId,
      });
      //if it is public, create a space for dashboard data
      history.push(`/groups/${groupId}`);
      if (groupData.isPublic) {
        dispatch(updatePublicGroupDashboard({ ...groupData, groupId }));
      }
    })
    .catch((err) => {
      dispatch({ type: actionTypes.CREATE_NEW_GROUP_FAILED });
    });
};

export const deleteGroup = (groupId, userId, history) => (dispatch) => {
  dispatch({ type: actionTypes.DELETE_GROUP_START });
  const groupRef = db.collection("groups").doc(groupId);
  const userRef = db.collection("users").doc(userId);

  Promise.all([
    groupRef.delete(),
    userRef.update({
      inGroups: firebase.firestore.FieldValue.arrayRemove(groupId),
    }),
  ])
    .then(() => {
      history.replace("/dashboard");
      dispatch({
        type: actionTypes.DELETE_GROUP_SUCCESS,
        payload: { groupId },
      });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETE_GROUP_FAILED, payload: err });
    });
};

export const editGroupData = (groupId, groupData, setOpen) => (dispatch) => {
  dispatch({ type: actionTypes.EDIT_GROUP_DATA_START });

  const groupRef = db.collection("groups").doc(groupId);

  groupRef
    .update({
      description: groupData.description,
      isPublic: groupData.isPublic,
      image: groupData.imageURL,
      name: groupData.name,
    })
    .then(() => {
      dispatch({
        type: actionTypes.EDIT_GROUP_DATA_SUCCESS,
        payload: {
          groupId,
          groupData,
        },
      });
      setOpen(false);
      dispatch(updatePublicGroupDashboard({...groupData, groupId}));
    })
    .catch((err) => {
      dispatch({ type: actionTypes.EDIT_GROUP_DATA_FAILED });
    });
};

export const manageMessageObserver = (groupId, action, run) => (dispatch) => {
  if (action === "start") {
    dispatch({ type: actionTypes.MESSAGE_OBSERVER_START });
    const groupRef = db.collection("groups").doc(groupId);
    run.unsubscribe = groupRef.onSnapshot(function (doc) {
      dispatch({
        type: actionTypes.MESSAGE_UPDATE_RECEIVED,
        payload: {
          messages: doc.data().messages,
          groupId: doc.id,
        },
      });
    });
  } else {
    dispatch({ type: actionTypes.MESSAGE_OBSERVER_STOP });
  }
};
