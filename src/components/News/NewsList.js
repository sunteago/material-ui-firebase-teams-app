import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SmallTextBox from "../Layout/Dashboard/SmallTextBox";
import SectionTitle from "../Layout/Dashboard/SectionTitle";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function NewsList({ title, news }) {
  const classes = useStyles();
  return (
    <>
      <SectionTitle style={{ textAlign: "center" }}>{title}</SectionTitle>
      <List className={classes.root}>
        {news.map((newsItem) => {
          return (
            <SmallTextBox
              key={newsItem.published}
              title={newsItem.title}
              content={newsItem.shortContent}
              linkTo={`/news/${newsItem.newsId}`}
              type='newsItem'
            />
          );
        })}
      </List>
    </>
  );
}

NewsList.propTypes = {
  title: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    newsId: PropTypes.string.isRequired,
    published: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }))
}