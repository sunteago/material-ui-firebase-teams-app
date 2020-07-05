import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions';
import { toggleDoneAndNotDone } from "../../utils/helpers";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TaskList from "./TaskList";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    textAlign: 'center'
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
  },
  listTitle: {
    margin: theme.spacing(2),
    textAlign: "center",
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  process: {
    animation: "$rotate 2s infinite linear",
  },
}));

export default function TodoList({ todoList, groupId }) {
  const classes = useStyles();
  const doneTodoList = [];
  const notDoneTodoList = [];

  todoList.forEach((todoItem) => {
    if (todoItem.done) doneTodoList.push(todoItem);
    else notDoneTodoList.push(todoItem);
  });

  const [notDone, setNotDone] = useState(notDoneTodoList);
  const [done, setDone] = useState(doneTodoList);

  const dispatch = useDispatch();

  const onTaskClickHandler = (task) => {
    const oldTask = {...task};
    if (task.done) {
      toggleDoneAndNotDone(setDone, setNotDone, task);
    } else {
      toggleDoneAndNotDone(setNotDone, setDone, task);
    }
    dispatch(actions.toggleTaskItem(groupId, task, oldTask));
  };

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <TaskList
          items={notDone}
          listTitle="Things to do"
          onClickHandler={onTaskClickHandler}
          classes={classes}
        />
      </Grid>

      <Grid item>
        <TaskList
          items={done}
          listTitle="Things Ready"
          onClickHandler={onTaskClickHandler}
          classes={classes}
          isInReadyList
        />
      </Grid>
    </Grid>
  );
}
