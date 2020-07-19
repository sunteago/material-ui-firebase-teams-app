import * as actionTypes from "../../constants/types";

const initialState = {
  loading: false,
  isFullLoading: true,
  dashboardLoading: false,
  groupPageError: {},
  snackData: {
    severity: "",
    action: "",
    isOpen: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEND_NOTIFICATION_SUCCESS:
    case actionTypes.SEND_NOTIFICATION_FAILED:
    case actionTypes.TOGGLE_LIST_ITEM_FAILED:
      return {
        ...state,
        loading: false,
        snackData: action.payload,
      };
    case actionTypes.AUTH_CHECK_FAILED:
    case actionTypes.LOG_IN_FAILED:
    case actionTypes.SIGN_OUT_FAILED:
    case actionTypes.STANDARD_SIGN_UP_FAILED:
    case actionTypes.SEND_VERIFICATION_EMAIL_SUCCESS:
    case actionTypes.SEND_VERIFICATION_EMAIL_FAILED:
    case actionTypes.STANDARD_SIGN_UP_SUCCESS:
    case actionTypes.LOG_IN_SUCCESS:
    case actionTypes.SIGN_OUT_SUCCESS:
    case actionTypes.FETCH_GROUP_DATA_SUCCESS:
    case actionTypes.FETCH_GROUP_DATA_FAILED:
    case actionTypes.FINISH_FETCHING_INITIAL_DATA:
    case actionTypes.CLEAR_DASHBOARD_DATA_SUCCESS:
    case actionTypes.CLEAR_DASHBOARD_DATA_FAILED:
    case actionTypes.FETCH_SINGLE_GROUP_SUCCESS:
    case actionTypes.FETCH_INVITATION_LINK_SUCCESS:
    case actionTypes.FETCH_INITIAL_DATA_FAILED:
    case actionTypes.ACCEPT_OR_DECLINE_INVITATION_SUCCESS:
    case actionTypes.ACCEPT_OR_DECLINE_INVITATION_FAILED:
    case actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_FAILED:
    case actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_SUCCESS:
    case actionTypes.DELETE_TASK_ITEM_SUCCESS:
    case actionTypes.ADD_TASK_ITEM_SUCCESS:
    case actionTypes.TOGGLE_LIST_ITEM_SUCCESS:
    case actionTypes.DELETE_TASK_ITEM_FAILED:
    case actionTypes.ADD_TASK_ITEM_FAILED:
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
    case actionTypes.FETCH_USER_PROFILE_FAILED:
    case actionTypes.SUBMIT_PROFILE_CHANGES_SUCCESS:
    case actionTypes.SUBMIT_PROFILE_CHANGES_FAILED:
    case actionTypes.POST_NEW_MESSAGE_SUCCESS:
    case actionTypes.POST_NEW_MESSAGE_FAILED:
    case actionTypes.EDIT_GROUP_DATA_SUCCESS:
    case actionTypes.EDIT_GROUP_DATA_FAILED:
    case actionTypes.CREATE_GROUP_INVITATION_PERSONAL_SUCCESS:
    case actionTypes.DELETE_GROUP_SUCCESS:
    case actionTypes.DELETE_GROUP_FAILED:
    case actionTypes.CREATE_NEW_GROUP_FAILED:
    case actionTypes.CREATE_NEW_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isFullLoading: false,
      };
    case actionTypes.FETCH_SINGLE_GROUP_FAILED:
    case actionTypes.FETCH_INVITATION_LINK_FAILED:
      return {
        ...state,
        groupPageError: action.payload,
        loading: false,
      };
    case actionTypes.SEND_VERIFICATION_EMAIL_START:
    case actionTypes.STANDARD_SIGN_UP_START:
    case actionTypes.SIGN_OUT_START:
    case actionTypes.AUTH_CHECK_START:
    case actionTypes.LOG_IN_START:
    case actionTypes.FETCH_GROUP_DATA_START:
    case actionTypes.CLEAR_DASHBOARD_DATA_START:
    case actionTypes.FETCH_SINGLE_GROUP_START:
    case actionTypes.FETCH_INVITATION_LINK_START:
    case actionTypes.ACCEPT_OR_DECLINE_INVITATION_START:
    case actionTypes.JOIN_PUBLIC_GROUP_NO_INVITATION_START:
    case actionTypes.DELETE_TASK_ITEM_START:
    case actionTypes.ADD_TASK_ITEM_START:
    case actionTypes.TOGGLE_LIST_ITEM_START:
    case actionTypes.FETCH_USER_PROFILE_START:
    case actionTypes.SUBMIT_PROFILE_CHANGES_START:
    case actionTypes.POST_NEW_MESSAGE_START:
    case actionTypes.EDIT_GROUP_DATA_START:
    case actionTypes.DELETE_GROUP_START:
    case actionTypes.CREATE_NEW_GROUP_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_INITIAL_DATA_START:
      return {
        ...state,
        isFullLoading: true,
      };
    case actionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        snackData: {
          isOpen: true,
          ...action.payload,
        },
      };
    case actionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackData: {
          ...state.snackData,
          isOpen: false,
        },
      };
    default:
      return state;
  }
}
