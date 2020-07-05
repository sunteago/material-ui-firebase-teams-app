import React from "react";
import Divider from "@material-ui/core/Divider";
import SmallTextBox from "../Layout/Dashboard/SmallTextBox";
import { List, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import GroupItem from '../Group/GroupItem';

export default function RecentActivityItem(props) {
  const { activityItem, handleClearComment } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <GroupItem group={activityItem} />
        </Grid>
        <Grid container item xs={12} md={6}>
          <List style={matches ? { width: "100%" } : {width: '100%', marginLeft: '2.5rem'}}>
            {activityItem.messages.map((message) => {
              return (
                <SmallTextBox
                  key={message.timestamp}
                  title={message.title}
                  content={message.content}
                  author={message.author}
                  handleClearComment={() =>
                    handleClearComment(message.timestamp)
                  }
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
