import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

export default function NewsItem({newsItem}) {
  
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
