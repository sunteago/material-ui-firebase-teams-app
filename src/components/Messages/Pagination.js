import React from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function BasicPagination({ classes, page, onChange, numOfPages }) {
  return (
    <div className={classes.pagination}>
      <Pagination count={numOfPages} page={page} onChange={onChange} />
    </div>
  );
}
