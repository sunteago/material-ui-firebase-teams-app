import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../store/actions";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const activeUser = useSelector((state) => state.userData.activeUser);

  useEffect(() => {
    dispatch(actions.fetchUserProfile(currentUser, userId));
  }, [dispatch, userId, currentUser]);

  return <div>{activeUser.uid}</div>;
}
