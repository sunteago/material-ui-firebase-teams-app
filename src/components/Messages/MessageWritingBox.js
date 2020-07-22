import React from "react";
import { IconButton, Grid, Avatar } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import TextInput from "../TextInput";

export default function MessageWritingBox(props) {
  const {
    title,
    setTitle,
    content,
    setContent,
    avatar,
    username,
    classes,
    sendHandler,
  } = props;
  return (
    <Grid
      className={classes.writingBoxContainer}
      container
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={2}>
        <Avatar
          src={avatar}
          alt={`${username}'s avatar`}
          className={classes.avatar}
        />
      </Grid>
      <Grid item container spacing={2} xs={8}>
        <Grid item xs={12}>
          <TextInput
            inputProps={{
              value: title,
              onChange: (e) => setTitle(e.target.value),
              type: "text",
              label: "Title",
              variant: "outlined",
              fullWidth: true,
              required: true,
              inputProps: {
                maxLength: 20,
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            inputProps={{
              value: content,
              onChange: (e) => setContent(e.target.value),  
              type: "text",
              label: "Content",
              rows: 2,
              variant: "outlined",
              multiline: true,
              fullWidth: true,
              required: true,
              inputProps: {
                maxLength: 140,
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={sendHandler} color="primary">
          <SendIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
