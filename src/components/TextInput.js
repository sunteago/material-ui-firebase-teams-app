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
  const { state, setState, Icon, type, placeholder, autoFocus } = props;
  const classes = useStyles();

  return (
    <Grid
      className={classes.textInputField}
      container
      spacing={1}
      alignItems="flex-end"
    >
      <Grid item>
        <Icon />
      </Grid>
      <Grid item>
        <TextField
          label={placeholder}
          type={type}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          autoFocus={autoFocus}
        />
      </Grid>
    </Grid>
  );
}
