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

function TextInput(props) {
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
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    helperText: PropTypes.string,
  })
}

export default React.memo(TextInput, (prevProps, nextProps) => {
  return prevProps.inputProps.value === nextProps.inputProps.value;
})