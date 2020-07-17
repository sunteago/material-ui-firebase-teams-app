import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Badge, IconButton } from "@material-ui/core";

export default function NotificationsMenu({notificationsNum}) {
  return (
    <IconButton
      aria-label="show new notifications"
      color="inherit"
      aria-haspopup="true"
    >
      <Badge badgeContent={notificationsNum} color="secondary">
        <NotificationsIcon fontSize="default" />
      </Badge>
    </IconButton>
  );
}
