import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { getSnackAlertMsgFromAction } from "../../utils/alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function SnackAlert({ action, severity, setOpen, open }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {getSnackAlertMsgFromAction(action)}
      </Alert>
    </Snackbar>
  );
}
