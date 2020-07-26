import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import NewsItem from "../components/News/NewsItem";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  newsTitle: {
    margin: theme.spacing(3),
  },
  newsItemContainer: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    width: "100%",
  },
  boxLink: {
    textDecoration: "none",
    cursor: "pointer",
  },
}));
export default function News() {
  const classes = useStyles();
  const { lastNews } = useSelector((state) => state.userData);

  return (
    <>
      <Helmet>
        <title>Last News | TeamsApp</title>
      </Helmet>

      <SectionTitle className={classes.newsTitle}>Last News</SectionTitle>
      {lastNews.map((newsItem) => (
        <NewsItem key={newsItem.newsId} newsItem={newsItem} classes={classes} />
      ))}
    </>
  );
}
