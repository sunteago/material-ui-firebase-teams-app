import React, { useState } from "react";
import MessageItem from "./MessageItem";
import { makeStyles } from "@material-ui/core";
import MessageWritingBox from "./MessageWritingBox";

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

export default function Messages({ messages, user }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onClickSendMessage = () => {};

  return (
    <div>
      {messages.map((msg) => (
        <MessageItem
          key={msg.timestamp}
          title={msg.title}
          content={msg.content}
          author={msg.author}
          classes={classes}
        />
      ))}
      <MessageWritingBox
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        avatar={user.photoURL}
        username={user.displayName || user.email}
        classes={classes}
      />
    </div>
  );
}
