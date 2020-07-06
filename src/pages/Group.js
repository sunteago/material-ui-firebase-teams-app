import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/Layout/PageContainer";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import { useSelector } from "react-redux";
import TaskListContainer from "../components/Tasks/TasksListContainer";
import NavigationTab from "../components/Layout/NavigationTabs";
import { Divider, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Settings from "../components/Settings/Settings";
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';

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
  const groups = useSelector((state) => state.userData.userGroupsContent);
  const groupInLocal = groups.find((group) => groupId === group.groupId);

  //check if user has permission to view this group

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return groupInLocal ? (
    <PageContainer paperStyles={{ position: "relative" }}>
      <Chip
        className={classes.isPublicChip}
        icon={groupInLocal.isPublic ? <PublicIcon /> : <LockIcon />}
        label={groupInLocal.isPublic ? "Public" : "Private"}
        variant="outlined"
      />
      <SectionTitle>{groupInLocal.name}</SectionTitle>
      <Divider className={classes.dividerLine} />
      <NavigationTab tab={tab} handleTabChange={handleTabChange} />
      {tab === 0 && (
        <TaskListContainer todoList={groupInLocal.todoList} groupId={groupId} />
      )}
      {tab === 1 && <div>TAB 2</div>}
      {tab === 2 && <div>TAB 3</div>}
      {tab === 3 && (
        <Settings
          isPublic={groupInLocal.isPublic}
          description={groupInLocal.description}
        />
      )}
    </PageContainer>
  ) : null;
}
