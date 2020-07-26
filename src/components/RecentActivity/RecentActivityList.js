import React from "react";

import RecentActivityItem from "./RecentActivityItem";
import SectionTitle from "../Layout/Dashboard/SectionTitle";

import { cleanDashboard } from "../../utils/helpers";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { List, Typography, useMediaQuery } from "@material-ui/core";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  noRecentSm: {
    margin: theme.spacing(2),
    textAlign: "center",
  },
  noRecentBig: {
    margin: theme.spacing(5),
    textAlign: "left",
  },
}));

export default function RecentActivity(props) {
  const { handleClearComment, groups, title, seenMessages, userId } = props;

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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
          <Typography
            className={classes[matches ? "noRecentBig" : "noRecentSm"]}
            variant="body1"
          >
            There is no recent activity in your groups yet!
          </Typography>
        )}
      </List>
    </>
  );
}

RecentActivity.propTypes = {
  handleClearComment: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  seenMessages: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)),
  userId: PropTypes.string.isRequired,
};
