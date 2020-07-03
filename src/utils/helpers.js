import React from 'react';
import * as alertTypes from '../constants/alertTypes';
import { Link } from "@material-ui/core";

export const getAlertMsgFromAction = (action, handler) => {
    switch (action) {
        case alertTypes.email_confirm:
          return (
            <>
              Your account is not verified, if you haven't received confirmation
              email, click {" "}
              <Link href="#" onClick={handler}>
                here
              </Link>
            </>
          );
        default:
          return "There was a problem";
      }
}