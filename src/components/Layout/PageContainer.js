import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Container, Paper } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 1001,
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
    position: "relative",
    minHeight: "20vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(5),
  },
}));

export default function PageContainer({ children, paperStyles }) {
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

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array.isRequired,
  ]),
  paperStyles: PropTypes.string,
};
