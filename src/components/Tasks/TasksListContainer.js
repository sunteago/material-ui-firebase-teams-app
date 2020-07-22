import React, { useState } from "react";

import TextInput from "../TextInput";
import * as actions from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TaskList from "./TaskList";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
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
    display: "flex",
    alignItems: "baseline",
  },
  listItemIcon: {
    alignItems: "center",
  },
  listIconButton: {
    padding: theme.spacing(0.75),
  },
  deleteDoneTaskIcon: {
    "&:hover": {
      fill: theme.palette.secondary.dark,
    },
  },
}));

export default function TodoList(props) {
  const { todoList, isMember, group, dispatch } = props;

  const classes = useStyles();
  const doneTodoList = todoList.filter((listItem) => listItem.done === true);
  const notDoneTodoList = todoList.filter(
    (listItem) => listItem.done === false
  );

  const [newTask, setNewTask] = useState("");

  const onTaskClickHandler = (task) => {
    const oldTask = { ...task };
    const updatedTask = { ...task, done: !task.done };
    dispatch(actions.toggleTaskItem(group, updatedTask, oldTask));
  };

  const onAddTaskHandler = (e) => {
    e.preventDefault();
    setNewTask("");
    dispatch(actions.addTaskItem(group, newTask));
  };

  const onDeleteTaskHandler = (task) => (e) => {
    e.stopPropagation();
    dispatch(actions.deleteTaskItem(group, task));
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
          items={notDoneTodoList}
          listTitle="Things to do"
          onClickHandler={onTaskClickHandler}
          classes={classes}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={5} lg={3} xl={2}>
        <TaskList
          items={doneTodoList}
          listTitle="Things Ready"
          onClickHandler={onTaskClickHandler}
          classes={classes}
          onDeleteTaskHandler={onDeleteTaskHandler}
          isInReadyList
        />
      </Grid>
      {isMember && (
        <Grid item xs={12} container justify="center">
          <form
            className={classes.addItemContainer}
            onSubmit={onAddTaskHandler}
          >
            <TextInput
              inputProps={{
                label: "Add a new Task",
                value: newTask,
                onChange: (e) => setNewTask(e.target.value),
                required: true,
                inputProps: {
                  maxLength: 30,
                  minLength: 5,
                },
              }}
            />
            <IconButton type="submit" aria-label="Add task">
              <AddCircleRoundedIcon />
            </IconButton>
          </form>
        </Grid>
      )}
    </Grid>
  );
}
