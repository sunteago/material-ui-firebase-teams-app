import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles, IconButton, Divider, Box } from "@material-ui/core";
import Modal from "../components/Layout/Modal/Modal";
import { Typography } from "@material-ui/core";
import { getHowManyDaysAgo, shareContent } from "../utils/helpers";
import ShareIcon from "@material-ui/icons/Share";

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

  const [open, setOpen] = useState(false);

  const onShareNewsHandler = () => {
    shareContent(currentNews.title, window.location.href, setOpen);
  };

  return (
    <>
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          content="Share this on the following social networks"
          title="Share news"
          confirm="Share"
        />
      )}
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
        <IconButton onClick={onShareNewsHandler}>
          <ShareIcon />
        </IconButton>
      </Box>
    </>
  );
}
