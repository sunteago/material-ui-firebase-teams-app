import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import Settings from "../components/Settings/Settings";

export default function CreateGroup() {
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();

  const history = useHistory();

  const onConfirmCreateGroup = (settingsData) => {
    const groupData = {
      groupName: settingsData.name,
      isPublic: settingsData.isPublic,
      usersAllowedToInvite: settingsData.usersAllowedToInvite,
      description: settingsData.description,
    }
    dispatch(actions.createNewGroup(groupData, userId, history));
  };

  return <Settings mode="createGroup" confirmHandler={onConfirmCreateGroup} />;
}
