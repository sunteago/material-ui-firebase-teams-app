import * as actionTypes from "../../constants/types";

const initialState = {
  userStatus: "",
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
        userStatus: action.payload.status,
        memberSince: action.payload.memberSince,
        isUserVisible: action.payload.isVisible,
        notifications: action.payload.notifications,
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
