import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(5),
  },
}));

function PageContainer({ children, paperStyles }) {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Paper style={paperStyles} className={classes.paper} elevation={3}>
        {children}
      </Paper>
    </Container>
  );
}

export default PageContainer;
