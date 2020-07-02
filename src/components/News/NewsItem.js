import React from "react";
// import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";

export default function NewsItem({newsItem}) {
  
  // const classes = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText primary={newsItem.title} secondary={newsItem.shortContent} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"></ListItem>
    </>
  );
}
