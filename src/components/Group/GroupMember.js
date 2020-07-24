import React from "react";
import { Avatar } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

export default function GroupMember({ member, classes }) {
  return (
    <Link to={`/profile/${member.memberId}`} style={{ textDecoration: "none" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            className={classes.memberListItemAvatar}
            size="small"
            src={member.avatar}
            alt={`${member.name}'s avatar`}
          />
        </ListItemAvatar>
        <ListItemText primary={member.name} secondary={member.role} />
      </ListItem>
    </Link>
  );
}
