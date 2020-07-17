import React from "react";
import SmallTextBox from "../Layout/Dashboard/SmallTextBox";

export default function RecentNotifications(props) {
  const { notifications, type, handleClearNotif } = props;
  return notifications.map((notif) => {
    const content =
      type === "userJoined"
        ? `${notif.newMember} joined this group`
        : "You've been invited to join this group";
    return (
      <SmallTextBox
        key={notif.timestamp}
        title={notif.groupName}
        content={content}
        handleClear={handleClearNotif}
      />
    );
  });
}
