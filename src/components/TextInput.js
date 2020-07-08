import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textInputField: {
    flexWrap: "nowrap",
    marginTop: theme.spacing(1),
  },
}));

export default function TextInput(props) {
  const {
    value,
    setValue,
    Icon,
    type,
    label,
    autoFocus,
    multiline,
    rows,
    variant,
    fullWidth,
    required,
    maxLength,
    minLength
  } = props;
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
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        autoFocus={autoFocus}
        rows={rows}
        multiline={multiline}
        variant={variant}
        fullWidth={fullWidth}
        inputProps={{
          maxLength: maxLength || 30,
          minLength: minLength || 5
        }}
      />
    </Grid>
  );
}
