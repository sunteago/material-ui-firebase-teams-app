import React from "react";

import SmallTextBox from "../Layout/Dashboard/SmallTextBox";
import GroupItem from "../Group/GroupItem";

import { Divider, List, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import PropTypes from "prop-types";

export default function RecentActivityItem(props) {
  const { activityItem, handleClearComment } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <GroupItem group={activityItem} />
        </Grid>
        <Grid container item xs={12} md={6}>
          <List
            style={
              matches
                ? { width: "100%" }
                : { width: "100%", marginLeft: "2.5rem" }
            }
          >
            {activityItem.messages.map((message) => (
              <SmallTextBox
                key={message.timestamp}
                title={message.title}
                content={message.content}
                author={message.author}
                userId={message.userId}
                handleClear={() => handleClearComment(message.timestamp)}
              />
            ))}
          </List>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

RecentActivityItem.propTypes = {
  activityItem: PropTypes.shape({
    description: PropTypes.string,
    groupId: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleClearComment: PropTypes.func.isRequired
}