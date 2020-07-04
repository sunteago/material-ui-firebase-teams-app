import React from 'react';
import * as alertTypes from '../constants/alertTypes';
import { Link } from "@material-ui/core";
import {firebase} from '../config/firebaseConfig';

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

export const extractDataFromDocuments = (docs) => {
  let documentsData = {};
  docs.forEach((subDocs, idx) => {//0: userRef, 1: generalRef, 2: newsRef
    //idx 2 (newsRef) (that needs an extra step)
    if (idx === 2) {
      const newsArr = [];
      subDocs.forEach((newsItem) => {
        newsArr.push({...newsItem.data(), newsId: newsItem.id})
      });
      documentsData.lastNews = newsArr;
    } 
    if (subDocs.exists) {
      documentsData = { ...documentsData, ...subDocs.data() };
    }
  });
  return documentsData;
};

export const getLastMonth = (newArr) => {
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const lastMonth = new Date() - oneMonth
  return firebase.firestore.Timestamp.fromDate(new Date(lastMonth));
}

export const hideExcessText = (text, limit) => {
  if (text.length > limit) {
    return text.substr(0, limit).concat('...');
  }
  return text;
}