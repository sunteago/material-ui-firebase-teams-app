import React from "react";
import { Typography } from "@material-ui/core";

export default function SectionTitle(props) {
  const {variant = 'h4'} = props;
  return (
    <Typography variant={variant} {...props}>
      {props.children}
    </Typography>
  );
}
