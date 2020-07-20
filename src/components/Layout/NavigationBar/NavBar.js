import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import DrawerMenu from "./DrawerMenu";
import AccountMenu from "./AccountMenu";
import NotificationsButton from "./NotificationsButton";
import Loading from "../Loading";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  loginBtn: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  notificationsButton: {
    all: "unset",
    color: theme.palette.primary.contrastText,
  },
  linearLoading: {
    position: "fixed",
    width: '100%',
    zIndex: 10000,
  },
}));

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const { isAuth, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.UI);
  const notifications = useSelector((state) => state.userData.notifications);

  const handleDrawerOpen = () => setIsOpen(true);
  const handleDrawerClose = () => setIsOpen(false);

  return (
    <>
      {loading ? (
        <Loading color="secondary" className={classes.linearLoading} />
      ) : null}
      <AppBar className={classes.grow}>
        <Toolbar className={classes.grow}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Teams App
          </Typography>
          <div className={classes.grow} />

          {isAuth ? (
            <>
              <NotificationsButton
                classes={classes}
                notificationsNum={notifications.length}
              />
              <AccountMenu
                name={user.displayName}
                userId={user.uid}
                avatar={user.photoURL}
                classes={classes}
              />
            </>
          ) : (
            <Button color="inherit">
              <Link to="/auth/login" className={classes.loginBtn}>
                Authenticate
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <DrawerMenu
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isOpen={isOpen}
      />
    </>
  );
}

export default NavBar;
