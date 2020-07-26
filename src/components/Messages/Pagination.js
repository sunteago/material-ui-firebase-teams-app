import React from "react";
import Pagination from "@material-ui/lab/Pagination";

import PropTypes from "prop-types";

export default function BasicPagination(props) {
  const { classes, page, onChange, numOfPages } = props;
  return (
    <div className={classes.pagination}>
      <Pagination count={numOfPages} page={page} onChange={onChange} />
    </div>
  );
}

BasicPagination.propTypes = {
  classes: PropTypes.object,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  numOfPages: PropTypes.number.isRequired,
};
