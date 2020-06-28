import React from 'react'
import {makeStyles, useTheme} from '@material-ui/core'
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 200,
        flexShrink: 0,
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
      },
      drawerPaper: {
        width: 200,
      },
}));

const DrawerMenu = ({isOpen,handleDrawerClose, handleDrawerOpen}) => {
    const classes = useStyles();
    const theme = useTheme();

    return ( 
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List component="nav" aria-label="main menu options">
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add an event" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>

            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
     );
}
 
export default DrawerMenu;