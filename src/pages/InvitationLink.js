import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Typography, Button } from "@material-ui/core";
import * as actions from "../store/actions";
import AlertMessage from "../components/Layout/AlertMessage";
import * as alertTypes from "../constants/alertTypes";


const useStyles = makeStyles((theme) => ({
  newsItemContainer: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    width: "100%",
  },
  boxLink: {
    textDecoration: "none",
    cursor: "pointer",
  },
  alertMessage: {
    margin: theme.spacing(3),
  },
}));

export default function InvitationLink() {
  const classes = useStyles();
  const location = useLocation();
  const link = new URLSearchParams(location.search).get("link");
  const invitationLinkId = useState(link)[0];
  const invitationLinkData = useSelector(
    (state) => state.userData.invitationLinkData
  );
  const groupPageError = useSelector((state) => state.UI.groupPageError);

  const userId = useSelector((state) => state.auth.user.uid);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (invitationLinkId) {
      dispatch(actions.fetchGroupInvitationLinkData(invitationLinkId));
    }
  }, [invitationLinkId, dispatch]);

  const onActionHandler = (action) => {
    dispatch(
      actions.acceptOrDeclineInvitation(
        action,
        invitationLinkId,
        invitationLinkData.groupId,
        userId
      )
    );
  };

  if (Object.keys(invitationLinkData).length) {
    return (
      <>
        <Typography component="h1">{invitationLinkData.groupName}</Typography>
        <Typography>{invitationLinkData.message}</Typography>
        <Button onClick={() => onActionHandler(true)} variant="contained">
          Join
        </Button>
        <Button onClick={() => onActionHandler(false)} variant="contained">
          Decline
        </Button>
      </>
    );
  } else {
    return Object.keys(groupPageError).length ? (
      <AlertMessage
        alertStyles={classes.alertMessage}
        severity="error"
        action={alertTypes.INVITATION_LINK_PROBLEM}
      />
    ) : null;
  }
}
