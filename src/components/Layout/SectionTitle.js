import React from "react";
import { Typography } from "@material-ui/core";

export default function SectionTitle(props) {
  return (
    <Typography variant="h4" {...props}>
      {props.children}
    </Typography>
  );
}
