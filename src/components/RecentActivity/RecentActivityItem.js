import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SmallTextBox from "../Layout/Dashboard/SmallTextBox";
import { List, Grid } from "@material-ui/core";

export default function RecentActivityItem({ activityItem,handleClearComment }) {

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={activityItem.name}
              secondary={activityItem.description}
            />
          </ListItem>
        </Grid>
        <Grid container item xs={12} md={6}>
          <List style={{width: '100%'}}>
            {activityItem.messages.map((message) => {
              return (
                <SmallTextBox
                  key={message.timestamp}
                  title={message.title}
                  content={message.content}
                  author={message.author}
                  handleClearComment={() => handleClearComment(message.timestamp)}
                />
              );
            })}
          </List>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}
