import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import * as alertTypes from "../constants/alertTypes";
import { openSnackBar } from "../store/actions";
import {
  makeStyles,
  IconButton,
  Divider,
  Box,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import Modal from "../components/Layout/Modal/Modal";
import { Typography } from "@material-ui/core";
import { getHowManyDaysAgo, shareContent } from "../utils/helpers";
import ShareIcon from "@material-ui/icons/Share";
import { useRef } from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const newsLinkRef = useRef();

  const copyNewsLinkHandler = () => {
    newsLinkRef.current.select();
    document.execCommand("copy");
    dispatch(
      openSnackBar({
        severity: "success",
        action: alertTypes.COPY_NEWS_LINK,
      })
    );
  };

  const onShareNewsHandler = () => {
    shareContent(currentNews.title, window.location.href, copyNewsLinkHandler);
  };
  const onClickShareHandler = () => setIsModalOpen(true);

  return (
    <>
      <Helmet>
        <title>{currentNews.title} | TeamsApp</title>
      </Helmet>

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Share news"
        decline="OK"
      >
        <Typography gutterBottom>
          Share this on the following social networks
        </Typography>
        <Grid container spacing={1} alignItems="center" justify="space-around">
          <Grid item xs={12} sm={7}>
            <TextField
              inputRef={newsLinkRef}
              value={window.location.href}
              inputProps={{ readOnly: true }}
              placeholder="News Link"
              fullWidth
              type="url"
            />
          </Grid>
          <Grid item xs={12} sm={3} style={{ textAlign: "center" }}>
            <Button
              startIcon={<ShareIcon />}
              color="primary"
              onClick={onShareNewsHandler}
            >
              Share link
            </Button>
          </Grid>
        </Grid>
      </Modal>
      {currentNews && (
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
          <IconButton onClick={onClickShareHandler} style={{alignSelf: 'flex-end'}}>
            <ShareIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}
