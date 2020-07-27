import React from "react";
import SmallTextBox from "../Layout/Dashboard/SmallTextBox";

import PropTypes from "prop-types";

export default function RecentNotifications(props) {
  const { notifications, handleClearNotif } = props;
  return notifications.map((notif) => (
    <SmallTextBox
      key={notif.timestamp}
      title={notif.groupName || notif.title}
      content={notif.content}
      handleClear={handleClearNotif(notif)}
      linkTo={notif.link}
    />
  ));
}

RecentNotifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClearNotif: PropTypes.func.isRequired,
};
