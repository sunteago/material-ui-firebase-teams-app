import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { useParams, useHistory } from "react-router-dom";

import TaskListContainer from "../components/Tasks/TasksListContainer";
import Messages from "../components/Messages/Messages";
import Members from "../components/Group/GroupMembers";
import Settings from "../components/Settings/Settings";
import GroupInvitation from "../components/Group/GroupInvitation";
import Modal from "../components/Layout/Modal/Modal";

import * as alertTypes from "../constants/alertTypes";
import AlertMessage from "../components/Layout/AlertMessage";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import NavigationTab from "../components/Layout/NavigationTabs";
import { Divider, Chip, Button, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";

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
    margin: theme.spacing(1)
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

  const { groupsInLocal, userGroups, generatedInvitationLink } = useSelector(
    (state) => state.groupData
  );
  const { isFullLoading, groupPageError } = useSelector((state) => state.UI);
  const user = useSelector((state) => state.auth.user);

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
          />
        </Modal>

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

        <Grid
          item
          container
          justify="center"
          spacing={3}
          className={classes.groupName}
        >
          <Grid item container justify="flex-end" xs={4} sm={5}>
            <Avatar
              src={activeGroup.image}
              alt={`${activeGroup.name}'s image`}
            />
          </Grid>
          <Grid item container justify="flex-start" xs={8} sm={7}>
            <SectionTitle>{activeGroup.name}</SectionTitle>
          </Grid>
        </Grid>

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

        <Divider className={classes.dividerLine} />
        <NavigationTab
          tab={tab}
          handleTabChange={handleTabChange}
          isCreator={isCreator}
        />

        {tab === 0 && (
          <TaskListContainer
            todoList={activeGroup.todoList}
            isMember={isMember}
            groupId={groupId}
            dispatch={dispatch}
          />
        )}
        {tab === 1 && (
          <Messages
            messages={activeGroup.messages}
            user={user}
            groupId={groupId}
            isMember={isMember}
            dispatch={dispatch}
          />
        )}
        {tab === 2 && <Members members={activeGroup.roles} />}
        {tab === 3 && isCreator && (
          <Settings
            mode="modifyGroup"
            confirmHandler={onConfirmSaveGroup}
            deleteHandler={onDeleteGroup(groupId, user.uid)}
            isVisible={activeGroup.isPublic}
            descriptText={activeGroup.description}
            existingName={activeGroup.name}
            imageUrl={activeGroup.image}
          />
        )}
      </>
    );
  } else {
    return Object.keys(groupPageError).length ? (
      <AlertMessage
        alertStyles={classes.alertMessage}
        severity="error"
        action={alertTypes.FETCH_SINGLE_GROUP_FAILED}
      />
    ) : null;
  }
}
