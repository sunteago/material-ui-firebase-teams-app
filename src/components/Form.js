import React from "react";
import { useSelector } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import FormContainer from "./Layout/FormContainer";
import TextInput from "./TextInput";

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
  } = props;

  let operationName;
  if (mode === "login") operationName = "Log in";
  else if (mode === "signup") operationName = "Sign up";
  else operationName = "Recover Password";

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <FormContainer>
      <Typography variant="h5">{operationName}</Typography>
      <form>
        <Grid container direction="column">
          <TextInput
            state={email}
            setState={setEmail}
            type="email"
            Icon={PersonIcon}
            placeholder="Email"
            autoFocus
          />

          {mode !== "forgotpassword" && (
            <TextInput
              state={password}
              setState={setPassword}
              type="password"
              Icon={VpnKeyIcon}
              placeholder="Password"
            />
          )}

          {mode === "signup" && (
            <TextInput
              state={confirmPassword}
              setState={setConfirmPassword}
              type="password"
              Icon={VpnKeyIcon}
              placeholder="Confirm Password"
            />
          )}

          <Button
            type="submit"
            className={classes.loginBtn}
            variant="contained"
            color="primary"
            onClick={onActionHandler}
          >
            {operationName}
          </Button>

          <Typography className={classes.root}>
            <Link to="/forgotpassword" className={classes.link}>
              Forgot Password?
            </Link>

            {mode === "signup" ? (
              <Link to="/login" className={classes.link}>
                Log in
              </Link>
            ) : (
              <Link to="/signup" className={classes.link}>
                Register
              </Link>
            )}
          </Typography>
        </Grid>
      </form>
    </FormContainer>
  );
}

export default Form;
