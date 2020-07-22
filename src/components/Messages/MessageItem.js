import React from "react";
import { Paper, Typography, Grid, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function MessageItem(props) {
  const { title, content, author, userId, timestamp,  classes } = props;
  return (
    <Paper className={classes.messageContainer} elevation={4} square>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Link to={`/profile/${userId}`}>
            <Avatar
              src={author.avatar}
              alt={`${author.name}'s avatar`}
              className={classes.avatar}
            />
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          <Typography variant="body1">{content}</Typography>
          <Typography variant="caption">{author.name} {timestamp}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
