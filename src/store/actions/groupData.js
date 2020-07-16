import * as actionTypes from "../../constants/types";
import { db, firebase } from "../../config/firebaseConfig";
import Group from "../../models/Group";
import Task from "../../models/Task";
import Message from "../../models/Message";

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
          [`roles.${userId}`]: "member",
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
      console.log(err);
      dispatch({
        type: actionTypes.ACCEPT_OR_DECLINE_INVITATION_FAILED,
        payload: err,
      });
    });
};

export const joinPublicGroupNoInvitation = (userId, groupId, inGroups) => (
  dispatch
) => {
  dispatch({ type: actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_START });

  const userRef = db.collection("users").doc(userId);
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
        [`roles.${userId}`]: "member",
        lastUserJoined: userId,
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
      dispatch({ type: actionTypes.CREATE_NEW_GROUP_FAILED });
    });
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
    })
    .catch((err) => {
      dispatch({ type: actionTypes.ADD_TASK_ITEM_FAILED });
    });
};

export const deleteTaskItem = (groupId, task) => (dispatch) => {
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
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETE_TASK_ITEM_FAILED });
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
      dispatch({
        type: actionTypes.POST_NEW_MESSAGE_SUCCESS,
        payload: {
          groupId,
          message,
        },
      });
      finishAction();
    })
    .catch((err) => {
      dispatch({ type: actionTypes.POST_NEW_MESSAGE_FAILED, payload: err });
    });
};

export const editGroupData = (groupId, groupData, setOpen) => dispatch => {
  dispatch({ type: actionTypes.EDIT_GROUP_DATA_START });
  
  const groupRef = db.collection('groups').doc(groupId);
  
  groupRef.update({
    description: groupData.description,
    isPublic: groupData.isPublic,
    image: groupData.imageURL,
    name: groupData.name
  })
  .then(() => {
    dispatch({ type: actionTypes.EDIT_GROUP_DATA_SUCCESS, payload: {
      groupId, groupData
    } });
    setOpen(false);
  })
  .catch(err => {
    console.log(err)
    dispatch({ type: actionTypes.EDIT_GROUP_DATA_FAILED });
  })
}