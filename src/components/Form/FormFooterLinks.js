import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default function FormFooterLinks({ classes, mode }) {
  return (
    <Typography className={classes.root}>
      <Link to="/auth/forgotpassword" className={classes.link}>
        Forgot Password?
      </Link>

      {mode === "signup" ? (
        <Link to="/auth/login" className={classes.link}>
          Log in
        </Link>
      ) : (
        <Link to="/auth/signup" className={classes.link}>
          Register
        </Link>
      )}
    </Typography>
  );
}
