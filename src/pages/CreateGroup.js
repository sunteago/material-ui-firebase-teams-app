import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import Settings from "../components/Settings/Settings";

export default function CreateGroup() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const onConfirmCreateGroup = (settingsData) => {
    const groupData = {
      groupName: settingsData.name,
      isPublic: settingsData.isPublic,
      usersAllowedToInvite: settingsData.usersAllowedToInvite,
      description: settingsData.description,
      image: settingsData.imageURL
    }
    dispatch(actions.createNewGroup(groupData, {userId: user.uid, name: user.displayName}, history));
  };

  return <Settings mode="createGroup" confirmHandler={onConfirmCreateGroup} />;
}
