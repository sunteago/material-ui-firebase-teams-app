import React from "react";

import Alert from "@material-ui/lab/Alert";
import { getAlertMsgFromAction } from "../../utils/helpers";

import PropTypes from "prop-types";

export default function AlertMessage(props) {
  const { alertStyles, severity, action, handler} = props;
  return (
    <Alert className={alertStyles} severity={severity}>
      {getAlertMsgFromAction(action, handler)}
    </Alert>
  );
}

AlertMessage.propTypes = {
  severity: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  alertStyles: PropTypes.string,
  handler: PropTypes.func
};
