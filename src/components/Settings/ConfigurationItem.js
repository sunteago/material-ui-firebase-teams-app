import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Typography, Grid } from "@material-ui/core";

import PropTypes from "prop-types";

export default function ConfigurationItem(props) {
  const { description, text, value, setValue, isAdmin } = props;

  const configLabel = text[value ? 1 : 0];
  return (
    <Grid container justify="space-around">
      <Grid item container xs={12} md={6}>
        <Typography>{description}</Typography>
      </Grid>
      <Grid item container xs={12} md={6} justify="space-around">
        <FormGroup row>
          {isAdmin ? (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  onChange={() => setValue((prev) => !prev)}
                  name="checkedB"
                />
              }
              label={configLabel}
            />
          ) : (
            <FormControlLabel
              disabled
              control={<Switch checked />}
              label={configLabel}
            />
          )}
        </FormGroup>
      </Grid>
    </Grid>
  );
}

ConfigurationItem.propTypes = {
  description: PropTypes.string.isRequired,
  text: PropTypes.array.isRequired,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};
