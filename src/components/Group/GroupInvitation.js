import React, { useState, useRef, useEffect } from "react";
import * as actions from "../../store/actions";

import {
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  makeStyles,
  Divider,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { shareContent } from "../../utils/helpers";
import TextInput from "../TextInput";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    margin: theme.spacing(3),
  },
  wayContainer: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  generateBtnContainer: {
    textAlign: "center",
    margin: theme.spacing(3),
  },
  generateBtn: {
    textAlign: 'center'
  }
}));

export default function GroupInvitation(props) {
  const { generatedLink, dispatch, activeGroup } = props;

  const classes = useStyles();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

  const inviteLinkRef = useRef(null);

  useEffect(() => {
    if (inviteLinkRef.current !== null && generatedLink) {
      inviteLinkRef.current.querySelector("input").value = generatedLink;
    }
  }, [generatedLink]);

  const personalInviteHandler = (e) => {
    e.preventDefault();
    setInviteEmail("");
  };

  const onCopyURLHandler = () => {
    inviteLinkRef.current.querySelector("input").focus();
    inviteLinkRef.current.querySelector("input").select();
    document.execCommand("copy");
  };

  const onClickGenerateHandler = (e) => {
    if (!generatedLink) {
      dispatch(
        actions.createGroupInvitationLink(
          activeGroup.groupId,
          activeGroup.name,
          inviteMessage
        )
      );
    } else {
      const shareTitle = `Join ${activeGroup.name}`;
      shareContent(shareTitle, generatedLink, onCopyURLHandler);
    }
  };

  return (
    <>
      <Typography>First, write a short welcome message</Typography>
      <Box className={classes.messageContainer}>
        <TextInput
          value={inviteMessage}
          setValue={setInviteMessage}
          type="text"
          label="Invite Message"
          rows={4}
          multiline
          variant="outlined"
          fullWidth
          required
          maxLength={100}
        />
      </Box>
      <Typography>
        Now, you may invite either by email or a unique invitation link
      </Typography>
      <Divider style={{ margin: "1rem" }} />

      <Typography>
        <strong>Personal Invite:</strong> you specify who are you inviting.
      </Typography>
      <Box className={classes.wayContainer}>
        <form style={{ margin: ".5rem", }}>
          <Grid container alignItems="baseline" justify="space-around" spacing={2}>
            <Grid item xs={12} sm={7} >
              <TextInput
                value={inviteEmail}
                setValue={setInviteEmail}
                type="email"
                label="Email"
                autoFocus
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}  style={{textAlign: 'center'}}>
              <Button
                color="primary"
                onClick={personalInviteHandler}
              >
                Invite
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Divider />
      <Typography style={{ marginTop: "2rem" }}>
        <strong>Unique link:</strong> generate an unique invitation link: this
        link can be used just one time. <strong>Important</strong>: either is
        cancelled or accepted, the link will be deleted
      </Typography>

      <Box className={classes.wayContainer}>
          <Grid container spacing={1} alignItems="center" justify="space-around">
            <Grid item xs={12} sm={7}>
              <TextField
                ref={inviteLinkRef}
                inputProps={{ readOnly: true }}
                placeholder="Invitation Link"
                fullWidth
                type="url"
              />
            </Grid>

            <Grid item xs={12} sm={3} style={{textAlign: 'center'}}>
              <Button
                startIcon={<ShareIcon />}
                color="primary"
                onClick={onClickGenerateHandler}
                
              >
                {!generatedLink ? "Generate" : "Share"}
              </Button>
            </Grid>
          </Grid>
      </Box>
    </>
  );
}
