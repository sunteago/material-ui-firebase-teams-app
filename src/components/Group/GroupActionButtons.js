import React from "react";
import { Button } from "@material-ui/core";
import * as actions from "../../store/actions";
import debounce from "just-debounce-it";

export default function GroupActionButtons(props) {
  const {
    classes,
    isMember,
    isUserAbleToInvite,
    setIsModalOpen,
    dispatch,
    groupId,
    user,
    userGroups,
    history,
  } = props;

  const debouncedJoinHandler = debounce(() => {
    dispatch(
      actions.joinPublicGroupNoInvitation(
        { userId: user.uid, name: user.displayName, avatar: user.photoURL },
        groupId,
        userGroups
      )
    );
  }, 400);

  const debouncedLeaveHandler = debounce(() => {
    dispatch(actions.leaveGroup(groupId, user.uid, history));
  }, 400);

  return (
    <>
      {isUserAbleToInvite && isMember && (
        <Button
          onClick={() => setIsModalOpen((prev) => !prev)}
          size="small"
          color="primary"
          className={classes.inviteButton}
          variant="outlined"
        >
          Invite to this group
        </Button>
      )}
      {!isMember && (
        <Button
          size="small"
          color="primary"
          className={classes.inviteButton}
          variant="outlined"
          onClick={debouncedJoinHandler}
        >
          Join this group
        </Button>
      )}
      {isMember && (
        <Button
          size="small"
          color="secondary"
          className={classes.quitButton}
          variant="outlined"
          onClick={debouncedLeaveHandler}
        >
          Quit this Group
        </Button>
      )}
    </>
  );
}
