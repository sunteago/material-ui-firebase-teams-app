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

export const limitGroupsArray = (groupsArr, num) => groupsArr.slice(0, num);

export const topActiveGroupsToArray = (activeGroups) => {
  const activeGroupsArr = [];
  for (let key in activeGroups) {
    activeGroupsArr.push({
      groupId: key,
      name: activeGroups[key].name,
      description: activeGroups[key].description,
      lastActivity: activeGroups[key].lastActivity.toMillis(),
      image: activeGroups[key].image,
    });
  }
  if (activeGroupsArr.length > 0) {
    const groups = activeGroupsArr.sort((a, b) => b.lastActivity - a.lastActivity);
    return limitGroupsArray(groups, 3);
  }
  return activeGroupsArr;
};

//filters groups with messages written by user and seen messages
export const cleanDashboard = (groups, seenMessages, userId) => {
  return groups.map((group) => {
    return {
      ...group,
      messages: group.messages.filter((message) => {
        return !(
          message.userId === userId ||
          seenMessages.some(
            (tsmp) => tsmp.seconds === message.timestamp.seconds
          )
        );
      }),
    };
  });
};
