import React from "react";
import { Typography, Avatar, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userInfo: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    margin: theme.spacing(3),
    textAlign: "center",
  },
}));

export default function UserInfo({ user }) {
  const classes = useStyles();

  return (
    <Box className={classes.userInfo}>
      <Avatar
        style={{ marginRight: ".5rem" }}
        alt="my avatar"
        src={user.photoURL || user.avatar}
      />
      <Typography>{user.email}</Typography>
    </Box>
  );
}
