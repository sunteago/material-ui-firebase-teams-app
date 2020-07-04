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
    case actionTypes.CLEAR_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        userGroupsContent: state.userGroupsContent.map((group) => {
          return {
            ...group,
            messages: group.messages.filter((message) => {
              return action.payload.id !== message.timestamp;
            }),
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
