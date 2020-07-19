import React from "react";
import { useSelector } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FaceIcon from "@material-ui/icons/Face";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import TextInput from "../TextInput";

const useStyles = makeStyles((theme) => ({
  loginBtn: {
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    marginTop: theme.spacing(1),
  },
}));

function Form(props) {
  const classes = useStyles();

  const { isAuth } = useSelector((state) => state.auth);

  const {
    mode,
    email,
    setEmail,
    password,
    setPassword,
    onActionHandler,
    confirmPassword,
    setConfirmPassword,
    displayName,
    setDisplayName,
  } = props;

  let operationName;
  if (mode === "login") operationName = "Log in";
  else if (mode === "signup") operationName = "Sign up";
  else operationName = "Recover Password";

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <Typography variant="h5">{operationName}</Typography>
      <form
        onSubmit={onActionHandler}
      >
        <Grid container direction="column">
          <TextInput
            value={email}
            setValue={setEmail}
            type="email"
            Icon={PersonIcon}
            label="Email"
            autoFocus
            required
          />

          {mode === "signup" && (
            <TextInput
              value={displayName}
              setValue={setDisplayName}
              type="text"
              Icon={FaceIcon}
              label="Name"
              required
            />
          )}
          
          {mode !== "forgotpassword" && (
            <TextInput
              value={password}
              setValue={setPassword}
              type="password"
              Icon={VpnKeyIcon}
              label="Password"
              required
            />
          )}

          {mode === "signup" && (
            <TextInput
              value={confirmPassword}
              setValue={setConfirmPassword}
              type="password"
              Icon={VpnKeyIcon}
              label="Confirm Password"
              required
            />
          )}

          <Button
            type="submit"
            className={classes.loginBtn}
            variant="contained"
            color="primary"
            required
          >
            {operationName}
          </Button>

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
        </Grid>
      </form>
    </>
  );
}

export default Form;
