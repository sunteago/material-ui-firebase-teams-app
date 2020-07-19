import * as actionTypes from "../../constants/types";

export const closeSnackbar = () => {
  return { type: actionTypes.CLOSE_SNACKBAR };
};

export const imperativeOpenSnackbar = (snackData) => {
  return { type: actionTypes.OPEN_SNACKBAR, payload: snackData };
};
