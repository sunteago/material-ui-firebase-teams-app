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
            value={title}
            setValue={setTitle}
            type="text"
            label="Title"
            variant="outlined"
            fullWidth={true}
            required
            maxLength={20}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            value={content}
            setValue={setContent}
            type="text"
            label="Content"
            rows={2}
            multiline
            variant="outlined"
            fullWidth={true}
            required
            maxLength={140}
          />
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <IconButton color="primary">
          <SendIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
