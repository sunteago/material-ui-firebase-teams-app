import React from "react";

import SectionTitle from "../Layout/Dashboard/SectionTitle";
import { Typography } from "@material-ui/core";

export default function UserProfile({ email, avatar, username, status }) {
  return (
    <div>
      <SectionTitle>Profile of</SectionTitle>
      <Typography>{username && `${username} - `}{email}</Typography>
      <img src={avatar} alt={`${username || email}'s avatar`} />
      <h1>{username || email}</h1>
      <p>{status}</p>
    </div>
  );
}
