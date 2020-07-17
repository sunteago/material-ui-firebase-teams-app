import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Badge, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function NotificationsButton({ notificationsNum, classes }) {
  return (
    <IconButton
      aria-label="show new notifications"
      color="inherit"
      aria-haspopup="true"
    >
      <Link className={classes.notificationsButton} to="/notifications">
        <Badge badgeContent={notificationsNum} color="secondary">
          <NotificationsIcon fontSize="default" />
        </Badge>
      </Link>
    </IconButton>
  );
}
