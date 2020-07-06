import React from "react";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";

import { Paper } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
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
    position: 'relative'
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
  const history = useHistory();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Paper style={paperStyles} className={classes.paper} elevation={3}>
        <Grid className={classes.navigationButtons}>
          <IconButton onClick={() => history.goBack()}>
            <NavigateBeforeIcon />
          </IconButton>
        </Grid>
        {children}
      </Paper>
    </Container>
  );
}

export default PageContainer;
