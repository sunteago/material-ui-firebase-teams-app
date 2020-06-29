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
      <Box m={3} textAlign="center">        
        <Typography>This is the footer </Typography>
      </Box>
    </>
  );
};

export default Footer;
