import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.png";
import AccountMenu from "./AccountMenu";
import NotificationsButton from "./NotificationsButton";

import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";

function Navbar(props) {
  const {
    classes,
    handleDrawerOpen,
    profile,
    notifications,
    isAuth,
    userId,
  } = props;

  return (
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
              name={profile.displayName}
              userId={userId}
              avatar={profile.avatar}
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
  );
}

export default React.memo(Navbar, (prevProps, nextProps) => {
  return (
    prevProps.isAuth === nextProps.isAuth &&
    prevProps.profile === nextProps.profile
  );
});
