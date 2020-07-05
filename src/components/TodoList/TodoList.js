import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import List from "./List";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  listTitle: {
    margin: theme.spacing(2),
    textAlign: "center",
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);


  /**
   *  todo: que se pase el item solo haciendo click
   */
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const onListItemClickHandler = (value) => () => {
    console.log(value);
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    // setRight(right.concat(leftChecked));
    // setLeft(not(left, leftChecked));
    // setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    // setLeft(left.concat(rightChecked));
    // setRight(not(right, rightChecked));
    // setChecked(not(checked, rightChecked));
  };

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <List
          items={left}
          listTitle="Things to do"
          onClickHandler={onListItemClickHandler}
          classes={classes}
          checked={checked}
        />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <List
          items={right}
          listTitle="Things Ready"
          onClickHandler={onListItemClickHandler}
          classes={classes}
          checked={checked}
          isInReadyList
        />
      </Grid>
    </Grid>
  );
}
