import React from "react";

import TaskItem from "./TaskItem";

import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { Card, CardHeader, Divider } from "@material-ui/core";

import PropTypes from "prop-types";

export default function TaskList(props) {
  const {
    items,
    listTitle,
    onClickHandler,
    isInReadyList,
    classes,
    onDeleteTaskHandler,
  } = props;
  return (
    <Card>
      <CardHeader className={classes.cardHeader} title={listTitle} />
      <Divider />
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map((item) => {
            return (
              <TaskItem
                key={item.taskId}
                item={item}
                onClickHandler={onClickHandler}
                classes={classes}
                isInReadyList={isInReadyList}
                onDeleteTaskHandler={onDeleteTaskHandler}
              />
            );
          })}
        </List>
      </Paper>
    </Card>
  );
}

TaskList.propTypes = {
  items: PropTypes.array.isRequired,
  listTitle: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  onDeleteTaskHandler: PropTypes.func,
  isInReadyList: PropTypes.bool,
}