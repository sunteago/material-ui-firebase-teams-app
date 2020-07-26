import React from "react";

import TextInput from "../TextInput";
import { IconButton, Grid, Avatar } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import PropTypes from "prop-types";

export default function MessageWritingBox(props) {
  const {
    handleChange,
    values,
    errors,
    avatar,
    username,
    classes,
    onSubmit,
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
              value: values.title,
              onChange: handleChange,
              helperText: errors.title,
              error: !!errors.title,
              name: "title",
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
              value: values.content,
              onChange: handleChange,
              helperText: errors.content,
              error: !!errors.content,
              name: "content",
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
        <IconButton onClick={onSubmit} color="primary">
          <SendIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

MessageWritingBox.propTypes = {
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.object,
  avatar: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
};
