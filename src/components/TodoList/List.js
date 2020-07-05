import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { Card, CardHeader, Divider } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DataUsageIcon from "@material-ui/icons/DataUsage";

export default function customList(props) {
  const { items, listTitle, onClickHandler, classes, isInReadyList } = props;
  return (
    <Card>
      <CardHeader className={classes.cardHeader} title={listTitle} />
      <Divider />
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `group-tasks-list-item-${value}`;

            return (
              <ListItem
                key={value.taskId}
                role="listitem"
                button
                style={{ textAlign: "center" }}
                onClick={onClickHandler(value)}
              >
                <ListItemText id={labelId} primary={value.task} />
                <ListItemIcon>
                  {isInReadyList ? <CheckIcon /> : <DataUsageIcon />}
                </ListItemIcon>
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    </Card>
  );
}
