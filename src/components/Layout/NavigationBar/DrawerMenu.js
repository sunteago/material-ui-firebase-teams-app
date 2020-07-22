import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

import AnnouncementIcon from "@material-ui/icons/Announcement";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";

const useStyles = makeStyles((theme) => ({
  drawer: {
    maxWidth: 250,
    flexShrink: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  drawerPaper: {
    width: 250,
  },
}));

const DrawerMenu = ({ isOpen, handleDrawerClose, handleDrawerOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);

  const isLoggedIn = !!Object.keys(user).length;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>

      <Divider />
      <List component="nav" aria-label="main menu options">
        {isLoggedIn && (
          <>
            <Link to="/groups/create" style={{ all: "unset" }}>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create a group" />
              </ListItem>
            </Link>

            <Divider />

            <Link to="/dashboard" style={{ all: "unset" }}>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link to={`/profile/${user.uid}`} style={{ all: "unset" }}>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Profile Settings" />
            </ListItem>
            </Link>
          </>
        )}

        <Link to="/news" style={{ all: "unset" }}>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
        </Link>

        <Divider />

        <Link to="/about" style={{ all: "unset" }}>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About this app" />
          </ListItem>
        </Link>

      </List>
    </Drawer>
  );
};

export default DrawerMenu;
