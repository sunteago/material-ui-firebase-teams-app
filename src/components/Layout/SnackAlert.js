import React from "react";
import { useDispatch } from "react-redux";

import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { getSnackAlertMsgFromAction } from "../../utils/alert";
import { closeSnackbar } from "../../store/actions";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function SnackAlert({ action, severity, setOpen, open }) {
  const dispatch = useDispatch();
  const onCloseHandler = () => dispatch(closeSnackbar());
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onCloseHandler}>
      <Alert onClose={onCloseHandler} severity={severity}>
        {getSnackAlertMsgFromAction(action)}
      </Alert>
    </Snackbar>
  );
}
