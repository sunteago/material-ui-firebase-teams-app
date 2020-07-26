import React from "react";
import { useSelector } from "react-redux";

import { LinearProgress } from "@material-ui/core";

export default React.memo(
  function LoadingBar() {
    const { loading } = useSelector((state) => state.UI);

    return loading ? (
      <LinearProgress
        color="secondary"
        style={{ position: "fixed", width: "100%", zIndex: 10000 }}
      />
    ) : null;
  },
  (prevProps, nextProps) => true
);
