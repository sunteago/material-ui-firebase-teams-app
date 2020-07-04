import * as actionTypes from "../../constants/types";

const initialState = {
  userGroups: [],
  userStatus: "",
  memberSince: new Date(),
  isUserVisible: null,
  lastNews: [],
  topActivePublicGroups: [],
  userGroupsContent: [],
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


export function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_INITIAL_DATA_SUCCESS:
      return {
        ...state,
        userGroups: action.payload.inGroups,
        userStatus: action.payload.status,
        memberSince: action.payload.memberSince,
        isUserVisible: action.payload.isVisible,
        lastNews: action.payload.lastNews,
        topActivePublicGroups: action.payload.topActivePublicGroups,
      };
    case actionTypes.FETCH_GROUP_DATA_SUCCESS:
      return {
        ...state,
        userGroupsContent: action.payload,
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
    case actionTypes.CLEAR_DASHBOARD_DATA_FAILED:
    case actionTypes.POST_USER_DATA_START:
    case actionTypes.POST_USER_DATA_SUCCESS:
    case actionTypes.POST_USER_DATA_FAILED:
    case actionTypes.FETCH_INITIAL_DATA_START:
    case actionTypes.FETCH_INITIAL_DATA_FAILED:
    default:
      return state;
  }
}
