import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.png";
import DrawerMenu from "./DrawerMenu";
import AccountMenu from "./AccountMenu";
import NotificationsButton from "./NotificationsButton";
import Loading from "../Loading";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  brand: {
    display: "flex",
    alignItems: "center",
    all: 'unset',
    color: '#fff',
    cursor: 'pointer',
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    height: "32px",
    marginRight: theme.spacing(1),
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
    width: "100%",
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
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/dashboard" className={classes.brand}>
            <img className={classes.logo} src={logo} alt="TeamsApp's logo" />
            <Typography variant="h6" className={classes.title}>
              TeamsApp
            </Typography>
          </Link>

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
                Sign in
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
