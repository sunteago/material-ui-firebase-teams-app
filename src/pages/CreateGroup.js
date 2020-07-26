import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

import { Helmet } from "react-helmet";
import Settings from "../components/Settings/Settings";

export default function CreateGroup() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const onConfirmCreateGroup = (settingsData) => {
    const groupData = {
      name: settingsData.name,
      isPublic: settingsData.isPublic,
      usersAllowedToInvite: settingsData.usersAllowedToInvite,
      description: settingsData.description,
      imageURL: settingsData.imageURL,
    };
    dispatch(
      actions.createNewGroup(
        groupData,
        { userId: user.uid, name: user.displayName },
        history
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>Create new Group | TeamsApp</title>
      </Helmet>

      <Settings
        mode="createGroup"
        isVisible={true}
        confirmHandler={onConfirmCreateGroup}
      />
    </>
  );
}
