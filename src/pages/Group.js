import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { useParams } from "react-router-dom";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import TaskListContainer from "../components/Tasks/TasksListContainer";
import NavigationTab from "../components/Layout/NavigationTabs";
import { Divider, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Settings from "../components/Settings/Settings";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  isPublicChip: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    zIndex: 100000,
  },
  dividerLine: {
    width: "100%",
    margin: theme.spacing(3),
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
}));

export default function Group() {
  const { groupId } = useParams();
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const [activeGroup, setActiveGroup] = useState({});

  const groups = useSelector((state) => state.userData.userGroupsContent);
  const isFullLoading = useSelector((state) => state.UI.isFullLoading);
  const dispatch = useDispatch();
  //check if user has permission to view this group

  const handleTabChange = (event, newValue) => setTab(newValue);

  let shouldFetch = React.useRef(true);

  useEffect(() => {
    if (!isFullLoading) {
      const groupInLocal = groups.find((group) => groupId === group.groupId);
      if (!groupInLocal && shouldFetch.current) {
        dispatch(actions.fetchSingleGroup(groupId));
        shouldFetch.current = false;
      } 
      if (groupInLocal) {
        setActiveGroup(groupInLocal);
        console.log(groupInLocal);
      }
    }
  }, [dispatch, groupId, groups, isFullLoading]);

  return Object.keys(activeGroup).length ? (
    <>
      <Chip
        className={classes.isPublicChip}
        icon={activeGroup.isPublic ? <PublicIcon /> : <LockIcon />}
        label={activeGroup.isPublic ? "Public" : "Private"}
        variant="outlined"
      />
      <SectionTitle>{activeGroup.name}</SectionTitle>
      <Divider className={classes.dividerLine} />
      <NavigationTab tab={tab} handleTabChange={handleTabChange} />
      {tab === 0 && (
        <TaskListContainer todoList={activeGroup.todoList} groupId={groupId} />
      )}
      {tab === 1 && <div>TAB 2</div>}
      {tab === 2 && <div>TAB 3</div>}
      {tab === 3 && (
        <Settings
          isPublic={activeGroup.isPublic}
          description={activeGroup.description}
        />
      )}
    </>
  ) : null;
}
