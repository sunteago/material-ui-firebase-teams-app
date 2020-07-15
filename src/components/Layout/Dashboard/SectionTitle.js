import React from "react";
import { Typography } from "@material-ui/core";

export default function SectionTitle(props) {
  const {variant = 'h4'} = props;
  return (
    <Typography variant={variant} component='h1' {...props}>
      {props.children}
    </Typography>
  );
}
