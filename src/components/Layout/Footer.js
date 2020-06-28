import React from "react";
import { Divider, makeStyles, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dividerLine: {
    marginTop: theme.spacing(10),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Divider className={classes.dividerLine} />
      <Typography>
        <Box m={3} textAlign="center">This is the footer</Box>
      </Typography>
    </>
  );
};

export default Footer;
