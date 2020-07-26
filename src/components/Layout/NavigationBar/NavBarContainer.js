import React, { useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import DrawerMenu from "./DrawerMenu";
import LoadingBar from "./LoadingBar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  brand: {
    display: "flex",
    alignItems: "center",
    all: "unset",
    color: "#fff",
    cursor: "pointer",
    flex: 1,
    justifyContent: "center",
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

export default function NavBarContainer() {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    const { isAuth, user } = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.userData.profile);
    const notifications = useSelector((state) => state.userData.notifications);
    
    const handleDrawerOpen = () => setIsOpen(true);
    const handleDrawerClose = () => setIsOpen(false);
    
    return (
      <>
        <LoadingBar />
        <Navbar
          isAuth={isAuth}
          profile={profile}
          userId={user.uid}
          notifications={notifications}
          handleDrawerOpen={handleDrawerOpen}
          classes={classes}
        />
        <DrawerMenu
          isAuth={isAuth}
          user={user}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          isOpen={isOpen}
        />
      </>
    );
  }