import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ListIcon from "@material-ui/icons/List";
import MessageIcon from "@material-ui/icons/Message";
import GroupIcon from "@material-ui/icons/Group";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: theme.spacing(3),
  },
  tab: {
    minWidth: "unset",
    flexGrow: 1,
  },
}));

export default function NavigationTabs({ tab, handleTabChange, isCreator }) {
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
        <Tab
          /* label="Tasks List"*/ icon={<ListIcon />}
          className={classes.tab}
          aria-label="tasks list"
        />
        <Tab
          /* label="Messages" */ icon={<MessageIcon />}
          className={classes.tab}
          aria-label="messages"
        />
        <Tab
          /* label="Settings" */ icon={<GroupIcon />}
          className={classes.tab}
          aria-label="members"
        />
        {isCreator && (
          <Tab
            /* label="Settings" */ icon={<SettingsIcon />}
            className={classes.tab}
            aria-label="settings"
          />
        )}
      </Tabs>
    </Paper>
  );
}

NavigationTabs.propTypes = {
  tab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  isCreator: PropTypes.bool.isRequired,
};
