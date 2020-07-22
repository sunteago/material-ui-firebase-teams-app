import React from "react";
import { useSelector } from "react-redux";
import { Typography, makeStyles, Paper } from "@material-ui/core";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import { hideExcessText, getHowManyDaysAgo } from "../utils/helpers";
import { Link } from "react-router-dom";

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
      <SectionTitle className={classes.newsTitle}>Last News</SectionTitle>
      {lastNews.map((newsItem) => (
        <Link
          key={newsItem.newsId}
          className={classes.boxLink}
          to={`/news/${newsItem.newsId}`}
        >
          <Paper
            elevation={10}
            className={classes.newsItemContainer}
            key={newsItem.published}
          >
            <SectionTitle variant="h4">{newsItem.title}</SectionTitle>
            <Typography variant="subtitle1">{newsItem.shortContent}</Typography>
            <Typography variant="body1">
              {hideExcessText(newsItem.content, 200)}
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              style={{ textAlign: "right" }}
            >
              {getHowManyDaysAgo(newsItem.published)}
            </Typography>
          </Paper>
        </Link>
      ))}
    </>
  );
}
