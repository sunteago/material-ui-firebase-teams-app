import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import { Link } from "react-router-dom";

export default function GroupItem({ group }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {group.image ? (
          <Avatar src={group.image} alt={`${group.name}'s image`} />
        ) : (
          <Avatar>
            <WorkIcon />
          </Avatar>
        )}
      </ListItemAvatar>
      <Link
        to={`/groups/${group.groupId}`}
        style={{
          all: "unset",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <ListItemText primary={group.name} secondary={group.description} />
      </Link>
    </ListItem>
  );
}
