import React from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  fullSize: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  smallSize: {
    minHeight: '20vh',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function CircularLoading(props) {
  const classes = useStyles();

  let size;
  if (props.type === "full") {
    size = 75;
  } else if (props.type === "board") {
    size = 40;
  }
  return (
    <Container
      className={classes[props.type === "full" ? "fullSize" : "smallSize"]}
    >
      <CircularProgress size={size} {...props} />
    </Container>
  );
}

CircularLoading.propTypes = {
  type: PropTypes.string.isRequired
}