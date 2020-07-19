import React, { useState, useEffect} from "react";
import MessageItem from "./MessageItem";
import { makeStyles, Grid } from "@material-ui/core";
import MessageWritingBox from "./MessageWritingBox";
import * as actions from "../../store/actions";

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
}));

export default function Messages(props) {
  const { groupId, messages, user, isMember, dispatch } = props;

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
      const run = {};
      dispatch(actions.manageMessageObserver(groupId,'start', run))
    return () => {
      dispatch(actions.manageMessageObserver(groupId, 'stop'))
      run.unsubscribe();
    }
  }, [dispatch, groupId])

  const clean = () => {
    setTitle("");
    setContent("");
  };

  const onClickSendMessage = () => {
    dispatch(
      actions.postGroupMessage(groupId, { title, content, user }, clean)
    );
  };
  return (
    <Grid container item xs={12} md={8} direction="column" >
      {messages.map((msg) => (
        <MessageItem
          key={msg.timestamp}
          title={msg.title}
          content={msg.content}
          author={msg.author}
          classes={classes}
          userId={msg.userId}
        />
      ))}
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
