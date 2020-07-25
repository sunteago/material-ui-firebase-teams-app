import React from "react";
import { useDispatch } from "react-redux";

import { closeSnackbar } from "../../store/actions";
import { getSnackAlertMsgFromAction } from "../../utils/alert";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import PropTypes from "prop-types";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function SnackAlert({ action, severity, open }) {
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

SnackAlert.propTypes = {
  action: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};
