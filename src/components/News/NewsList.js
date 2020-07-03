import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SmallTextBox from "../Layout/Dashboard/SmallTextBox";
import SectionTitle from "../Layout/Dashboard/SectionTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function AlignItemsList({ title, news }) {
  const classes = useStyles();

  return (
    <>
      <SectionTitle style={{ textAlign: "center" }}>{title}</SectionTitle>
      <List className={classes.root}>
        {news.map((newsItem) => {
          return (
            <SmallTextBox
              key={newsItem.id}
              title={newsItem.title}
              content={newsItem.shortContent}
            />
          );
        })}
      </List>
    </>
  );
}
