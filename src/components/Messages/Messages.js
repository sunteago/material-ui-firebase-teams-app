import React, { useState, useEffect } from "react";
import { postGroupMessage, manageMessageObserver } from "../../store/actions";
import useForm from "../../hooks/useForm";
import formValidation from "../../utils/formValidation";

import Pagination from "./Pagination";
import MessageItem from "./MessageItem";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import MessageWritingBox from "./MessageWritingBox";
import { getHowManyDaysAgo } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  writingBoxContainer: {
    marginTop: theme.spacing(2),
  },
  messageContainer: {
    padding: theme.spacing(2),
    borderRadius: "15px",
    marginBottom: theme.spacing(1),
  },
  noMsgYet: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  avatarBig: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatarSm: {
    width: theme.spacing(4),
    height: theme.spacing(4)
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

const initialState = {
  title: "",
  content: "",
};

function Messages(props) {
  const { groupId, messages, user, isMember, dispatch } = props;
  
  const classes = useStyles();

  const [page, setPage] = useState(1);

  useEffect(() => {
    const run = {};
    dispatch(manageMessageObserver(groupId, "start", run));
    return () => {
      dispatch(manageMessageObserver(groupId, "stop"));
      run.unsubscribe();
    };
  }, [dispatch, groupId]);

  const onClickSendMessage = () => {
    const { title, content } = values;
    dispatch(postGroupMessage(groupId, { title, content, user }, cleanForm));
  };

  const { values, errors, handleChange, handleSubmit, cleanForm } = useForm(
    initialState,
    onClickSendMessage,
    formValidation
  );

  const handlePageChange = (event, value) => setPage(value);

  const fromMsgNum = (page - 1) * msgPerPage;
  const toMsgNum = page * msgPerPage;

  const sortedMsgs = messages.sort(
    (a, b) => b.timestamp.seconds - a.timestamp.seconds
  );

  const currPageMsgs = sortedMsgs.slice(fromMsgNum, toMsgNum);

  const sortedCurrPageMsgs = currPageMsgs.sort(
    (a, b) => a.timestamp.seconds - b.timestamp.seconds
  );

  return (
    <Grid container item xs={12} md={8} direction="column">
      {sortedCurrPageMsgs.length > 0 ? (
        <>
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
        </>
      ) : (
        <Typography className={classes.noMsgYet}>No messages in this group yet!</Typography>
      )}
      {isMember && (
        <MessageWritingBox
          avatar={user.photoURL}
          username={user.displayName}
          classes={classes}
          onSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          errors={errors}
        />
      )}
    </Grid>
  );
}

export default React.memo(Messages, (prevProps, nextProps) => {
  if (prevProps.messages.length === nextProps.messages.length) return true;
  return false;
});