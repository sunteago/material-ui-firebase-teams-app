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
  Button,
  Box,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { Link } from "react-router-dom";
import { hideExcessText } from "../../../utils/helpers";

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
  primaryLink: {
    all: "inherit",
    cursor: "pointer",
  },
  textBoxContainer: {
    width: "100%",
  },
}));

export default function NewsItem(props) {
  const { title, content, author, handleClearComment, linkTo } = props;

  const classes = useStyles();

  const textStyle = linkTo && {textAlign: "center"};

  let primaryText = title;
  if (linkTo)
    primaryText = (
      <Link className={classes.primaryLink} to={linkTo}>
        {title}
      </Link>
    );

  let secondaryText = hideExcessText(content, 100);
  if (author) {
    secondaryText = (
      <>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          {author.name}
        </Typography>
        {` - ${hideExcessText(content, 100)}`}
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

        <Box style={textStyle} className={classes.textBoxContainer}>
          <ListItemText primary={primaryText} secondary={secondaryText} />
          {!author && (
            <Link style={{textDecoration: 'none' }} to={linkTo}>
              <Button color="primary" style={{ padding: ".5rem 0" }}>
                Read More
              </Button>
            </Link>
          )}
        </Box>

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
