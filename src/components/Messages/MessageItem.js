import React from "react";
import { Link } from "react-router-dom";

import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Paper, Typography, Grid, Avatar } from "@material-ui/core";

import PropTypes from "prop-types";

export default function MessageItem(props) {
  const { title, content, author, userId, timestamp, classes } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Paper className={classes.messageContainer} elevation={4} square>
      <Grid
        container
        spacing={1}
        justify={matches ? "flex-start" : "space-around"}
      >
        <Grid item xs={2} container justify="center" alignItems="center">
          <Link to={`/profile/${userId}`}>
            <Avatar
              src={author.avatar}
              alt={`${author.name}'s avatar`}
              className={classes[matches ? "avatarBig" : "avatarSm"]}
            />
          </Link>
        </Grid>
        <Grid item xs={9}>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          <Typography variant="body1">{content}</Typography>
          <Typography variant="caption">
            {author.name} {timestamp}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

MessageItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};
