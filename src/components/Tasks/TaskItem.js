import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import CheckIcon from "@material-ui/icons/Check";
import { Fade, IconButton } from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

export default function TaskItem(props) {
  const {
    item,
    isInReadyList,
    classes,
    onClickHandler,
    onDeleteTaskHandler,
  } = props;
  return (
    <Fade in>
      <ListItem
        role="listitem"
        button
        style={{ textAlign: "center" }}
        onClick={() => onClickHandler(item)}
      >
        <ListItemText id={item.taskId} primary={item.task} />
        <ListItemIcon className={classes.listItemIcon}>
          {isInReadyList ? (
            <>
              <CheckIcon />
              <IconButton
                className={classes.listIconButton}
                onClick={onDeleteTaskHandler(item)}
              >
                <RemoveCircleOutlineIcon
                  className={classes.deleteDoneTaskIcon}
                />
              </IconButton>
            </>
          ) : (
            <DataUsageIcon className={classes.process} />
          )}
        </ListItemIcon>
      </ListItem>
    </Fade>
  );
}
