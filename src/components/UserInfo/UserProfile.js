import React from "react";

import SectionTitle from "../Layout/Dashboard/SectionTitle";
import {
  Button,
  Avatar,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import { getHowManyDaysAgo } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    padding: "1rem",
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "0 auto",
  },
  gridItem: {
    textAlign: "center",
  },
}));

export default function UserProfile({ user, isCurrentUser, setIsEditing }) {
  const { avatar, name, status, memberSince } = user;
  const classes = useStyles();
  return (
    <Grid container spacing={3} justify="center">
      <Grid className={classes.gridItem} item xs={12} sm={8}>
        <SectionTitle style={{ textAlign: "center" }}>
          {`${name || 'User'}'s Profile`}
        </SectionTitle>
      </Grid>
      <Grid className={classes.gridItem} item xs={12} sm={8}>
        <Avatar
          className={classes.avatar}
          src={avatar}
          alt={`${name}'s avatar`}
        />
      </Grid>
      <Grid className={classes.gridItem} item xs={12} sm={8}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
      </Grid>
      <Grid className={classes.gridItem} style={{paddingTop: 0}} item xs={12} sm={8}>
        <Typography variant="caption" display="block" paragraph>
          Joined {getHowManyDaysAgo(memberSince)}
        </Typography>
      </Grid>
      <Grid className={classes.gridItem} item xs={12} sm={8}>
        <Typography variant="body1" display="block" paragraph>
          {status}
        </Typography>
      </Grid>

      <Grid className={classes.gridItem} item xs={12} sm={8}>
        {isCurrentUser && (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
