import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import Settings from "../components/Settings/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function CreateGroup() {
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();

  const history = useHistory();

  const onConfirmCreateGroup = (groupData) => {
    dispatch(actions.createNewGroup(groupData, userId, history));
  };

  return (
    <>
      <Settings
        title="Create a new Group"
        isPublic={false}
        description="This is my new group"
        modalConfirmText="Please, check that the information is OK"
        confirmText="Create Group"
        ConfirmIcon={AddCircleOutlineIcon}
        confirmHandler={onConfirmCreateGroup}
      />
    </>
  );
}
