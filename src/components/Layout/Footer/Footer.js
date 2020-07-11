import React from "react";
import {
  Divider,
  makeStyles,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
  dividerLine: {
    marginTop: theme.spacing(10),
  },
  footerContainer: {
    marginTop: "auto",
    width: "100%",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <Divider className={classes.dividerLine} />
      <Box m={3} textAlign="center">
        <a
          href="https://www.linkedin.com/in/santiago-vallejo-0593211b1/"
          alt="Santiago Vallejo's LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </a>

        <a
          href="https://github.com/sunteago/"
          alt="Santiago Vallejo's Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </a>
        <Typography>Developed by Santiago Vallejo - 2020</Typography>
      </Box>
    </div>
  );
};

export default Footer;
