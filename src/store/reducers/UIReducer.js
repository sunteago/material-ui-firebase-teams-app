import * as actionTypes from "../../constants/types";

const initialState = {
  loading: false,
  isFullLoading: true,
  dashboardLoading: false,
  groupPageError: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
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
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_INITIAL_DATA_START:
      return {
        ...state,
        isFullLoading: true,
      };
    default:
      return state;
  }
}
