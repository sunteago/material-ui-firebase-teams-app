import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    margin: theme.spacing(3),
  },
  tab: {
    minWidth: 'unset',
    flexGrow: 1,
  }
}));

export default function CenteredTabs({ tab, handleTabChange }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        centered
        textColor="primary"
      >
        <Tab /* label="Tasks List"*/ icon={<ListIcon />} className={classes.tab} aria-label="tasks list" />
        <Tab /* label="Messages" */icon={<MessageIcon />} className={classes.tab} aria-label="messages" />
        <Tab /* label="Settings" */ icon={<SettingsIcon />} className={classes.tab} aria-label="calendar"  />
      </Tabs>
    </Paper>
  );
}
