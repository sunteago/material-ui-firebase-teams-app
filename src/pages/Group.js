import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import GroupHeader from "../components/Group/GroupHeader";
import GroupInvitation from "../components/Group/GroupInvitation";
import GroupActionsButtons from "../components/Group/GroupActionButtons";
import GroupSectionsContainer from "../components/Group/GroupSectionsContainer";
import Modal from "../components/Layout/Modal/Modal";

import * as alertTypes from "../constants/alertTypes";
import AlertMessage from "../components/Layout/AlertMessage";
import NavigationTab from "../components/Layout/NavigationTabs";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  infoChips: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(3),
    zIndex: 1000,
  },
  groupName: {
    margin: theme.spacing(2),
  },
  dividerLine: {
    width: "100%",
    margin: theme.spacing(3),
  },
  inviteButton: {
    alignSelf: "flex-end",
    margin: theme.spacing(1),
  },
  quitButton: {
    alignSelf: "flex-end",
    margin: theme.spacing(1),
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  alertMessage: {
    margin: theme.spacing(3),
  },
}));

export default function Group() {
  const classes = useStyles();

  const { groupId } = useParams();
  const history = useHistory();

  const [tab, setTab] = useState(0);
  const [activeGroup, setActiveGroup] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const groupData = useSelector((state) => state.groupData);
  const { groupsInLocal, userGroups, generatedInvitationLink } = groupData;
  const { isFullLoading, groupPageError } = useSelector((state) => state.UI);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => setTab(newValue);

  let shouldFetch = useRef(true);

  useEffect(() => {
    if (!isFullLoading) {
      const groupInLocal = groupsInLocal.find((grp) => groupId === grp.groupId);
      if (!groupInLocal && shouldFetch.current) {
        dispatch(actions.fetchSingleGroup(groupId));
        shouldFetch.current = false;
      }
      if (groupInLocal) setActiveGroup(groupInLocal);
    }
  }, [dispatch, groupId, groupsInLocal, isFullLoading]);

  const onConfirmSaveGroup = (groupData, setIsModalOpen) => {
    dispatch(actions.editGroupData(groupId, groupData, setIsModalOpen));
    setTab(0);
  };

  const onDeleteGroup = (groupId, userId) => () => {
    dispatch(actions.deleteGroup(groupId, userId, history));
  };

  //if there is a group found
  if (Object.keys(activeGroup).length) {
    const isCreator = !!(
      activeGroup.roles[user.uid] &&
      activeGroup.roles[user.uid].role === "creator"
    );
    const isMember = activeGroup.isCurrentUserAMember;

    const isUserAbleToInvite = isCreator || activeGroup.usersAllowedToInvite;

    return (
      <>
        <Helmet>
          <title>{activeGroup.name} | TeamsApp</title>
        </Helmet>

        <Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title="Invite people"
          decline="OK"
        >
          <GroupInvitation
            generatedLink={generatedInvitationLink}
            dispatch={dispatch}
            activeGroup={activeGroup}
            userEmail={user.email}
          />
        </Modal>

        <GroupHeader
          activeGroup={activeGroup}
          isMember={isMember}
          isCreator={isCreator}
          classes={classes}
        />

        <GroupActionsButtons
          classes={classes}
          isMember={isMember}
          isUserAbleToInvite={isUserAbleToInvite}
          setIsModalOpen={setIsModalOpen}
          dispatch={dispatch}
          groupId={groupId}
          user={user}
          userGroups={userGroups}
          history={history}
        />

        <Divider className={classes.dividerLine} />
        <NavigationTab
          tab={tab}
          handleTabChange={handleTabChange}
          isCreator={isCreator}
        />

        <GroupSectionsContainer
          dispatch={dispatch}
          activeGroup={activeGroup}
          isMember={isMember}
          isCreator={isCreator}
          user={user}
          onDeleteGroup={onDeleteGroup}
          onConfirmSaveGroup={onConfirmSaveGroup}
          tab={tab}
        />
      </>
    );
  } else {
    return Object.keys(groupPageError).length ? (
      <>
        <Helmet>
          <title>Error | TeamsApp</title>
        </Helmet>
        <AlertMessage
          alertStyles={classes.alertMessage}
          severity="error"
          action={alertTypes.FETCH_SINGLE_GROUP_FAILED}
        />
      </>
    ) : null;
  }
}
