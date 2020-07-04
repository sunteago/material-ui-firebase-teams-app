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

export default function CircularLoading(props) {
  const classes = useStyles();

  let size;
  if (props.type === "full") {
    size = 75;
  } else if (props.type === "board" ) {
    size = 40
  }
  return (
    <Container className={classes.spinnerContainer}>
      <CircularProgress size={size} {...props} />
    </Container>
  );
}
