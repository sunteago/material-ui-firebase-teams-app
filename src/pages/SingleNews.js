import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles, Divider, Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PageContainer from "../components/Layout/PageContainer";

const useStyles = makeStyles((theme) => ({
  newsTitle: {
    textAlign: "center",
    margin: "1.5rem",
    paddingBottom: ".3rem",
  },
  newsSubtitle: {
    marginBottom: ".75rem",
  },
}));

export default function SinglecurrentNews() {
  const classes = useStyles();
  const { newsId } = useParams();
  const { lastNews } = useSelector((state) => state.userData);

  const currentNews = lastNews.find((news) => news.newsId === newsId);

  return (
    <PageContainer>
      <Typography className={classes.newsTitle} variant="h4" component="h1">
        {currentNews.title}
      </Typography>
      <Divider variant="middle" />
      <Typography className={classes.newsSubtitle} variant="subtitle2">
        {currentNews.shortContent}
      </Typography>
      <Typography className={classes.newsBody} variant="body1">
        {currentNews.content}
      </Typography>
    </PageContainer>
  );
}
