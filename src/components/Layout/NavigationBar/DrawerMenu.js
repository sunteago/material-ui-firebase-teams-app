import React from "react";
import { Link } from "react-router-dom";

import AnnouncementIcon from "@material-ui/icons/Announcement";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";

import {
  makeStyles,
  useTheme,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";

import PropTypes from "prop-types";

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

function DrawerMenu({ user, isOpen, isAuth, handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();

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
        {isAuth && (
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
}

DrawerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  user: PropTypes.object
};

export default React.memo(DrawerMenu, (prevProps, nextProps) => {
  return prevProps.isOpen === nextProps.isOpen;
});
