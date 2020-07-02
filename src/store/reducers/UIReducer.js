import * as actionTypes from '../../constants/types'

const initialState = {
  loading: false,
  isFullLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_CHECK_FAILED:
    case actionTypes.AUTH_CHECK_SUCCESS:
    case actionTypes.LOG_IN_FAILED:
    case actionTypes.SIGN_OUT_FAILED:
    case actionTypes.STANDARD_SIGN_UP_FAILED:
    case actionTypes.SEND_VERIFICATION_EMAIL_SUCCESS:
    case actionTypes.SEND_VERIFICATION_EMAIL_FAILED:
    case actionTypes.STANDARD_SIGN_UP_SUCCESS:
    case actionTypes.LOG_IN_SUCCESS:
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isFullLoading: false
      };

    case actionTypes.SEND_VERIFICATION_EMAIL_START:
    case actionTypes.STANDARD_SIGN_UP_START:
    case actionTypes.SIGN_OUT_START:
    case actionTypes.AUTH_CHECK_START:
    case actionTypes.LOG_IN_START:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
