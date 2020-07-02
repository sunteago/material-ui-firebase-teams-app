import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";


export default function GroupItem({ group }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={group.name} secondary={group.description} />
    </ListItem>
  );
}
