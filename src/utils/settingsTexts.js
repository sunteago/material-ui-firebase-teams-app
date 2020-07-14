import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import * as alertTypes from "../constants/alertTypes";

export default {
  profile: {
    title: "Edit Profile",
    nameText: "Public Name",
    visibilityText:
      "Set your profile to visible (Everyone will be able to see it)",
    visibilityStates: ["Not Visible", "Visible"],
    descriptionText: "About you",
    confirmText: "Confirm",
    modalConfirmText: "Please, confirm your changes",
    ConfirmIcon: AddCircleOutlineIcon,
    alertMsg: alertTypes.MAKE_USER_VISIBLE,
  },
  createGroup: {
    title: "Create Group",
    nameText: "Group Name",
    visibilityText:
      "Set this group profile to public (Everyone will be able to see it)",
    visibilityStates: ["Private", "Public"],
    descriptionText: "Group Description",
    invitationText: "Allow other users to invite with a one-time link",
    invitationStates: ["Deny", "Allow"],
    confirmText: "Confirm",
    modalConfirmText: `Please, check that all is correct, once you create a group
     you won't be able to change its name`,
    ConfirmIcon: AddCircleOutlineIcon,
    alertMsg: alertTypes.MAKE_GROUP_PUBLIC,
  },
};
