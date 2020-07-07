import React from "react";
import * as alertTypes from "../constants/alertTypes";
import { Link } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import { firebase } from "../config/firebaseConfig";
import { formatDistance } from "date-fns";

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
          This group couldn't be found, either is private and you are not a member
          or maybe you are experiencing network issues
        </>
      );
    default:
      return <>
      <AlertTitle>Something went Wrong</AlertTitle>
      Something unexpected happened, please <strong>refresh!</strong>
    </>
  }
};

export const setFormatedDate = (date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};

export const getHowManyDaysAgo = (date) => {
  return formatDistance(date.toDate(), new Date()) + " ago";
};

export const getLastMonth = (newArr) => {
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const lastMonth = new Date() - oneMonth;
  return setFormatedDate(new Date(lastMonth));
};

export const hideExcessText = (text, limit) => {
  if (text.length > limit) {
    return text.substr(0, limit).concat("...");
  }
  return text;
};

export const toggleDoneAndNotDone = (setListA, setListB, listItem) => {
  listItem.done = !listItem.done;
  setListA((prevState) => {
    return prevState.filter(
      (doneListItem) => doneListItem.taskId !== listItem.taskId
    );
  });
  setListB((prevState) => prevState.concat(listItem));
};

export const shareContent = (title, url, setOpen) => {
  if (navigator.share) {
    navigator
      .share({ title, url })
      .then(() => console.log)
      .catch(console.log);
  } /*else {
    setOpen(true);
  }*/
};
