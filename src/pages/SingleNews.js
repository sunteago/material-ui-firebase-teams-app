import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles, Divider, Box} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PageContainer from "../components/Layout/PageContainer";
import { getHowManyDaysAgo } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({

  newsItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  newsTitle: {
    textAlign: "center",
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  newsSubtitle: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    width: "100%",
    margin: theme.spacing(2),
  },

}));

export default function SingleNews(props) {
  const classes = useStyles();
  const { newsId } = useParams();
  const lastNews = useSelector((state) => state.userData.lastNews);
  const currentNews = lastNews.find((news) => news.newsId === newsId);

  return (
      <Box className={classes.newsItemContainer}>
        <Typography className={classes.newsTitle} variant="h4" component="h1">
          {currentNews.title}
        </Typography>
        <Typography className={classes.newsSubtitle} variant="subtitle2">
          {currentNews.shortContent}
        </Typography>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          style={{ alignSelf: "flex-end" }}
        >
          {getHowManyDaysAgo(currentNews.published)}
        </Typography>
        <Divider variant="middle" className={classes.divider} />
        <Typography className={classes.newsBody} variant="body1">
          {currentNews.content}
        </Typography>
      </Box>
  );
}
