import React from "react";
import { useSelector } from "react-redux";

import { Helmet } from "react-helmet";
import SectionTitle from "../Layout/Dashboard/SectionTitle";
import FormFooterLinks from "./FormFooterLinks";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import ErrorBoundary from "../Layout/ErrorBoundary";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  loginBtn: {
    marginTop: theme.spacing(3),
  },
  footerLinks: {
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

export default function AuthForm({ mode, onSubmit, children }) {
  const classes = useStyles();

  const { isAuth } = useSelector((state) => state.auth);

  let operationName;
  if (mode === "login" || mode === "provider") operationName = "Sign in";
  else if (mode === "signup") operationName = "Sign up";
  else operationName = "Recover Password";

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <Helmet>
        <title>{operationName} | TeamsApp</title>
      </Helmet>

      <SectionTitle variant="h5">{operationName}</SectionTitle>
      <ErrorBoundary>
        <form onSubmit={onSubmit} noValidate>
          <Grid container direction="column">
            {children}
            {onSubmit && (
              <Button
                type="submit"
                className={classes.loginBtn}
                variant="contained"
                color="primary"
                required
              >
                {operationName}
              </Button>
            )}
          </Grid>
        </form>
      </ErrorBoundary>

      <FormFooterLinks classes={classes} mode={mode} />
    </>
  );
}

AuthForm.propTypes = {
  mode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.element.isRequired,
};
