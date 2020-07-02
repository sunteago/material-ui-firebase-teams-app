import React from "react";
import { Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as alertTypes from '../../constants/alertTypes';

export default function AlertMessage({ severity, action, handler }) {
  let msg;
  switch (action) {
    case alertTypes.email_confirm:
      msg = (
        <>
          Your account is not verified, if you haven't received confirmation
          email, click {" "}
          <Link href="#" onClick={handler}>
            here
          </Link>
        </>
      );
      break;
    default:
      msg = "There was a problem";
    break;
  }
  return <Alert severity={severity}>{msg}</Alert>;
}
