import React from "react";
import { Typography, Avatar, Box } from "@material-ui/core";


export default function UserInfo({ classes, user }) {

  return (
    <Box className={classes.userInfo}>
      <Avatar style={{marginRight: '.5rem'}} alt="my avatar" src={user.photoURL} />
      <Typography>{user.email}</Typography>
    </Box>
  );
}
