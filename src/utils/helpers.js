import { firebase } from "../config/firebaseConfig";
import { formatDistance } from "date-fns";

export { getAlertMsgFromAction } from "./alert";

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

export const shareContent = (title, url, fallbackAction) => {
  if (navigator.share) {
    navigator
      .share({ title, url })
      .then(() => console.log)
      .catch(console.log);
  } else {
    fallbackAction();
  }
};
