import React from "react";

import SectionTitle from "../Layout/Dashboard/SectionTitle";
import { Typography, Button, Avatar } from "@material-ui/core";

export default function UserProfile(props) {
  const { email, avatar, username, status, isCurrentUser, setIsEditing } = props;

  return (
    <div>
      <SectionTitle>Profile of</SectionTitle>
      <Typography>{username && `${username} - `}{email}</Typography>
      <Avatar src={avatar} alt={`${username || email}'s avatar`} />
      <h1>{username || email}</h1>
      <p>{status}</p>
      {isCurrentUser && (
        <Button
          variant='outlined'
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
}
