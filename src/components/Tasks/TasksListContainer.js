import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TextInput from "../TextInput";
import * as actions from "../../store/actions";
import { toggleDoneAndNotDone } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TaskList from "./TaskList";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    textAlign: "center",
  },
  paper: {
    height: "auto",
    minHeight: 150,
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
  addItemContainer: {
    display: 'flex',
    alignItems: 'baseline'
  }
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
  const [newTask, setNewTask] = useState("");

  const dispatch = useDispatch();

  const onTaskClickHandler = (task) => {
    const oldTask = { ...task };
    if (task.done) {
      toggleDoneAndNotDone(setDone, setNotDone, task);
    } else {
      toggleDoneAndNotDone(setNotDone, setDone, task);
    }
    dispatch(actions.toggleTaskItem(groupId, task, oldTask));
  };

  const onAddSuccess = (addedTask) => setNotDone(prev => [...prev,addedTask]);

  const onAddTaskHandler = (e) => {
    e.preventDefault();
    setNewTask("");
    dispatch(actions.addTaskItem(groupId, newTask, onAddSuccess));
  };

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={12} sm={6} md={5} lg={3} xl={2}>
        <TaskList
          items={notDone}
          listTitle="Things to do"
          onClickHandler={onTaskClickHandler}
          classes={classes}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={5} lg={3} xl={2}>
        <TaskList
          items={done}
          listTitle="Things Ready"
          onClickHandler={onTaskClickHandler}
          classes={classes}
          isInReadyList
        />
      </Grid>
      <Grid item xs={12} container justify="center">
        <form className={classes.addItemContainer} onSubmit={onAddTaskHandler}>
          <TextInput
            label="Add a new Task"
            value={newTask}
            setValue={setNewTask}
            required
            maxLength={30}
            minLength={5}
          />
          <IconButton type="submit" aria-label="Add task">
            <AddCircleRoundedIcon />
          </IconButton> 
        </form>
      </Grid>
    </Grid>
  );
}
