import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  textInputField: {
    flexWrap: "nowrap",
    marginTop: theme.spacing(1),
  },
}));

export default function TextInput(props) {
  const { Icon, inputProps } = props;
  const classes = useStyles();

  return (
    <Grid
      className={classes.textInputField}
      container
      spacing={1}
      alignItems="flex-end"
    >
      {Icon && (
        <Grid item>
          <Icon />
        </Grid>
      )}
      <TextField {...inputProps} />
    </Grid>
  );
}

TextInput.propTypes = { 
  Icon: PropTypes.elementType,
  inputProps: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    helperText: PropTypes.string,
  })
}