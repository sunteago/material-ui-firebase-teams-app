import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../store/actions";
import RecentNotifications from "../components/Notifications/RecentNotifications";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import { Typography, Container, Divider } from "@material-ui/core";



export default function Notifications() {

  const notifications = useSelector((state) => state.userData.notifications);
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();

  const handleClearNotif = (notif) => () => {
    dispatch(actions.clearNotification(userId, notif));
  };

  const invitations = notifications.filter(
    (notif) => notif.type === "invitation"
  );
  const appMessages = notifications.filter(
    (notif) => notif.type === "appMessage"
  );

  return (
    <>
      <SectionTitle>Last Notifications</SectionTitle>
      <Divider style={{ width: "100%", margin: "2rem" }} />
      <Container >
        {!notifications.length && (
          <Typography>You have no new notifications</Typography>
        )}
        {!!appMessages.length && (
          <>
            <SectionTitle variant="h5">Teams App Staff</SectionTitle>
            <RecentNotifications
              notifications={appMessages}
              handleClearNotif={handleClearNotif}
              type="appMessage"
            />
            <Divider style={{ width: "100%" }} />
          </>
        )}

        {!!invitations.length && (
          <>
            <SectionTitle variant="h5">Group Invitations</SectionTitle>
            <RecentNotifications
              notifications={invitations}
              handleClearNotif={handleClearNotif}
              type="invitation"
            />
          </>
        )}
      </Container>
    </>
  );
}
