import React from "react";

import TaskItem from "./TaskItem";

import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { Card, CardHeader, Divider } from "@material-ui/core";

export default function customList(props) {
  const { items, listTitle, onClickHandler, isInReadyList, classes } = props;
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
                />
            );
          })}
        </List>
      </Paper>
    </Card>
  );
}
