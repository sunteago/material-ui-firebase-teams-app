import React from "react";
import { useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import FormContainer from "./Layout/FormContainer";

const useStyles = makeStyles((theme) => ({
  textInputField: {
    flexWrap: "nowrap",
    marginTop: theme.spacing(1),
  },
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
  } = props;

  const operationName =
    mode === "login"
      ? "Log in"
      : mode === "signup"
      ? "Sign up"
      : "Recover Password";

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <FormContainer>
      <Typography variant="h5">{operationName}</Typography>
      <form>
        <Grid container direction="column">
          <Grid
            className={classes.textInputField}
            container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <PersonIcon />
            </Grid>
            <Grid item>
              <TextField
                id="username"
                label="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </Grid>
          </Grid>
          <Grid
            className={classes.textInputField}
            container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>

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
            <Link to="/signup" className={classes.link}>
              Register
            </Link>
          </Typography>
        </Grid>
      </form>
    </FormContainer>
  );
}

export default Form;
