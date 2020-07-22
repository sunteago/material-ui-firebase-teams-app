import React from "react";
import { Button } from "@material-ui/core";
import * as actions from "../../store/actions";

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
          onClick={() =>
            dispatch(
              actions.joinPublicGroupNoInvitation(
                { userId: user.uid, name: user.displayName },
                groupId,
                userGroups
              )
            )
          }
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
          onClick={() => dispatch(actions.leaveGroup(groupId, user.uid, history))}
        >
          Quit this Group
        </Button>
      )}
    </>
  );
}
