import React, { useState } from "react";
import {toggleDoneAndNotDone} from '../../utils/helpers';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "./List";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  listTitle: {
    margin: theme.spacing(2),
    textAlign: "center",
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

export default function TodoList({ todoList }) {
  const classes = useStyles();
  const doneTodoList = [];
  const notDoneTodoList = [];
  
  todoList.forEach((todoItem) => {
    if (todoItem.done) doneTodoList.push(todoItem);
    else notDoneTodoList.push(todoItem);
  });

  const [notDone, setNotDone] = useState(notDoneTodoList);
  const [done, setDone] = useState(doneTodoList);

  const onListItemClickHandler = (listItem) => () => {
    if (listItem.done) {
      toggleDoneAndNotDone(setDone, setNotDone, listItem)
    } else {
      toggleDoneAndNotDone(setNotDone, setDone, listItem)
    }
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
        <List
          items={notDone}
          listTitle="Things to do"
          onClickHandler={onListItemClickHandler}
          classes={classes}
        />
      </Grid>

      <Grid item>
        <List
          items={done}
          listTitle="Things Ready"
          onClickHandler={onListItemClickHandler}
          classes={classes}
          isInReadyList
        />
      </Grid>
    </Grid>
  );
}
