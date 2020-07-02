import * as actionTypes from "../../constants/types";
import { db } from "../../config/firebaseConfig";

export const fetchUserData = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_INITIAL_DATA_START });
  const userRef = db.collection("users").doc(userId);
  const generalRef = db.collection("general").doc("dashboard");
  Promise.all([userRef.get(), generalRef.get()])
    .then((data) => {
      let dashboardData = {};
      data.forEach((doc) => {
        if (doc.exists) {
            dashboardData = {...dashboardData, ...doc.data()};
        }
      });
      dispatch({ type: actionTypes.FETCH_INITIAL_DATA_SUCCESS, payload: dashboardData });
      console.log(dashboardData);
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCH_INITIAL_DATA_FAILED, payload: err });
    });
};

export const postUserData = () => (dispatch) => {
  dispatch({ type: actionTypes.POST_USER_DATA_START });
  dispatch({ type: actionTypes.POST_USER_DATA_SUCCESS });
  dispatch({ type: actionTypes.POST_USER_DATA_FAILED });
};
