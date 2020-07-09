import React from "react";
import Settings from "../components/Settings/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


export default function CreateGroup() {

  return (
    <>
      <Settings
        title="Create a new Group"
        isPublic={false}
        description="This is my new group"
        modalConfirmText="Please, check that the information is OK"
        confirmText="Create Group"
        ConfirmIcon={AddCircleOutlineIcon}
      />
    </>
  );
}
