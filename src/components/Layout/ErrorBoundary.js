import React, { Component } from "react";
import { Typography } from "@material-ui/core";

export default class ErrorBoundary extends Component {
  state = { error: false };

  componentDidCatch(error) {
    console.log(error);
    this.setState({ error });
  }

  render() {
    return this.state.error ? (
      <Typography>Something happened, please try again</Typography>
    ) : (
      this.props.children
    );
  }
}
