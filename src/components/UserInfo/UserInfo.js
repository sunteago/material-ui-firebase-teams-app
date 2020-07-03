import React from "react";
import { Typography, Avatar, Box } from "@material-ui/core";


export default function UserInfo({ style, user }) {

  return (
    <Box className={style}>
      <Avatar style={{marginRight: '.5rem'}} alt="my avatar" src={user.photoURL} />
      <Typography>{user.email}</Typography>
    </Box>
  );
}
