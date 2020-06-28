import React, { useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerMenu from "./DrawerMenu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
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
}));

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => setIsOpen(true);
  const handleDrawerClose = () => setIsOpen(false);

  return (
    <nav className={classes.grow}>
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
            Another-App
          </Typography>
          <div className={classes.grow} />
          <Button color="inherit">
            <Link to="/login" className={classes.loginBtn}>
              login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <DrawerMenu
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isOpen={isOpen}
      />
    </nav>
  );
}

export default NavBar;
