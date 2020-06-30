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
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <Divider className={classes.dividerLine} />
      <Box m={3} textAlign="center">
        <IconButton>
          <GitHubIcon />
        </IconButton>
        <IconButton>
          <LinkedInIcon />
        </IconButton>
        <Typography>Developed by Santiago Vallejo - 2020</Typography>
      </Box>
    </div>
  );
};

export default Footer;
