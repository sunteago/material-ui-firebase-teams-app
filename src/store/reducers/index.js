import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userDataReducer from "./userDataReducer";
import UIReducer from "./UIReducer";
import groupDataReducer from "./groupDataReducer";

export default combineReducers({
  auth: authReducer,
  userData: userDataReducer,
  groupData: groupDataReducer,
  UI: UIReducer,
});
