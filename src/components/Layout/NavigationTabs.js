import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3)
  },

}));

export default function CenteredTabs({tab, handleTabChange}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="primary"
        centered
      >
        <Tab label="Tasks List" />
        <Tab label="Last Messages" />
        <Tab label="Calendar" />
        <Tab label="Settings" />
      </Tabs>
    </Paper>
  );
}