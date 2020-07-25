import React from "react";

import { Helmet } from "react-helmet";
import appFeatures from "../utils/appFeatures.json";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3),
  },
  featuresTitle: {
    margin: theme.spacing(3),
  },
  list: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
    margin: theme.spacing(3),
  },
  listSection: {
    backgroundColor: "inherit",
  },
  listItem: {
    padding: theme.spacing(0.5),
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  mainGoal: {
    margin: theme.spacing(3),
  },
  linkContainer: {
    margin: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>About this App | TeamsApp</title>
      </Helmet>

      <SectionTitle className={classes.title}>About TeamsApp</SectionTitle>
      <Typography>
        This app was created & designed by Santiago Vallejo. The main idea is an
        app that lets you can manage team work
      </Typography>
      <Typography className={classes.featuresTitle} component="h3" variant="h5">
        Current Features:
      </Typography>
      <List className={classes.list} subheader={<li />}>
        {appFeatures.map((list) => (
          <li key={list.title} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{list.title}</ListSubheader>
              {list.items.map((item) => (
                <ListItem className={classes.listItem} key={item}>
                  <ListItemText primary={`- ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
      <Typography className={classes.mainGoal}>
        TeamsApp's main focus is to have a clean and good-looking feel, great
        user experience, and intuitive using. Because of this, TeamsApp uses
        Material UI for layout, Firebase for storing information and managing
        user experience and React for its flexibility
      </Typography>
      <Typography className={classes.linkContainer}>
        Check TeamsApp code{" "}
        <a
          href="https://github.com/sunteago/material-ui-firebase-teams-app/"
          alt="Santiago Vallejo's Github"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          here
        </a>
      </Typography>

      <Typography className={classes.linkContainer}>
        Talk with me at{" "}
        <a
          href="https://www.linkedin.com/in/santiago-vallejo-dev"
          alt="Santiago Vallejo's Github"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          LinkedIn
        </a>
      </Typography>
    </>
  );
}
