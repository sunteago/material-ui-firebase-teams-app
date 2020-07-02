import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(3),
    marginRight: 0
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  detailsButton: {
    marginLeft: 'auto'
  }
}));

export default function SingleNews({ title }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Epigrafe
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>

        <Typography variant="body2" component="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus,
          consequatur.
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.detailsButton} size="small">Details</Button>
      </CardActions>
    </Card>
  );
}
