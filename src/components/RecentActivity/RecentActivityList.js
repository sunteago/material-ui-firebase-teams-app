import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import RecentActivityItem from "./RecentActivityItem";
import SectionTitle from "../Layout/Dashboard/SectionTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function RecentActivityList(props) {
  const { handleClearComment, groups, title, userId } = props;
  
  const classes = useStyles();

  return (
    <>
      <SectionTitle style={{ textAlign: "center" }}>{title}</SectionTitle>
      <List className={classes.root}>
        {groups.map((activityItem) => {
          return activityItem.messages.length > 0 && (
            <RecentActivityItem
              key={activityItem.groupId}
              activityItem={activityItem}
              handleClearComment={handleClearComment}
              userId={userId}
            />
          );
        })}
      </List>
    </>
  );
}
