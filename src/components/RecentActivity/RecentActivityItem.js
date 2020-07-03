import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Comment from "../Comment/Comment";

export default function RecentActivityItem({ activityItem }) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={activityItem.name}
          secondary={activityItem.description}
        />

        {activityItem.lastMessages.map((message) => {
          return <Comment key={Math.random()} messsage={message} />;
        })}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"></ListItem>
    </>
  );
}
