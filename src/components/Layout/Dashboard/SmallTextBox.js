import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Avatar,
  ListItemAvatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function NewsItem({ title, content, author, handleClearComment }) {
  const classes = useStyles();

  let secondaryInnerText = content;
  if (author) {
    secondaryInnerText = (
      <>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          {author.name}
        </Typography>
        {` - ${content}`}
      </>
    );
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        {author && (
          <ListItemAvatar>
            <Avatar
              className={classes.small}
              alt={`${author.name}'s avatar`}
              src={author.avatar}
            />
          </ListItemAvatar>
        )}

        <ListItemText primary={title} secondary={secondaryInnerText} />

        {author && (
          <IconButton
            style={{ alignSelf: "center" }}
            aria-label="clear comment"
            onClick={handleClearComment}
          >
            <ClearIcon />
          </IconButton>
        )}
      </ListItem>
      {!author && <Divider variant="inset" component="li" />}
    </>
  );
}
