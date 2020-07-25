import React from "react";
import { Link } from "react-router-dom";

import { hideExcessText } from "../../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Avatar,
  ListItemAvatar,
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
} from "@material-ui/core";

import PropTypes from "prop-types";

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

export default function SmallTextBox(props) {
  const { title, content, author, userId, handleClear, linkTo, type } = props;

  const classes = useStyles();

  const textStyle = linkTo && { textAlign: "center" };

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
          <Link to={`/profile/${userId}`}>
            <ListItemAvatar>
              <Avatar
                className={classes.small}
                alt={`${author.name}'s avatar`}
                src={author.avatar}
              />
            </ListItemAvatar>
          </Link>
        )}

        <Box style={textStyle} className={classes.textBoxContainer}>
          <ListItemText primary={primaryText} secondary={secondaryText} />
          {type === "newsItem" && (
            <Link style={{ textDecoration: "none" }} to={linkTo}>
              <Button color="primary" style={{ padding: ".5rem 0" }}>
                Read More
              </Button>
            </Link>
          )}
        </Box>

        {type !== "newsItem" && (
          <IconButton
            style={{ alignSelf: "center" }}
            aria-label="clear comment"
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        )}
      </ListItem>
      {type === "newsItem" && <Divider variant="inset" component="li" />}
    </>
  );
}

SmallTextBox.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  userId: PropTypes.string,
  handleClear: PropTypes.func,
  linkTo: PropTypes.string,
  type: PropTypes.string,
};
