import React from "react";
import { useSelector } from "react-redux";

import SectionTitle from "../Layout/Dashboard/SectionTitle";
import FormFooterLinks from "./FormFooterLinks";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

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

export default function Form({ mode, onSubmit, children }) {
  const classes = useStyles();

  const { isAuth } = useSelector((state) => state.auth);

  let operationName;
  if (mode === "login") operationName = "Log in";
  else if (mode === "signup") operationName = "Sign up";
  else operationName = "Recover Password";

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <SectionTitle variant="h5">{operationName}</SectionTitle>

      <form onSubmit={onSubmit}>
        <Grid container direction="column">
          {children}
          <Button
            type="submit"
            className={classes.loginBtn}
            variant="contained"
            color="primary"
            required
          >
            {operationName}
          </Button>
        </Grid>
      </form>
      
      <FormFooterLinks classes={classes} mode={mode} />
    </>
  );
}
