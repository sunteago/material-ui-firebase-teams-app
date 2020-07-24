import React from "react";
import Alert from "@material-ui/lab/Alert";
import { getAlertMsgFromAction } from "../../utils/helpers";

export default function AlertMessage(props) {
  const { alertStyles, severity, action, handler, style } = props;
  return (
    <Alert className={alertStyles} style={style} severity={severity}>
      {getAlertMsgFromAction(action, handler)}
    </Alert>
  );
}
