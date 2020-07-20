import * as actionTypes from "../../constants/types";

const initialState = {
  userGroups: [], //[groupId, ...]
  //userGroupsContent: [], //userGroups detail(each document)
  groupsInLocal: [], //groups that are in local (downloaded visited or are user's groups)
  topActivePublicGroups: [], //top groups ordered by activity
  generatedInvitationLink: "",
  invitationLinkData: {},
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

export default function groupDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_INITIAL_DATA_SUCCESS:
      return {
        ...state,
        userGroups: action.payload.inGroups,
        topActivePublicGroups: action.payload.topActivePublicGroups,
      };
    case actionTypes.FETCH_GROUP_DATA_SUCCESS:
      return {
        ...state,
        groupsInLocal: action.payload,
      };
    case actionTypes.FETCH_SINGLE_GROUP_SUCCESS:
      if (state.userGroups.includes(action.payload.groupId)) {
        action.payload.isCurrentUserAMember = true;
      }
      return {
        ...state,
        groupsInLocal: [...state.groupsInLocal, action.payload],
      };
    case actionTypes.CREATE_NEW_GROUP_SUCCESS:
      return {
        ...state,
        userGroups: state.userGroups.concat(action.payload),
      };
    case actionTypes.FETCH_INVITATION_LINK_SUCCESS:
      return {
        ...state,
        invitationLinkData: action.payload,
      };
    case actionTypes.CREATE_GROUP_INVITATION_LINK_SUCCESS:
      return {
        ...state,
        generatedInvitationLink: action.payload,
      };
    case actionTypes.CLEAR_DASHBOARD_DATA_LOCAL:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.map((group) => {
          return {
            ...group,
            messages: removeSeenMessages(action, group),
          };
        }),
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
    case actionTypes.EDIT_GROUP_DATA_SUCCESS:
      return {
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
    case actionTypes.MESSAGE_UPDATE_RECEIVED:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.map((group) => {
          if (group.groupId === action.payload.groupId) {
            return {
              ...group,
              messages: action.payload.messages,
            };
          }
          return group;
        }),
      };
    case actionTypes.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groupsInLocal: state.groupsInLocal.filter(
          (group) => group.groupId !== action.payload.groupId
        ),
        userGroups: state.userGroups.filter(
          (groupId) => groupId !== action.payload.groupId
        ),
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...initialState,
        lastNews: state.lastNews,
      };
    default:
      return state;
  }
}
