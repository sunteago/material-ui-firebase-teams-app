import React, { useState, useEffect } from "react";
import * as actions from "../../store/actions";

import Pagination from "./Pagination";
import MessageItem from "./MessageItem";
import { makeStyles, Grid } from "@material-ui/core";
import MessageWritingBox from "./MessageWritingBox";
import { getHowManyDaysAgo } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  writingBoxContainer: {
    marginTop: theme.spacing(4),
  },
  messageContainer: {
    padding: theme.spacing(2),
    borderRadius: "15px",
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  sendBtnContainer: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const msgPerPage = 3;

export default function Messages(props) {
  const { groupId, messages, user, isMember, dispatch } = props;
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const run = {};
    dispatch(actions.manageMessageObserver(groupId, "start", run));
    return () => {
      dispatch(actions.manageMessageObserver(groupId, "stop"));
      run.unsubscribe();
    };
  }, [dispatch, groupId]);

  const clean = () => {
    setTitle("");
    setContent("");
  };

  const onClickSendMessage = () => {
    dispatch(
      actions.postGroupMessage(groupId, { title, content, user }, clean)
    );
  };

  const handlePageChange = (event, value) => setPage(value);


  const fromMsgNum = (page - 1) * msgPerPage;
  const toMsgNum = page * msgPerPage;

  const sortedMsgs = messages.sort((a,b) => b.timestamp.seconds - a.timestamp.seconds);

  const currPageMsgs = sortedMsgs.slice(fromMsgNum, toMsgNum);

  const sortedCurrPageMsgs = currPageMsgs.sort((a,b) => a.timestamp.seconds - b.timestamp.seconds);

  return (
    <Grid container item xs={12} md={8} direction="column">
      {sortedCurrPageMsgs.map((msg) => (
        <MessageItem
          key={msg.timestamp}
          title={msg.title}
          content={msg.content}
          author={msg.author}
          classes={classes}
          userId={msg.userId}
          timestamp={getHowManyDaysAgo(msg.timestamp)}
        />
      ))}
      <Pagination
        classes={classes}
        page={page}
        onChange={handlePageChange}
        numOfPages={Math.ceil(messages.length / msgPerPage)}
      />
      {isMember && (
        <MessageWritingBox
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          avatar={user.photoURL}
          username={user.displayName || user.email}
          classes={classes}
          sendHandler={onClickSendMessage}
        />
      )}
    </Grid>
  );
}
