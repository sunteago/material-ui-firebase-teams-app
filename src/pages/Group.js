import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { useParams } from "react-router-dom";

import * as alertTypes from "../constants/alertTypes";
import AlertMessage from "../components/Layout/AlertMessage";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import TaskListContainer from "../components/Tasks/TasksListContainer";
import NavigationTab from "../components/Layout/NavigationTabs";
import { Divider, Chip, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import Modal from "../components/Layout/Modal/Modal";
import Settings from "../components/Settings/Settings";
import Messages from "../components/Messages/Messages";
import GroupInvitation from "../components/Group/GroupInvitation";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  infoChips: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    zIndex: 1000,
  },
  dividerLine: {
    width: "100%",
    margin: theme.spacing(3),
  },
  inviteButton: {
    alignSelf: "flex-end",
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
  const { groupId } = useParams();
  const classes = useStyles();

  const [tab, setTab] = useState(1);
  const [activeGroup, setActiveGroup] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { groupsInLocal, userGroups } = useSelector((state) => state.userData);
  const { isFullLoading, groupPageError } = useSelector((state) => state.UI);
  const user = useSelector((state) => state.auth.user);
  const generatedLink = useSelector(
    (state) => state.userData.generatedInvitationLink
  );

  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => setTab(newValue);

  let shouldFetch = useRef(true);

  useEffect(() => {
    if (!isFullLoading) {
      const groupInLocal = groupsInLocal.find(
        (group) => groupId === group.groupId
      );
      if (!groupInLocal && shouldFetch.current) {
        dispatch(actions.fetchSingleGroup(groupId));
        shouldFetch.current = false;
      }
      if (groupInLocal) {
        setActiveGroup(groupInLocal);
      }
    }
  }, [dispatch, groupId, groupsInLocal, isFullLoading]);

  const onConfirmSaveGroup = (groupData,setIsModalOpen) => {
    dispatch(actions.editGroupData(groupId, groupData, setIsModalOpen));
  }


  if (Object.keys(activeGroup).length) {
    const isCreator = activeGroup.roles[user.uid] === "creator";
    const isUserAbleToInvite = isCreator || activeGroup.usersAllowedToInvite;
    const isMember = !!activeGroup.roles[user.uid];

    return (
      <>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            title="Invite people"
            confirm="OK"
            confirmActionHandler={() => setIsModalOpen(false)}
          >
            <GroupInvitation
              generatedLink={generatedLink}
              dispatch={dispatch}
              activeGroup={activeGroup}
            />
          </Modal>
        )}
        <Grid
          container
          justify="flex-end"
          className={classes.infoChips}
          spacing={1}
        >
          {isMember && (
            <Grid item>
              <Chip
                icon={isCreator ? <AdminIcon /> : <PersonIcon />}
                label={isCreator ? "Creator" : "Member"}
                variant="outlined"
                color={isCreator ? "secondary" : "primary"}
              />
            </Grid>
          )}

          <Grid item>
            <Chip
              icon={activeGroup.isPublic ? <PublicIcon /> : <LockIcon />}
              label={activeGroup.isPublic ? "Public" : "Private"}
              variant="outlined"
              color={activeGroup.isPublic ? "primary" : "secondary"}
            />
          </Grid>
        </Grid>

        <SectionTitle>{activeGroup.name}</SectionTitle>
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
                  user.uid,
                  groupId,
                  userGroups
                )
              )
            }
          >
            Join this group
          </Button>
        )}
        <Divider className={classes.dividerLine} />
        <NavigationTab
          tab={tab}
          handleTabChange={handleTabChange}
          isCreator={isCreator}
        />

        {tab === 0 && (
          <TaskListContainer
            todoList={activeGroup.todoList}
            groupId={groupId}
            dispatch={dispatch}
          />
        )}
        {tab === 1 && (
          <Messages
            messages={activeGroup.messages}
            user={user}
            dispatch={dispatch}
            groupId={groupId}
          />
        )}
        {tab === 2 && <div>Members</div>}
        {tab === 3 && isCreator && (
          <Settings
            mode="modifyGroup"
            confirmHandler={onConfirmSaveGroup}
            isVisible={activeGroup.isPublic}
            descriptText={activeGroup.description}
            existingName={activeGroup.name}
            //imageUrl={activeUser.avatar}
            //setIsEditing={setIsEditing}
          />
        )}
      </>
    );
  } else {
    return Object.keys(groupPageError).length ? (
      <AlertMessage
        alertStyles={classes.alertMessage}
        severity="error"
        action={alertTypes.FETCH_SINGLE_GROUP_ERROR}
      />
    ) : null;
  }
}
