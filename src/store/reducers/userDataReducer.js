import * as actionTypes from "../../constants/types";

const initialState = {
  userGroups: [],
  userStatus: "",
  memberSince: new Date(),
  isUserVisible: null,
  lastNews: [],
  topActivePublicGroups: [],
  userGroupsContent: [],
  groupsInLocal: [],
  invitationLinkData: {},
  generatedInvitationLink: "",
  activeUser: {},
  notifications: [],
};

const removeSeenMessages = (action, group) => {
  const arr = [];
  group.messages.forEach((msg) => {
    const seen = action.payload.some((seenMsg) => {
      return seenMsg.seconds === msg.timestamp.seconds;
    });
    if (!seen) arr.push(msg);
  });
  return arr;
};

//TODO : avoid double groups
//TODO: extract similar logic to functions
//TODO: create a groupData reducer

export function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_INITIAL_DATA_SUCCESS:
      return {
        ...state,
        userGroups: action.payload.inGroups,
        userStatus: action.payload.status,
        memberSince: action.payload.memberSince,
        isUserVisible: action.payload.isVisible,
        topActivePublicGroups: action.payload.topActivePublicGroups,
        notifications: action.payload.notifications,
      };
    case actionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        lastNews: action.payload,
      };
    case actionTypes.FETCH_GROUP_DATA_SUCCESS:
      return {
        ...state,
        userGroupsContent: action.payload,
        groupsInLocal: action.payload,
      };
    case actionTypes.FETCH_SINGLE_GROUP_SUCCESS:
      return {
        ...state,
        groupsInLocal: [...state.userGroupsContent, action.payload],
      };
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        activeUser: action.payload,
      };
    case actionTypes.CLEAR_DASHBOARD_DATA_LOCAL:
      return {
        ...state,
        userGroupsContent: state.userGroupsContent.map((group) => {
          return {
            ...group,
            messages: removeSeenMessages(action, group),
          };
        }),
      };
    case actionTypes.CREATE_GROUP_INVITATION_LINK_SUCCESS:
      return {
        ...state,
        generatedInvitationLink: action.payload,
      };
    case actionTypes.FETCH_INVITATION_LINK_SUCCESS:
      return {
        ...state,
        invitationLinkData: action.payload,
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...initialState,
        lastNews: state.lastNews,
      };
    case actionTypes.DELETE_TASK_ITEM_SUCCESS:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.map((group) => {
          const { groupId, taskId } = action.payload;
          if (group.groupId === groupId) {
            return {
              ...group,
              todoList: group.todoList.filter((task) => task.taskId !== taskId),
            };
          }
          return group;
        }),
      };
    case actionTypes.TOGGLE_LIST_ITEM_SUCCESS:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.map((group) => {
          const { groupId, oldTask } = action.payload;
          if (group.groupId === groupId) {
            return {
              ...group,
              todoList: group.todoList.map((task) => {
                if (task.taskId === oldTask.taskId) {
                  return {
                    ...task,
                    done: !task.done,
                  };
                }
                return task;
              }),
            };
          }
          return group;
        }),
      };
    case actionTypes.ADD_TASK_ITEM_SUCCESS:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.map((group) => {
          const { groupId, newTask } = action.payload;
          if (group.groupId === groupId) {
            return {
              ...group,
              todoList: group.todoList.concat(newTask),
            };
          }
          return group;
        }),
      };
    case actionTypes.SUBMIT_PROFILE_CHANGES_SUCCESS:
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          name: action.payload.name,
          status: action.payload.description,
          avatar: action.payload.imageURL,
        },
      };
    case actionTypes.POST_NEW_MESSAGE_SUCCESS:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.map((group) => {
          const { groupId, message } = action.payload;
          if (group.groupId === groupId) {
            return {
              ...group,
              messages: group.messages.concat(message),
            };
          }
          return group;
        }),
      };
    case actionTypes.EDIT_GROUP_DATA_SUCCESS:
      return {
        ...state,
        ...state,
        groupsInLocal: state.groupsInLocal.map((group) => {
          const { groupId, groupData } = action.payload;
          if (group.groupId === groupId) {
            return {
              ...group,
              description: groupData.description,
              isPublic: groupData.isPublic,
              image: groupData.imageURL,
              name: groupData.name,
              usersAllowedToInvite: groupData.usersAllowedToInvite,
            };
          }
          return group;
        }),
      };
    case actionTypes.CLEAR_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.timestamp !== action.payload.timestamp
        ),
      };
    case actionTypes.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.filter(
          (group) => group.groupId !== action.payload.groupId
        ),
        userGroupsContent: state.userGroupsContent.filter(
          (group) => group.groupId !== action.payload.groupId
        ),
      };
    case actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_SUCCESS:
    case actionTypes.ACCEPT_OR_DECLINE_INVITATION_START:
    case actionTypes.ACCEPT_OR_DECLINE_INVITATION_SUCCESS:
    case actionTypes.ACCEPT_OR_DECLINE_INVITATION_FAILED:
    case actionTypes.FETCH_SINGLE_GROUP_FAILED:
    case actionTypes.FETCH_NEWS_FAILED:
    case actionTypes.CLEAR_DASHBOARD_DATA_FAILED:
    case actionTypes.FETCH_INITIAL_DATA_START:
    case actionTypes.FETCH_INITIAL_DATA_FAILED:
    default:
      return state;
  }
}
