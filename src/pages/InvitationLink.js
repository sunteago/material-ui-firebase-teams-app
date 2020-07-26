import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import { makeStyles, Typography, Button, Box, Grid } from "@material-ui/core";
import * as actions from "../store/actions";
import AlertMessage from "../components/Layout/AlertMessage";
import * as alertTypes from "../constants/alertTypes";

import ErrorBoundary from "../components/Layout/ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    margin: theme.spacing(3),
    textAlign: "center",
  },
  buttonsContainer: {
    textAlign: "center",
    marginTop: theme.spacing(3),
  },
  text: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  alertMessage: {
    margin: theme.spacing(3),
  },
}));

export default function InvitationLink() {
  const classes = useStyles();

  const location = useLocation();
  const link = new URLSearchParams(location.search).get("link");
  const history = useHistory();

  const invitationLinkId = React.useRef(link);
  const { invitationLinkData, userGroups } = useSelector(
    (state) => state.groupData
  );

  const groupPageError = useSelector((state) => state.UI.groupPageError);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (invitationLinkId.current) {
      dispatch(actions.fetchGroupInvitationLinkData(invitationLinkId.current));
    }
  }, [invitationLinkId, dispatch]);

  const onAcceptOrDeclineHandler = (action) => {
    dispatch(
      actions.acceptOrDeclineInvitation(
        action,
        invitationLinkId.current,
        invitationLinkData.groupId,
        { userId: user.uid, name: user.displayName, avatar: user.photoURL },
        history
      )
    );
  };

  const redirectToGroupPageHandler = (e, groupId) => {
    e.preventDefault();
    history.push(`/groups/${groupId}`);
  };

  //empty search
  if (invitationLinkId.current === null) {
    return <Redirect to="/dashboard" push />;
  }

  if (Object.keys(invitationLinkData).length) {
    const { groupName, message, groupId } = invitationLinkData;

    const isUserAlreadyInGroup = userGroups.includes(groupId);

    return (
      <ErrorBoundary>
        <Helmet>
          <title> Invitation to join {groupName} | TeamsApp</title>
        </Helmet>
        <Box>
          <Typography variant="h4" component="h1">
            Invitation to join {groupName}
          </Typography>
          {!isUserAlreadyInGroup ? (
            <>
              <Typography className={classes.text}>
                You have been invited to join <strong>{groupName}</strong>
              </Typography>
              <Typography className={classes.text}>{message}</Typography>
              <Grid
                container
                justify="center"
                className={classes.buttonsContainer}
              >
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={() => onAcceptOrDeclineHandler(false)}
                    variant="outlined"
                    color="secondary"
                  >
                    Decline
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={() => onAcceptOrDeclineHandler(true)}
                    variant="contained"
                    color="primary"
                  >
                    Accept
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <AlertMessage
              alertStyles={classes.alertMessage}
              severity="error"
              action={alertTypes.INVITATION_LINK_ALREADY_IN_GROUP}
              handler={(e) => redirectToGroupPageHandler(e, groupId)}
            />
          )}
        </Box>
      </ErrorBoundary>
    );
  } else {
    return Object.keys(groupPageError).length ? (
      <>
        <Helmet>
          <title>Invalid invitation | TeamsApp</title>
        </Helmet>
        <AlertMessage
          alertStyles={classes.alertMessage}
          severity="error"
          action={alertTypes.INVITATION_LINK_PROBLEM}
        />
      </>
    ) : null;
  }
}
