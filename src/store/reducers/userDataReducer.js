import * as actionTypes from "../../constants/types";

const initialState = {
  profile: {
    status: "",
    avatar: "",
    displayName: "",
  },
  memberSince: new Date(),
  isUserVisible: null,
  lastNews: [],
  activeUser: {},
  notifications: [],
};

export default function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_INITIAL_DATA_SUCCESS:
      return {
        ...state,
        profile: {
          status: action.payload.status,
          avatar: action.payload.avatar,
          displayName: action.payload.name,
        },
        memberSince: action.payload.memberSince,
        isUserVisible: action.payload.isVisible,
        notifications: action.payload.notifications,
        seenMessages: action.payload.seenMessages,
      };
    case actionTypes.CLEAR_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        seenMessages: state.seenMessages.concat(action.payload),
      };
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        activeUser: action.payload,
      };
    case actionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        lastNews: action.payload,
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
        profile: {
          ...state.profile,
          avatar: action.payload.imageURL,
          status: action.payload.description,
          displayName: action.payload.name,
        },
      };
    case actionTypes.CLEAR_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.timestamp !== action.payload.timestamp
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
