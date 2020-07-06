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
    default:
      return "There was a problem";
  }
};

export const extractDataFromDocuments = (docs) => {
  let documentsData = {};
  docs.forEach((subDocs, idx) => {
    //0: userRef, 1: generalRef, 2: newsRef
    //idx 2 (newsRef) (that needs an extra step)
    if (idx === 2) {
      const newsArr = [];
      subDocs.forEach((newsItem) => {
        newsArr.push({ ...newsItem.data(), newsId: newsItem.id });
      });
      documentsData.lastNews = newsArr;
    }
    if (subDocs.exists) {
      documentsData = { ...documentsData, ...subDocs.data() };
    }
  });
  return documentsData;
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
