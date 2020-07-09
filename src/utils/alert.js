import React from "react";
import * as alertTypes from "../constants/alertTypes";
import { Link } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";

export const getAlertMsgFromAction = (action, handler) => {
  switch (action) {
    case alertTypes.EMAIL_CONFIRM:
      return (
        <>
          Your account is not verified, if you haven't received confirmation
          email, click{" "}
          <Link href="#" onClick={handler}>
            here
          </Link>
        </>
      );
    case alertTypes.MAKE_GROUP_PUBLIC:
      return (
        <>
          <AlertTitle>Warning</AlertTitle>
          If you set your group to public —{" "}
          <strong>everyone will be able to find it!</strong>
        </>
      );
    case alertTypes.FETCH_SINGLE_GROUP_ERROR:
      return (
        <>
          <AlertTitle>Error</AlertTitle>
          This group couldn't be found, either is private and you are not a
          member or maybe you are experiencing network issues
        </>
      );
    case alertTypes.INVITATION_LINK_PROBLEM:
      return (
        <>
          <AlertTitle>Error</AlertTitle>
          This invitation link is not valid, maybe it has been already used !
        </>
      );
    default:
      return (
        <>
          <AlertTitle>Something went Wrong</AlertTitle>
          Something unexpected happened, please{" "}
          <strong>try again later!</strong>
        </>
      );
  }
};
