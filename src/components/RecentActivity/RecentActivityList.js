import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import RecentActivityItem from "./RecentActivityItem";
import SectionTitle from "../Layout/Dashboard/SectionTitle";
import { cleanDashboard } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  noRecentActivityMsg: {
    margin: theme.spacing(5)
  },
}));

export default function RecentActivity(props) {
  const { handleClearComment, groups, title, seenMessages, userId } = props;

  const classes = useStyles();

  const activityItems = cleanDashboard(groups, seenMessages, userId);

  let isDashboardClean = activityItems.some((grp) => grp.messages.length > 0);

  return (
    <>
      <SectionTitle style={{ textAlign: "center" }}>{title}</SectionTitle>
      <List className={classes.root}>
        {isDashboardClean ? (
          activityItems.map((activityItem) => {
            return (
              activityItem.messages.length > 0 && (
                <RecentActivityItem
                  key={activityItem.groupId}
                  activityItem={activityItem}
                  handleClearComment={handleClearComment}
                  userId={userId}
                />
              )
            );
          })
        ) : (
          <Typography className={classes.noRecentActivityMsg} variant="body1">
            There is no recent activity in your groups yet!
          </Typography>
        )}
      </List>
    </>
  );
}
