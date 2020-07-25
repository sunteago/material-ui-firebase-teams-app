import React from "react";
import { Typography } from "@material-ui/core";

import PropTypes from 'prop-types';

export default function SectionTitle(props) {
  const {variant = 'h4'} = props;
  return (
    <Typography variant={variant} component='h1' {...props}>
      {props.children}
    </Typography>
  );
}

SectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string
}