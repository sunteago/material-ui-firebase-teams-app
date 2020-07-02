import * as actionTypes from '../../constants/types';

const initialState = {
  userGroups: [],
  userStatus: "",
  memberSince: new Date(),
  isUserVisible: false,
  lastNews: [],
  topActivePublicGroups: []
};

export function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.POST_USER_DATA_START:
    case actionTypes.POST_USER_DATA_SUCCESS:
    case actionTypes.POST_USER_DATA_FAILED:
    case actionTypes.FETCH_INITIAL_DATA_START:
    case actionTypes.FETCH_INITIAL_DATA_SUCCESS:
    case actionTypes.FETCH_INITIAL_DATA_FAILED:
    default:
      return state;
  }
}
