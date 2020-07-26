import React from "react";
import { Link } from "react-router-dom";

import SectionTitle from "../Layout/Dashboard/SectionTitle";

import { Typography, Paper } from "@material-ui/core";
import { hideExcessText, getHowManyDaysAgo } from "../../utils/helpers";

export default function NewsItem({ classes, newsItem }) {
  return (
    <Link className={classes.boxLink} to={`/news/${newsItem.newsId}`}>
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
  );
}
