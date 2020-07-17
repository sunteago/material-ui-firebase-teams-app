import React from "react";
import SmallTextBox from "../Layout/Dashboard/SmallTextBox";

export default function RecentNotifications(props) {
  const { notifications, type, handleClearNotif } = props;
  return notifications.map((notif) => {
    const content =
      type === "invitation"
        ? "You've been invited to join this group" 
        : "Welcome to the Teams App. We recommend you to start creating a group";
    return (
      <SmallTextBox
        key={notif.timestamp}
        title={notif.groupName || notif.title}
        content={content}
        handleClear={handleClearNotif(notif)}
      />
    );
  });
}
