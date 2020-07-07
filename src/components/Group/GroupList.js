import React from "react";
import SectionTitle from "../Layout/Dashboard/SectionTitle";
import GroupItem from "./GroupItem";
import { List, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function GroupsContainer({ title, groups }) {
  const classes = useStyles();
  return (
    <>
      <SectionTitle style={{textAlign: 'center'}}>{title}</SectionTitle>
      <List className={classes.root}>
        {groups.map((group) => {
          return <GroupItem key={group.groupId} group={group} />;
        })}
      </List>
    </>
  );
}
