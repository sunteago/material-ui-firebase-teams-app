import React from "react";
import * as actions from "../../store/actions";

import { Button } from "@material-ui/core";
import debounce from "just-debounce-it";

import PropTypes from "prop-types";

function GroupActionButtons(props) {
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
    const userData = {
      userId: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    };

    dispatch(
      actions.joinPublicGroupNoInvitation(userData, groupId, userGroups)
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

GroupActionButtons.propTypes = {
  isUserAbleToInvite: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isMember: PropTypes.bool,
  userGroups: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.objectOf(PropTypes.string),
};

export default React.memo(GroupActionButtons, (prevProps, nextProps) => {
  if (prevProps.isMember === nextProps.isMember && prevProps) {
    return true;
  }
  return false;
});
