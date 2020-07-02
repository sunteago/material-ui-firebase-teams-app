import * as actionTypes from "../../constants/types";

const initialState = {
  token: "",
  isAuth: null,
  isAccountVerified: false,
  newState: false,
  error: "",
  user: {}
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_CHECK_FAILED:
      return {
        ...state,
        isAuth: false,
      };
    case actionTypes.AUTH_CHECK_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case actionTypes.LOG_IN_FAILED:
    case actionTypes.SIGN_OUT_FAILED:
    case actionTypes.STANDARD_SIGN_UP_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.SEND_VERIFICATION_EMAIL_START:
    case actionTypes.STANDARD_SIGN_UP_START:
    case actionTypes.SIGN_OUT_START:
    case actionTypes.AUTH_CHECK_START:
    case actionTypes.SEND_VERIFICATION_EMAIL_SUCCESS:
    case actionTypes.SEND_VERIFICATION_EMAIL_FAILED:
    case actionTypes.STANDARD_SIGN_UP_SUCCESS:
    case actionTypes.LOG_IN_SUCCESS:
    case actionTypes.SIGN_OUT_SUCCESS:
    case actionTypes.LOG_IN_START:
      return state;
    default:
      return state;
  }
}
