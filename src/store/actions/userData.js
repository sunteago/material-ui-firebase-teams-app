import * as actionTypes from "../../constants/types";
import { db } from "../../config/firebaseConfig";

export const fetchUserData = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_USER_DATA_START});
  dispatch({ type: actionTypes.FETCH_USER_DATA_SUCCESS });
  dispatch({ type: actionTypes.FETCH_USER_DATA_FAILED});
};

export const postUserData = () => (dispatch) => {
  dispatch({ type: actionTypes.POST_USER_DATA_START });
  dispatch({ type: actionTypes.POST_USER_DATA_SUCCESS });
  dispatch({ type: actionTypes.POST_USER_DATA_FAILED });
};
