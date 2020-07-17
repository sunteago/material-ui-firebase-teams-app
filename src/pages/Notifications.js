import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../store/actions";
import RecentNotifications from "../components/Notifications/RecentNotifications";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import { Typography, makeStyles, Container, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  notificationsContainer: {
    marginTop: theme.spacing(5),
  },
}));

export default function Notifications() {
  const classes = useStyles();

  const notifications = useSelector((state) => state.userData.notifications);
  const dispatch = useDispatch();

  const handleClearNotif = () => {
    dispatch(actions.clearNotification());
  };

  const invitations = notifications.filter(
    (notif) => notif.type === "invitation"
  );
  const usersJoinedToMyGroup = notifications.filter(
    (notif) => notif.type === "userJoined"
  );

  return (
    <>
      <SectionTitle>Last Notifications</SectionTitle>
      <Container className={classes.notificationsContainer}>
        {!invitations.length && !usersJoinedToMyGroup.length && (
          <>
            <Typography>You have 0 new notifications</Typography>
            <Divider style={{width: '100%'}} />
          </>
        )}
        {invitations.length && (
          <>
            <SectionTitle variant="h5">Group Invitations</SectionTitle>
            <RecentNotifications
              notifications={invitations}
              handleClearNotif={handleClearNotif}
            />
          </>
        )}
        {usersJoinedToMyGroup.length && (
          <>
            <SectionTitle variant="h5">New users in your groups</SectionTitle>
            <RecentNotifications
              notifications={usersJoinedToMyGroup}
              handleClearNotif={handleClearNotif}
            />
          </>
        )}
      </Container>
    </>
  );
}
