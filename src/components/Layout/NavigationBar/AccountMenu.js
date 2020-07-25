import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Avatar } from "@material-ui/core";

import PropTypes from "prop-types";

export default function AccountMenu({ name, userId, avatar, classes }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const handleClose = () => setAnchorEl(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const signOutHandler = () => {
    handleClose();
    dispatch(actions.signOut());
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {avatar ? (
          <Avatar
            className={classes.avatar}
            src={avatar}
            alt={`${name}'s Avatar`}
          />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <Link style={{ all: "unset" }} to={`/profile/${userId}`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={signOutHandler}>Sign out</MenuItem>
      </Menu>
    </>
  );
}

AccountMenu.propTypes = {
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
