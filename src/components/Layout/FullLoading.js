import React from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100vh'
  }
}));

export default function FullLoading(props) {
  const classes = useStyles();

  return (
    <Container className={classes.spinnerContainer}>
      <CircularProgress size={75} {...props} />
    </Container>
  );
}
